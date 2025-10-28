// --- Globals --- 
const { Blob, File } = require('node:buffer');
global.File = File;
global.Blob = Blob;

const { fetch, FormData } = require('undici');
global.fetch = fetch;
global.FormData = FormData;

// --- Imports ---
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const DEFAULT_MODS_PATH = path.join(
  process.env.ProgramFiles || 'C:\\Program Files',
  '..', // up one; we will replace with SteamLibrary root below if config not set
);
const { parseGeneric } = require('./src/scraper.cjs');
const sites = require('./src/sites.cjs');
const AutoLaunch = require('auto-launch');
const tekkenLauncher = new AutoLaunch({
  name: 'Tekken Mod Manager',
  path: process.execPath
});

let mainWindow;

// --- Config stored in local ./config/config.json ---
const configPath = path.join(__dirname, 'config', 'config.json');

// --- Window Setup ---
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 820,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'home.html'));
}

// --- Mod fetching ---
async function loadAllMods() {
  let allMods = [];
  for (const site of sites) {
    for (const cat of site.categories) {
      try {
        const mods = await parseGeneric({ url: site.url + cat.path });
        mods.forEach(m => { m.category = cat.name; m.site = site.name; });
        allMods = allMods.concat(mods);
      } catch (e) {
        console.error(`Error fetching mods from ${site.name} / ${cat.name}:`, e.message);
      }
    }
  }
  return allMods;
}

// --- Config helpers ---
function getTekkenPath() {
  try {
    if (fs.existsSync(configPath)) {
      const data = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      return data.tekkenPath || null;
    }
  } catch (err) {
    console.error('Failed to read config:', err);
  }
  return null;
}

function saveTekkenPath(newPath) {
  try {
    fs.writeFileSync(configPath, JSON.stringify({ tekkenPath: newPath }, null, 2));
    console.log('Tekken path saved:', newPath);
  } catch (err) {
    console.error('Failed to save config:', err);
  }
}

function getConfigJSON() {
  try {
    const cfgPath = path.join(__dirname, 'config', 'config.json');
    if (fs.existsSync(cfgPath)) {
      return JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed reading config.json:', e);
  }
  return {};
}

function getModsRootPath() {
  const cfg = getConfigJSON();
  if (cfg.modsPath && fs.existsSync(cfg.modsPath)) return cfg.modsPath;

  // Fallback to default Tekken 8 Steam path:
  const fallback = path.join(
    process.env.STEAMLIBRARY || 'G:\\SteamLibrary',
    'steamapps', 'common', 'TEKKEN 8', 'Polaris', 'Content', 'Paks', 'mods'
  );
  return fallback;
}

// --- IPC HANDLERS ---
ipcMain.handle('get-sites', async () => sites.map(s => ({ name: s.name, categories: s.categories })));
ipcMain.handle('get-categories', () => sites.flatMap(site => site.categories.map(cat => ({ ...cat, site: site.url, siteName: site.name }))));
ipcMain.handle('fetch-mods', async (category) => {
  const site = sites.find(s => s.url === category.site);
  if (!site) return [];
  const mods = await parseGeneric({ url: site.url + category.path });
  mods.forEach(m => { m.category = category.name; m.site = site.name; });
  return mods;
});

ipcMain.handle('list-installed-mods', async () => {
  const modsDir = getModsRootPath();
  try {
    if (!fs.existsSync(modsDir)) {
      return { modsDir, items: [], error: `Mods directory not found: ${modsDir}` };
    }
    const entries = fs.readdirSync(modsDir, { withFileTypes: true });
    const folders = entries
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    return { modsDir, items: folders, error: null };
  } catch (err) {
    return { modsDir, items: [], error: err.message || String(err) };
  }
});

// --- Mods Folder Path ---
ipcMain.handle('choose-mods-folder', async () => {
  console.log('choose-mods-folder invoked');

  try {
    if (fs.existsSync(configPath)) {
      const cfg = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (cfg.modsPath && fs.existsSync(cfg.modsPath)) {
        console.log('Mods path already set:', cfg.modsPath);
        return null; // <-- signal renderer to open glass plate
      }
    }
  } catch (err) {
    console.error('Failed to read config for mods path:', err);
  }

  const result = await dialog.showOpenDialog({
    title: 'Select Mods Folder',
    properties: ['openDirectory']
  });

  if (result.canceled || !result.filePaths.length) {
    console.log('User canceled folder selection');
    return null;
  }

  const modsPath = result.filePaths[0];
  console.log('Selected folder:', modsPath);

  // --- Save to config.json ---
  try {
    let cfg = {};
    if (fs.existsSync(configPath)) cfg = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    cfg.modsPath = modsPath;
    fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2));
    console.log('Mods folder saved to config:', modsPath);
    } catch (err) {
      console.error('Failed to save mods path:', err)
    }

    return modsPath;
  });

// --- Tekken 8 Launch Handler ---
ipcMain.on('launch-game', async () => {
  let tekkenPath = getTekkenPath();

  if (!tekkenPath || !fs.existsSync(tekkenPath)) {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'Select Tekken8.exe',
      filters: [{ name: 'Tekken 8 Executable', extensions: ['exe'] }],
      properties: ['openFile']
    });

    if (canceled || !filePaths.length) {
      dialog.showErrorBox('Launch Cancelled', 'No game executable selected.');
      return;
    }

    tekkenPath = filePaths[0];
    saveTekkenPath(tekkenPath);
  }

  const gameDir = path.dirname(tekkenPath);
  console.log('--- Launch Debug Info ---');
  console.log('Executable path:', tekkenPath);
  console.log('Working directory:', gameDir);

  if (!fs.existsSync(tekkenPath)) {
    dialog.showErrorBox('Invalid Path', 'Tekken8.exe not found.');
    return;
  }

  try {
    const child = spawn(tekkenPath, [], { cwd: gameDir, detached: true, stdio: 'ignore' });
    child.unref();
    console.log('Tekken 8 launched successfully.');
  } catch (err) {
    console.error('Launch exception:', err);
    dialog.showErrorBox('Launch Exception', err.message);
  }
});

// --- SETTINGS: Startup Toggle Handlers ---
ipcMain.handle('get-startup-enabled', async () => {
  return await tekkenLauncher.isEnabled();
});

ipcMain.handle('set-startup-enabled', async (enable) => {
  if (enable) await tekkenLauncher.enable();
  else await tekkenLauncher.disable();
});

// --- lifecycle ---
app.whenReady().then(async () => {
  createWindow();
  const mods = await loadAllMods();
  console.log('All mods loaded:', mods.length);
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });