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
CREATE POLICY "Public birds are viewable by everyone" ON public.birds
    FOR SELECT USING (true);

CREATE POLICY "Public events are viewable by everyone" ON public.events
    FOR SELECT USING (true);

-- 5. Create Policies (Admin Full Access - Using Service Role or simple true for this demo)
-- NOTE: In a production app, you'd restrict this to authenticated users.
-- For now, we will allow all operations to simplify your local testing.
CREATE POLICY "Enable all for everyone" ON public.birds FOR ALL USING (true);
CREATE POLICY "Enable all for everyone" ON public.events FOR ALL USING (true);

-- 6. Storage Setup
-- Run these in your Supabase Dashboard under "Storage"
-- Create two public buckets: "birds" and "events"
