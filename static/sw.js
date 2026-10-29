/**
 * Gram Bazaar - Service Worker (sw.js)
 * ------------------------------------
 * High-reliability Progressive Web App Service Worker with Network-First strategy:
 * 1. Always fetches the latest fresh assets (HTML, CSS, JS) from the server when online.
 * 2. Caches the latest responses in the background.
 * 3. Falls back seamlessly to cache only when the user is truly offline or in low connectivity.
 * 4. Automatically purges outdated caches upon activation.
 */

const CACHE_NAME = "gram-bazaar-v7.2";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
];

// 1. INSTALL EVENT: Pre-cache static files & activate immediately
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing Gram Bazaar Cache v5.0...");
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[Service Worker] Some assets could not be pre-cached:", err);
      });
    })
  );
});

// 2. ACTIVATE EVENT: Immediately claim clients and purge all old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating new Service Worker v4.0...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("[Service Worker] Purging stale cache:", name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH EVENT: Network-First with Cache Fallback for all assets
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // If request is an API call, try network first; if offline, return fallback
  if (requestUrl.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If offline and requesting /api/state, try returning cached copy
          if (requestUrl.pathname === "/api/state") {
            return caches.match(event.request).then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              return new Response(
                JSON.stringify({
                  status: "offline",
                  offline: true,
                  message: "Offline mode active. Using local device state."
                }),
                { headers: { "Content-Type": "application/json" } }
              );
            });
          }
          // For POST requests during offline mode, client script queues them in localStorage
          return new Response(
            JSON.stringify({
              success: false,
              offline: true,
              message: "Device is currently offline. Queued for background synchronization."
            }),
            { headers: { "Content-Type": "application/json" } }
          );
        })
    );
    return;
  }

  // Network-First strategy for all pages, scripts, styles, and assets
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache successful GET responses in background
        if (event.request.method === "GET" && networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed (offline): fall back to cached copy
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If navigation request failed and not in cache, fallback to /index.html
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
      })
  );
});
