// offline copy of the game; a new build gets a new cache name
    const C = "tradewinds-264fdd1eed", FILES = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "fonts/Nunito.ttf", "fonts/Fredoka.ttf"];
    self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
    self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
    self.addEventListener("fetch", e => { if (e.request.method !== "GET") return;
      e.respondWith(fetch(e.request).then(r => { if (!r.ok) return caches.match(e.request, { ignoreSearch: true }).then(m => m || r); const copy = r.clone(); caches.open(C).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true }))); });
    