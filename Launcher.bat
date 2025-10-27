@echo off
REM --- Tekken Mod Manager Quick Launch Script ---

REM Change directory to the folder where your app is located
cd /d "%~dp0"

REM Optional: Install node_modules if not already done (comment out if already installed)
REM npm install

REM Run the app using Electron
npx electron .

pause
