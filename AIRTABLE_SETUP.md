# Airtable Setup Guide

## Step 1: Create an Airtable Account
1. Go to [airtable.com](https://airtable.com)
2. Sign up for a free account
3. Create a new "Base" (workspace)

## Step 2: Create Your Movies Table
1. In your base, create a new table called "Movies"
2. Add these columns:
   - **Name** (Single line text) - Movie title
   - **Genre** (Single line text) - Movie genre
   - **Year** (Number) - Release year
   - **Rating** (Number) - Your rating (1-10)
   - **Notes** (Long text) - Personal notes

## Step 3: Get Your Credentials

### Get Base ID:
1. Open your base in Airtable
2. Look at the URL: `https://airtable.com/app[BASE_ID]/...`
3. Copy the BASE_ID (starts with "app")

### Get Personal Access Token (PAT):
1. Go to [airtable.com/account/personal-access-tokens](https://airtable.com/account/personal-access-tokens)
2. Click "Create new token"
3. Name it "Movie List"
4. Under "Scopes", select:
   - `data.records:read`
   - `data.records:write`
   - `data.records:delete`
5. Under "Access", select your Movies base and table
6. Click "Create token" and copy it immediately (you won't see it again!)

## Step 4: Configure Your App
1. Copy `.env.local.example` to `.env.local`
2. Fill in your credentials:
   ```
   NEXT_PUBLIC_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   NEXT_PUBLIC_AIRTABLE_TABLE_NAME=Movies
   AIRTABLE_PAT=patXXXXXXXXXXXXXX
   ```

## Step 5: Run Your App
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and start adding movies!

## 📊 Viewing Your Data
You can always view and edit your movies directly in Airtable at [airtable.com](https://airtable.com)

## 🚀 Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repo
4. Add environment variables (same as `.env.local`):
   - `NEXT_PUBLIC_AIRTABLE_BASE_ID`
   - `NEXT_PUBLIC_AIRTABLE_TABLE_NAME`
   - `AIRTABLE_PAT`
5. Click "Deploy"

Your app is live! 🎬
