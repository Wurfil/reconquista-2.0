<template>
  <div class="tw-max-w-[640px] tw-mx-auto tw-relative">
    <div class="tw-sticky tw-top-0 full-width tw-h-[64px] tw-z-20">
      <div class="tw-absolute tw-z-20 tw-bg-primary tw-max-w-[640px] full-width tw-h-full tw-rounded-b-2xl tw-border-2 tw-border-gray-400">
        <div class="tw-flex tw-items-center tw-justify-center tw-text-2xl tw-h-full">
          <span class="tw-text-center tw-text-white">
            Чат-бот MediaWise
          </span>
        </div>
      </div>
    </div>
    <div class="tw-pb-[72px] tw-z-10 tw-mt-2 tw-mx-5 lg:tw-mx-0">
      <chat-a-i />
    </div>
    <div class="tw-fixed tw-bottom-0 lg:tw-px-0 tw-px-5 tw-bg-white tw-left-1/2 tw-transform tw--translate-x-1/2 tw-w-full tw-max-w-[640px]">
      <input-to-chat class="tw-my-2" />
    </div>
  </div>
</template>
<script setup>
import ChatAI from "@/components/ChatAI.vue";
import InputToChat from "@/module/InputToChat.vue";
</script>
