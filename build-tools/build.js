#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

// Clean dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Files to copy
const filesToCopy = [
  'manifest.json',
  'frontend.html',
  'styles.css',
  'logo.png'
];

// Directories to copy
const dirsToCopy = ['src'];

// Copy files
filesToCopy.forEach(file => {
  const src = path.join(rootDir, file);
  const dest = path.join(distDir, file);
  
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${file}`);
  } else {
    console.warn(`⚠ Warning: ${file} not found`);
  }
});

// Copy directories recursively
dirsToCopy.forEach(dir => {
  const srcDir = path.join(rootDir, dir);
  const destDir = path.join(distDir, dir);
  
  if (fs.existsSync(srcDir)) {
    copyDir(srcDir, destDir);
    console.log(`✓ Copied ${dir}/`);
  } else {
    console.warn(`⚠ Warning: ${dir}/ not found`);
  }
});

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('\n🚀 Build completed successfully!');
console.log(`📁 Extension ready in: ${distDir}`);
console.log('💡 Load this folder as an unpacked extension in Chrome');