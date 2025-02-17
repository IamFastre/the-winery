#!/bin/bash
source .scripts/init.sh

v=$1
m="VERSION $v"
release_type=''
do_push=false

check_type() {
    if [ -z "$release_type" ]; then
        release_type=$1
    else
        end 1 "Release type already set to '$release_type' trying to set it to '$1'"
    fi
}

println "Releasing version: $v"

for p in "$@"; do
    if [ $p == '-p' ] && [ $do_push == false ]; then
        println 'Script will push directly'
        do_push=true

    elif [ $p == '-r' ]; then
        check_type $p
        println 'Version set to be a re-release'
        m="reVERSION $v"

    elif [ $p == '-b' ]; then
        check_type $p
        println 'Version set to be a beta'
        m="BETA $v"

    elif [ $p == '-f' ]; then
        check_type $p
        println 'Version set to be a hot fix'
        m="HOTFIX $v"
    fi
done

try
( npm version "$v" --no-git-tag-version > /dev/null 2>&1 || throw )

catch || end $EXIT_CODE 'Provided version is invalid'

git add .
git commit -m "$m" > /dev/null

println 'Commit made'

if [ $do_push == true ]; then
    try
    (
        git push > /dev/null 2>&1
        println 'Commit pushed'
    )
    catch  || end $EXIT_CODE 'Could not push commit'
fi

end
