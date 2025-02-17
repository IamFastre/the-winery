#!/bin/bash
source .scripts/init.sh

printf '•> Getting types...'
printf '\n'

try
(
    supabase gen types --project-id $NEXT_PUBLIC_SUPABASE_ID > supabase/types.ts --lang=typescript || throw
)

catch || {
    end $EXIT_CODE "Supabase CLI exited with an error"
}

end
