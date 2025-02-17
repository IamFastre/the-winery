#!/bin/bash
source .scripts/init.sh

v=$1
m="VERSION $v"
release_type=
has_type=false
do_push=false

check_type() {
    if [ -z "$release_type" ]; then
        release_type=$1
    else
        end 1 "Release type already set to '$release_type' trying to set it to '$1'"
    fi
}

printf '•> Releasing version: %s' "$v"
printf '\n'

for p in "$@"; do
    if [ $p == '-p' ] && [ $do_push == false ]; then
        printf '•> Script will push directly'
        printf '\n'
        do_push=true

    elif [ $p == '-r' ]; then
        check_type $p
        printf '•> Version set to be a re-release'
        printf '\n'
        m="reVERSION $v"

    elif [ $p == '-b' ]; then
        check_type $p
        printf '•> Version set to be a beta'
        printf '\n'
        m="BETA $v"

    elif [ $p == '-f' ]; then
        check_type $p
        printf '•> Version set to be a hot fix'
        printf '\n'
        m="HOTFIX $v"
    fi
done

try
( npm version "$v" --no-git-tag-version > /dev/null 2>&1 || throw )

catch || end $EXIT_CODE "Provided version is invalid"

git add .
git commit -m "$m" > /dev/null

printf '•> Commit made'
printf '\n'

if [ $do_push == true ]; then
    try
    ( git push )
    catch  || end $EXIT_CODE "Could not push commit"
fi

end
