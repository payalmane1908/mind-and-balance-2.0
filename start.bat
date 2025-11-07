@echo off
echo ========================================
echo   Mental Wellbeing App - Starting...
echo ========================================
echo.

REM Kill any existing Node processes on ports 3000 and 5000
echo Checking for existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000"') do taskkill /F /PID %%a >nul 2>&1

echo.
echo Starting Backend Server...
cd /d "%~dp0backend"
start "Backend Server" cmd /k "set USE_IN_MEMORY_DB=true && set PORT=5000 && npm run dev"

echo Waiting for backend to start...
timeout /t 3 >nul

echo.
echo Starting Frontend Server...
cd /d "%~dp0frontend"
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Waiting for servers to start...
timeout /t 5 >nul

echo.
echo ========================================
echo   Servers are starting!
echo ========================================
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:3000
echo ========================================
echo.
echo Opening browser in 3 seconds...
timeout /t 3 >nul
start http://localhost:3000

echo.
echo Press any key to exit this window (servers will keep running)...
pause >nul

