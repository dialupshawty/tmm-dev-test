const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { checksumFile } = require('../src/installer');

const tmpDir = os.tmpdir();
const testPath = path.join(tmpDir, 'tmm_test_file_2.txt');
fs.writeFileSync(testPath, 'another test string');

const expected = crypto.createHash('sha256').update('another test string').digest('hex');
const got = checksumFile(testPath);

console.log('checksum expected:', expected);
console.log('checksum got     :', got);
if (got === expected) console.log('TEST PASS 2');
else { console.error('TEST FAIL 2'); process.exit(1); }
