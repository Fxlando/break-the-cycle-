# Break the Cycle - Modernization Complete! ✨

## What's New

### Design
- **Modern Gen Z color scheme**: Subtle purples (#6366f1) and blues - clean, not overly colorful
- **Dark mode by default**: Matches Gen Z preferences
- **Smooth animations**: Fade-ins, hover effects, micro-interactions
- **Mobile-first responsive**: Looks great on all devices

### New Archetype Names (Way Less Corny!)
1. **The Strategist** 🧠 - Long-game thinker, systems builder
2. **The Woke Achiever** ⚡ - Fast momentum, results-driven
3. **The Ghost Builder** 👻 - Quiet wins, behind the scenes
4. **The Wild Card** 🎲 - Adaptable, pivots fast
5. **The Nomad** 🌍 - Freedom, travel, location-independent

### Features
- ✅ Integrated quiz (no external Tally.so redirect)
- ✅ Progress bar showing question 1-7
- ✅ Better UX with smooth transitions
- ✅ Enhanced results page with 7-day action plan framework
- ✅ Retake quiz functionality
- ✅ Local storage (remembers if you took quiz before)
- ✅ Email capture via Formspree

## File Structure

```
break the cycle/
├── index.html          - Main landing page (MODERNIZED)
├── quiz.html           - Interactive quiz (MODERNIZED)
├── styles.css          - All styles (NEW)
├── quiz.js             - Quiz logic (NEW)
├── BTC_logo_web.png    - Logo
├── BTC_banner_web.png  - Banner
├── index-new.html      - Backup of new index
├── quiz-new.html       - Backup of new quiz
└── README.md           - This file
```

## How to Use

1. **Test Locally**: Open `index-new.html` in your browser
2. **Deploy**: Upload to Netlify, Vercel, or GitHub Pages
3. **Customize**: 
   - Update social media links in footer
   - Add your own testimonials
   - Customize 7-day action plans in `quiz.js`
   - Adjust colors in `styles.css` CSS variables

## CSS Variables (Easy Customization)

Located at top of `styles.css`:

```css
:root {
  --primary: #6366f1;        /* Main color */
  --accent: #8b5cf6;         /* Secondary color */
  --bg-dark: #0a0a0f;        /* Background */
  --text-primary: #ffffff;   /* Text color */
  /* ... more variables */
}
```

## Next Steps

- [ ] Replace old files with new ones (backup old files first)
- [ ] Test the quiz flow
- [ ] Add real social media links
- [ ] Optimize images (compress PNGs)
- [ ] Deploy to production

## Tech Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- CSS Grid & Flexbox for layouts
- CSS Variables for easy theming
- Vanilla JS for quiz logic
- Formspree for email collection
- Google Fonts (Inter)

---

**Built for Gen Z. Made to break cycles. 🚀**

## Paywall & Backend (added)

- **Stack**: Node.js + Express + Stripe Checkout + cookie-based access flag.
- **Flow**: Users must purchase before starting the quiz. Stripe Checkout redirects back to `quiz.html?session_id=...`; backend verifies the session and sets a `quiz_paid` cookie (30 days). Front-end blocks the quiz until payment is confirmed.
- **Endpoints**:
  - `POST /api/create-checkout-session` → returns `{ url }` for Stripe Checkout.
  - `POST /api/verify-session` with `session_id` → verifies Stripe payment, sets cookie.
  - `GET /api/payment/status` → `{ paid: boolean }` based on cookie.
- **Setup**
  1) `npm install`
  2) Copy `.env.example` → `.env` and set `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `FRONTEND_URL` (e.g., `http://localhost:3000`).
  3) Run `npm start` then open `http://localhost:3000/quiz.html`.
- **Stripe tips**
  - Create a Product/Price in Stripe; use its Price ID.
  - In Stripe Dashboard, add your `FRONTEND_URL` to allowed redirect URLs.
  - Optional: set `STRIPE_PAYMENT_LINK` to use a Stripe Payment Link when Checkout Session creation isn't available (static hosting, missing keys, etc.).
- **Deployment**
  - Host on any Node platform (Render/Fly/Railway/Vercel). Ensure HTTPS so cookies stay secure and set `NODE_ENV=production`.

## API + Data Store (Prisma/Postgres)

- Prisma schema in `prisma/schema.prisma` covers users, sessions, magic-link tokens, subscribers (double opt-in), quiz runs, feature flags, quiz questions, and archetypes.
- Configure `DATABASE_URL` in `.env`, then run:
  - `npm run prisma:generate`
  - `npx prisma db push` (or `prisma migrate dev --name init` if you want migrations)
- New endpoints:
  - Auth: `POST /api/auth/magic-link` (send login email), `GET /api/auth/verify?token=...` (sets `session_token` cookie), `GET /api/auth/me`, `POST /api/auth/logout`.
  - Email list: `POST /api/subscribe` (double opt-in), `GET /api/subscribe/confirm?token=...`.
  - Quiz: `GET /api/quiz/meta` (cached), `POST /api/quiz/submit`, `GET /api/quiz/result/:id`, `GET /api/profile`.
  - Feature flags: `GET /api/flags`.
  - Admin (requires role=ADMIN): `POST /api/admin/questions` to upsert quiz questions.

## Personalization, Analytics, Experiments

- Feature flags live in the DB; the front-end can fetch `/api/flags` to pick variants (e.g., question order or copy tests). `/api/quiz/meta` is cacheable (`s-maxage=300, stale-while-revalidate=600`) for edge delivery of quiz metadata.
- PostHog server-side client is wired; quiz submission tracks `quiz_completed`. Add `POSTHOG_API_KEY` (and optional `POSTHOG_HOST`) to enable.
- `helmet` sets a CSP, `express-rate-limit` guards `/api`, and secrets stay in environment variables.

## Email + Auth UX

- `quiz.html` now shows a magic-link sign-in form; after the emailed link is used, the user is redirected back and results are saved under their profile.
- `index.html` newsletter form now posts to `/api/subscribe` instead of Formspree (double opt-in link is emailed via Resend if configured).

## CI

- GitHub Actions workflow at `.github/workflows/ci.yml` installs deps, runs `prisma generate`, and runs the placeholder `npm run lint`.
