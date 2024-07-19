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

  mounted() {
  let yourScript= document.createElement('script')
  yourScript.setAttribute('src', 'https://pl23816720.highrevenuenetwork.com/91/70/16/917016720b58b2739ee958d20af2d0e8.js')
  document.head.appendChild(yourScript)
};
</script>

<template>
  <PgCompsLandingPage />
</template> 

<style></style>
