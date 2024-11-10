<template>
  <q-input
    v-model="message"
    class="rounded-borders bg-grey-2 no-box-shadow text-black text-h6 text-center"
    outlined
    type="textarea"
    autogrow
    @keydown.enter="sendMessage"
  >
    <template #append>
      <q-btn
        no-caps
        push
        class="no-box-shadow"
        color="primary"
        dense
        @click="sendMessage"
      >
        <q-icon name="arrow_upward" />
      </q-btn>
    </template>
  </q-input>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import {useChatStore} from "@/store/index.js";
import {transformSendedMessage} from "@/helpers/index.js";
import {ref} from "vue";

const router = useRouter()
const chat = useChatStore()
const message = ref('')

async function sendMessage(event) {
  event.preventDefault()
  await router.push('/chat')

  const temp = message.value
  message.value = ''

  await chat.sendMessage(transformSendedMessage(temp))
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 100);
}
</script>
