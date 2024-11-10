import { defineStore } from 'pinia'
import {getAnswer} from "@/store/api.js";
import {http} from "@/service/api.js";

export const useChatStore = defineStore('chat', {
    state: () => ({
        currentChatHistory: [],
        loading: false,
        openImage: ''
    }),
    actions: {
        async sendMessage(message) {
            this.currentChatHistory.push(message)
            this.loading = true
            const answer = await getAnswer(message.content)

            const pettyAnswer = {
                type: 'ai',
                content: answer.data.answer,
                pic: answer.data.context[0].base64,
                context: answer.data.context,
                date: new Date()
            }
            this.currentChatHistory.push(pettyAnswer)
            this.loading = false

        },
    },
})
