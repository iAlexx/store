# 1) System Architecture

## High-level
- **API Layer (Express Controllers)**: request parsing + response shape.
- **Application Layer (Services)**: business rules (pricing, checkout, provisioning).
- **Data Layer (Repositories + Sequelize Models)**: persistence and query abstraction.
- **Middleware Layer**: JWT auth, RBAC, tenant guard.

## Multi-tenant model
- Tenant key is `store_id`.
- Every business read/write query is store-scoped.
- No cross-store aggregation in merchant endpoints unless explicitly admin-scoped.

## Security baseline
- bcrypt password hashing.
- JWT bearer tokens.
- Role checks (`super_admin`, `merchant`).
- Tenant context enforcement via `x-store-id` / route params.

---

# 2) Database Schema (PostgreSQL)

Required and included tables:
- merchants
- stores
- products
- product_prices
- customers
- orders
- order_items
- shipping_providers
- shipping_statuses
- shipments
- cities
- product_variants
- subscriptions
- analytics_events

Design notes:
- Foreign key isolation via `store_id` on tenant-bound tables.
- indexes on high-cardinality filters (`store_id`, `status`, `event_type`).
- JSONB for extensible payloads (`theme_config`, `attributes`, `event_payload`).

---

# 3) Storefront UX Flow (Slow internet + COD-first)

1. **Store Landing/Product Grid**
   - image-first cards
   - lazy-loaded media
   - price in SYP (default) and optional USD toggle
2. **Product Details**
   - minimal payload, variants, quantity
3. **Cart**
   - add/update/remove with optimistic UI
4. **Checkout**
   - full name, phone, city, address
   - payment defaults to COD
5. **Confirmation**
   - order ID + expected contact window

UX principles:
- mobile-first
- compressed assets
- short forms
- resumable cart in local storage

---

# 4) Merchant Dashboard Design

## Main widgets
- Revenue overview (today / 7d / 30d)
- Orders by status funnel
- Top products
- Recent orders list
- Conversion and event chart

## Product management
- card/grid layout (not table)
- each card: image, name, USD/SYP, stock, variants
- actions: edit, delete, duplicate

## Shipment workflow
- assign provider
- update tracking
- status transitions with history

---

# 5) Implementation Roadmap

## Phase 1 (completed in backend foundation)
- schema + core models
- auth/register + auto-store provisioning
- product add + smart pricing
- storefront browse + guest checkout

## Phase 2
- login endpoint + refresh tokens
- cart persistence APIs
- shipment update APIs + Telegram notifier worker
- analytics event ingestion endpoint

## Phase 3
- Next.js storefront + merchant dashboard UI
- dark-mode glassmorphism design system
- charts + performance dashboards

## Phase 4
- referral rewards automation
- online payment integrations
- AI helper endpoints (title/description/pricing suggestions)
