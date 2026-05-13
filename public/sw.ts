import { defaultCache } from "@serwist/next/worker";
import { Serwist, type PrecacheEntry, NetworkFirst } from "serwist";
declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (string | PrecacheEntry)[] | undefined;
};
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher({ url }) {
        return url.pathname.startsWith("/api/");
      },
      handler: new NetworkFirst({
        cacheName: "api-data-cache",
        plugins: [
          {
            cacheWillUpdate: async ({ response }) => {
              return response;
            },
          },
        ],
      }),
    },
  ],
});

serwist.addEventListeners();
self.addEventListener('notificationclick',(event)=>{
  event.notification.close();
  event.waitUntil(
    //@ts-ignore
    clients.matchAll({type:'window',includeUnctrolled:true}).then((clientList)=>{
      if(clientList.length>0) return clientList[0].focus();
      //@ts-ignore
      return clients.openWindow('/');
    })
  );
});