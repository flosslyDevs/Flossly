import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import 'vuetify/styles' // Ensure global styles are loaded

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const theme = {
    dark: false,
    colors: config.public.colors,
  };
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      options: {
        customProperties: true,
      },
      defaultTheme: "theme",
      themes: {
        theme,
      },
    },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
