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
</script>

<template>
    <div id="component-root">
        <!-- (...) -->
        <div v-el:script-holder></div>
    </div>
</template>

<script setup>
    export default {
        data () {
            return {};
        },
        ready() {
             let scriptEl = document.createElement('script');
             scriptEl.setAttribute('src', 'https://pl23816720.highrevenuenetwork.com/91/70/16/917016720b58b2739ee958d20af2d0e8.js');
             scriptEl.setAttribute('data-some-param', 'paramvalue');
             this.$els.scriptHolder.appendChild(scriptEl);
        },
    }
</script>

<template>
  <PgCompsLandingPage />
</template> 

<style></style>
