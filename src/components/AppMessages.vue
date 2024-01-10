<script >
  import {store} from "@/store/index.js";

  export default {
    computed: {
      messages() {
        return store.state.messages
      }
    },
    methods: {
      delMessage(index) {
        store.delMessage(index)
      }
    },

  }
</script>

<template>
  <div id="message" >
    <div v-for="(message,index) in messages" class="message-item">{{message}}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="delMessage(index)">x</button></div>
  </div>
</template>
<style>
/* Estilos para el contenedor de mensajes */
.message-container {
  width: 100%;
  max-width: 500px; /* Ajusta el ancho máximo según tus preferencias */
  margin: 0 auto;
  padding: 20px;
}

/* Estilos para cada mensaje individual */
.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa; /* Color de fondo del mensaje */
  border: 1px solid #ced4da; /* Borde del mensaje */
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

/* Estilos para el botón de cierre */
.btn-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #dc3545; /* Color del botón de cierre */
  font-size: 16px;
}

</style>