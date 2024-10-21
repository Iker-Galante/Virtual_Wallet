/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/Router'
import { createPinia } from 'pinia'

export function registerPlugins (app) {
  app.use(vuetify).use(router).use(createPinia())
}
