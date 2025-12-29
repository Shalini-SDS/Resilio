$ErrorActionPreference = "SilentlyContinue"

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Starting Resolio Backend & Frontend" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start backend
Write-Host "Starting backend on port 3001..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptDir\backend'; npm run dev" -WindowStyle Normal

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend
Write-Host "Starting frontend on port 5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptDir\frontend'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Both servers should now be running!" -ForegroundColor Yellow
Write-Host "Backend:  http://localhost:3001" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
