@echo off
title Resolio - Frontend & Backend

echo ==========================================
echo Starting Resolio Backend & Frontend
echo ==========================================

REM Start backend in new window
echo Starting backend on port 3001...
start "Resolio Backend" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Start frontend in new window
echo Starting frontend on port 5173...
start "Resolio Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo Both servers should now be running!
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:5173
echo ==========================================
echo.
pause
