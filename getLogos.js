const https = require('https');

https.get('https://en.wikipedia.org/wiki/Mascot', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = [...data.matchAll(/src=\"(\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/[^\"]+\.(?:jpg|jpeg|png))/gi)];
    urls.forEach(u => {
      let url = 'https:' + u[1];
      url = url.replace(/\/\d+px-/, '/800px-'); // get larger resolution
      console.log(url);
    });
  });
});
