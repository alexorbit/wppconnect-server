#!/usr/bin/env node

/*
 * This script ensures the optional sharp dependencies are installed when the
 * current platform requires them (e.g. Render's Alpine-based environment).
 */

const { execSync } = require('node:child_process');

function hasSharp() {
  try {
    require.resolve('sharp');
    return true;
  } catch (error) {
    return false;
  }
}

if (hasSharp()) {
  console.log(
    '[install-sharp] sharp already available, skipping optional install.'
  );
  process.exit(0);
}

console.log(
  '[install-sharp] Attempting to install optional sharp dependencies for this platform...'
);

try {
  execSync('npm install --include=optional --no-save sharp', {
    stdio: 'inherit',
    env: {
      ...process.env,
      npm_config_update_notifier: 'false',
    },
  });
  console.log('[install-sharp] Optional sharp dependencies installed.');
} catch (error) {
  console.warn(
    '[install-sharp] Failed to install optional sharp dependencies automatically.'
  );
  console.warn(
    '[install-sharp] Please install them manually if sharp is required.'
  );
}
