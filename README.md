# 🎬 Movie List - Vercel App

A beautiful Next.js app to track movies you own with Airtable as your database.

## ✨ Features

- ✅ Add movies with name, genre, release year, rating, and notes
- ✅ Search movies by name or genre in real-time
- ✅ Beautiful gradient UI with responsive design
- ✅ Delete movies from collection
- ✅ View collection statistics
- ✅ Airtable integration for persistent data
- ✅ Deploy to Vercel in seconds

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Airtable account (free)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MaceeW/Movie-List-.git
   cd Movie-List-
   ```

2. **Follow the Airtable setup guide**
   See `AIRTABLE_SETUP.md` for detailed instructions on:
   - Creating an Airtable base and table
   - Getting your Personal Access Token (PAT)
   - Configuring environment variables

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create `.env.local` file**
   ```
   NEXT_PUBLIC_AIRTABLE_BASE_ID=your_base_id
   NEXT_PUBLIC_AIRTABLE_TABLE_NAME=Movies
   AIRTABLE_PAT=your_personal_access_token
   ```

5. **Run locally**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

## 📦 Project Structure

```
app/                   - Next.js pages and API routes
├── layout.tsx        - Root layout
├── page.tsx          - Main page
├── globals.css       - Global styles
└── api/movies/       - Movie API endpoints

components/           - React components
├── MovieForm.tsx     - Add movie form
└── MovieList.tsx     - Display movies

lib/                  - Utilities
└── airtable.ts       - Airtable integration

types/                - TypeScript interfaces
└── movie.ts          - Movie type definitions
```

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repo
4. Add environment variables:
   - `NEXT_PUBLIC_AIRTABLE_BASE_ID`
   - `NEXT_PUBLIC_AIRTABLE_TABLE_NAME`
   - `AIRTABLE_PAT`
5. Click "Deploy"

Your app is live! 🎉

## 📊 Database

All data is stored in Airtable. You can:
- View and edit movies directly in Airtable
- Share your base with others
- Create advanced filters and views

## 🔧 Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Airtable API** - Database
- **CSS Modules** - Styling

## 📝 License

MIT
