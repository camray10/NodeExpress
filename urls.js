const fs = require('fs');
const http = require('http');
const https = require('https');

const FILE_NAME = process.argv[2];

if (!FILE_NAME) {
  console.error('Please provide the filename');
  process.exit(1);
}

fs.readFile(FILE_NAME, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file ${FILE_NAME}: ${err.message}`);
    process.exit(1);
  }

  const urls = data.split('\n').filter(Boolean);

  urls.forEach((url) => {
    const urlParts = new URL(url);
    const hostname = urlParts.hostname;
    const protocol = urlParts.protocol;
    const client = protocol === 'http:' ? http : https;

    client.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        fs.writeFile(hostname, data, (err) => {
          if (err) {
            console.error(`Error writing file ${hostname}: ${err.message}`);
          } else {
            console.log(`Wrote to ${hostname}`);
          }
        });
      });
    }).on('error', (err) => {
      console.error(`Couldn't download ${url}: ${err.message}`);
    });
  });
});
