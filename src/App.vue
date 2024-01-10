<script>
import AppAbout from './components/AppAbout.vue'
import AppMenu from './components/AppMenu.vue'
import BookForm from './components/BookForm.vue'
import BookList from './components/BookList.vue';
import AppCart from './components/AppCart.vue';
import AppMessages from './components/AppMessages.vue';
export default {
  components: {
    AppAbout,
    AppMenu,
    BookForm,
    BookList,
    AppCart,
    AppMessages
  }
}
</script>

<template>
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Título de la página</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link rel="stylesheet" />
    </head>
    <body>


      <AppMenu></AppMenu>


      <div class="content">
        <AppMessages></AppMessages>
        <book-list></book-list>

        <br>
        <book-form></book-form>
        <app-cart></app-cart>
        <AppAbout></AppAbout>
      </div>
    </body>
  </html>
</template>

<style scoped>
.content {
  padding: 40px;
  width: 88%; /* Establece un ancho para que no se solape con el menú lateral */
  margin-left: 10%;/* Agrega un margen izquierdo para que el contenido no se superponga con el menú */
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
