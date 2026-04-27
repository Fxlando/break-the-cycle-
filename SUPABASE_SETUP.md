# Supabase Free Setup

This is the clean public setup for Break the Cycle:

- `breakthecycle.network` stays on Vercel
- Supabase Free holds the database
- your Discord bot can still run from your own PC
- Ollama can still run from your own PC

## 1. Create the Supabase project

1. Open your Supabase dashboard.
2. Create a new project.
3. Wait for the database to finish provisioning.

## 2. Copy the right connection string

In Supabase:

1. Open `Connect`
2. Open the Prisma / connection-string section
3. Copy the **Session pooler** connection string

It should look roughly like this:

```env
postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

Use that same string in both places:

- local `.env`
- Vercel `DATABASE_URL`

You should also copy the matching `DIRECT_URL` value from the Prisma section.
If the direct database host is unreachable from your machine, you can use the
same working pooler URL for `DIRECT_URL` too.

## 3. Update your local `.env`

Set these values in your real local `.env`:

```env
FRONTEND_URL=https://breakthecycle.network
NODE_ENV=development
DATABASE_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
DIRECT_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
DISCORD_REDIRECT_URI=https://breakthecycle.network/api/discord/callback
```

Keep your existing:

- `RESEND_API_KEY`
- `EMAIL_FROM`
- `EMAIL_REPLY_TO`
- Discord bot and OAuth values
- Ollama values

## 4. Push the schema into Supabase

From the project folder run:

```powershell
npm run prisma:push
```

That creates the tables in your new hosted database.

## 5. Set the Vercel environment variables

In your Vercel project, add the variables from [`.env.vercel.example`](./.env.vercel.example).

The important ones are:

```env
FRONTEND_URL=https://breakthecycle.network
NODE_ENV=production
DATABASE_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
DIRECT_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
RESEND_API_KEY=...
EMAIL_FROM=Break The Cycle <hello@breakthecycle.network>
EMAIL_REPLY_TO=...
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
DISCORD_REDIRECT_URI=https://breakthecycle.network/api/discord/callback
DISCORD_BOT_TOKEN=...
DISCORD_GUILD_ID=...
DISCORD_ROLE_MEMBER_ID=...
DISCORD_ROLE_CAREER_PIVOT_ID=...
DISCORD_ROLE_SKILL_BUILD_ID=...
DISCORD_ROLE_ROUTINE_RESET_ID=...
DISCORD_ROLE_SIDE_PATHS_ID=...
DISCORD_SERVER_INVITE_URL=...
DISCORD_STATE_TTL_MS=900000
STRIPE_SECRET_KEY=...
STRIPE_MEMBERSHIP_PRICE_ID=...
```

For the Supabase setup, leave this blank on Vercel:

```env
EXTERNAL_API_ORIGIN=
```

## 6. Check the Vercel env shape

If you want a quick repo-side check before deploying:

```powershell
npm run vercel:check
```

## 7. Deploy the site code

Double-click:

- [`update-site.bat`](./update-site.bat)

That pushes the code to GitHub and triggers the Vercel deploy.

## 8. Start your local bot stack

Because you still want to run the bot and Ollama yourself, use:

```powershell
start-local.bat
```

or:

```powershell
npm run local:start
```

With a hosted database, the local start script will now skip the local Postgres service check automatically.

## 9. Test the real flow

After Vercel finishes deploying:

1. Open `https://breakthecycle.network/quiz.html`
2. Request a magic link
3. Confirm the link returns you to the site
4. Connect Discord
5. Confirm the membership flow works
6. In Discord, test `/goal` and `/nextstep`

## If something fails

Run these locally:

```powershell
npm run bot:check
npm run vercel:check
```

Then check:

- Vercel deployment logs
- Supabase database is active
- Resend key and sender are valid
- `DATABASE_URL` is the Supabase **Session pooler** string, not `localhost`
