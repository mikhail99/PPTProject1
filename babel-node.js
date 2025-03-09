// babel-node.js
// This file is a simple wrapper to run JSX files with Babel
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

// Require the file specified in the command line arguments
const scriptPath = process.argv[2];
if (!scriptPath) {
  console.error('Please specify a script to run');
  process.exit(1);
}

require(`./${scriptPath}`); 