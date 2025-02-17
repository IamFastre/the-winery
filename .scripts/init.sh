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

println() {
    if [ "$2" == "!" ]; then
        printf '%b' "$1"
    elif [ "$1" != "!" ]; then
        printf '•> %b' "$1"
    fi
    printf '\n'
}

C() {
    printf '%b' "$1"
}

end() {
    println !
    if [ -z "$1" ] || [ "$1" -eq 0 ]; then
        C $GREEN
        println 'Success!'
    else
        C $RED
        println 'Error.'
        C $GRAY
        if [ -n "$2" ]; then
            println "   $2" !
        fi
        println "   CODE: $1" !
    fi

    C $RESET
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

println 'Starting...'
println !
source .env.local
