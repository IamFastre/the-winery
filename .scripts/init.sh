#!/bin/bash

GREEN='\u001b[38;2;30;215;96m'
PURPLE='\u001b[38;2;132;0;255m'
RED='\u001b[38;2;215;30;30m'
GRAY='\u001b[38;2;102;102;102m'
RESET='\u001b[0m'

try() {
    [[ $- = *e* ]]; SAVED_OPT_E=$?
    set +e
}

throw() {
    exit $1
}

catch() {
    export EXIT_CODE=$?
    (( $SAVED_OPT_E )) && set +e
    return $EXIT_CODE
}

throwErrors() {
    set -e
}

ignoreErrors() {
    set +e
}

C() {
    printf '%b' "$1"
}

end() {
    printf '\n'
    if [ -z "$1" ] || [ "$1" -eq 0 ]; then
        C $GREEN
        printf '•> Success!'
    else
        C $RED
        printf '•> Error.'
        C $GRAY
        printf '\n'
        if [ -n "$2" ]; then
            printf '   %s' "$2"
            printf '\n'
        fi
        printf '   CODE: %s' "$1"
    fi

    C $RESET
    printf '\n\n'
    exit $1
}

C $GREEN
printf '•-{ '
C $PURPLE
printf 'The Winery'
C $GREEN
printf ' }-•'
C $GRAY
printf '\n\n'

printf '•> Starting...'
printf '\n\n'
source .env.local
