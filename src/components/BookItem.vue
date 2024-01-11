<template>
  <div class="container">
    <h5>ID {{book.id}}</h5>
    <h5>{{book.idModule}}</h5>
    <h6>{{book.publisher}}</h6>
    <p>Precio: {{book.price}}</p>
    <p>Páginas: {{book.pages}}</p>
    <p>Estado: {{book.status}}</p>
    <p>{{ book.soldDate ? 'Vendido el ' + book.soldDate : 'En venta' }}</p>
    <p>Comentarios: {{book.comments}}</p>
    <div class="botones">
      <button class="add"  @click="addBook(book)">
        <span class="material-icons">add_shopping_cart</span>
      </button>
      <button class="edit"  @click="$router.push('edit/' + book.id)">
        <span class="material-icons">edit</span>
      </button>
      <button class="delete"  @click="delBook(book)">
        <span class="material-icons">delete</span>
      </button>


    </div>
  </div>
</template>

<script>
export default {
  props: ['book'],
  methods: {
    delBook(book) {
      if(confirm("Quieres borrar el libro con id " +book.id + " y codigo "+ book.idModule)) {
        this.$emit('delBook',book.id)
      }

    },
    addBook(book) {
      this.$emit('addBook',book.id)
    }
  },
}


</script>

<style>
.container {
  border: solid black;
  background-color: #84d0ff;
  border-radius: 20px;
  padding: 20px;
}
</style>