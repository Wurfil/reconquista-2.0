<template>
  <q-input
    v-model="message"
    class="rounded-borders bg-grey-2 no-box-shadow text-black tw-text-base text-center"
    outlined
    dense
    type="search"
    placeholder="Ваше сообщение здесь"
    autogrow
    @keydown.enter="sendMessage"
  >
    <template #append>
      <q-btn
        no-caps
        color="primary"
        dense
        size="12px"
        round
        unelevated
        @click="sendMessage"
      >
        <q-icon
          size="16px"
          name="arrow_upward"
        />
      </q-btn>
    </template>
  </q-input>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {useChatStore} from "@/store/index.js";
import {transformSendedMessage} from "@/helpers/index.js";
import {ref} from "vue";

const router = useRouter()
const chat = useChatStore()
const message = ref('')

async function sendMessage(event) {
  if (message.value.length > 3) {
    event.preventDefault()
    event.target.blur()

    await router.push('/chat')

    const temp = message.value
    message.value = ''
    window.scrollTo(0, document.body.scrollHeight);

    await chat.sendMessage(transformSendedMessage(temp))
    if (document.body.scrollHeight > window.innerHeight) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
}
</script>
