import { createInertiaApp } from '@inertiajs/vue3';
import { createApp, h } from 'vue';

createInertiaApp({
  resolve: async (name: string) => {
    return await import(`./pages/${name}.vue`).then((module) => module.default);
  },
  setup({ el, App, props, plugin }) {
    const app = createApp({
      render: () => h(App, props),
    })
    app.use(plugin)
    app.mount(el)
  },
})
