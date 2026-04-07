#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

function run(cmd, opts = {}) {
  console.log('>', cmd);
  return execSync(cmd, { stdio: 'inherit', ...opts });
}

try {
  // 1. Build the project
  // If DEPLOY_BASE is provided, use that as the build base. If a DEPLOY_CNAME is set (custom domain), build with base '/'.
  const deployBase = process.env.DEPLOY_BASE;
  const deployCnameEnv = process.env.DEPLOY_CNAME || process.env.GH_PAGES_CNAME;
  if (deployBase) {
    run(`npx vite build --base "${deployBase}"`);
  } else if (deployCnameEnv) {
    // For custom domains we want assets to be referenced from root
    run(`npx vite build --base "/"`);
  } else {
    run('npm run build');
  }

  const dist = path.join(process.cwd(), 'dist');

  // 2. Initialize git in dist (or reuse)
  run(`git -C "${dist}" init`);

  // 3. Ensure we're on gh-pages branch (create or reset)
  run(`git -C "${dist}" checkout -B gh-pages`);

  // 4. Add all files
  // If a custom domain is provided via env DEPLOY_CNAME, create CNAME file so GitHub Pages uses it
  const fs = require('fs');
  const cname = process.env.DEPLOY_CNAME || process.env.GH_PAGES_CNAME || 'www.kelderlandschap.nl';
  try {
    fs.writeFileSync(path.join(dist, 'CNAME'), cname + '\n', 'utf8');
    console.log('Wrote CNAME with domain:', cname);
  } catch (e) {
    console.warn('Could not write CNAME file:', e && e.message ? e.message : e);
  }

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
