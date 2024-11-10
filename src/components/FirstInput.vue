<script setup>

import InputToChat from "@/module/InputToChat.vue";
import ProjectPanel from "@/module/ProjectPanel.vue";
</script>

<template>
  <div class="relative-position ">
    <input-to-chat />
    <project-panel class="absolute" />
  </div>
</template>

<style scoped>
.absolute{
  left: 50%;
  transform: translateX(-50%);
}
</style>
