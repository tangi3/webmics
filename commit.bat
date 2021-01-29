git add .
set /p commit="commit: "
git commit -m "%commit%"
git push -u origin master
