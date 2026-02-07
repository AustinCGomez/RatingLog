#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const packageDir = path.join(rootDir, 'package');

// Clean package directory
if (fs.existsSync(packageDir)) {
  fs.rmSync(packageDir, { recursive: true });
}

// Copy dist to package
fs.cpSync(distDir, packageDir, { recursive: true });

// Create ZIP file
const output = fs.createWriteStream(path.join(rootDir, 'timebox-extension.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`✅ Extension packaged successfully!`);
  console.log(`📦 Package size: ${archive.pointer()} bytes`);
  console.log(`📁 ZIP file: timebox-extension.zip`);
  
  // Clean up package directory
  fs.rmSync(packageDir, { recursive: true });
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(packageDir, false);
archive.finalize();