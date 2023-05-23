import './set-public-path';
import './assets/main.css'

import { h, createApp } from 'vue'
import { createPinia } from 'pinia'
import singleSpaVue from 'single-spa-vue'

import App from './App.vue'
import router from './router'

const vueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
      render(): ReturnType<typeof h> {
        return h(App, {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecycle-props
          // @ts-ignore
          name: this.name,
          // @ts-ignore
          mountParcel: this.mountParcel,
          // @ts-ignore
          singleSpa: this.singleSpa,
        });
      },
    },
    handleInstance: (app: any) => {
        app.use(createPinia());
        app.use(router);
      }    
  })

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
