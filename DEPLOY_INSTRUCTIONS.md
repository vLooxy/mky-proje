# Deploying Engisafe Web to Vercel with Neon DB

This guide helps you deploy your Next.js application to Vercel using Neon as your PostgreSQL database provider.

## Prerequisite: Neon DB Setup

1.  **Create a Neon Account**: Go to [neon.tech](https://neon.tech) and sign up.
2.  **Create a New Project**:
    - Project Name: `engisafe-web` (or your preferred name)
    - Database Name: `neondb` (default)
    - Region: Select a region close to your Vercel deployment (e.g., US East, Frankfurt).
    > **Note**:: Your `vercel.json` is configured for `fra1` (Frankfurt). For best performance, choose a Neon region in Europe (Frankfurt) or update `vercel.json` to match your Neon region.
3.  **Get Connection Strings**:
    - In your Neon dashboard, find the **Connection Details** section.
    - Check "Pooled connection" checkbox.
    - Copy the connection string. This is your `DATABASE_URL`.
    - Uncheck "Pooled connection".
    - Copy the connection string. This is your `DIRECT_URL`.

## Prerequisite: Local Setup (Optional but Recommended)

To test locally or run migrations:

1.  Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```
2.  Fill in `DATABASE_URL` and `DIRECT_URL` in `.env` with the values from Neon.
3.  Run migrations to create tables in Neon:
    ```bash
    npx prisma migrate dev --name init
    ```

## Vercel Deployment

1.  **Push your code to GitHub/GitLab/Bitbucket**.
2.  **Import Project in Vercel**:
    - Go to [vercel.com](https://vercel.com) -> Add New -> Project.
    - Import your `engisafe-web` repository.
3.  **Configure Environment Variables**:
    - In the "Environment Variables" section, add:
        - `DATABASE_URL`: (The pooled connection string from Neon)
        - `DIRECT_URL`: (The direct connection string from Neon)
    - **Note**: You might need `NEXT_PUBLIC_APP_URL` set to your production URL (e.g., `https://your-project.vercel.app`) once deployed.
4.  **Deploy**: Click "Deploy".

## Post-Deployment

- Vercel will automatically run `prisma generate` during the build (defined in `package.json` scripts).
- If your database is empty, your app might show empty states. Ensure you've run migrations or seeded data if necessary.
