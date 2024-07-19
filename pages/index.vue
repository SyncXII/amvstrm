import { useScriptTag } from '@vueuse/core'

<script setup>
useSeoMeta({
  ogTitle: "Home",
  ogDescription: "AniSync - Your Ultimate Anime Streaming Experience!",
  ogUrl: useRoute().fullPath,
  twitterTitle: "Home",
  twitterDescription: "AniSync - Your Ultimate Anime Streaming Experience!",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Home",
});

useScriptTag(
  'https://pl23816720.highrevenuenetwork.com/91/70/16/917016720b58b2739ee958d20af2d0e8.js',
  // on script tag loaded.
  (el: HTMLScriptElement) => {
    // do something
  },
);
</script>

<template>
  <PgCompsLandingPage />
</template> 

<style></style>
