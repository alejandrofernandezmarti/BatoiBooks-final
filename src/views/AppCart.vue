<script>

import {defineComponent} from "vue";
import BookItem from "@/components/BookItem.vue";
import {mapActions, mapState} from "pinia";
import {messagesStore} from "@/stores/messages.js";
import BooksRepository from "@/repositories/books.repository.js";

export default defineComponent({
  components: {BookItem},
  computed: {
    ...mapState(messagesStore,{cartBooks:'cartBooks'}),
    totalLibros() {
      return this.cartBooks.length;
    },
    totalImporte() {
      return this.cartBooks.reduce((total, book) => total + book.price, 0);
    },
  },
  methods: {
    ...mapActions(messagesStore,["delBookCart",'realizarCompra','vaciarCarrito']),

  },
})
</script>

<template>
  <h1>Libros en el carrito</h1>
  <div id="list">
  <book-item :book="book" v-for="(book,index) in cartBooks" id="carta">
    <button class="delete"  @click="delBookCart(index)">
      <span class="material-icons">delete</span>
    </button>
  </book-item>
  </div>
  <div id="options">
    <p v-if="cartBooks.length > 0">
      Total de libros en el carrito: {{ totalLibros }}
    </p>
    <h1 v-else>
      Todavía no hay libros en el carrito.
    </h1>

    <p v-if="cartBooks.length > 0">
      Importe total a pagar: {{ totalImporte }} €
    </p>
    <button v-if="cartBooks.length > 0" class="realizar-compra" @click="realizarCompra">
      Realizar compra
    </button>
    <button v-if="cartBooks.length > 0" class="vaciar-carrito" @click="vaciarCarrito">
      Vaciar carrito
    </button>
  </div>
</template>

<style>
#list{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  margin: 0 auto;
  font-size: 22px;
  text-align: center;
}
#carta{
  background-color: #c7c7c7;
}
#options {
  height: 8%;
  position: fixed;
  bottom: 0;
  left: 11%;
  width: 88%;
  background-color: #f0f5f9;
  padding: 15px;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#options p {
  margin-right: 100px;
  color: #4a4a4a;
}

.realizar-compra,
.vaciar-carrito {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.realizar-compra:hover,
.vaciar-carrito:hover {
  background-color: #2980b9;
}
</style>