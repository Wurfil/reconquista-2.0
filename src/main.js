// FILE: main.js

import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import router from './router'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeIn.css
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
import 'quasar/src/css/index.sass'
import './index.css'
// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)
app.use(Quasar, {
    plugins: {
        Notify: {}
    }, // import Quasar plugins and add here
    config: {
        brand: {
            // ... or all other brand colors
        },
        // notify: {...}, // default set of options for Notify Quasar plugin
        // loading: {...}, // default set of options for Loading Quasar plugin
        // loadingBar: { ... }, // settings for LoadingBar Quasar plugin
        // ..and many more (check Installation card on each Quasar component/directive/plugin)
    }
})
app.use(pinia)
app.use(router)
app.mount('#app')
