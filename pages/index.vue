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
  script: [
        {
          type: 'text/javascript',
          src: '//pl23816720.highrevenuenetwork.com/91/70/16/917016720b58b2739ee958d20af2d0e8.js',
          'data-cfasync': 'false'
        },
        {
          type: 'text/javascript',
          src: '//pl23817253.highrevenuenetwork.com/17/ee/0f/17ee0f5da3870577c2ae549585183a25.js',
          'data-cfasync': 'false'
        },
        {
      type: 'text/javascript',
      charset: 'utf-8',
      innerHTML: `
        (function() {
          var adBlockDetected = false;

          function checkAdBlock() {
            var adBlockTester = document.createElement('div');
            adBlockTester.innerHTML = '&nbsp;';
            adBlockTester.className = 'adsbox';
            document.body.appendChild(adBlockTester);
            window.setTimeout(function() {
              if (adBlockTester.offsetHeight === 0) {
                adBlockDetected = true;
              }
              adBlockTester.remove();
              if (adBlockDetected) {
                // Block access or redirect user
                document.body.innerHTML = '<h1>Access Denied</h1><p>Please disable your ad blocker to access this site.</p>';
              }
            }, 100);
          }

          if (window.addEventListener) {
            window.addEventListener('load', checkAdBlock, false);
          } else if (window.attachEvent) {
            window.attachEvent('onload', checkAdBlock);
          }
        })();
      `,
    },
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'adblock-detection-script': ['innerHTML']
  }
});
</script>

<template>
  <PgCompsLandingPage />
</template> 

<style></style>
