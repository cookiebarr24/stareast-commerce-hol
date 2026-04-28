import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

const USERS = [
  { email: 'alice@example.com', password: 'alice123' },
  { email: 'bob@example.com', password: 'bob123' },
  { email: 'carol@example.com', password: 'carol123' },
];

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 30 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    'http_req_duration{endpoint:login}': ['p(95)<500'],
  },
};

export default function () {
  const user = USERS[Math.floor(Math.random() * USERS.length)];

  const payload = JSON.stringify({
    email: user.email,
    password: user.password,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    tags: {
      endpoint: 'login',
    },
  };

  const response = http.post(`${BASE_URL}/login`, payload, params);

  check(response, {
    'login status is 200': (r) => r.status === 200,
    'login returns a token': (r) => {
      try {
        const body = JSON.parse(r.body);
        return typeof body.token === 'string' && body.token.length > 0;
      } catch (error) {
        return false;
      }
    },
  });

  sleep(1);
}
