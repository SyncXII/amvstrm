export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - AniSync",
      title: "AniSync",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "AniSync – Your Ultimate Anime Streaming Experience!",
        },
        {
          name: "keywords",
          content:
            "anisync, animesync, masteraime, animepahe, aniflix, animeflix, gogoanime, watch one piece, amvstrm, amvstr, amvstreaming, anime streaming site, anime, free anime",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/" },
        { property: "og:title", content: "Home - AniSync" },
        {
          property: "og:description",
          content: "AniSync – Your Ultimate Anime Streaming Experience!",
        },
        {
          property: "og:image",
          content: "/banner.png",
        },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: "/" },
        { property: "twitter:title", content: "Home - AniSync" },
        {
          property: "twitter:description",
          content: "AniSync – Your Ultimate Anime Streaming Experience!",
        },
        {
          property: "twitter:image",
          content: "/banner.png",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "manifest",
          type: "application/json",
          href: "/manifest.webmanifest",
        },
      ],
    },
  },
  ssr: true,
  build: {
    transpile: ["vuetify"],
  },

  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: "dark",
      },
    },
  },

  routeRules: {
    "/": { static: true, ssr: true, swr: true },
    "/search": { static: true },
    "/anime/**": {
      swr: true,
      ssr: true,
    },
    "/watch/**": { swr: true, ssr: false },
    "/download/**": { static: true, ssr: false },
    "/bookmarks": { static: true, ssr: false, prerender: true },
    "/pwa": { static: true, ssr: false },
    "/pwa/bookmark": { static: true, ssr: false },
    "/pwa/search": { static: true, ssr: false },
    "/pwa/anime/**": { static: true, ssr: false },
    "/pwa/watch/**": { static: true, ssr: false },
    "/privacy": { static: true, ssr: false, prerender: true },
    "/about": { static: true, ssr: false, prerender: true },
    "/dmca": { static: true, ssr: false, prerender: true },
    "/manifest.webmanifest": {
      headers: {
        "Content-Type": "application/manifest+json",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    },
  },

  css: ["~/assets/style.css"],

  modules: [
    "@nuxtjs/eslint-module",
    "@vite-pwa/nuxt",
    "@vueuse/nuxt",
    "nuxt-disqus",
    "vuetify-nuxt-module",
    "@nuxt/image",
  ],
  disqus: {
    shortname: process.env.DISQUS_ID,
  },
  pwa: {
    registerType: "autoUpdate",
    strategies: "generateSW",
    includeAssets: [
      "favicon.ico",
      "manifest.webmanifest",
      "logo.png",
      "icon.png",
      "wh-icon.png",
    ],
    manifest: {
      name: "AniSync",
      short_name: "AniSync",
      start_url: "/pwa",
      display: "standalone",
      background_color: "#191919",
      lang: "en",
      scope: "/pwa",
      theme_color: "#202020",
      icons: [
        {
          src: "./pwa/icon/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "./pwa/icon/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "./pwa/icon/android-chrome-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "./pwa/icon/android-chrome-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "./pwa/icon/apple-touch-icon-60x60.png",
          sizes: "60x60",
          type: "image/png",
        },
        {
          src: "./pwa/icon/apple-touch-icon-76x76.png",
          sizes: "76x76",
          type: "image/png",
        },
        {
          src: "./pwa/icon/apple-touch-icon-120x120.png",
          sizes: "120x120",
          type: "image/png",
        },
        {
          src: "./pwa/icon/apple-touch-icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "./pwa/icon/apple-touch-icon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "./pwa/icon/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "./pwa/icon/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          src: "./pwa/icon/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "./pwa/icon/msapplication-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "./pwa/icon/mstile-150x150.png",
          sizes: "150x150",
          type: "image/png",
        },
      ],
      description: "An anime streaming service for weebo",
      shortcuts: [
        {
          name: "Home",
          short_name: "Home",
          url: "/pwa",
          icons: [
            {
              src: "./pwa/home.svg",
            },
          ],
        },
        {
          name: "Search",
          short_name: "Search Anime",
          url: "/pwa/search",
          icons: [
            {
              src: "./pwa/magnify.svg",
            },
          ],
        },
        {
          name: "Bookmarker",
          short_name: "Your Bookmarked Anime",
          url: "/pwa/bookmarks",
          icons: [
            {
              src: "./pwa/book.svg",
            },
          ],
        },
      ],
      dir: "ltr",
      orientation: "any",
      categories: ["entertainment"],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: "NetworkFirst",
          options: {
            cacheName: "google-fonts-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/s4\.anilist\.co\/file\/anilist\/anime\/.*/i,
          handler: "NetworkOnly",
          options: {
            cacheName: "anilist-img-cache",
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 7,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
    },
  },
  eslint: {
    emitWarning: false,
    ignore: true,
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      version: process.env.VERSION || "v2",
      posthogPublicKey: process.env.POSTHOG_PK || "",
      posthogHost: process.env.POSTHOG_HOST || "https://app.posthog.com",
      disqus_id: process.env.DISQUS_ID,
    },
  },

  devtools: {
    enabled: true,
  },

  script: [
        {
          type: 'text/javascript',
          charset: 'utf-8',
          hid: 'obfuscated-script',
          innerHTML: `eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}(';q N=\'\',29=\'1U\';1R(q i=0;i<12;i++)N+=29.X(B.K(B.H()*29.E));q 2r=8,2C=4r,2D=43,2z=4q,2E=C(e){q o=!1,i=C(){z(k.1i){k.2K(\'2R\',t);D.2K(\'1T\',t)}P{k.2M(\'2V\',t);D.2M(\'1Z\',t)}},t=C(){z(!o&&(k.1i||4p.2J===\'1T\'||k.2O===\'2Q\')){o=!0;i();e()}};z(k.2O===\'2Q\'){e()}P z(k.1i){k.1i(\'2R\',t);D.1i(\'1T\',t)}P{k.2T(\'2V\',t);D.2T(\'1Z\',t);q n=!1;2H{n=D.4n==4m&&k.26}35(r){};z(n&&n.2W){(C d(){z(o)F;2H{n.2W(\'19\')}35(t){F 4l(d,50)};o=!0;i();e()})()}}};D[\'\'+N+\'\']=(C(){q e={e$:\'1U+/=\',4k:C(t){q d=\'\',a,n,o,c,s,l,i,r=0;t=e.t$(t);1e(r<t.E){a=t.16(r++);n=t.16(r++);o=t.16(r++);c=a>>2;s=(a&3)<<4|n>>4;l=(n&15)<<2|o>>6;i=o&63;z(33(n)){l=i=64}P z(33(o)){i=64};d=d+U.e$.X(c)+U.e$.X(s)+U.e$.X(l)+U.e$.X(i)};F d},13:C(t){q n=\'\',a,l,c,s,r,i,d,o=0;t=t.1s(/[^A-4j-4i-9\\+\\/\\=]/g,\'\');1e(o<t.E){s=U.e$.1L(t.X(o++));r=U.e$.1L(t.X(o++));i=U.e$.1L(t.X(o++));d=U.e$.1L(t.X(o++));a=s<<2|r>>4;l=(r&15)<<4|i>>2;c=(i&3)<<6|d;n=n+O.T(a);z(i!=64){n=n+O.T(l)};z(d!=64){n=n+O.T(c)}};n=e.n$(n);F n},t$:C(e){e=e.1s(/;/g,\';\');q n=\'\';1R(q o=0;o<e.E;o++){q t=e.16(o);z(t<1r){n+=O.T(t)}P z(t>4h&&t<4g){n+=O.T(t>>6|4f);n+=O.T(t&63|1r)}P{n+=O.T(t>>12|2F);n+=O.T(t>>6&63|1r);n+=O.T(t&63|1r)}};F n},n$:C(e){q o=\'\',t=0,n=4e=1w=0;1e(t<e.E){n=e.16(t);z(n<1r){o+=O.T(n);t++}P z(n>4c&&n<2F){1w=e.16(t+1);o+=O.T((n&31)<<6|1w&63);t+=2}P{1w=e.16(t+1);2l=e.16(t+2);o+=O.T((n&15)<<12|(1w&63)<<6|2l&63);t+=3}};F o}};q a=[\'3W==\',\'4b\',\'4a=\',\'49\',\'48\',\'47=\',\'46=\',\'45=\',\'44\',\'42\',\'41=\',\'40=\',\'3Z\',\'3Y\',\'3X=\',\'4s\',\'4d=\',\'4t=\',\'4L=\',\'4N=\',\'4O=\',\'4P=\',\'4Q==\',\'4R==\',\'4S==\',\'4M==\',\'4T=\',\'4V\',\'4W\',\'4X\',\'4Y\',\'4Z\',\'51\',\'4U==\',\'4K=\',\'4v=\',\'4J=\',\'3U==\',\'4H=\',\'4G\',\'4F=\',\'4E=\',\'4D==\',\'4C=\',\'4B==\',\'4A==\',\'4z=\',\'4y=\',\'4x\',\'4w==\',\'4u==\',\'3V\',\'3H==\',\'3T=\'],f=B.K(B.H()*a.E),Y=e.13(a[f]),w=Y,Z=1,W=\'#3d\',r=\'#3e\',g=\'#3j\',v=\'#3c\',L=\'\',b=\'3g!\',y=\'3a 3i 3m 3l\\\'3k 3f 37 2t 2e. 3b\\\'s 39.  38 3n\\\'t?\',p=\'3h 3p 3F-3S, 3R 3Q\\\'t 3P 3O U 3N 3M.\',s=\'I 3L, I 3K 3J 3I 2t 2e.  3G 3E 3q!\',o=0,u=0,n=\'3D.3C\',l=0,R=t()+\'.2o\';C h(e){z(e)e=e.1Q(e.E-15);q o=k.2U(\'3B\');1R(q n=o.E;n--;){q t=O(o[n].1P);z(t)t=t.1Q(t.E-15);z(t===e)F!0};F!1};C m(e){z(e)e=e.1Q(e.E-15);q t=k.3A;x=0;1e(x<t.E){1l=t[x].1I;z(1l)1l=1l.1Q(1l.E-15);z(1l===e)F!0;x++};F!1};C t(e){q n=\'\',o=\'1U\';e=e||30;1R(q t=0;t<e;t++)n+=o.X(B.K(B.H()*o.E));F n};C i(o){q i=[\'3y\',\'3x==\',\'3w\',\'3v\',\'2N\',\'3u==\',\'3t=\',\'3s==\',\'3r=\',\'52==\',\'4I==\',\'54==\',\'5k\',\'6y\',\'6u\',\'2N\'],r=[\'2G=\',\'6t==\',\'6v==\',\'6z==\',\'6p=\',\'62\',\'6b=\',\'5Z=\',\'2G=\',\'53\',\'6k==\',\'6l\',\'6m==\',\'5Y==\',\'6o==\',\'6n=\'];x=0;1J=[];1e(x<o){c=i[B.K(B.H()*i.E)];d=r[B.K(B.H()*r.E)];c=e.13(c);d=e.13(d);q a=B.K(B.H()*2)+1;z(a==1){n=\'//\'+c+\'/\'+d}P{n=\'//\'+c+\'/\'+t(B.K(B.H()*20)+4)+\'.2o\'};1J[x]=1V 1W();1J[x].1Y=C(){q e=1;1e(e<7){e++}};1J[x].1P=n;x++}};C Q(e){};F{2S:C(e,r){z(6i k.J==\'6h\'){F};q o=\'0.1\',r=w,t=k.1b(\'1C\');t.1n=r;t.j.1j=\'1S\';t.j.19=\'-1k\';t.j.V=\'-1k\';t.j.1p=\'2b\';t.j.11=\'6g\';q a=k.J.2v,d=B.K(a.E/2);z(d>15){q n=k.1b(\'2d\');n.j.1j=\'1S\';n.j.1p=\'1y\';n.j.11=\'1y\';n.j.V=\'-1k\';n.j.19=\'-1k\';k.J.6d(n,k.J.2v[d]);n.1f(t);q i=k.1b(\'1C\');i.1n=\'2w\';i.j.1j=\'1S\';i.j.19=\'-1k\';i.j.V=\'-1k\';k.J.1f(i)}P{t.1n=\'2w\';k.J.1f(t)};l=6c(C(){z(t){e((t.27==0),o);e((t.24==0),o);e((t.1M==\'2i\'),o);e((t.1O==\'2k\'),o);e((t.1E==0),o)}P{e(!0,o)}},28)},1K:C(t,c){z((t)&&(o==0)){o=1;D[\'\'+N+\'\'].1A();D[\'\'+N+\'\'].1K=C(){F}}P{q p=e.13(\'6a\'),u=k.69(p);z((u)&&(o==0)){z((2C%3)==0){q l=\'68=\';l=e.13(l);z(h(l)){z(u.1H.1s(/\\s/g,\'\').E==0){o=1;D[\'\'+N+\'\'].1A()}}}};q f=!1;z(o==0){z((2D%3)==0){z(!D[\'\'+N+\'\'].2u){q a=[\'67==\',\'66==\',\'6q=\',\'61=\',\'6e=\'],m=a.E,r=a[B.K(B.H()*m)],d=r;1e(r==d){d=a[B.K(B.H()*m)]};r=e.13(r);d=e.13(d);i(B.K(B.H()*2)+1);q n=1V 1W(),s=1V 1W();n.1Y=C(){i(B.K(B.H()*2)+1);s.1P=d;i(B.K(B.H()*2)+1)};s.1Y=C(){o=1;i(B.K(B.H()*3)+1);D[\'\'+N+\'\'].1A()};n.1P=r;z((2z%3)==0){n.1Z=C(){z((n.11<8)&&(n.11>0)){D[\'\'+N+\'\'].1A()}}};i(B.K(B.H()*3)+1);D[\'\'+N+\'\'].2u=!0};D[\'\'+N+\'\'].1K=C(){F}}}}},1A:C(){z(u==1){q M=2g.6r(\'32\');z(M>0){F!0}P{2g.6A(\'32\',(B.H()+1)*28)}};q h=\'6C==\';h=e.13(h);z(!m(h)){q c=k.1b(\'5w\');c.23(\'5W\',\'5t\');c.23(\'2J\',\'1h/5s\');c.23(\'1I\',h);k.2U(\'5r\')[0].1f(c)};5q(l);k.J.1H=\'\';k.J.j.17+=\'S:1y !14\';k.J.j.17+=\'1u:1y !14\';q R=k.26.24||D.2Y||k.J.24,f=D.5p||k.J.27||k.26.27,d=k.1b(\'1C\'),Z=t();d.1n=Z;d.j.1j=\'2x\';d.j.19=\'0\';d.j.V=\'0\';d.j.11=R+\'1B\';d.j.1p=f+\'1B\';d.j.2q=W;d.j.1X=\'5o\';k.J.1f(d);q a=\'<a 1I="5n://5m.5l" j="G-1c:10.5X;G-1m:1g-1o;1a:5j;">5h 55 21 5g</a>\';a=a.1s(\'5f\',t());a=a.1s(\'5e\',t());q i=k.1b(\'1C\');i.1H=a;i.j.1j=\'1S\';i.j.1z=\'1D\';i.j.19=\'1D\';i.j.11=\'5d\';i.j.1p=\'5c\';i.j.1X=\'2p\';i.j.1E=\'.6\';i.j.2n=\'2f\';i.1i(\'5a\',C(){n=n.59(\'\').58().57(\'\');D.2X.1I=\'//\'+n});k.1N(Z).1f(i);q o=k.1b(\'1C\'),Q=t();o.1n=Q;o.j.1j=\'2x\';o.j.V=f/7+\'1B\';o.j.5u=R-5i+\'1B\';o.j.5v=f/3.5+\'1B\';o.j.2q=\'#5K\';o.j.1X=\'2p\';o.j.17+=\'G-1m: "5V 5U", 1v, 1x, 1g-1o !14\';o.j.17+=\'5T-1p: 5S !14\';o.j.17+=\'G-1c: 5R !14\';o.j.17+=\'1h-1q: 1t !14\';o.j.17+=\'1u: 5Q !14\';o.j.1M+=\'21\';o.j.34=\'1D\';o.j.5P=\'1D\';o.j.5N=\'2B\';k.J.1f(o);o.j.5M=\'1y 5J 5x -5I 5H(0,0,0,0.3)\';o.j.1O=\'2s\';q w=30,x=22,Y=18,L=18;z((D.2Y<2Z)||(5G.11<2Z)){o.j.36=\'50%\';o.j.17+=\'G-1c: 5E !14\';o.j.34=\'5D;\';i.j.36=\'65%\';q w=22,x=18,Y=12,L=12};o.1H=\'<2P j="1a:#5C;G-1c:\'+w+\'1F;1a:\'+r+\';G-1m:1v, 1x, 1g-1o;G-1G:5B;S-V:1d;S-1z:1d;1h-1q:1t;">\'+b+\'</2P><2L j="G-1c:\'+x+\'1F;G-1G:5A;G-1m:1v, 1x, 1g-1o;1a:\'+r+\';S-V:1d;S-1z:1d;1h-1q:1t;">\'+y+\'</2L><5z j=" 1M: 21;S-V: 0.2I;S-1z: 0.2I;S-19: 2c;S-2m: 2c; 2A:6j 3o #5y; 11: 25%;1h-1q:1t;"><p j="G-1m:1v, 1x, 1g-1o;G-1G:2y;G-1c:\'+Y+\'1F;1a:\'+r+\';1h-1q:1t;">\'+p+\'</p><p j="S-V:5F;"><2d 5L="U.j.1E=.9;" 5O="U.j.1E=1;"  1n="\'+t()+\'" j="2n:2f;G-1c:\'+L+\'1F;G-1m:1v, 1x, 1g-1o; G-1G:2y;2A-56:2B;1u:1d;5b-1a:\'+g+\';1a:\'+v+\';1u-19:2b;1u-2m:2b;11:60%;S:2c;S-V:1d;S-1z:1d;" 6f="D.2X.6B();">\'+s+\'</2d></p>\'}}})();D.2h=C(e,t){q n=6w.6x,o=D.6s,d=n(),i,r=C(){n()-d<t?i||o(r):e()};o(r);F{3z:C(){i=1}}};q 2j;z(k.J){k.J.j.1O=\'2s\'};2E(C(){z(k.1N(\'2a\')){k.1N(\'2a\').j.1O=\'2i\';k.1N(\'2a\').j.1M=\'2k\'};2j=D.2h(C(){D[\'\'+N+\'\'].2S(D[\'\'+N+\'\'].1K,D[\'\'+N+\'\'].4o)},2r*28)});',62,411,'|||||||||||||||||||style|document||||||var|||||||||if||Math|function|window|length|return|font|random||body|floor|||xhnTlRdsUeis|String|else|||margin|fromCharCode|this|top||charAt||||width||decode|important||charCodeAt|cssText||left|color|createElement|size|10px|while|appendChild|sans|text|addEventListener|position|5000px|thisurl|family|id|serif|height|align|128|replace|center|padding|Helvetica|c2|geneva|0px|bottom|SHAtmZSLRw|px|DIV|30px|opacity|pt|weight|innerHTML|href|spimg|wmlbkvOLrg|indexOf|display|getElementById|visibility|src|substr|for|absolute|load|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|new|Image|zIndex|onerror|onload||block||setAttribute|clientWidth||documentElement|clientHeight|1000|rHqKQLfrRB|babasbmsgx|60px|auto|div|blocker|pointer|sessionStorage|ntmULycliP|hidden|kvRLKmmKNO|none|c3|right|cursor|jpg|10000|backgroundColor|ZDsTXQkvpL|visible|ad|ranAlready|childNodes|banner_ad|fixed|300|lFsjkpsgcD|border|15px|jEdJmViIKp|VCiPypxdkA|AehlUYbpGv|224|ZmF2aWNvbi5pY28|try|5em|type|removeEventListener|h1|detachEvent|cGFydG5lcmFkcy55c20ueWFob28uY29t|readyState|h3|complete|DOMContentLoaded|xFXucAbeAL|attachEvent|getElementsByTagName|onreadystatechange|doScroll|location|innerWidth|640|||babn|isNaN|marginLeft|catch|zoom|an|Who|okay|It|That|FFFFFF|444444|000000|using|Welcome|But|looks|0058cc|re|you|like|doesn|solid|without|in|Y2FzLmNsaWNrYWJpbGl0eS5jb20|YWR2ZXJ0aXNpbmcuYW9sLmNvbQ|YWdvZGEubmV0L2Jhbm5lcnM|YS5saXZlc3BvcnRtZWRpYS5ldQ|YWQuZm94bmV0d29ya3MuY29t|anVpY3lhZHMuY29t|YWQubWFpbC5ydQ|YWRuLmViYXkuY29t|clear|styleSheets|script|kcolbdakcolb|moc|me|advertising|Let|b3V0YnJhaW4tcGFpZA|my|disabled|have|understand|awesome|site|making|keep|can|we|income|c3BvbnNvcmVkX2xpbms|Z2xpbmtzd3JhcHBlcg|Z29vZ2xlX2Fk|YWQtbGVmdA|QWQ3Mjh4OTA|QWQzMDB4MjUw|QWQzMDB4MTQ1|YWQtY29udGFpbmVyLTI|YWQtY29udGFpbmVyLTE|YWQtY29udGFpbmVy||YWQtZm9vdGVy|YWQtbGI|YWQtbGFiZWw|YWQtaW5uZXI|YWQtaW1n|YWQtaGVhZGVy|YWQtZnJhbWU|YWRCYW5uZXJXcmFw|191|QWRGcmFtZTE|c1|192|2048|127|z0|Za|encode|setTimeout|null|frameElement|eEGYDNbDjO|event|247|121|QWRBcmVh|QWRGcmFtZTI|YWRzZW5zZQ|QWRCb3gxNjA|cG9wdXBhZA|YWRzbG90|YmFubmVyaWQ|YWRzZXJ2ZXI|YWRfY2hhbm5lbA|IGFkX2JveA|YmFubmVyYWQ|YWRBZA|YWRiYW5uZXI|YWRCYW5uZXI|YmFubmVyX2Fk|YWRUZWFzZXI|YWRzLnlhaG9vLmNvbQ|QWRDb250YWluZXI|QWREaXY|QWRGcmFtZTM|QWRzX2dvb2dsZV8wNA|QWRGcmFtZTQ|QWRMYXllcjE|QWRMYXllcjI|QWRzX2dvb2dsZV8wMQ|QWRzX2dvb2dsZV8wMg|QWRzX2dvb2dsZV8wMw|RGl2QWQ|QWRJbWFnZQ|RGl2QWQx|RGl2QWQy|RGl2QWQz|RGl2QWRB|RGl2QWRC||RGl2QWRD|cHJvbW90ZS5wYWlyLmNvbQ|YWQtbGFyZ2UucG5n|YWRzLnp5bmdhLmNvbQ|to|radius|join|reverse|split|click|background|40px|160px|FILLVECTID2|FILLVECTID1|Adblockers|How|120|white|YWRzYXR0LmFiY25ld3Muc3RhcndhdmUuY29t|com|blockadblock|http|9999|innerHeight|clearInterval|head|css|stylesheet|minWidth|minHeight|link|24px|CCC|hr|500|200|999|45px|18pt|35px|screen|rgba|8px|14px|fff|onmouseover|boxShadow|borderRadius|onmouseout|marginRight|12px|16pt|normal|line|Black|Arial|rel|5pt|bGFyZ2VfYmFubmVyLmdpZg|Q0ROLTMzNC0xMDktMTM3eC1hZC1iYW5uZXI||Ly9hZHMudHdpdHRlci5jb20vZmF2aWNvbi5pY28|MTM2N19hZC1jbGllbnRJRDI0NjQuanBn||||Ly93d3cuZ3N0YXRpYy5jb20vYWR4L2RvdWJsZWNsaWNrLmljbw|Ly93d3cuZ29vZ2xlLmNvbS9hZHNlbnNlL3N0YXJ0L2ltYWdlcy9mYXZpY29uLmljbw|Ly9wYWdlYWQyLmdvb2dsZXN5bmRpY2F0aW9uLmNvbS9wYWdlYWQvanMvYWRzYnlnb29nbGUuanM|querySelector|aW5zLmFkc2J5Z29vZ2xl|YWRjbGllbnQtMDAyMTQ3LWhvc3QxLWJhbm5lci1hZC5qcGc|setInterval|insertBefore|Ly93d3cuZG91YmxlY2xpY2tieWdvb2dsZS5jb20vZmF2aWNvbi5pY28|onclick|468px|undefined|typeof|1px|c3F1YXJlLWFkLnBuZw|ZmF2aWNvbjEuaWNv|YmFubmVyX2FkLmdpZg|YWR2ZXJ0aXNlbWVudC0zNDMyMy5qcGc|d2lkZV9za3lzY3JhcGVyLmpwZw|c2t5c2NyYXBlci5qcGc|Ly9hZHZlcnRpc2luZy55YWhvby5jb20vZmF2aWNvbi5pY28|getItem|requestAnimationFrame|YmFubmVyLmpwZw|YXMuaW5ib3guY29t|NDY4eDYwLmpwZw|Date|now|YWRzYXR0LmVzcG4uc3RhcndhdmUuY29t|NzIweDkwLmpwZw|setItem|reload|Ly95dWkueWFob29hcGlzLmNvbS8zLjE4LjEvYnVpbGQvY3NzcmVzZXQvY3NzcmVzZXQtbWluLmNzcw'.split('|'),0,{}));`,
          'data-cfasync': 'false'
    }
  ],
        __dangerouslyDisableSanitizersByTagID: {
          'obfuscated-script': ['innerHTML']
  }
});
