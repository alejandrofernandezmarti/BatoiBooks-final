
<template>
  <div id="list">
    <book-item :book="book" v-for="book in books" @del-book="delBook">
      <button  v-if="!isBookInCart(book.id)" class="add"  @click="adddBook(book)">
      <span class="material-icons">add_shopping_cart</span>
      </button>

      <button class="edit"  @click="$router.push('/edit/' + book.id)">
        <span class="material-icons">edit</span>
      </button>
      <button class="delete"  @click="delBook(book)">
        <span class="material-icons">delete</span>
      </button>
    </book-item>

  </div>
</template>
<script>
import BooksRepository from "../repositories/books.repository.js";
import BookItem from "../components/BookItem.vue";
import {messagesStore} from "@/stores/messages.js";
import {mapActions, mapState} from "pinia";

export default {
  data() {
    return {
      books:[]
    }
  },
  computed: {
    ...mapState(messagesStore,{messages: 'messages',modules:'modules'}),
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
    ...mapActions(messagesStore,["addBook",'isBookInCart','addMessage']),

    async delBook(book) {
      if(confirm("Quieres borrar el libro con id " +book.id + " y codigo "+ book.idModule)){
        await BooksRepository.removeBook(book.id)
        let ind = this.books.findIndex(Book => Book.id === book.id);
        if (ind >= 0){
          this.books.splice(ind,1);
          this.addMessage('El libro con id '+book.id+'  ha sido eliminado')
        }else {
          throw new Error("No se ha encontrado el id");
        }
        return {};
      }

    },
    adddBook(book){
      this.addBook('El libro con id '+book.id+'  ha sido añadido al carrito',book)
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
  text-align: center;
}
</style>


