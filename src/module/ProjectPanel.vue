<template>
  <q-card
    class="bg-secondary project-panel no-box-shadow transition-all"
    bordered
  >
    <q-card-section
      v-if="!isOpen"
      class="flex justify-end"
    >
      <q-btn
        no-caps
        outline
        padding="2px 20px"
        rounded
        dense
        @click="openProjectList"
      >
        Использовать базу знаний ⮟
      </q-btn>
    </q-card-section>
    <q-card-section v-if="isOpen">
      <div class="flex justify-end tw-gap-x-5">
        <q-btn
          no-caps
          outline
          padding="2px 20px"
          rounded
          dense
          @click="closeProjectList"
        >
          Добавить базу знаний +
        </q-btn>
        <q-btn
          no-caps
          outline
          padding="2px 20px"
          rounded
          dense
          @click="closeProjectList"
        >
          Выбрать базу знаний ⮝
        </q-btn>
      </div>
      <div
        v-for="i in 5"
        :key="i"
        class="q-pa-sm q-mt-sm tw-cursor-pointer hover:tw-bg-gray-300 tw-rounded-lg"
      >
        База зананий {{ i }}
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import {ref} from "vue";

const isOpen = ref(false)

function openProjectList() {
  isOpen.value = true
}
function closeProjectList() {
  isOpen.value = false
}
</script>
<style scoped lang="scss">
.project-panel {
    width: 95%;
    border-radius: 0 0 $generic-border-radius $generic-border-radius;
}


</style>
