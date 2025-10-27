const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  chooseModsFolder: () => ipcRenderer.invoke('choose-mods-folder'),
  loadMods: (sites, opts) => ipcRenderer.invoke('load-mods', sites, opts),
  installMod: (modEntry, gamePath, opts) => ipcRenderer.invoke('install-mod', modEntry, gamePath, opts),
  chooseFolder: () => ipcRenderer.invoke('choose-folder'),
  listBackups: () => ipcRenderer.invoke('list-backups'),

  // New API for your Home HTML
  launchGame: () => ipcRenderer.send('launch-game'),
  getStartupEnabled: () => ipcRenderer.invoke('get-startup-enabled'),
  setStartupEnabled: (enabled) => ipcRenderer.send('set-startup-enabled', enabled)
});
