# Salla-Clone Syria API

Node.js + Express + PostgreSQL backend for a multi-merchant e-commerce platform with USD/SYP dual pricing.

## Setup

1. Copy env file:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize schema:
   ```bash
   npm run db:init
   ```
4. Start server:
   ```bash
   npm run dev
   ```

## Main Endpoints

- `POST /api/auth/register` merchant registration
- `POST /api/stores` create store and exchange rate
- `POST /api/products/add` add product with USD + auto SYP price
- `GET /api/orders` list orders with shipping statuses
- `POST /api/orders/quick-order` create order without customer login
