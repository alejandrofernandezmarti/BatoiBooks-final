<script>
import AppAbout from './views/AppAbout.vue'
import AppMenu from './components/AppMenu.vue'
import BookForm from './views/BookForm.vue'
import BookList from './views/BookList.vue';
import AppCart from './views/AppCart.vue';
import AppMessages from './components/AppMessages.vue';
import {mapActions, mapState} from "pinia";
import {messagesStore} from "@/stores/messages.js";
export default {
  components: {
    AppAbout,
    AppMenu,
    BookForm,
    BookList,
    AppCart,
    AppMessages
  },
  mounted() {
    this.loadModules()
    this.restartBooks()

  },
  methods: {
    ...mapActions(messagesStore, ["loadModules",'restartBooks']),
  },

}
</script>

<template>
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport"  />
      <title>Título de la página</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link rel="stylesheet" />
    </head>
    <body>


      <AppMenu></AppMenu>


      <div class="content">
        <AppMessages></AppMessages>
        <router-view></router-view>
      </div>
    </body>
  </html>
</template>

<style scoped>
.content {
  padding: 40px;
  width: 87%; /* Establece un ancho para que no se solape con el menú lateral */
  margin-left: 10%;/* Agrega un margen izquierdo para que el contenido no se superponga con el menú */
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
