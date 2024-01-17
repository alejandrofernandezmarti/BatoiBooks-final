<script setup>
</script>

<template>
  <nav class="sidebar">
    <div>
      <img src="/logoBatoi.png" class="logo" alt="Vite logo" />
    </div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><RouterLink to="/addBook">Añadir Libro</RouterLink></li>
      <li><RouterLink to="/carrito">Carrito</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  /* Establece una posición fija */
  background-color: #9ca7ad;
  color: #fff;
  font-size: 20px;
  text-align: center;
  padding: 10px;
  width: 10%;   /* Establece el ancho del menú, a un 20% de la ventana */
  height: 100%;  /* Establece la altura completa de la ventana */
  position: fixed; /* Fija el menú en la parte superior */
  top: 0;
  left: 0;
}
.sidebar a{
  color: blue;
}
.sidebar ul{
  margin-top: 50%;
}
.sidebar li{
  border: solid white 1px;
}


</style>
