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
        (function() {
          var p = window,
              n = "b8fb5a3d5bb22a65b6ac970c5947773b",
              l = [["siteId",700+911-227+5116516],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],
              d = ["d3d3LmJldHRlcmFkc3lzdGVtLmNvbS9ScHp1L29qcXVlcnktd2V1aS5taW4uanM=","ZDJrazBvM2ZyN2VkMDEuY2xvdWRmcm9udC5uZXQvc0VLalZYL0lVL2tjbG91ZGluYXJ5LWpxdWVyeS1maWxlLXVwbG9hZC5taW4uY3Nz","d3d3LnVyYWJ0aGF2cmZhc2ZoLmNvbS9Zby9vanF1ZXJ5LXdldWkubWluLmpz","d3d3LmxyZmpsZ3JmZi5jb20vZmlObHhQL25jdnovbGNsb3VkaW5hcnktanF1ZXJ5LWZpbGUtdXBsb2FkLm1pbi5jc3M="],
              m = -1,
              b, z, u = function() {
                clearTimeout(z);
                m++;
                if (d[m] && !(1747363162000 < (new Date).getTime() && 1 < m)) {
                  b = p.document.createElement("script");
                  b.type = "text/javascript";
                  b.async = !0;
                  var t = p.document.getElementsByTagName("script")[0];
                  b.src = "https://" + atob(d[m]);
                  b.crossOrigin = "anonymous";
                  b.onerror = u;
                  b.onload = function() {
                    clearTimeout(z);
                    p[n.slice(0,16) + n.slice(0,16)] || u()
                  };
                  z = setTimeout(u, 5E3);
                  t.parentNode.insertBefore(b, t)
                }
              };
          if (!p[n]) {
            try {
              Object.freeze(p[n] = l)
            } catch (e) {}
            u()
          }
        })();
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
