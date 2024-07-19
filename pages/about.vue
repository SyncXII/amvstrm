<script setup>
useSeoMeta({
  ogTitle: "About",
  ogDescription: "AniSync – Your Ultimate Anime Streaming Experience!",
  ogImage: "logo.png",
  ogUrl: "[og:url]",
  twitterTitle: "About",
  twitterDescription: "AniSync – Your Ultimate Anime Streaming Experience!",
  twitterImage: "logo.png",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "About",
});
</script>
<template>
  <v-container>
    <div class="pa-5" style="background-color: #212121">
      <h1><img src="/logo.png" alt="loho" height="50" /></h1>
      <p>Welcome to AniSync – Your Ultimate Anime Streaming Experience! Dive into the world of anime like never before with AniSync, the premier destination for anime fans of all tastes and preferences. AniSync offers an unparalleled streaming experience tailored just for you.
      </p>
      <div class="mt-2">
        <!--<v-btn
          class="mr-2"
          color="grey-darken-1"
          prepend-icon="mdi-github"
          href="https://github.com/amvstrm"
        >
          Github
        </v-btn>
        <v-btn
          color="blue-darken-1"
          prepend-icon="mdi-file-document"
          href="https://amvdocs.pages.dev"
        >
          Documentation
        </v-btn>-->
      </div>
    </div>
  </v-container>
</template>
