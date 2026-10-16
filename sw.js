/* Service worker: o app abre offline. Arquivos em cache são servidos na hora e
   atualizados em segundo plano (a versão nova aparece na abertura seguinte). */
const VERSAO = 'cf-v2';
const ARQUIVOS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const chave = req.mode === 'navigate' ? './index.html' : req;
  e.respondWith(
    caches.open(VERSAO).then(async (cache) => {
      const emCache = await cache.match(chave, { ignoreSearch: true });
      const rede = fetch(req.mode === 'navigate' ? './index.html' : req, { cache: 'no-cache' })
        .then((res) => { if (res && res.ok) cache.put(chave, res.clone()); return res; })
        .catch(() => null);
      if (emCache) { e.waitUntil(rede); return emCache; }
      return (await rede) || new Response('Sem conexão e arquivo ainda não guardado.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    })
  );
});
