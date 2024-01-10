import { reactive } from 'vue'

export const store = {
    debug: true,
    state: reactive({
        messages: [],
    }),

    addMessage(message){
        this.state.messages.push(message)
    },

    delMessage(index) {
        this.state.messages.splice(index,1)
    },

}