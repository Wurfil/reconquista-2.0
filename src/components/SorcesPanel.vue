<template>
  <q-list>
    <template
      v-for="content in contents"
      :key="`${content.doc_id} + ${content.page_num}`"
    >
      <q-item

        class="tw-flex tw-flex-col"
      >
        <q-item-section>
          <q-img
            v-if="content.base64"
            :src="`data:image/png;base64, ${content.base64}`"
            alt="Base64 Image"
            class="gallery-image tw-mb-2 cursor-pointer"
            @click="openFullScreen(`data:image/png;base64, ${content.base64}`)"
          />
          <div
            class="tw-mb-5 tw-text-base tw-opacity-75"
            @click="download(content.doc_id)"
          >
            Презентация <span class="tw-text-sky-500 hover:tw-text-sky-600 cursor-pointer">{{ content.doc_id }}</span>
            <br>
            Страница {{ content.page_num }}
          </div>
        </q-item-section>
      </q-item>
      <q-separator />
    </template>
  </q-list>
</template>
<script setup>
import { ref } from 'vue'
import {useChatStore} from "@/store/index.js";

defineProps({
  contents: {
    type: Array,
    default: () => []
  },
})

function download(link) {
  window.open(`${link}.pdf`)
}
function openFullScreen(img) {
  const overlay = document.getElementById('overlay');
  useChatStore().openImage = img; // Устанавливаем источник изображения
  overlay.style.display = 'flex'; // Показываем оверлей
}
</script>
<style>

</style>
