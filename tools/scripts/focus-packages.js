#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const workspaceRoot = path.resolve(__dirname, '..', '..');
const rawArgs = process.argv.slice(2);
const focusPackages = parseFocusPackages(rawArgs);

runFocusGenerator(rawArgs);
syncDemoModalFiles(focusPackages);

function runFocusGenerator(args) {
  const nxBin = path.join(workspaceRoot, 'node_modules', 'nx', 'bin', 'nx.js');
  const result = spawnSync(process.execPath, [nxBin, 'g', '@nativescript/plugin-tools:focus-packages', ...args], {
    cwd: workspaceRoot,
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(`Failed to run focus generator: ${result.error.message}`);
    process.exit(1);
  }

  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status);
  }
}

function parseFocusPackages(args) {
  return args
    .filter((arg) => !arg.startsWith('-'))
    .flatMap((arg) => arg.split(','))
    .map((arg) => arg.trim())
    .filter(Boolean)
    .map((arg) => (arg.startsWith('@nstudio/') ? arg.slice('@nstudio/'.length) : arg));
}

function syncDemoModalFiles(focusedPackages) {
  const modalRoot = path.join(workspaceRoot, 'apps', 'demo', 'src', 'modal');
  if (!fs.existsSync(modalRoot)) {
    return;
  }

  const ownersByModal = getModalOwnersByFile();
  addModalOwnerAlias(ownersByModal, 'coach-marks-frame', 'nativescript-coachmarks');

  const focusSet = new Set(focusedPackages);
  const files = fs.readdirSync(modalRoot);
  const updates = [];

  for (const entry of files) {
    const isOff = entry.endsWith('_off');
    const originalFile = isOff ? entry.slice(0, -4) : entry;
    const ext = path.extname(originalFile);

    if (ext !== '.ts' && ext !== '.xml') {
      continue;
    }

    const modalBaseName = path.basename(originalFile, ext);
    const packageOwners = resolveModalOwners(modalBaseName, ownersByModal);
    if (packageOwners.size === 0) {
      continue;
    }

    const shouldBeOn = focusSet.size === 0 || [...packageOwners].some((pkg) => focusSet.has(pkg));
    const nextFile = shouldBeOn ? originalFile : `${originalFile}_off`;
    if (entry === nextFile) {
      continue;
    }

    const fromPath = path.join(modalRoot, entry);
    const toPath = path.join(modalRoot, nextFile);

    if (fs.existsSync(toPath)) {
      console.warn(`Skipping modal rename because target already exists: ${path.relative(workspaceRoot, toPath)}`);
      continue;
    }

    fs.renameSync(fromPath, toPath);
    updates.push(`${entry} -> ${nextFile}`);
  }

  if (updates.length > 0) {
    console.log('\nAdjusted demo modal focus files:');
    for (const update of updates) {
      console.log(` - ${update}`);
    }
    console.log('');
  }
}

function getModalOwnersByFile() {
  const map = new Map();
  const demoToolsRoot = path.join(workspaceRoot, 'tools', 'demo');
  if (!fs.existsSync(demoToolsRoot)) {
    return map;
  }

  const packageDirs = fs.readdirSync(demoToolsRoot, { withFileTypes: true });
  for (const dir of packageDirs) {
    if (!dir.isDirectory() || !dir.name.startsWith('nativescript-')) {
      continue;
    }

    const packageName = dir.name;
    const indexFile = path.join(demoToolsRoot, packageName, 'index.ts');
    if (!fs.existsSync(indexFile)) {
      continue;
    }

    const source = fs.readFileSync(indexFile, 'utf8');
    const modalRefs = source.matchAll(/['"]~\/modal\/([^'"]+)['"]/g);

    for (const match of modalRefs) {
      const modalBaseName = match[1];
      addModalOwnerAlias(map, modalBaseName, packageName);
    }
  }

  return map;
}

function addModalOwnerAlias(map, modalBaseName, packageName) {
  if (!map.has(modalBaseName)) {
    map.set(modalBaseName, new Set());
  }
  map.get(modalBaseName).add(packageName);
}

function resolveModalOwners(modalBaseName, ownersByModal) {
  const directOwners = ownersByModal.get(modalBaseName);
  if (directOwners) {
    return directOwners;
  }

  const owners = new Set();
  for (const [mappedBaseName, mappedOwners] of ownersByModal.entries()) {
    if (modalBaseName.startsWith(`${mappedBaseName}-`) || mappedBaseName.startsWith(`${modalBaseName}-`)) {
      for (const owner of mappedOwners) {
        owners.add(owner);
      }
    }
  }

  return owners;
}
