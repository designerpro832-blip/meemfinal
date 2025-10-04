/*
  # [Operation Name]
  Create site_settings table

  ## Query Description: [This operation creates a new table `site_settings` to store global configuration values like the site logo and title. It also sets up row-level security to allow public read access and authenticated write access.]
  
  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true
  
  ## Structure Details:
  - Table: `public.site_settings`
  - Columns: `key` (text, PK), `value` (text), `created_at` (timestamptz)
  
  ## Security Implications:
  - RLS Status: Enabled
  - Policy Changes: Yes (new policies for `site_settings`)
  - Auth Requirements: Authenticated users for write operations.
  
  ## Performance Impact:
  - Indexes: Primary Key on `key`
  - Triggers: None
  - Estimated Impact: Low
*/

-- Create the table
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add comments
COMMENT ON TABLE public.site_settings IS 'Stores global site settings as key-value pairs.';
COMMENT ON COLUMN public.site_settings.key IS 'The unique key for the setting (e.g., ''logo_url'').';
COMMENT ON COLUMN public.site_settings.value IS 'The value of the setting.';

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage settings" ON public.site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert default values
INSERT INTO public.site_settings (key, value) VALUES
('logo_url', 'https://d33wubrfki0l68.cloudfront.net/6688e43a37d2160008067949/logo.svg'),
('site_title', 'SSF Muhimmath')
ON CONFLICT (key) DO NOTHING;
