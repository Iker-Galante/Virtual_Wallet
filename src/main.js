/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import { initializeStores } from '@/Stores/GlobalStore'
// import { useBalanceStore } from '@/Stores/BalanceStore'
// import { useMovementStore } from '@/Stores/MovementStore'
// import { useProfileStore } from '@/Stores/ProfileStore'

const app = createApp(App)

// const movement = { useMovementStore }
// const profile = { useProfileStore }
// const balance = { useBalanceStore }

// initializeStores(movement, profile, balance)

registerPlugins(app)

app.mount('#app')
