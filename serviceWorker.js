const staticVisionTest = "size-distance-demo"
const assets = [
  "/",
  "/index.html",
  "/style.css"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticVisionTest).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})