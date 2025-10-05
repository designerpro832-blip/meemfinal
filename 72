/*
          # [Operation Name]
          Enable Custom Poster Backgrounds
          ## Query Description: "This operation prepares the database for a major new feature allowing admins to upload custom background images for result posters. It creates a dedicated, public storage bucket named `poster_backgrounds` for these images. The `poster_templates` table is extended with a `background_url` column to store the image path and an `is_custom` flag to differentiate between system templates and user-uploaded ones. Finally, it sets up security policies to ensure only authenticated admin users can upload or delete these background images, safeguarding the system while enabling the new functionality. This is a structural change with no risk to existing data."
          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Medium"
          - Requires-Backup: false
          - Reversible: true
          ## Structure Details:
          - Storage Bucket: `poster_backgrounds` (created)
          - Table `poster_templates`:
            - ADD COLUMN `background_url` (type: TEXT)
            - ADD COLUMN `is_custom` (type: BOOLEAN, default: false)
          - RLS Policies:
            - New policies on `storage.objects` for `poster_backgrounds` bucket to allow insert/delete for authenticated users.
          ## Security Implications:
          - RLS Status: Enabled on new policies.
          - Policy Changes: Yes (new policies for storage).
          - Auth Requirements: Admin role (authenticated) for uploads/deletes.
          ## Performance Impact:
          - Indexes: None
          - Triggers: None
          - Estimated Impact: Low. Adds new columns and storage policies.
          */

-- 1. Create a new storage bucket for custom poster backgrounds
INSERT INTO storage.buckets (id, name, public)
VALUES ('poster_backgrounds', 'poster_backgrounds', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Add columns to the poster_templates table
ALTER TABLE "public"."poster_templates"
ADD COLUMN IF NOT EXISTS background_url TEXT,
ADD COLUMN IF NOT EXISTS is_custom BOOLEAN DEFAULT FALSE;

-- 3. Set RLS policies for the new bucket
-- Allow authenticated users (admins) to upload files to the 'poster_backgrounds' bucket
CREATE POLICY "Allow admin uploads to poster_backgrounds"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'poster_backgrounds');

-- Allow authenticated users (admins) to update their own files
CREATE POLICY "Allow admin updates to poster_backgrounds"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'poster_backgrounds');

-- Allow authenticated users (admins) to delete their own files
CREATE POLICY "Allow admin deletes from poster_backgrounds"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'poster_backgrounds');
