<template>
  <div
    v-if="loadingChat"
    class="tw-flex tw-justify-center"
  >
    <q-spinner size="36" />
  </div>
  <div
    v-if="!chatStore.currentChatHistory.length"
    class="tw-flex tw-min-h-[80vh] tw-justify-center tw-items-center"
  >
    <q-card
      flat
      class="tw-bg-primary/25 tw-flex-col tw-w-[250px] tw-h-[250px] tw-flex tw-justify-center tw-items-center"
    >
      <div class="tw-text-lg tw-font-black tw-mb-2">
        Пока еще нет сообщений
      </div>
      <div class="tw-text-base tw-w-[250px] tw-mb-5 text-center">
        Введите сообщение вашему ассистенту, например
      </div>
      <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full">
        <q-btn
          no-caps
          rounded
          color="secondary"
          flat

          class="tw-mt-2"
          @click="chatStore.sendMessage(transformSendedMessage('Какие прогнозы на 2025 год'))"
        >
          Какие прогнозы на 2025 год
        </q-btn>
        <q-btn
          no-caps
          rounded
          color="secondary"
          flat
          class="tw-mt-2"
          @click="chatStore.sendMessage(transformSendedMessage('Сколько просмотров в день у VK клипов?'))"
        >
          Сколько просмотров в день у VK клипов?
        </q-btn>
      </div>
    </q-card>
  </div>
  <div
    v-for="chat in chatStore.currentChatHistory"
    :key="chat"
  >
    <q-chat-message
      v-if="chat.type === 'ai'"
      class="tw-text-base tw-pr-0 laptop:tw-pr-28 before:tw-content-none "
      bg-color="secondary"
      text-color="white"
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
      </div>
    </q-chat-message>
    <q-chat-message
      v-if="chat.type === 'ai'"
      class="tw-text-base pic tw-pr-0 laptop:tw-pr-28 before:tw-content-none "
      bg-color="white"
      text-color="white"
    >
      <div class="tw-flex tw-flex-col">
        <q-img
          v-if="chat.pic"
          :src="`data:image/png;base64, ${chat.pic}`"
          alt="Base64 Image"
          width="300px"
          class="gallery-image tw-rounded-[14px] cursor-pointer"
          @click="openFullScreen(`data:image/png;base64, ${chat.pic}`)"
        />
      </div>
    </q-chat-message>
    <q-btn
      v-if="chat.pic && chat.type === 'ai'"
      no-caps
      flat
      rounded
      color="secondary"
      @click="moreInfo(chat.context)"
    >
      Похожие презентации
    </q-btn>
    <q-chat-message
      v-if="chat.type === 'human'"
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
      :src="chatStore.openImage"
      class="overlay-image cursor-pointer"
    />
  </div>
</template>

<script setup>
import {format} from 'date-fns';
import {ref, watch} from "vue";
import {useChatStore} from "@/store/index.js";
import {transformSendedMessage} from "@/helpers/index.js";

const openImage = ref('')
const openAdditionalModal = ref({
  fullAnswer: '',
  question: '',
});
const chatStore = useChatStore()
const emits = defineEmits(['open-more-info'])

function moreInfo(content) {
  emits('open-more-info', content)
}

function openFullScreen(img) {
  const overlay = document.getElementById('overlay');
  chatStore.openImage = img; // Устанавливаем источник изображения
  overlay.style.display = 'flex'; // Показываем оверлей
}

function closeFullScreen() {
  const overlay = document.getElementById('overlay');
  chatStore.openImage = ''; // Устанавливаем источник изображения
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
.pic {
  .q-message-text {
    padding: 0px 0px 8px 0px  !important;
    border: 1px solid $primary;
    box-sizing: border-box;
  }
}

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
  z-index: 20000;
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
