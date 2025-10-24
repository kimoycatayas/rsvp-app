# Wedding RSVP App

A simple and beautiful wedding RSVP application built with Next.js, TypeScript, and Tailwind CSS. Deploy to Vercel with Vercel Postgres database.

## Features

- 🎉 Beautiful wedding-themed RSVP form
- 📊 Admin panel to view all RSVPs
- 📈 Statistics dashboard
- 💾 Vercel Postgres database integration
- 📱 Responsive design
- ✨ Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Vercel account (for deployment)

### Local Development

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   Create a `.env.local` file with your Vercel Postgres connection string:

```bash
POSTGRES_URL="your_postgres_connection_string"
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the RSVP form
5. Visit [http://localhost:3000/admin](http://localhost:3000/admin) to view the admin panel
6. Visit [http://localhost:3000/setup](http://localhost:3000/setup) to initialize the database

## Database Setup

### For Local Development

1. Create a Vercel Postgres database in your Vercel dashboard
2. Copy the connection string to your `.env.local` file
3. Run the SQL schema from `schema.sql` in your database

### For Production

The database will be automatically set up when you deploy to Vercel.

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
vercel
```

4. Set up environment variables in Vercel dashboard:
   - `POSTGRES_URL`: Your Vercel Postgres connection string

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect it's a Next.js app
4. Add your environment variables in the Vercel dashboard
5. Deploy!

## Database Schema

The app uses a simple `rsvps` table with the following structure:

```sql
CREATE TABLE rsvps (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  attendance VARCHAR(10) NOT NULL CHECK (attendance IN ('yes', 'no', 'maybe')),
  guest_count INTEGER NOT NULL DEFAULT 1,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

- `POST /api/rsvp` - Create a new RSVP
- `GET /api/rsvp` - Get all RSVPs
- `GET /api/rsvp/[id]` - Get a specific RSVP
- `PUT /api/rsvp/[id]` - Update an RSVP
- `DELETE /api/rsvp/[id]` - Delete an RSVP
- `GET /api/stats` - Get RSVP statistics

## Customization

### Wedding Details

Update the wedding information in `app/page.tsx`:

- Couple names
- Wedding date
- Venue location
- Contact email

### Styling

The app uses Tailwind CSS with a rose/pink color scheme. You can customize colors in the components or update the Tailwind configuration.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel Postgres
- **Icons**: Lucide React
- **Deployment**: Vercel

## Support

For questions or issues, please contact the development team or create an issue in the repository.
