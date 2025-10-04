/*
          # [Operation Name]
          Fix Poster Template Permissions
          ## Query Description: "This operation resolves a 'column not found in schema cache' error by explicitly granting the necessary permissions on the `poster_templates` table. It ensures that both anonymous and authenticated users can read the table data, and that administrators (authenticated users) have full rights to insert, update, and delete poster templates. This is a non-destructive, safe operation required to fix the poster style editor's save functionality."
          ## Metadata:
          - Schema-Category: "Safe"
          - Impact-Level: "Low"
          - Requires-Backup: false
          - Reversible: true
          ## Structure Details:
          - Table `public.poster_templates`:
            - GRANT SELECT to `anon` and `authenticated` roles.
            - GRANT INSERT, UPDATE, DELETE to `authenticated` role.
          ## Security Implications:
          - RLS Status: No change. Policies remain in effect.
          - Policy Changes: No
          - Auth Requirements: Admin (authenticated role)
          ## Performance Impact:
          - Indexes: None
          - Triggers: None
          - Estimated Impact: None. This is a metadata change affecting permissions.
          */
-- Grant read access to everyone (RLS will still control which rows are visible)
GRANT SELECT ON TABLE public.poster_templates TO anon, authenticated;

-- Grant full modification access to admins (authenticated users)
GRANT INSERT, UPDATE, DELETE ON TABLE public.poster_templates TO authenticated;
