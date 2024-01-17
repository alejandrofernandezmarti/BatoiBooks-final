<script>


import {mapActions} from "pinia";
import {messagesStore} from "@/stores/messages.js";

export default {
  props: ['book'],

  methods: {
    ...mapActions(messagesStore,["getModuleByCode"]),

    delBook(book) {
      if(confirm("Quieres borrar el libro con id " +book.id + " y codigo "+ book.idModule)) {
        this.$emit('delBook',book.id)
      }

    },
    addBook(book) {
      this.$emit('addBook',book)
    }
  },
}


</script>

<template>
  <div class="container">
    <h5>ID {{book.id}}</h5>
    <h5>{{ getModuleByCode(book.idModule).cliteral }}</h5>
    <h6>{{book.publisher}}</h6>
    <p>Precio: {{book.price}}</p>
    <p>Páginas: {{book.pages}}</p>
    <p>Estado: {{book.status}}</p>
    <p>{{ book.soldDate ? 'Vendido el ' + book.soldDate : 'En venta' }}</p>
    <p>Comentarios: {{book.comments}}</p>
    <div class="botones">
      <slot></slot>

    </div>
  </div>
</template>



<style>
.container {
  border: solid black;
  background-color: #84d0ff;
  border-radius: 20px;
  padding: 20px;
}
</style>