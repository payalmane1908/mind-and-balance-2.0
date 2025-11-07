# Mental Wellbeing App Startup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Mental Wellbeing App - Starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kill existing processes on ports 3001 and 5002
Write-Host "Checking for existing processes..." -ForegroundColor Yellow
$port5002 = Get-NetTCPConnection -LocalPort 5002 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
$port3001 = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess

if ($port5002) {
    Write-Host "Stopping process on port 5002..." -ForegroundColor Yellow
    Stop-Process -Id $port5002 -Force -ErrorAction SilentlyContinue
}

if ($port3001) {
    Write-Host "Stopping process on port 3001..." -ForegroundColor Yellow
    Stop-Process -Id $port3001 -Force -ErrorAction SilentlyContinue
}

Start-Sleep -Seconds 1

Write-Host ""
Write-Host "Installing Backend Dependencies..." -ForegroundColor Green
$backendPath = Join-Path $PSScriptRoot "backend"
cd $backendPath
npm install

Write-Host ""
Write-Host "Installing Frontend Dependencies..." -ForegroundColor Green
$frontendPath = Join-Path $PSScriptRoot "frontend"
cd $frontendPath
npm install

cd $PSScriptRoot

Write-Host ""
Write-Host "Starting Backend Server..." -ForegroundColor Green
$backendPath = Join-Path $PSScriptRoot "backend"
$env:USE_IN_MEMORY_DB = "true"
$env:PORT = "5002"
Start-Job -ScriptBlock { param($path) cd $path; $env:USE_IN_MEMORY_DB="true"; $env:PORT="5002"; npm run dev } -ArgumentList $backendPath

Write-Host "Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "Starting Frontend Server..." -ForegroundColor Green
$frontendPath = Join-Path $PSScriptRoot "frontend"
Start-Job -ScriptBlock { param($path) cd $path; npm run dev -- -p 3001 } -ArgumentList $frontendPath

Write-Host ""
Write-Host "Waiting for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Servers are starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Backend:  http://localhost:5002" -ForegroundColor White
Write-Host "  Frontend: http://localhost:3001" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening browser in 3 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
Start-Process "http://localhost:3001"

Write-Host ""
Write-Host "Servers are running in the background." -ForegroundColor Green
Write-Host "Use 'Get-Job' to see the status of the servers." -ForegroundColor Yellow
Write-Host "Use 'Stop-Job' to stop the servers." -ForegroundColor Yellow

