<template>
  <div
    v-if="loadingChat"
    class="tw-flex tw-justify-center"
  >
    <q-spinner size="36" />
  </div>
  <div
    v-for="chat in chatStore.currentChatHistory"
    :key="chat"
  >
    <q-chat-message
      v-if="chat.type === 'ai'"
      class="tw-text-base tw-pr-0 laptop:tw-pr-28 before:tw-content-none "
      bg-color="white"
      text-color="black"
    >
      <template #name>
        <p class="tw-text-sm tw-opacity-50 tw-mb-2">
          Бот
        </p>
      </template>

      <template #stamp>
        {{ chat.date ? format(new Date(chat.date), 'HH:mm') : '' }}
      </template>
      <div>
        <p
          class="tw-p-1 tw-mb-2"
          v-html="chat.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"
        />
        <q-img
          v-if="chat.pic"
          :src="`data:image/png;base64, ${chat.pic}`"
          alt="Base64 Image"
          class="gallery-image tw-mb-2 cursor-pointer"
          @click="openFullScreen(`data:image/png;base64, ${chat.pic}`)"
        >
          <q-btn
            v-if="chat.fullAnswer !== 'Я не знаю.' && !!chat.fullAnswer"
            dense
            flat
            color="primary"
            no-caps
            @click="openAdditional(chat)"
          >
            Подробнее
          </q-btn>
        </q-img>
        <q-btn
          no-caps
          flat
          color="primary"
          @click="moreInfo()"
        >
          Подробнее
        </q-btn>
      </div>
    </q-chat-message>

    <q-chat-message
      v-else
      class="tw-text-base tw-ml-16 tablet:tw-pl-40 before:tw-content-none"
      bg-color="primary"
      text-color="white"
      sent
    >
      <template #name>
        <p class="tw-text-sm tw-opacity-50 tw-mb-2">
          Вы
        </p>
      </template>
      <template #avatar />
      <template #stamp>
        {{ chat.date ? format(new Date(chat.date), 'HH:mm') : '' }}
      </template>

      <p class="tw-p-1">
        {{ chat.content }}
      </p>
    </q-chat-message>
  </div>
  <q-chat-message
    v-if="chatStore.loading"
    class="tw-text-base tw-border-primary"
    bg-color="white"
    style="border: none"
    text-color="gray"
  >
    <template #name>
      <strong class="tw-text-sm tw-font-normal tw-opacity-50 tw-mb-2">
        Бот
      </strong>
    </template>
    <div class="tw-py-1">
      <q-spinner-dots size="2rem" />
    </div>
  </q-chat-message>
  <div
    id="overlay"
    class="overlay"
    @click="closeFullScreen()"
  >
    <q-img
      id="fullScreenImage"
      :src="openImage"
      class="overlay-image cursor-pointer"
    />
  </div>
</template>

<script setup>
import { format } from 'date-fns';
import {ref, watch} from "vue";
import {useChatStore} from "@/store/index.js";
const openImage = ref('')
const openAdditionalModal = ref({
  fullAnswer: '',
  question: '',
});
const chatStore = useChatStore()

function moreInfo() {

}
function openFullScreen(img) {
  const overlay = document.getElementById('overlay');
  openImage.value = img; // Устанавливаем источник изображения
  overlay.style.display = 'flex'; // Показываем оверлей
}

function closeFullScreen() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none'; // Скрываем оверлей
}
const question = ref('');
const loadingChat = ref(false);

// watch(() => chatID.value, async () => {
//   if (!isNewChatID.value) {
//     if (chatID.value) {
//       loadingChat.value = true;
//       chatTree.value = await getChat(chatID.value);
//       loadingChat.value = false;
//     } else {
//       chatTree.value = [];
//     }
//   }
// });
const isOpenAdditionalModel = ref(false);

function openAdditional(chat) {
  openAdditionalModal.value.fullAnswer = chat.fullAnswer;
  openAdditionalModal.value.question = chat.question;
  openAdditionalModal.value.docs = chat.docs;
  isOpenAdditionalModel.value = !isOpenAdditionalModel.value;
}

async function sendMessageDepr() {
  if (!loadingMessage.value) {
    try {
      const message = {
        type: 'human',
        content: `${question.value}`,
        date: new Date(),
      };
      const questionRequestTemp = question.value;
      question.value = '';

      chatTree.value.push(message);
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
      loadingMessage.value = true;
      // if (!chatID.value) {
      //   isNewChatID.value = true;
      //   chatID.value = Date.now();
      //   useState('chats').value = [{
      //     conversation_id: chatID.value,
      //     data: {
      //       data: {
      //         content: message.content,
      //       },
      //     },
      //   }//, ...useState('chats').value
      //   ];
      // }
      const bodyResponse = {
        question: questionRequestTemp,
      };

      const response = {
        type: 'ai',
        small_answer: 'К сожалению, я не понимаю. Попробуйте еще раз.',
        answer: 'К сожалению, я не понимаю. Попробуйте еще раз.',
      };
      const documents = [];

      // const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      loadingMessage.value = false;

      const responseMessage = {
        type: 'ai',
        question: questionRequestTemp,
        content: response.small_answer,
        docs: documents,
        fullAnswer: response.answer,
        date: new Date(),
      };
      chatTree.value.push(responseMessage);

    } catch (error) {
      alert(`Join the waiting list if you want to use models: ${error}`);
    }
  }
}
</script>
<style lang="scss">
.image-gallery img {
  width: 200px; /* Размер миниатюр */
  cursor: pointer;
}

.overlay {
  display: none; /* Скрываем по умолчанию */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Полупрозрачный черный фон */
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay-image {
  max-width: 80%;
  max-height: 80%;
}

.q-message-text:last-child:before {
  display: none;
}
.q-input {
  width: 100%;
  box-sizing: border-box;
}
.q-message-text--received {
  border-radius: 15px;
  border: solid $primary 1px;
}

.q-message-text--sent {
  border-radius: 15px;
}

textarea {
  resize: none;
}

textarea:focus {
  outline: none;
}
</style>
