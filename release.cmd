@echo off

@REM npm version %1 --no-git-tag-version
git add .
git commit -m "VERSION %1"
