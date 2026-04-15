# Salla-Like Multi-Tenant E-commerce SaaS (Syria Optimized)

Production-oriented backend foundation for a multi-tenant store-builder platform where each merchant can launch an independent storefront with COD-first checkout.

## What was upgraded

- Multi-tenant schema expanded with required SaaS modules.
- Clean architecture slices (controllers + services + repositories + middleware).
- JWT auth + role checks.
- Store isolation via tenant context (`store_id` in critical business tables).
- Storefront APIs for product browsing and checkout.
- Smart pricing engine (USD base, SYP auto-conversion, manual SYP override).

## Quick start

```bash
cp .env.example .env
npm install
npm run db:init
npm run dev
```

## Core API endpoints

### Auth
- `POST /api/auth/register` → registers merchant + auto-creates starter store + starter subscription + JWT.

### Merchant dashboard APIs
- `POST /api/stores` (auth)
- `GET /api/stores/merchant/:merchantId` (auth)
- `POST /api/products/add` (auth)
- `GET /api/orders?storeId=...` (auth + tenant)

### Storefront APIs
- `GET /api/storefront/:storeId/products`
- `POST /api/storefront/:storeId/checkout` (guest checkout, COD default)
- `POST /api/orders/quick-order` (legacy direct endpoint kept)

## Status workflow

`Pending -> Confirmed -> Processing -> Shipped -> Delivered` (+ `Rejected`)

## Monetization defaults

- Starter: `$5 / month`
- Pro: `$10 / month`
- Advanced: `$20 / month`

## Notes

- Telegram integration hooks are prepared at schema level (`stores.telegram_chat_id`) and can be wired via background workers.
- Frontend (Next.js + Tailwind + Zustand + Framer Motion) is documented in `docs/system-design.md` roadmap for phase implementation.
