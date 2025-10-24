# Deployment Guide

## Quick Deploy to Vercel

### Step 1: Prepare Your Code

1. Make sure all your code is committed to Git
2. Push to GitHub (if not already done)

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js app

### Step 3: Set Up Database

1. In your Vercel dashboard, go to the "Storage" tab
2. Click "Create Database" → "Postgres"
3. Choose a name for your database
4. Copy the connection string

### Step 4: Configure Environment Variables

1. In your Vercel project dashboard, go to "Settings" → "Environment Variables"
2. Add the following variable:
   - **Name**: `POSTGRES_URL`
   - **Value**: Your Postgres connection string from Step 3

### Step 5: Set Up Database Schema

1. In your Vercel dashboard, go to your database
2. Click on the "Query" tab
3. Run the SQL from `schema.sql` to create the tables:

```sql
-- Create the rsvps table
CREATE TABLE IF NOT EXISTS rsvps (
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

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_rsvps_email ON rsvps(email);

-- Create an index on attendance for filtering
CREATE INDEX IF NOT EXISTS idx_rsvps_attendance ON rsvps(attendance);
```

### Step 6: Deploy

1. Click "Deploy" in your Vercel dashboard
2. Wait for the deployment to complete
3. Your app will be live at `https://your-app-name.vercel.app`

## Testing Your Deployment

### Test the RSVP Form

1. Visit your deployed URL
2. Fill out the RSVP form
3. Submit and verify you get a success message

### Test the Admin Panel

1. Visit `https://your-app-name.vercel.app/admin`
2. You should see the admin dashboard with your test RSVP

## Customization

### Update Wedding Details

Edit `app/page.tsx` to change:

- Couple names
- Wedding date
- Venue location
- Contact email

### Customize Styling

The app uses Tailwind CSS with a rose/pink theme. You can modify colors in the components.

## Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Make sure `POSTGRES_URL` is set correctly
   - Verify the database schema is created

2. **Build Errors**

   - Check that all dependencies are installed
   - Verify TypeScript types are correct

3. **API Errors**
   - Check the Vercel function logs
   - Verify database permissions

### Getting Help

- Check the Vercel documentation
- Review the Next.js deployment guide
- Check the app logs in Vercel dashboard
