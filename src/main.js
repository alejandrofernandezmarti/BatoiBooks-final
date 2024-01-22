import './assets/main.css'
import { createPinia } from 'pinia'
import { Field, Form, ErrorMessage } from 'vee-validate';
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App).use(createPinia()).use(router)
app.component('Field', Field);
app.component('Form', Form);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app')
