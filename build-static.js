
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

// Ensure dist directory exists
if (!existsSync('dist')) {
  mkdirSync('dist', { recursive: true });
}

// Build the frontend
console.log('Building frontend...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Static build complete! Files are in dist/public directory.');
