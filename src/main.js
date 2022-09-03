import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import { useStoreUsers } from './stores/users'
import { loadFonts } from './plugins/webfontloader'



loadFonts()



const app = createApp(App)
app.use(router)
app.use(createPinia())

const {isAuthState} = useStoreUsers();
isAuthState();

app.use(vuetify)
app.mount('#app')
