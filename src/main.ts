import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@mdi/font/css/materialdesignicons.css'

// vuetify
import 'vuetify/styles'
import {createVuetify} from "vuetify";
import * as components from "vuetify/components"
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)


const vuetify = createVuetify({
  components,
  directives: directives,
  icons: {
    defaultSet: "mdi"
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')