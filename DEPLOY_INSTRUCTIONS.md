# Deploying Engisafe Web to Vercel with Neon DB Integration

This guide helps you deploy your Next.js application to Vercel and set up Neon DB directly from the Vercel dashboard.

## 1. Deploy to Vercel

1.  **Push your code to GitHub** (You've already done this).
2.  Go to [vercel.com](https://vercel.com) and log in.
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your `engisafe-web` repository.
5.  In the "Configure Project" screen, leave everything as default for now.
6.  Click **"Deploy"**.

## 2. Add Neon Database Integration

Once the deployment process starts (or after it finishes/fails):

1.  Go to your project dashboard in Vercel.
2.  Click on the **"Storage"** tab at the top.
3.  Click **"Connect Store"**.
4.  Select **"Neon"** (Serverless Postgres) from the list.
5.  Click **"Connect"** (or "Install Integration" if it's your first time).
6.  Follow the prompts to create a new Neon database.
    - **Region**: Choose **Frankfurt (fra1)** to match your Vercel function region for best performance.

## 3. Redeploy

The integration automatically adds the necessary environment variables (`DATABASE_URL`, `DIRECT_URL`, etc.) to your Vercel project properly.

1.  Go to the **"Deployments"** tab.
2.  Click the three dots `...` on your latest deployment (or the failed one) and select **"Redeploy"**.
3.  Enable **"Redeploy with existing build cache"** is fine, or just click "Redeploy".

## 4. Database Migration (Important)

Your database is now connected, but it's empty. You need to run migrations to create the tables.

**Option A (Recommended): Connect Local to Remote**
1.  Go to Vercel Project Settings -> Environment Variables.
2.  Copy the `DATABASE_URL` and `DIRECT_URL` values.
3.  Paste them into your local `.env` file.
4.  Run `npx prisma migrate dev --name init` locally. This will apply the schema to your remote Neon DB.

**Option B: Build Command (Advanced)**
Alternatively, you can update your "Build Command" in Vercel settings to:
`npx prisma migrate deploy && prisma generate && next build`
*Note: This runs migrations on every deploy, which is generally safe for additive changes.*

