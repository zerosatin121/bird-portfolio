# Supabase Setup Guide: Bird Watching Portfolio

Follow these steps to set up a new Supabase project for your client.

## 1. Create a Supabase Project
1. Log in to [Supabase](https://supabase.com/).
2. Click **"New Project"**.
3. Set a **Project Name** and **Database Password** (Save this password safe!).
4. Choose a region close to your client and click **"Create New Project"**.

## 2. Initialize the Database
1. In the Supabase sidebar, go to **SQL Editor**.
2. Click **"New Query"**.
3. Copy the entire contents of the `supabase_setup.sql` file from the project root into the editor.
4. Click **"Run"**. This will create the `birds` and `events` tables and set up Row Level Security (RLS).

## 3. Configure Storage (Critical for Images)
1. In the sidebar, go to **Storage**.
2. Click **"New Bucket"**.
3. Create a bucket named **`birds`**. 
   - **IMPORTANT**: Toggle **"Public"** to **ON**.
4. Create another bucket named **`events`**.
   - **IMPORTANT**: Toggle **"Public"** to **ON**.
5. Go to **Storage -> Policies** in the sidebar.
6. Click **"New Policy"** -> **"For full customization"**. Use this SQL to allow the app to manage images:

```sql
-- Clean up old policies to avoid "already exists" errors
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;

-- Create correct policies for your buckets
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id IN ('birds', 'events'));
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('birds', 'events'));
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id IN ('birds', 'events'));
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id IN ('birds', 'events'));
```

## 4. Connect to the Frontend
1. Go to **Project Settings -> API**.
2. Copy the **Project URL** and the **`anon` public API Key**.
3. In your client's deployment environment (e.g., Vercel), add these Environment Variables:
   - `VITE_SUPABASE_URL`: (The Project URL you copied)
   - `VITE_SUPABASE_ANON_KEY`: (The `anon` public key you copied)
   - `VITE_ADMIN_PASSWORD`: (Set a password for the Admin Panel, e.g., `client123`)

## 5. Verification
1. Navigate to the `/admin` page of the deployed site.
2. Log in with the `VITE_ADMIN_PASSWORD`.
3. Try adding a bird and **uploading a local image**.
4. Confirm the bird appears in the **Gallery**.
