-- 1. Create Birds Table
CREATE TABLE IF NOT EXISTS public.birds (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    english_name TEXT NOT NULL,
    local_name TEXT,
    scientific_name TEXT,
    description TEXT,
    fun_fact TEXT,
    location TEXT,
    population_status TEXT,
    thumbnail TEXT,
    slug TEXT UNIQUE,
    tags TEXT[],
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0
);

-- 2. Create Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location_name TEXT,
    bird_species_spotted TEXT[],
    images JSONB DEFAULT '[]'::jsonb
);

-- 3. Enable RLS (Row Level Security)
ALTER TABLE public.birds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies (Public Read Access)
DROP POLICY IF EXISTS "Public birds are viewable by everyone" ON public.birds;
CREATE POLICY "Public birds are viewable by everyone" ON public.birds
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public events are viewable by everyone" ON public.events;
CREATE POLICY "Public events are viewable by everyone" ON public.events
    FOR SELECT USING (true);

-- 5. Create Policies (Admin Full Access)
DROP POLICY IF EXISTS "Enable all for everyone" ON public.birds;
CREATE POLICY "Enable all for everyone" ON public.birds FOR ALL USING (true);

DROP POLICY IF EXISTS "Enable all for everyone" ON public.events;
CREATE POLICY "Enable all for everyone" ON public.events FOR ALL USING (true);

-- 6. Storage Setup
-- IMPORTANT: You must first go to the "Storage" tab in the Supabase Dashboard
-- and create two public buckets named: birds and events

-- Allow Public Access to 'birds' and 'events' buckets
-- Note: RLS is usually enabled by default on storage via the UI.
CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT USING (bucket_id IN ('birds', 'events'));

CREATE POLICY "Public Upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id IN ('birds', 'events'));

CREATE POLICY "Public Update" ON storage.objects
    FOR UPDATE USING (bucket_id IN ('birds', 'events'));

CREATE POLICY "Public Delete" ON storage.objects
    FOR DELETE USING (bucket_id IN ('birds', 'events'));
