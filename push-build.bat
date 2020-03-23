set /p v="Enter version tag(*.*.*): v"
git commit -am v%v%
git tag v%v%
git push && git push --tags
pause