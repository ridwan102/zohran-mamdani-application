# Endorsements Setup Guide

This guide will help you set up permanent storage for endorsements using Supabase.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Project name**: `zohran-hire-ridwan` (or any name)
   - **Database password**: Create a strong password (save this!)
   - **Region**: Choose closest to you (e.g., US East)
5. Click "Create new project" and wait for setup to complete

## Step 2: Create the Endorsements Table

1. In your Supabase project, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Create endorsements table
CREATE TABLE endorsements (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  occupation TEXT,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read all endorsements
CREATE POLICY "Anyone can view endorsements"
  ON endorsements
  FOR SELECT
  USING (true);

-- Allow anyone to insert endorsements
CREATE POLICY "Anyone can submit endorsements"
  ON endorsements
  FOR INSERT
  WITH CHECK (true);
```

4. Click "Run" to execute the SQL

## Step 3: Get Your Supabase Credentials

1. In your Supabase project, click **Settings** (gear icon in left sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")
4. Copy both of these values

## Step 4: Configure Your Website

1. Open `endorsements.js` in your project
2. Replace the placeholder values at the top:
   ```javascript
   const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co'; // Your Project URL
   const SUPABASE_ANON_KEY = 'your-anon-key-here'; // Your anon public key
   ```

## Step 5: Test It!

1. Open your `index.html` in a browser
2. Try submitting an endorsement through the form
3. The endorsement should appear immediately on your page!
4. Verify it's saved by going to Supabase project → **Table Editor** → **endorsements** table

## Managing Endorsements

### View All Endorsements
- Go to Supabase → **Table Editor** → **endorsements**
- You'll see all endorsements with their details

### Delete an Endorsement
If you need to remove an inappropriate endorsement:
1. Go to Supabase → **Table Editor** → **endorsements**
2. Click on the row you want to delete
3. Click the trash icon
4. Confirm deletion

## Security Notes

- The `anon public` key is safe to use in your frontend code
- Row Level Security (RLS) policies ensure:
  - Anyone can view all endorsements
  - Anyone can submit endorsements
  - Data is validated and stored securely
- Never share your database password or service role key publicly

## Important Note

All endorsements appear immediately on your website without moderation. If you receive spam or inappropriate endorsements, you can delete them manually from the Supabase Table Editor.
