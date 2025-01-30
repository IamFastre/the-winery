@echo off

npm version %1 --no-git-tag-version && git add . && git commit -m "VERSION %1"

if "%~2"=="-p" (git push)

