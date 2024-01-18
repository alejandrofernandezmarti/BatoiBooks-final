<script>
import ModulesRepository from '../repositories/modules.repository.js'
import BooksRepository from "../repositories/books.repository.js";
import {messagesStore} from "@/stores/messages.js";
import {mapActions, mapState} from "pinia";

export default {
  props: ['id'],

  data() {
    return {
      book: {idModule:''},
      repository: new BooksRepository()
    }
  },
  computed:{
    ...mapState(messagesStore,{modules: 'modules'}),
    editing() {
      return !!this.id
    },
    formTitle() {
      return this.editing
          ? 'Editar libro'
          : 'Añadir libro'
    },
    formButtonTitle() {
      return this.editing
          ? 'Editar'
          : 'Añadir'
    },
  },

  async mounted() {

    if (this.editing) {
      await this.loadBook()
    } else {
      this.book = { idModule: '' }
    }


  },
  methods:{
    ...mapActions(messagesStore,['addMessage']),


    async loadBook() {
      try {
        this.book = await this.repository.getBookById(this.id)
      } catch (error) {
        this.addMessage(error.message)
      }

    },
    async handleSubmit() {
      try {
        if (this.editing) {
          await this.repository.changeBook(this.book)
        } else {
          this.book.idUser = 33;
          await this.repository.addBook(this.book)
        }
        this.book = {}
        this.$router.push('/')
      } catch (error) {
        this.addMessage(error.message)
      }

    },
    handleReset() {
      if (this.editing) {
        this.loadBook()
      } else {
        this.book = { idModule: '' }
      }
    }

  }

}
</script>

<template>
  <form id="bookForm" @submit.prevent="handleSubmit"
        @reset.prevent="handleReset" novalidate>
    <legend class="legend">{{  formTitle }}</legend>
    <div id="idBook" class="hidden">
      <label for="bookId" class="hidden">ID:</label>
      <input type="text" v-model="book.id" readonly /><br />
      <span class="error"></span>
    </div>
    <div>
      <label for="id-module">Módulo:</label>
      <select v-model="book.idModule" required>
        <option value="">- Selecciona un módulo -</option>
        <option v-for="module in modules" :key="module.code" :value="module.code">
          {{ module.cliteral }}
        </option>
      </select>
      <span class="error"></span><br />
    </div>

    <div>
      <label for="publisher">Editorial:</label>
      <input type="text" v-model="book.publisher" required /><br />
      <span class="error"></span>
    </div>

    <div>
      <label for="price">Precio:</label>
      <input
        type="number"
        v-model="book.price"
        required
        min="0"
        step="0.01"
        pattern="\d+(\.\d{2})?"
      /><br />
      <span class="error"></span>
    </div>

    <div>
      <label for="pages">Páginas:</label>
      <input type="number" v-model="book.pages" required min="0" /><br />
      <span class="error"></span>
    </div>

    <label>Estado:</label>
    <div class="options">
      <input v-model="book.status" type="radio" id="Nuevo" name="bookStat" value="Nuevo" required />
      <label for="Nuevo">Nuevo</label>
      <input v-model="book.status" type="radio" name="bookStat" id="Usado" value="Usado" />
      <label for="Usado">Usado</label>
      <input v-model="book.status" type="radio" name="bookStat" id="Roto" value="Roto" />
      <label for="Roto">Roto</label>
      <span class="error"></span>
    </div>

    <div>
      <label for="comments">Comentarios:</label>
      <textarea v-model="book.comments" id="comments"></textarea>
      <span class="error"></span>
    </div>

    <button type="submit">{{ formButtonTitle }}</button>
    <button type="reset">Reset</button>
  </form>
</template>

<style scoped>
legend{
  font-size: 35px;
  margin-bottom: 15px;
  color: #00b0ff;
}
label {
  font-weight: bold;
}

button {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
#form {
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

#bookForm {
  font-family: Arial, sans-serif;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select, input[type="text"], input[type="number"], textarea {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
}

select {
  background-color: #f9f9f9;
}
.options{
  display: flex; /* Utilizamos flexbox para alinear los elementos en una sola línea */
  align-items: center; /* Alinea verticalmente los elementos en el centro */
  justify-content: center;
}
.options label {
  margin-right: 10px;
}

.options input[type="radio"] {
  margin-right: 5px;
  margin-bottom: 10px;
}

</style>
