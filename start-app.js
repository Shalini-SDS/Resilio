const { spawn } = require('child_process');
const path = require('path');
const chalk = require('chalk');

const backendPath = path.join(__dirname, 'backend');
const frontendPath = path.join(__dirname, 'frontend');

console.log(chalk.cyan('=========================================='));
console.log(chalk.cyan('Starting Resolio Backend & Frontend'));
console.log(chalk.cyan('=========================================='));
console.log('');

let backendStarted = false;
let frontendStarted = false;

const backend = spawn('npm', ['run', 'dev'], {
  cwd: backendPath,
  stdio: 'inherit',
  shell: true
});

backend.on('error', (err) => {
  console.error(chalk.red('Backend Error:'), err.message);
  process.exit(1);
});

setTimeout(() => {
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: frontendPath,
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (err) => {
    console.error(chalk.red('Frontend Error:'), err.message);
    process.exit(1);
  });
}, 2000);

console.log(chalk.green('Starting backend on port 3001...'));
setTimeout(() => {
  console.log(chalk.green('Starting frontend on port 5173...'));
  console.log('');
  console.log(chalk.yellow('=========================================='));
  console.log(chalk.yellow('Both servers should now be running!'));
  console.log(chalk.yellow('Backend:  http://localhost:3001'));
  console.log(chalk.yellow('Frontend: http://localhost:5173'));
  console.log(chalk.yellow('=========================================='));
}, 3000);

process.on('SIGINT', () => {
  console.log(chalk.red('\nShutting down...'));
  backend.kill();
  process.exit(0);
});
