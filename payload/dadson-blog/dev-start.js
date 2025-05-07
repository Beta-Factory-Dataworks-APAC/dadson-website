// Simple script to start PayloadCMS directly using ts-node
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Run ts-node directly on server.ts file
const tsNode = spawn('npx', ['ts-node', '--transpile-only', 'src/server.ts'], {
  cwd: __dirname,
  env: {
    ...process.env,
    PAYLOAD_CONFIG_PATH: 'src/payload.config.ts',
    NODE_ENV: 'development'
  },
  stdio: 'inherit'
});

tsNode.on('error', (error) => {
  console.error('Failed to start process:', error);
});

process.on('SIGINT', () => {
  tsNode.kill('SIGINT');
  process.exit(0);
});