
<template>
  <div id="list">
    <book-item :book="book" v-for="book in books" @del-book="delBook" @add-book="addBook">
    </book-item>

  </div>
</template>
<script>
import BooksRepository from "../repositories/books.repository.js";
import BookItem from "../components/BookItem.vue";
import {store} from "@/store/index.js";
export default {
  data() {
    return {
      books:[]
    }
  },
  computed: {
    messages() {
      return store.state.messages
    }
  },
  async mounted() {
    const bookRepo = new BooksRepository()
    try {
      this.books = await bookRepo.getAllBooks()
    } catch (error) {
      alert(error)
    }
  },
  components:{
    BookItem
  },
  methods: {
    async delBook(id) {
      await BooksRepository.removeBook(id)
      let ind = this.books.findIndex(Book => Book.id === id);
      if (ind >= 0){
        this.books.splice(ind,1);
        store.addMessage('El libro con id '+id+'  ha sido eliminado')
      }else {
        throw new Error("No se ha encontrado el id");
      }
      return {};
    },
    addBook(id){
      store.addMessage('El libro con id '+id+'  ha sido añadido al carrito')
    }
  },


}

</script>
<style>
#list{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  margin: 0 auto;
  font-size: 22px;
}
</style>


