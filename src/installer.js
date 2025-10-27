const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

const TMP_DIR = path.join(require('os').tmpdir(), 'tekken-mod-manager');
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

async function downloadFile(urlToDownload, targetPath) {
  const writer = fs.createWriteStream(targetPath);
  const resp = await axios({ url: urlToDownload, method: 'GET', responseType: 'stream', timeout: 30000 });
  return new Promise((resolve, reject) => {
    resp.data.pipe(writer);
    let err = null;
    writer.on('error', e => { err = e; writer.close(); reject(e); });
    writer.on('close', () => { if (!err) resolve(); });
  });
}

function checksumFile(filePath) {
  const s = crypto.createHash('sha256');
  const data = fs.readFileSync(filePath);
  s.update(data);
  return s.digest('hex');
}

async function downloadAndInstallMod(modEntry, gamePath, opts = {}) {
  if (!modEntry.downloadUrl) throw new Error('no download url');
  const fileName = path.basename(new URL(modEntry.downloadUrl).pathname);
  const tmpFile = path.join(TMP_DIR, Date.now() + '_' + fileName);
  await downloadFile(modEntry.downloadUrl, tmpFile);
  const checksum = checksumFile(tmpFile);

  const backupsDir = path.join
