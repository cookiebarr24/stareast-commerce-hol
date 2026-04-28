# E-commerce REST API

## Description
Simple REST API for an e-commerce checkout flow using JavaScript and Express.  
The API runs entirely in memory and provides authentication with JWT.

## Installation
```bash
npm install
```

## How to Run
```bash
npm start
```

Server default URL:
- `http://localhost:3000`

Swagger documentation:
- `http://localhost:3000/docs`

## Rules
- Checkout accepts only `cash` or `credit_card`.
- `cash` payment gives 10% discount.
- Only authenticated users can perform checkout.
- API endpoints are:
  - `POST /register`
  - `POST /login`
  - `POST /checkout`
  - `GET /healthcheck`

## Data Already Existent
Initial users:
- `alice@example.com` / `alice123`
- `bob@example.com` / `bob123`
- `carol@example.com` / `carol123`

Initial products:
- `{ id: 1, name: "Notebook", price: 20.0 }`
- `{ id: 2, name: "Mouse", price: 35.0 }`
- `{ id: 3, name: "Keyboard", price: 70.0 }`

## How to Use the REST API
1. Register (optional):
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John\",\"email\":\"john@example.com\",\"password\":\"john123\"}"
```

2. Login and get token:
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"alice@example.com\",\"password\":\"alice123\"}"
```

3. Checkout (use token from login response):
```bash
curl -X POST http://localhost:3000/checkout \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"paymentMethod\":\"cash\",\"items\":[{\"productId\":1,\"quantity\":2},{\"productId\":2,\"quantity\":1}]}"
```

4. Healthcheck:
```bash
curl http://localhost:3000/healthcheck
```
