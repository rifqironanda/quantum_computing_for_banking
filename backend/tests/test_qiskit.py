import math
import unittest
from unittest.mock import patch
import subprocess
from fastapi.testclient import TestClient
from backend.main import app
from backend.app import run_worker, recent_requests
from backend.engine import classical, shor


class EngineTests(unittest.TestCase):
    def setUp(self):
        recent_requests.clear()

    def test_classical_presets(self):
        for n in [15, 21, 35, 1022117, 100160063, 999800009]:
            result = classical(n)
            self.assertEqual(math.prod(result['factors']), n)
            for factor in result['factors']:
                self.assertTrue(all(factor % d for d in range(2, math.isqrt(factor)+1)))

    def test_prime(self):
        self.assertEqual(classical(101)['status'], 'prime')

    def test_real_qiskit(self):
        result = shor(15)
        self.assertEqual(result['factors'], [3, 5])
        self.assertEqual(result['qubits'], 12)
        self.assertEqual(sum(result['counts'].values()), 256)
        self.assertEqual(set(result['counts']), {'00000000', '01000000', '10000000', '11000000'})

    def test_retry_and_shortcut(self):
        self.assertEqual(shor(15, 14)['status'], 'inconclusive')
        self.assertEqual(shor(15, 3)['status'], 'classical_shortcut')

    def test_resource_limit(self):
        with patch('backend.app.run_worker') as worker:
            result = TestClient(app).post('/api/benchmark', json={'n': 100160063, 'method': 'qiskit'})
            self.assertEqual(result.json()['status'], 'resource_limit')
            self.assertIsNone(result.json()['elapsed_seconds'])
            worker.assert_not_called()

    def test_validation(self):
        client = TestClient(app)
        for n in [0, 3, 1.5, 1000000000]:
            self.assertEqual(client.post('/api/benchmark', json={'n': n, 'method': 'classical'}).status_code, 422)

    def test_timeout_message(self):
        with patch('backend.app.subprocess.run', side_effect=subprocess.TimeoutExpired('worker', 120)):
            result = run_worker({'n': 15, 'method': 'classical'})
            self.assertEqual(result['status'], 'timeout')
            self.assertIn('120 detik', result['message'])
            self.assertIsNone(result['elapsed_seconds'])

    def test_process_deadline(self):
        result = run_worker({'n': 15, 'method': 'classical'}, timeout=0.000001)
        self.assertEqual(result['status'], 'timeout')

    def test_process_success(self):
        result = run_worker({'n': 100160063, 'method': 'classical'})
        self.assertEqual(result['status'], 'success')
        self.assertGreaterEqual(result['wall_seconds'], result['elapsed_seconds'])



class HostingTests(unittest.TestCase):
    def setUp(self):
        recent_requests.clear()
        self.client = TestClient(app)

    def test_health_and_cors_from_pages(self):
        self.assertEqual(self.client.get('/api/health').json()['benchmark'], 'qiskit-statevector')
        response = self.client.options('/api/benchmark', headers={
            'Origin': 'https://rifqironanda.github.io',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'content-type'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['access-control-allow-origin'], 'https://rifqironanda.github.io')
        response = self.client.options('/api/benchmark', headers={
            'Origin': 'https://untrusted.example', 'Access-Control-Request-Method': 'POST'})
        self.assertEqual(response.status_code, 400)

    def test_busy_returns_429(self):
        from backend.app import slot
        slot.acquire()
        try:
            response = self.client.post('/api/benchmark', json={'n': 15, 'method': 'classical'})
            self.assertEqual(response.status_code, 429)
        finally:
            slot.release()

    def test_rate_limit_and_invalid_base(self):
        with patch('backend.app.run_worker', return_value={'status': 'success'}):
            for _ in range(12):
                self.assertEqual(self.client.post('/api/benchmark', json={'n': 15, 'method': 'classical'}).status_code, 200)
            response = self.client.post('/api/benchmark', json={'n': 15, 'method': 'classical'})
            self.assertEqual(response.status_code, 429)
            self.assertEqual(response.headers['retry-after'], '60')
        recent_requests.clear()
        response = self.client.post('/api/benchmark', json={'n': 15, 'method': 'qiskit', 'a': 15})
        self.assertEqual(response.status_code, 422)

    def test_live_qiskit_subprocess_contract(self):
        response = self.client.post('/api/benchmark', json={'n': 15, 'method': 'qiskit'})
        self.assertEqual(response.status_code, 200)
        result = response.json()
        self.assertEqual(result['factors'], [3, 5])
        self.assertEqual(sum(result['counts'].values()), 256)
        self.assertGreater(result['elapsed_seconds'], 0)


if __name__ == '__main__':
    unittest.main()
