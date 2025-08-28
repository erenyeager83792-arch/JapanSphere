
import { execSync } from 'child_process';
import { existsSync, mkdirSync, cpSync } from 'fs';

// Ensure dist directory exists
if (!existsSync('dist')) {
  mkdirSync('dist', { recursive: true });
}

// Build the frontend using Vite
console.log('Building frontend with Vite...');
execSync('npx vite build --outDir dist', { stdio: 'inherit' });

console.log('Static build complete! Files are in dist directory.');
