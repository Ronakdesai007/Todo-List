self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Optionally, add files to cache here
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  // Optionally, respond with cached resources here
});