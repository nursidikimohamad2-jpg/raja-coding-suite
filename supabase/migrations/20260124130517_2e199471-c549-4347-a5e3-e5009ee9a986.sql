-- Add youtube_url column to homepage_content table
ALTER TABLE public.homepage_content 
ADD COLUMN IF NOT EXISTS youtube_url TEXT;