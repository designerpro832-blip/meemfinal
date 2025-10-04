/*
# [Schema Update] Add 'styles' column to poster_templates

This migration adds the `styles` column to the `public.poster_templates` table. This column is essential for storing the JSON-based styling information for each poster design, allowing for dynamic and customizable poster generation.

## Query Description:
- **Operation**: Adds a new `styles` column of type `jsonb` to the `poster_templates` table.
- **Impact**: This is a non-destructive operation. No existing data will be lost. Existing rows will have a `NULL` value for the new `styles` column until they are updated.
- **Safety**: This operation is safe to run on a production database.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (The column can be dropped if necessary)

## Structure Details:
- Table Affected: `public.poster_templates`
- Column Added: `styles`
- Column Type: `jsonb`

## Security Implications:
- RLS Status: Unchanged. RLS policies on the table are not affected.
- Policy Changes: No.
- Auth Requirements: Requires permissions to alter tables in the `public` schema.

## Performance Impact:
- Indexes: None added by this migration.
- Triggers: None added.
- Estimated Impact: Negligible. Adding a column with `NULL` values is a fast metadata-only change.
*/

ALTER TABLE public.poster_templates
ADD COLUMN IF NOT EXISTS styles jsonb;
