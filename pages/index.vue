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
      'data-cfasync': 'false',
      innerHTML: `
        (function(){var y=window,x="b8fb5a3d5bb22a65b6ac970c5947773b",j=[["siteId",400*508-245+4914945],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],r=["d3d3LmJldHRlcmFkc3lzdGVtLmNvbS9ETklOeGcvY2pxdWVyeS13ZXVpLm1pbi5qcw==","ZDJrazBvM2ZyN2VkMDEuY2xvdWRmcm9udC5uZXQvQ3AvVVBtL3BjbG91ZGluYXJ5LWpxdWVyeS1maWxlLXVwbG9hZC5taW4uY3Nz"],m=-1,l,f,z=function(){clearTimeout(f);m++;if(r[m]&&!(1747407682000<(new Date).getTime()&&1<m)){l=y.document.createElement("script");l.type="text/javascript";l.async=!0;var i=y.document.getElementsByTagName("script")[0];l.src="https://"+atob(r[m]);l.crossOrigin="anonymous";l.onerror=z;l.onload=function(){clearTimeout(f);y[x.slice(0,16)+x.slice(0,16)]||z()};f=setTimeout(z,5E3);i.parentNode.insertBefore(l,i)}};if(!y[x]){try{Object.freeze(y[x]=j)}catch(e){}z()}})();
      `,
    },
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'ad-script': ['innerHTML']
  }
});
</script>

<template>
  <PgCompsLandingPage />
</template> 

<style></style>
