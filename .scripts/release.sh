#!/bin/bash
source .scripts/init.sh

v=$1
do_push=false

printf '•> Releasing version: %s' "$v"
printf '\n'

for p in "$@"; do
    if [ $p == '-p' ] && [ $do_push == false ]; then
        printf '•> Script will push directly'
        printf '\n'
        do_push=true
    fi
done

try
( npm version $v --no-git-tag-version > /dev/null 2>&1 || throw )

catch || end $EXIT_CODE "Provided version is invalid"

git add .
git commit -m "VERSION $v" > /dev/null

printf '•> Commit made'
printf '\n'

if [ $do_push == true ]; then
    try
    ( git push )
    catch  || end $EXIT_CODE "Could not push commit"
fi

end
