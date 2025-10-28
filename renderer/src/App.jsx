import React, { useState } from 'react';

const TekkenApp = () => {
  const [sitesText, setSitesText] = useState('https://example.com/mods.json');
  const [mods, setMods] = useState([]);
  const [gamePath, setGamePath] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const sites = sitesText.split('\n').map(s => ({ url: s.trim(), type: 'auto' })).filter(s => s.url);
    const res = await window.api.loadMods(sites, { maxPerSite: 200 });
    setMods(Array.isArray(res) ? (res.flat ? res.flat() : res) : []);
    setLoading(false);
  };

  const chooseGame = async () => {
    const p = await window.api.chooseFolder();
    if (p) setGamePath(p);
  };

  const install = async (mod) => {
    if (!gamePath) { alert('Pick game folder first.'); return; }
    const r = await window.api.installMod(mod, gamePath, { createBackup: true });
    if (r.ok) alert('Installed'); else alert('Err: ' + r.error);
  };

  return (
    <div
      style={{
        padding: 20,
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <h2>Tekken Mod Manager</h2>
      <div>
        <button onClick={chooseGame}>Choose Game Folder</button>
        <span style={{ marginLeft: 10 }}>{gamePath}</span>
      </div>

      <div>
        <textarea value={sitesText} onChange={e => setSitesText(e.target.value)} rows={4} style={{ width: '100%' }} />
        <div style={{ marginTop: 6 }}>
          <button onClick={load} disabled={loading}>{loading ? 'Loading...' : 'Load Mods'}</button>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <h3>Mods</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            paddingRight: 4,
          }}
        >
          {mods.map((m, i) => (
            <div
              key={i}
              style={{
                border: '1px solid #ddd',
                padding: 10,
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <img src={m.thumbnail || ''} alt="thumb" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 4 }} />
              <h4 style={{ margin: 0, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{m.title}</h4>
              <p style={{ margin: 0, flex: 1, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{m.desc}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => install(m)}>Install</button>
                <a href={m.downloadUrl} target="_blank" rel="noreferrer">Open</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TekkenApp;
