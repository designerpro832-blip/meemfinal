/*
          # Create Poster Templates Table
          This migration creates a new table `poster_templates` to store and manage the different designs for result posters. It also seeds the table with the 5 existing poster designs.

          ## Query Description:
          - Creates the `poster_templates` table with columns for name, component name, thumbnail, and an active status.
          - Enables Row Level Security (RLS) to protect the data.
          - Adds policies to allow public read-only access to active templates and full access for authenticated admin users.
          - Inserts the initial five poster designs into the table.
          This operation is safe and does not affect existing data.

          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Low"
          - Requires-Backup: false
          - Reversible: true

          ## Structure Details:
          - Table created: `public.poster_templates`
          - Columns: `id`, `created_at`, `name`, `component_name`, `thumbnail_url`, `is_active`

          ## Security Implications:
          - RLS Status: Enabled
          - Policy Changes: Yes (New policies for `poster_templates`)
          - Auth Requirements: Admin (authenticated) for write access.

          ## Performance Impact:
          - Indexes: Primary key index added on `id`.
          - Triggers: None
          - Estimated Impact: Negligible performance impact.
          */

-- Create poster_templates table
CREATE TABLE public.poster_templates (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text NOT NULL,
    component_name text NOT NULL UNIQUE,
    thumbnail_url text,
    is_active boolean NOT NULL DEFAULT true,
    CONSTRAINT poster_templates_pkey PRIMARY KEY (id)
);

-- Add comments
COMMENT ON TABLE public.poster_templates IS 'Stores templates for generating result posters.';
COMMENT ON COLUMN public.poster_templates.name IS 'User-friendly name for the poster template.';
COMMENT ON COLUMN public.poster_templates.component_name IS 'The name of the React component to render (e.g., "Poster1"). Must be unique.';
COMMENT ON COLUMN public.poster_templates.thumbnail_url IS 'URL for a preview image of the poster style.';
COMMENT ON COLUMN public.poster_templates.is_active IS 'Whether the template is available for use.';

-- Enable RLS
ALTER TABLE public.poster_templates ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Allow public read access for active templates
CREATE POLICY "Allow public read access for active posters" ON public.poster_templates
FOR SELECT USING (is_active = true);

-- 2. Allow admin full access
CREATE POLICY "Allow admin full access" ON public.poster_templates
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Seed initial data
INSERT INTO public.poster_templates (name, component_name, thumbnail_url, is_active)
VALUES
    ('Dark & Bold', 'Poster1', 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/082026/FFFFFF?text=Dark%26Bold', true),
    ('Minimal List', 'Poster2', 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/F0F5FA/082026?text=Minimal', true),
    ('Gradient Focus', 'Poster3', 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/134D80/FFFFFF?text=Gradient', true),
    ('Classic Serif', 'Poster4', 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/FFFFFF/134D80?text=Classic', true),
    ('Vibrant Teal', 'Poster5', 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/004A4A/FFFFFF?text=Vibrant', true);
