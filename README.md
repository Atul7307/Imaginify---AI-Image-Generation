# Imaginify

Imaginify is a full-stack AI image transformation app built with the Next.js App Router. It supports multiple Cloudinary-powered transformations, Clerk authentication, MongoDB persistence, and a Stripe-based credits system.

## Features

- Authentication with Clerk (sign-in / sign-up)
- AI image transformations (Cloudinary):
	- Image Restore
	- Generative Fill
	- Object Remove
	- Object Recolor
	- Background Remove
- Image gallery with search + pagination
- Profile dashboard with credit balance + user images
- Stripe Checkout for buying credits + Stripe webhook to credit accounts
- Clerk webhook to sync user create/update/delete events into MongoDB
- Optional: AI-powered JSON schema generator page (Gemini API)

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS
- Clerk (auth + user management)
- MongoDB + Mongoose
- Cloudinary + next-cloudinary
- Stripe (Checkout + webhooks)

## Routes

- `/` – Home + gallery
- `/transformations/add/[type]` – Create a transformation (`restore`, `fill`, `remove`, `recolor`, `removeBackground`)
- `/transformations/[id]` – View a transformed image
- `/transformations/[id]/update` – Update an existing transformation (owner-only)
- `/profile` – Credits + your images
- `/credits` – Buy credits
- `/schemacreator` – JSON schema generator (requires `NEXT_PUBLIC_GEMINI_API_KEY`)

API routes:

- `/api/webhooks/clerk` – Clerk webhook (user sync)
- `/api/webhooks/stripe` – Stripe webhook (credits + transactions)
- `/api/debug/env` – Sanity-check env values (non-sensitive output)
- `/api/debug/cloudinary` – Sanity-check Cloudinary connectivity

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in the project root.

```bash
# App
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# MongoDB
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Webhook (Svix signing secret)
WEBHOOK_SECRET=whsec_...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional (Schema Creator page)
NEXT_PUBLIC_GEMINI_API_KEY=...
```

Notes:

- Any variable prefixed with `NEXT_PUBLIC_` is exposed to the browser.
- For production, set `NEXT_PUBLIC_SERVER_URL` to your deployed domain.

### 3) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Webhooks Setup

### Clerk webhook

In your Clerk dashboard, create a webhook pointing to:

- `https://<your-domain>/api/webhooks/clerk`

Subscribe to events used by the app:

- `user.created`
- `user.updated`
- `user.deleted`

Copy the webhook signing secret and set it as `WEBHOOK_SECRET`.

### Stripe webhook

Create a Stripe webhook endpoint pointing to:

- `https://<your-domain>/api/webhooks/stripe`

Subscribe to:

- `checkout.session.completed`

Set the signing secret as `STRIPE_WEBHOOK_SECRET`.

Local testing (Stripe CLI):

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

## Scripts

- `npm run dev` – Start dev server (Turbopack)
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run Next.js lint
- `npm run postbuild` – Generate sitemap via `next-sitemap`
- `npm run vercel-build` – Vercel build + sitemap

## Deployment

- Recommended: Vercel
- Ensure all environment variables are set in your hosting platform
- Update webhook URLs in Clerk/Stripe to match the deployed domain
- After deploy, validate:
	- `/api/debug/env`
	- `/api/debug/cloudinary`
