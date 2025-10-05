/*
# [Operation] Add Result Number Column
[Description of what this operation does]
This migration adds a new 'result_number' column to the 'results' table. This column will store an integer value representing a unique identifier or sequence for a specific result entry, which can be displayed on the frontend.

## Query Description: [Write a clear, informative message that:
1. Explains the impact on existing data
2. Highlights potential risks or safety concerns
3. Suggests precautions (e.g., backup recommendations)
4. Uses non-technical language when possible
5. Keeps it concise but comprehensive]
This operation adds a new 'result_number' column to your existing 'results' table. Existing rows will have a NULL value for this new column until they are updated. It is recommended to back up your 'results' table before applying this change. No data will be lost.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: true
- Reversible: true

## Structure Details:
- Table: public.results
- Column Added: result_number (INTEGER)

## Security Implications:
- RLS Status: Unchanged
- Policy Changes: No
- Auth Requirements: None

## Performance Impact:
- Indexes: None added
- Triggers: None added
- Estimated Impact: Low. Adding a column may cause a brief table lock.
*/

ALTER TABLE public.results
ADD COLUMN result_number INTEGER;
