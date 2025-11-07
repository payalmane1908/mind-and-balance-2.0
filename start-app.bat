@echo off
echo Starting Mental Wellbeing App...
echo.
cd /d "D:\mental wellbeing\frontend"
echo Starting Next.js development server...
start cmd /k "npx next dev"
echo.
echo Server started! Please wait a moment...
echo.
echo The app will be available at: http://localhost:3000
echo.
timeout /t 5 > nul
start http://localhost:3000
echo Browser opened. Enjoy using the Mental Wellbeing App!