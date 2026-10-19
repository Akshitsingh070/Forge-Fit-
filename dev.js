import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('⚡ Starting ForgeFit AI Full Stack Environment (Backend + Frontend)...');

// 1. Start Backend
const backendProcess = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: isWindows,
});

backendProcess.on('error', (err) => {
  console.error('[Backend Error]', err);
});

// 2. Start Frontend
const frontendProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: isWindows,
});

frontendProcess.on('error', (err) => {
  console.error('[Frontend Error]', err);
});

// Handle termination signals
const cleanup = () => {
  console.log('\n🛑 Shutting down ForgeFit AI services...');
  try {
    if (backendProcess.pid) process.kill(backendProcess.pid);
  } catch (e) {}
  try {
    if (frontendProcess.pid) process.kill(frontendProcess.pid);
  } catch (e) {}
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
