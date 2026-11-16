@echo off
cd /d "%~dp0"
echo Starting Susee Agencies website...
echo.
echo If the browser does not open automatically, visit:
echo http://localhost:5173/
echo.
npm.cmd run dev -- --host 0.0.0.0 --port 5173
echo.
echo Server stopped. Press any key to close this window.
pause >nul

