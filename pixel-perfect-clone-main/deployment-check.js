#!/usr/bin/env node

/**
 * Production Deployment Checklist
 * Run this script to verify everything is ready for production
 * 
 * Usage: node deployment-check.js
 */

const fs = require('fs');
const path = require('path');

const checks = {
  files: [
    { path: 'package.json', required: true, name: 'Package configuration' },
    { path: 'vite.config.ts', required: true, name: 'Vite configuration' },
    { path: 'vercel.json', required: true, name: 'Vercel deployment config' },
    { path: '.env.example', required: true, name: 'Environment template' },
    { path: '.gitignore', required: true, name: 'Git ignore rules' },
    { path: '.npmrc', required: true, name: 'NPM configuration' },
    { path: 'README.md', required: true, name: 'README documentation' },
    { path: 'DEPLOYMENT.md', required: true, name: 'Deployment guide' },
    { path: 'OPTIMIZATION.md', required: true, name: 'Optimization checklist' },
    { path: 'PRODUCTION_READY.md', required: true, name: 'Production summary' },
    { path: 'CONTRIBUTING.md', required: true, name: 'Contributing guide' },
    { path: '.github/workflows/ci-cd.yml', required: true, name: 'CI/CD pipeline' },
    { path: '.github/pull_request_template.md', required: true, name: 'PR template' },
    { path: '.github/ISSUE_TEMPLATE/bug_report.md', required: true, name: 'Bug template' },
    { path: '.github/ISSUE_TEMPLATE/feature_request.md', required: true, name: 'Feature template' },
    { path: 'src/styles.css', required: true, name: 'CSS configuration' },
    { path: 'vite.config.ts', required: true, name: 'Build configuration' },
  ],
  scripts: [
    { name: 'dev', cmd: 'npm run dev' },
    { name: 'build', cmd: 'npm run build' },
    { name: 'preview', cmd: 'npm run preview' },
    { name: 'lint', cmd: 'npm run lint' },
    { name: 'format', cmd: 'npm run format' },
  ],
};

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, name) {
  const fullPath = path.join(process.cwd(), filePath);
  const exists = fs.existsSync(fullPath);
  const status = exists ? '✓' : '✗';
  const statusColor = exists ? 'green' : 'red';
  
  log(`  ${status} ${name} (${filePath})`, statusColor);
  return exists;
}

function checkPackageScripts(packageJson) {
  const scripts = packageJson.scripts || {};
  let allValid = true;
  
  checks.scripts.forEach(({ name }) => {
    const hasScript = name in scripts;
    const status = hasScript ? '✓' : '✗';
    const statusColor = hasScript ? 'green' : 'red';
    
    log(`  ${status} Script: npm run ${name}`, statusColor);
    if (!hasScript) allValid = false;
  });
  
  return allValid;
}

function main() {
  log('\n🚀 Production Deployment Checklist\n', 'cyan');
  
  let allPassed = true;
  
  // Check required files
  log('📁 Checking Required Files:', 'blue');
  const filesCheckResults = checks.files.map(({ path: filePath, name }) => 
    checkFile(filePath, name)
  );
  const filesOk = filesCheckResults.every(r => r);
  
  if (!filesOk) allPassed = false;
  log(`\n${filesOk ? '✓' : '✗'} All required files present`, filesOk ? 'green' : 'red');
  
  // Check package.json scripts
  log('\n📋 Checking NPM Scripts:', 'blue');
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    const scriptsOk = checkPackageScripts(packageJson);
    if (!scriptsOk) allPassed = false;
    log(`\n${scriptsOk ? '✓' : '✗'} All required scripts present`, scriptsOk ? 'green' : 'red');
  } catch (error) {
    log('\n✗ Error reading package.json', 'red');
    allPassed = false;
  }
  
  // Check .gitignore for sensitive files
  log('\n🔐 Checking Security (Git Ignore):', 'blue');
  try {
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    const gitignore = fs.readFileSync(gitignorePath, 'utf8');
    
    const checks_security = [
      { pattern: '*.local', name: '.env.local files' },
      { pattern: 'node_modules', name: 'node_modules' },
      { pattern: 'dist', name: 'dist folder' },
      { pattern: '.wrangler', name: '.wrangler folder' },
    ];
    
    let securityOk = true;
    checks_security.forEach(({ pattern, name }) => {
      const included = gitignore.includes(pattern);
      const status = included ? '✓' : '✗';
      const statusColor = included ? 'green' : 'red';
      log(`  ${status} Ignoring ${name}`, statusColor);
      if (!included) securityOk = false;
    });
    
    if (!securityOk) allPassed = false;
  } catch (error) {
    log('  ✗ Error reading .gitignore', 'red');
    allPassed = false;
  }
  
  // Final verdict
  log('\n' + '='.repeat(50), 'cyan');
  if (allPassed) {
    log('✓ All checks passed! Ready for production.', 'green');
    log('\nNext steps:', 'cyan');
    log('  1. npm run build          # Build for production', 'yellow');
    log('  2. npm run preview        # Test production build', 'yellow');
    log('  3. git push origin main   # Push to GitHub', 'yellow');
    log('  4. Verify Vercel deployment', 'yellow');
  } else {
    log('✗ Some checks failed. Please fix the issues above.', 'red');
    process.exit(1);
  }
  log('='.repeat(50), 'cyan');
  log('\nFor more details, see PRODUCTION_READY.md\n', 'blue');
}

main();
