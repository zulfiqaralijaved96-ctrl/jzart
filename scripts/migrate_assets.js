const fs = require('fs/promises');
const path = require('path');
const https = require('https');

const FILES_TO_PROCESS = [
  'prisma/schema.prisma',
  'src/app/actions/seed-content.ts',
  'seed_portfolio.js',
  'seed_marketing.js'
];

const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'uploads');

const URL_REGEX = /https:\/\/(lh3\.googleusercontent\.com|images\.unsplash\.com)[^"'\s\)\\]+/g;

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects if any (Unsplash does this)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }

      const writeStream = require('fs').createWriteStream(dest);
      res.pipe(writeStream);
      writeStream.on('finish', () => {
        writeStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const urlMap = new Map(); // url -> localFilename
  let assetCounter = 1;

  for (const file of FILES_TO_PROCESS) {
    const filePath = path.join(__dirname, '..', file);
    try {
      let content = await fs.readFile(filePath, 'utf-8');
      const matches = content.match(URL_REGEX) || [];
      
      let modified = false;

      for (const url of matches) {
        if (!urlMap.has(url)) {
          const ext = url.includes('unsplash') ? 'jpg' : 'png'; // generic fallback
          const filename = `local_asset_${assetCounter++}.${ext}`;
          const destPath = path.join(UPLOAD_DIR, filename);
          
          console.log(`Downloading ${filename}...`);
          try {
             await downloadFile(url, destPath);
             urlMap.set(url, `/uploads/${filename}`);
          } catch (e) {
             console.error(`Failed to download ${url}: ${e.message}`);
          }
        }

        if (urlMap.has(url)) {
          const localPath = urlMap.get(url);
          content = content.split(url).join(localPath);
          modified = true;
        }
      }

      if (modified) {
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`Updated ${file}`);
      }

    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }

  console.log("Migration complete.");
}

main();
