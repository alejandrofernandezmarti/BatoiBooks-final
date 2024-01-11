import { createWebHistory, createRouter } from 'vue-router'

import BookForm from "@/views/BookForm.vue";
import AppCart from '../views/AppCart.vue'
import BookList from "@/views/BookList.vue";
import AppAbout from "@/views/AppAbout.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: BookList
    }, {
        path: '/books',
        name: 'Books',
        component: BookList
    },{
        path: '/edit/:id',
        name: 'Editar libro',
        component: BookForm,
        props: true
    },{
        path: '/addBook',
        name: 'Añadir Libro',
        component: BookForm
    },{
        path: '/carrito',
        name: 'Carrito',
        component: AppCart
    },{
        path: '/about',
        name: 'About',
        component: AppAbout
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router