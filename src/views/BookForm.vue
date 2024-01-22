<script>
import BooksRepository from "../repositories/books.repository.js";
import {messagesStore} from "@/stores/messages.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import {mapActions, mapState} from "pinia";
import * as yup from 'yup';

export default {
  props: ['id'],

  data() {
    const mySchema = yup.object({
      publisher: yup.string().required('El campo de Editorial es obligatorio'),
      bookPrice: yup.number().required('Tienes que indicar un precio para el libro').min(1,'El precio minimo para un libro es 1'),
      bookPages: yup.number().required('Indica el numero de páginas del libro').min(1,'El libro de tener minimo una página'),
      bookStat: yup.string().required('Selecciona el estado del libro'),
      idModule: yup.string().required('Selecciona un módulo para el libro'),
    })
    return {
      book: {idModule:''},
      repository: new BooksRepository(),
      mySchema
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

    onSubmit(values) {
      console.log(values);
    },

    async loadBook() {
      try {
        this.book = await this.repository.getBookById(this.id)
      } catch (error) {
        this.addMessage(error.message)
      }

    },


  }

}
</script>

<template>
  <Form id="bookForm" :initial-values="book" @submit="onSubmit" :validation-schema="mySchema">
    <legend class="legend">{{  formTitle }}</legend>
    <div id="idBook" class="hidden">
      <label for="bookId" class="hidden">ID:</label>
      <Field type="text" v-model="book.id" readonly  name="bookID"/><br />
      <ErrorMessage name="bookID"></ErrorMessage>
    </div>
    <div>
      <label for="idModule" >Módulo:</label><br>
      <Field as="select" name="idModule" v-model="book.idModule" required>
        <option value="">- Selecciona un módulo -</option>
        <option v-for="module in modules" :key="module.code" :value="module.code">
          {{ module.cliteral }}
        </option>
      </Field><br>
      <ErrorMessage class="error" name="idModule"></ErrorMessage><br /><br>
    </div>

    <div>
      <label for="publisher">Editorial:</label>
      <Field type="text" v-model="book.publisher" required  name="publisher"/><br />
      <ErrorMessage name="publisher"></ErrorMessage><br>
    </div>

    <div>
      <label for="price">Precio:</label>
      <Field
        type="number"
        v-model="book.price"
        required
        min="0"
        step="0.01"
        pattern="\d+(\.\d{2})?"
       name="bookPrice"/><br />
      <ErrorMessage name="bookPrice"></ErrorMessage><br>
    </div>

    <div>
      <label for="pages">Páginas:</label>
      <Field type="number" v-model="book.pages" required min="0"  name="bookPages"/><br />
      <ErrorMessage name="bookPages"></ErrorMessage><br>
    </div>

    <label>Estado:</label>
    <div class="options">
      <Field v-model="book.status" type="radio" id="Nuevo" name="bookStat" value="Nuevo" required />
      <label for="Nuevo">Nuevo</label>
      <Field v-model="book.status" type="radio" name="bookStat" id="Usado" value="Usado" />
      <label for="Usado">Usado</label>
      <Field v-model="book.status" type="radio" name="bookStat" id="Roto" value="Roto" />
      <label for="Roto">Roto</label>
      <ErrorMessage name="bookStat"></ErrorMessage>
    </div>

    <div>
      <label for="comments">Comentarios:</label>
      <textarea v-model="book.comments" id="comments"></textarea>
      <span class="error"></span>
    </div>

    <button type="submit">{{ formButtonTitle }}</button>
    <button type="reset">Reset</button>
  </Form>
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
