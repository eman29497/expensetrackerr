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