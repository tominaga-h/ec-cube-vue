import { createInertiaApp } from '@inertiajs/vue3';
import { createApp, h } from 'vue';
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify();

createInertiaApp({
  resolve: async (name: string) => {
    return await import(`./pages/${name}.vue`).then((module) => module.default);
  },
  setup({ el, App, props, plugin }) {
    const app = createApp({
      render: () => h(App, props),
    });
    app.use(plugin);
    app.use(vuetify);
    app.mount(el);
  },
})
