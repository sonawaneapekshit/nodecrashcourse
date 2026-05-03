import url from 'url';

const urlString = 'https://www.google.com/search?q=hello+world';

// URL Object
const urlObj = new URL(urlString)
console.log(urlObj);

// url format
console.log(url.format(urlObj));

// import.meta.url - file URL
console.log(import.meta.url);

// fileURLToPath()
console.log(url.fileURLToPath(import.meta.url));

// params 
const params = new URLSearchParams(urlObj.search)
console.log(params.get('q'));
console.log(params.append('limit', '5'));
console.log(params);
console.log(params.delete('limit'));