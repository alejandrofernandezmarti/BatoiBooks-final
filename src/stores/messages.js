import { defineStore } from 'pinia'
import ModulesRepository from '../repositories/modules.repository.js'


export const messagesStore = defineStore('messagesStore', {
    state() {
        return {
            messages: [],
            modules:  [],
            cartBooks: [],
        }
    },
    getters: {

    },

    actions: {
        isBookInCart(id) {
            return  this.cartBooks.find(cartBook => cartBook && cartBook.id === id);
        },
        addBook(message,book) {
            this.addMessage(message)
            this.cartBooks.push(book)
            localStorage.setItem('cartBooks',JSON.stringify(this.cartBooks));
        },
        delBookCart(index) {
            this.cartBooks.splice(index, 1);
            localStorage.setItem('cartBooks',JSON.stringify(this.cartBooks));
        },
        addMessage(message) {
            this.messages.push(message);
        },
        delMessage(index) {
            this.messages.splice(index, 1);
        },
        async loadModules(){
            const ModuleRepository = new ModulesRepository()
            try {
                this.modules = await ModuleRepository.getAllModules()
            } catch (error) {
                alert(error)
            }
        },

        getModuleByCode(code){
            return this.modules.find(module => module['code'] === code) || {}
        },
        realizarCompra() {
            this.addMessage('Compra realizada. Gracias por tu compra.');
            this.cartBooks = [];
            localStorage.removeItem('cartBooks')
        },
        vaciarCarrito() {
            this.cartBooks = [];
            localStorage.removeItem('cartBooks');

        },
        restartBooks(){
            this.cartBooks = JSON.parse(localStorage.getItem('cartBooks')) || []
        }


    }
});


