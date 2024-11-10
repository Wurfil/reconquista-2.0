<template>
  <q-layout
    view="hHh LpR fFf"
    class="h-full"
  >
    <q-drawer
      v-model="isOpenBase"
      :width="400"
      elevated
      overlay
      side="left"
    >
      <q-scroll-area class="fit">
        <q-card-section class="tw-flex tw-justify-between tw-text-2xl tw-font-bold">
          <div>Базы знаний</div>
          <q-btn
            no-caps
            flat
            rounded
            @click="isOpenBase=!isOpenBase"
          >
            <
          </q-btn>
        </q-card-section>
        <q-card-section>
          <div class="hover:tw-bg-gray-200 tw-flex tw-justify-between tw-items-center tw-p-2 tw-rounded cursor-pointer tw-text-base">
            <span>Хаб презентационного материала</span>
            <q-icon
              color="green"
              size="24px"
              name="check"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-btn
            v-if="!isCreateBase && !loading"
            class="tw-text-base"
            color="primary"
            no-caps
            rounded
            flat
            @click="createBase"
          >
            + Создать базу знаний
          </q-btn>
          <div
            v-if="isCreateBase && !loading"
            class="tw-flex tw-flex-col tw-gap-y-3"
          >
            <div class="tw-text-base tw-font-bold">
              Созданние базы данных
            </div>
            <q-input
              v-model="name"
              dense
              label="Название базы"
              outlined
            />
            <q-uploader
              v-model="files"
              class="full-width"
              multiple

              @added="uploading"
            />
          </div>
          <div class="tw-flex tw-justify-center">
            <q-spinner
              v-if="loading"
              color="primary"
              size="36px"
            />
          </div>
        </q-card-section>
      </q-scroll-area>
    </q-drawer>
    <q-header>
      <div class="full-width tw-h-[32px] tw-z-20 ">
        <div class="tw-z-20 tw-flex tw-justify-between tw-border-b-[2px] tw-border-b-secondary tw-bg-white primary full-width tw-h-full ">
          <q-btn
            no-caps
            color="primary"
            dense
            flat
            @click="isOpenBase = !isOpenBase"
          >
            База знаний
          </q-btn>
          <div class="tw-flex tw-items-center tw-justify-center tw-text-lg tw-h-full">
            <span class="tw-text-center tw-text-primary">
              Чат-бот MediaWise
            </span>
          </div>
          <q-btn
            no-caps
            color="primary"
            dense
            flat
            @click="useChatStore().currentChatHistory = []"
          >
            Новый чат
          </q-btn>
        </div>
      </div>
    </q-header>
    <q-page-container>
      <q-page>
        <div class="tw-max-w-[640px] tw-mx-auto tw-relative">
          <div class="tw-pb-[72px] tw-z-10 tw-mt-2 tw-mx-5 lg:tw-mx-0">
            <chat-a-i @open-more-info="openMoreInfo" />
          </div>
          <div class="tw-fixed tw-bottom-0 lg:tw-px-0 tw-px-5 tw-bg-white tw-left-1/2 tw-transform tw--translate-x-1/2 tw-w-full tw-max-w-[640px]">
            <input-to-chat class="tw-my-2" />
          </div>
        </div>
      </q-page>
    </q-page-container>
    <q-drawer
      v-model="layout"
      :width="400"
      elevated
      overlay
      side="right"
    >
      <q-scroll-area class="fit">
        <q-card-section class="tw-text-2xl tw-font-bold">
          <q-btn
            no-caps
            flat
            @click="layout=false"
          >
            >
          </q-btn> Похожие презентации
        </q-card-section>
        <sorces-panel :contents="contents" />
      </q-scroll-area>
    </q-drawer>
  </q-layout>
</template>
<script setup>
import ChatAI from "@/components/ChatAI.vue";
import InputToChat from "@/module/InputToChat.vue";
import {ref} from "vue";
import SorcesPanel from "@/components/SorcesPanel.vue";
import {useChatStore} from "@/store/index.js";
import {uploadingNewDocument} from "@/store/api.js";
import {useQuasar} from "quasar";
const isOpenBase = ref(false)
const layout = ref(false)
const contents = ref([])
const openMoreInfo = (context) => {
  layout.value = true
  contents.value = context
}
const loading = ref(false)
const files = ref([])
const name = ref('')
const isCreateBase = ref(false)
function createBase() {
  isCreateBase.value = true
}
const $q = useQuasar()

async function uploading(){
  setTimeout(async () => {
    loading.value = true
    try {
      await uploadingNewDocument(files.value, name.value)
      $q.notify({
        type: 'positive',
        message: 'База знаний успешно создана'
      })
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: 'Что-то пошло не так, поробуйте снова'
      })
    } finally {
      files.value = []
      name.value = ''
      loading.value = false
      isCreateBase.value = false
    }

  }, 4000)

}
</script>
