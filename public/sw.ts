//@ts-ignore
import {defaultCache } from "@/serwist/next/browser";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (string | PrecacheEntry)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      // Aapki API ka URL pattern
      urlPattern: /\/api\/.*$/, 
      // NetworkFirst ka matlab: Pehle internet se mango, 
      // agar fail ho jaye toh purana cache wala data dikhao.
      handler: "NetworkFirst",
      options: {
        cacheName: "api-data-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 1 Hafta tak data save rahega
        },
        networkTimeoutSeconds: 10, // 10 second baad agar response na aye toh cache use karo
      },
    },
  ],
});

serwist.addEventListeners();