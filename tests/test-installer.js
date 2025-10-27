const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { checksumFile } = require('../src/installer');

const tmpDir = os.tmpdir();
const testPath = path.join(tmpDir, 'tmm_test_file.txt');
fs.writeFileSync(testPath, 'hello test');

const expected = crypto.createHash('sha256').update('hello test').digest('hex');
const got = checksumFile(testPath);

console.log('checksum expected:', expected);
console.log('checksum got     :', got);
if (got === expected) console.log('TEST PASS');
else { console.error('TEST FAIL'); process.exit(1); }
