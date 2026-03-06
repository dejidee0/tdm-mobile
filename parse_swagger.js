const fs = require('fs');

const swagger = JSON.parse(fs.readFileSync('swagger.json', 'utf8'));
const paths = swagger.paths;

const endpoints = [];

for (const [path, methods] of Object.entries(paths)) {
  for (const [method, details] of Object.entries(methods)) {
    endpoints.push(`${method.toUpperCase()} ${path} - ${details.tags ? details.tags.join(', ') : ''} - ${details.summary || ''}`);
  }
}

fs.writeFileSync('endpoints.txt', endpoints.join('\n'));
console.log('Done mapping', endpoints.length, 'endpoints');
