<script setup>
import { useStorage } from "@vueuse/core";

const env = useRuntimeConfig();

const getID = useRoute().params.id.split("-")[0];
const getGogoID = useRoute().params.id.split(`${getID}-`)[1];
const getEP = getGogoID.split(`-episode-`)[1];

const loadSettingDialog = ref(false);
const switchtobackup = ref(false);

const switchplyr = ref(0);

const { data: anime } = await useFetch(
  `${env.public.API_URL}/api/${env.public.version}/info/${getID}`,
  {
    cache: "force-cache",
  }
);

const {
  data: strm,
  pending: strmLoading,
  refresh: strmRefresh,
  error: strmError,
} = await useFetch(
  `${env.public.API_URL}/api/${env.public.version}/stream/${getGogoID}`,
  {
    cache: "force-cache",
  }
);

const {
  data: ep,
  pending: epPending,
  error: epError,
} = useLazyFetch(
  `${env.public.API_URL}/api/v1/episode/${anime?.value.id_provider.idGogo}`,
  {
    cache: "default",
  }
);

const { data: time2Skip } = await useFetch(
  `${env.public.API_URL}/api/v2/stream/skiptime/${getID}/${getEP}`,
  {
    cache: "force-cache",
  }
);

useSeoMeta({
  ogTitle: `${
    anime.value?.title.userPreferred
      ? anime.value?.title.userPreferred + " Episode " + getEP
      : "AniSync"
  } - AniSync`,
  ogDescription: `Watch ${
    anime.value?.title.userPreferred
      ? anime.value?.title.userPreferred + " Episode " + getEP
      : "AniSync"
  } on AniSync`,
  ogImage: anime?.value.coverImage.large,
  ogUrl: useRoute().fullPath,
  twitterTitle: `${
    anime.value?.title.userPreferred
      ? anime.value?.title.userPreferred + " Episode " + getEP
      : "AniSync"
  } - AniSync`,
  twitterDescription: `Watch ${
    anime.value?.title.userPreferred
      ? anime.value?.title.userPreferred + " Episode " + getEP
      : "AniSync"
  } on AniSync`,
  twitterImage: anime?.value.coverImage.large,
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: anime.value?.title.userPreferred
    ? anime.value?.title.userPreferred + " Episode " + getEP
    : "AniSync",
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

const skipTimeHighlight = () => {
  if (time2Skip.value?.found === true || time2Skip.value?.results < 0) {
    const output = [];

    if (time2Skip.value?.results.op) {
      output.push({
        text: "Opening start",
        time: time2Skip.value.results.op.interval.startTime,
      });

      output.push({
        text: "Opening end",
        time: time2Skip.value.results.op.interval.endTime,
      });
    }

    if (time2Skip.value?.results.ed) {
      output.push({
        text: "Ending start",
        time: time2Skip.value.results.ed.interval.startTime,
      });

      output.push({
        text: "Ending end",
        time: time2Skip.value.results.ed.interval.endTime,
      });
    }
    return output;
  } else if (time2Skip.value?.results === 0 || !time2Skip.value?.found) {
    return [];
  }
  return [];
};

const playerSettings = useStorage("ap_settings", {
  s_source: "Main",
  s_autonext: false,
  s_autoskip: false,
  s_theatre: false,
});

const setHistory = useStorage("site-watch", {
  latest_watched_date: 0,
  latest_anime_watched: {},
  all_anime_watched: [],
});

const latestAnimeWatched = {
  id: anime?.value.id,
  title: anime?.value.title.userPreferred,
  imgsrc: anime?.value.coverImage.large,
  color: anime?.value.coverImage.color,
  type: anime?.value.format,
  curr_ep: getEP,
  ep_id: getGogoID,
  isDub: getGogoID.includes("-dub-"),
  totalEp: anime?.value.episodes ? anime?.value.episodes : 0,
  year: anime?.value.year,
};

if (strmError.value) {
  console.log("stream error");
} else {
  setHistory.value.latest_anime_watched = latestAnimeWatched;
  setHistory.value.latest_watched_date = Date.now();
}

const artError = ref();

function getInstance(art) {
  art.on("error", (error, reconnectTime) => {
    console.log("video error!");
    artError.value = error;
  });
  art.setting.add({
    html: "Stream Source",
    width: 200,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="M4 1h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 8h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m0 8h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1M9 5h1V3H9v2m0 8h1v-2H9v2m0 8h1v-2H9v2M5 3v2h2V3H5m0 8v2h2v-2H5m0 8v2h2v-2H5Z"/></svg>',
    tooltip: playerSettings.value.s_source === "Main" ? "Main" : "Backup",
    selector: [
      {
        default: playerSettings.value.s_source === "Main" ? true : false,
        html: "Main",
        url: strm.value?.stream.multi.main.url,
      },
      {
        default: playerSettings.value.s_source === "Backup" ? true : false,
        html: "Backup",
        url: strm.value?.stream.multi.backup.url,
      },
    ],
    onSelect(item) {
      art.switchQuality(item.url, item.html);
      playerSettings.value.s_source = item.html;
      return item.html;
    },
  });
  art.setting.add({
    html: "Auto Skip (OP&ED)",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="M6 9.83L8.17 12L6 14.17V9.83M4 5v14l7-7m9-7h-2v14h2m-7-9.17L15.17 12L13 14.17V9.83M11 5v14l7-7"/></svg>',
    switch: playerSettings.value.s_autoskip === false ? false : true,
    onSwitch: function (item) {
      const nextState = !item.switch;
      playerSettings.value.s_autoskip = nextState;
      return nextState;
    },
  });
  art.setting.add({
    html: "Auto play",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="M16 18h2V6h-2M6 18l8.5-6L6 6v12Z"/></svg>',
    switch: playerSettings.value.s_autonext === false ? false : true,
    onSwitch: function (item) {
      const nextState = !item.switch;
      playerSettings.value.s_autonext = nextState;
      return nextState;
    },
  });
  art.setting.add({
    html: "Theatre mode",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6v13h16V6H4m14 11H6V8h12v9Z"/></svg>',
    switch: playerSettings.value.s_theatre === false ? false : true,
    onSwitch: function (item) {
      const nextState = !item.switch;
      playerSettings.value.s_theatre = nextState;
      return nextState;
    },
  });
  art.on("ready", () => {
    if (navigator.userAgent.includes("Firefox")) {
      art.controls.remove("chromecast");
    }
    if (useRoute().query.time) {
      art.seek = parseInt(useRoute().query.time) || 0;
    }
  });
  art.on("play", () => {
    art.layers.show = false;
  });
  art.on("pause", () => {
    art.layers.show = true;
  });
  art.on("video:timeupdate", () => {
    const currentTime = art.currentTime;

    if (playerSettings.value.s_autoskip === true) {
      if (
        time2Skip.value?.results.op &&
        currentTime >= time2Skip.value?.results.op.interval.startTime &&
        currentTime <= time2Skip.value?.results.op.interval.endTime
      ) {
        art.seek = time2Skip.value?.results.op.interval.endTime + 1;
        art.notice.show = "Skipped Opening";
      } else if (
        time2Skip.value?.results.ed &&
        currentTime >= time2Skip.value?.results.ed.interval.startTime &&
        currentTime <= time2Skip.value?.results.ed.interval.endTime
      ) {
        art.seek = time2Skip.value?.results.ed.interval.endTime + 1;
        art.notice.show = "Skipped Ending";
      } else {
        return;
      }
    } else {
      if (
        time2Skip.value?.results.op &&
        currentTime >= time2Skip.value?.results.op.interval.startTime &&
        currentTime <= time2Skip.value?.results.op.interval.endTime
      ) {
        if (!art.controls["opening"]) {
          if (art.controls["ending"]) {
            art.controls.remove("ending");
          }
          art.controls.add({
            name: "opening",
            position: "top",
            html: '<button class="app-skip-btn">Skip Opening</button>',
            click: function () {
              art.seek = time2Skip.value?.results.op.interval.endTime;
              art.notice.show = "Skipped Opening";
            },
          });
        }
      } else if (
        time2Skip.value?.results.ed &&
        currentTime >= time2Skip.value?.results.ed.interval.startTime &&
        currentTime <= time2Skip.value?.results.ed.interval.endTime
      ) {
        if (!art.controls["ending"]) {
          if (art.controls["opening"]) {
            art.controls.remove("opening");
          }
          art.controls.add({
            name: "ending",
            position: "top",
            html: '<button class="app-skip-btn">Skip Ending</button>',
            click: function () {
              art.seek = time2Skip.value?.results.ed.interval.endTime;
              art.notice.show = "Skipped Ending";
            },
          });
        }
      } else {
        if (art.controls["opening"]) {
          art.controls.remove("opening");
        }
        if (art.controls["ending"]) {
          art.controls.remove("ending");
        }
      }
    }
  });
  art.on("video:ended", () => {
    if (playerSettings.value.s_autonext === true) {
      const currentEpisodeIndex = ep?.value.episodes?.findIndex(
        (episode) => episode.id.split(`-episode-`)[1] === getEP
      );

      if (currentEpisodeIndex === -1) {
        console.error("Episode not found!");
        return;
      }

      if (currentEpisodeIndex === 0) {
        art.notice.show = "No more episode!";
      } else {
        const nextEpisode = ep?.value.episodes[currentEpisodeIndex - 1];
        navigateTo(
          `/watch/${getID}-${getGogoID.split(`-episode-`)[0]}-episode-${
            nextEpisode.id.split(`-episode-`)[1]
          }`
        );
        art.notice.show = "Next episode >";
      }
    }
  });
}

const videoIframe = ref([
  {
    name: "Integrated Player (Recommended)",
    url: "",
    bk_url: "",
    value: 0,
  },
  {
    name: "Plyr",
    url: strm.value?.plyr?.main,
    bk_url: strm.value?.plyr?.backup,
    value: 1,
  },
  {
    name: "NSPL",
    url: strm.value?.nspl?.main,
    bk_url: strm.value?.nspl?.backup,
    value: 2,
  },
]);

onMounted(() => {
  strm.value?.iframe.forEach((e) => {
    videoIframe.value.push({
      name: e.name,
      url: e.iframe,
      bk_url: "",
      value: videoIframe.value.length + 1,
    });
  });
});
</script>

<script>
export default {
  data() {
    return {
      style: {
        width: "100%",
        height: "auto",
        aspectRatio: "16/9",
      },
      switchplyr: 1,
    };
  },
  unmounted: function () {
    console.log(this.artPlayer);
  },
};
</script>
<template>
  <div v-if="strmLoading" class="loadingBlock">
    <v-progress-circular :size="45" indeterminate />
  </div>
  <div v-else-if="strmError">
    <v-empty-state
      headline="Stream Error"
      title="Stream not found"
      text="Video stream not found or not available by the source."
    ></v-empty-state>
  </div>
  <v-container v-else>

  <!-- Top Ad Container -->
  <v-row>
   <v-col cols="12">
  <v-card>
    <div class="pa-5" style="background-color: #212121">
        <div id="ad-container" class="d-flex justify-center align-center pa-2" style="width: 100%; box-sizing: border-box;">
            <div id="frame" style="max-width: 728px; width: 100%;">
                <iframe data-aa="2340453" src="//ad.a-ads.com/2340453?size=728x90&background_color=000000" style="width: 100%; height: 90px; border: 0; padding: 0; overflow: hidden; background-color: transparent;"></iframe>
                <a id="frame-link" class="d-block text-right" style="font-size: 12px;" href="https://aads.com/?partner=2340453">Advertise here</a>
            </div>
        </div>
    </div>
  </v-card>
</v-col>
  </v-row>
    
    <v-row
      :class="{
        'stream-ctn': playerSettings.s_theatre,
      }"
    >
      <v-col
        v-if="!strmError"
        :cols="playerSettings.s_theatre ? 12 : 12"
        :lg="playerSettings.s_theatre ? 12 : 8"
      >
        <ClientOnly>
          <v-card
            v-if="
              artError ||
              strm.value?.stream.multi.main === null ||
              strm.value?.stream.multi.backup === null
            "
            title="Stream error"
            text="This can be cause by our website or the video source. Please use other sources, use embedded version of the stream or refresh the page."
            variant="tonal"
          >
            <v-card-actions>
              <v-btn @click="strmRefresh"> Click me </v-btn>
            </v-card-actions>
          </v-card>
          <VideoPlayer
            v-if="switchplyr == 0"
            :option="{
              id: useRoute().params.id || '',
              url: strm.stream.multi.main.url,
              poster: anime.bannerImage || anime.coverImage.large,
              highlight: skipTimeHighlight(),
            }"
            :vtt="strm.stream?.tracks?.file"
            :style="style"
            @get-instance="getInstance"
          />
          <iframe
            v-else-if="switchplyr > 0"
            ref="amv_iframe"
            class="amv_iframe"
            :src="
              switchtobackup === true
                ? videoIframe[switchplyr].bk_url
                : videoIframe[switchplyr].url
            "
            allowfullscreen
            frameborder="0"
            :style="style"
          ></iframe>
        </ClientOnly>
      </v-col>
      <v-col v-else-if="strmError || artError" cols="12" lg="8">
        <v-empty-state
          headline="Player Error"
          title="Video player error"
          text="This can be cause by our website or the video source. Please use other sources, use embedded version of the stream or refresh the page."
        ></v-empty-state>
      </v-col>
      <v-col>
        <v-card class="epinf_card">
          <div class="pa-4 d-flex justify-space-between">
            <div style="flex: 1">
              <NuxtLink
                :to="
                  (!/\/pwa\.*/.test(useRoute().path) ? '/' : '/pwa/') +
                  'anime/' +
                  getID
                "
              >
                <div>
                  <h1 style="font-size: large">
                    {{ anime?.title.userPreferred }}
                  </h1>
                  <span>{{ anime?.title.romaji }}</span>
                </div>
              </NuxtLink>
              <span>Episode {{ getEP }}</span>
            </div>
            <div class="d-flex align-center">
              <v-btn
                class="mr-2"
                color="blue"
                :href="'/download/' + useRoute().params.id"
                icon="mdi-download"
                target="blank"
                variant="plain"
              >
              </v-btn>
              <v-dialog
                v-model="loadSettingDialog"
                width="auto"
                scrim="#202020"
                max-width="500px"
                scrollable
              >
                <template #activator="{ props }">
                  <v-btn
                    class="mr-2"
                    color="gray"
                    icon="mdi-cog"
                    variant="plain"
                    v-bind="props"
                  >
                  </v-btn>
                </template>
                <v-card class="mx-auto">
                  <v-card-title> Player setting </v-card-title>
                  <v-row class="ma-4">
                    <v-col cols="12" lg="6">
                      <h4 class="my-1">Sources :</h4>
                      <ClientOnly>
                        <v-radio-group v-model="switchplyr">
                          <v-radio
                            v-for="(src, i) in videoIframe"
                            :key="i"
                            :label="src.name"
                            :value="i"
                          ></v-radio>
                        </v-radio-group>
                      </ClientOnly>
                      <v-divider class="my-2"></v-divider>
                      <div v-if="switchplyr == 0">
                        Integrated Player is recommended for best experience.
                      </div>
                      <div v-else-if="switchplyr == 1 || switchplyr == 2">
                        Using Plyr and nsPlayer will lose some of the
                        functionality (Resumed Video, Intro and Outro skip, and
                        more)
                        <v-checkbox
                          v-model="switchtobackup"
                          label="Backup stream"
                          color="primary"
                        ></v-checkbox>
                      </div>
                      <div v-else-if="switchplyr > 2">
                        Recommend to use Adblocker and close the web inspect to
                        watch it.
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6">
                      <div>
                        <h4 class="my-1">Video data :</h4>
                        <i style="font-size: small">
                          * Only refresh when the data is outdated or error
                        </i>
                        <v-btn
                          class="mt-2"
                          color="red"
                          prepend-icon="mdi-refresh"
                          @click="strmRefresh"
                        >
                          Refresh Data
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-btn
                      prepend-icon="mdi-help"
                      href="https://amvdocs.pages.dev/help/video-player"
                      target="blank"
                    >
                      Player Help
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      icon="mdi-close"
                      @click="loadSettingDialog = false"
                    />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
          <v-divider />
          <v-list lines="two">
            <v-list-item v-if="epPending">
              <v-list-item-title>LOADING...</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-else-if="epError"
              title="Error"
              :subtitle="epError.message"
            />
            <v-list-item
              v-for="(epitm, i) in ep.episodes"
              v-else
              :key="i"
              :to="
                (/\/pwa\.*/.test(useRoute().path) ? '/pwa/' : '/') +
                'watch/' +
                getID +
                '-' +
                epitm.id
              "
              :title="epitm.title"
              :subtitle="'Episode' + epitm.id.split('-episode-')[1]"
            />
          </v-list>
        </v-card>
      </v-col>
      <v-col v-if="env.public.disqus_id" cols="12">
        <WCompsCommentBlock />
      </v-col>
    </v-row>

    <!-- Bottom Ad Container -->
    <v-row>
      <v-col cols="12">
  <v-card>
    <div class="pa-5" style="background-color: #212121">
        <div id="ad-container" class="d-flex justify-center align-center pa-2" style="width: 100%; box-sizing: border-box;">
            <div id="frame" style="max-width: 728px; width: 100%;">
                <iframe data-aa="2340453" src="//ad.a-ads.com/2340453?size=728x90&background_color=000000" style="width: 100%; height: 90px; border: 0; padding: 0; overflow: hidden; background-color: transparent;"></iframe>
                <a id="frame-link" class="d-block text-right" style="font-size: 12px;" href="https://aads.com/?partner=2340453">Advertise here</a>
            </div>
        </div>
    </div>
  </v-card>
</v-col>
    </v-row>

  </v-container>
</template>
<style>
.loadingBlock {
  height: 100vh;
  display: grid;
  place-items: center;
}

.stream-ctn {
  padding: 0;
}

.epinf_card {
  aspect-ratio: 9/7;
  overflow-y: scroll !important;
}

@media (min-width: 1280px) {
  .epinf_card {
    aspect-ratio: 9/10.3;
    overflow-y: scroll !important;
  }
  .stream-ctn {
    padding: 12px 12rem;
  }
}
</style>
