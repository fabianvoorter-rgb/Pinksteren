#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

function run(cmd, opts = {}) {
  console.log('>', cmd);
  return execSync(cmd, { stdio: 'inherit', ...opts });
}

try {
  // 1. Build the project
  run('npm run build');

  const dist = path.join(process.cwd(), 'dist');

  // 2. Initialize git in dist (or reuse)
  run(`git -C "${dist}" init`);

  // 3. Ensure we're on gh-pages branch (create or reset)
  run(`git -C "${dist}" checkout -B gh-pages`);

  // 4. Add all files
  run(`git -C "${dist}" add -A`);

  // 5. Commit with timestamp; allow empty to ensure a commit always occurs which triggers GitHub Actions
  const message = `deploy: ${new Date().toISOString()}`;
  try {
    run(`git -C "${dist}" commit -m "${message}"`);
  } catch (err) {
    // If commit fails (e.g., nothing to commit), create an empty commit
    run(`git -C "${dist}" commit --allow-empty -m "${message}"`);
  }

  // 6. Add remote (overwrite if exists) and push
  // Note: replace the origin URL below if you want a different remote
  const remote = 'https://github.com/fabianvoorter-rgb/Pinksteren.git';
  try {
    run(`git -C "${dist}" remote remove origin`);
  } catch (e) {
    // ignore
  }
  run(`git -C "${dist}" remote add origin ${remote}`);
  run(`git -C "${dist}" push -f origin gh-pages`);

  console.log('Deploy finished.');
} catch (err) {
  console.error('Deploy failed:', err && err.message ? err.message : err);
  process.exit(1);
}
