<template>
  <div class="partner-card d-flex p-4 align-items-start border-bottom mb-2 flex-column flex-md-row gap-5">
    <img
        :src="logoPath"
        :alt="partner.name"
        class="partner-logo me-3"
    />

    <div class="partner-info d-flex flex-column align-items-start w-100 gap-3 p-1">
      <div class="partner-name">
        <h4 class="m-0">
          {{ partner.name }}
        </h4>
      </div>
      <div class="partner-contact-info d-flex flex-column flex-md-row gap-5 w-100 mt-2">
        <span>{{ partner.phone }}</span>
        <span>{{ partner.email }}</span>
        <a
            :href="formattedWebsite"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-link"
        >
          {{ partner.website }}
        </a>
      </div>
    </div>

    <span
        :class="badgeClass"
        class="badge mt-3 mt-md-0 d-flex justify-content-center align-items-center"
    >
      {{ partner.status }}
    </span>
  </div>
</template>


<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps({
  partner: {
    type: Object,
    required: true,
  },
});

const logoPath = computed(() => `/partners-logo/${props.partner.logo}.png`);

// Форматируем адрес сайта, добавляя протокол (http:// или https://), если его нет
const formattedWebsite = computed(() => {
  const website = props.partner.website;
  if (!/^https?:\/\//i.test(website)) {
    return `http://${website}`; // Добавляем http:// если протокол отсутствует
  }
  return website;
});

// Динамический класс для бейджа на основе статуса партнера
const badgeClass = computed(() => {
  if (props.partner.status === 'Premier') {
    return 'badge-premier'; // Стиль для статуса Premium
  } else if (props.partner.status === 'Start') {
    return 'badge-start'; // Стиль для статуса Start
  }
  return 'default';
});
</script>

<style lang="scss">
@use '~/assets/styles/variables' as *;
.partner-card {

  .partner-name {
    h4 {
      font-weight: 800;
      font-size: 20px;
    }
  }

  // Стиль для бейджа Premium
  .badge-premier {
    background-color: $premier-status-bk-color;
    color: $status-color;
    line-height: 2 !important;
    border-radius: $status-border-radius !important;
    height: 22px;
  }

  // Стиль для бейджа Start
  .badge-start {
    background-color: $start-status-bk-color;
    color: $status-color;
    line-height: 2 !important;
    border-radius: $status-border-radius !important;
    height: 22px;
  }

  // дефолт
  .default {
    background-color: $start-status-bk-color;
    color: $status-color;
    line-height: 2 !important;
    border-radius: $status-border-radius !important;
    height: 22px;
  }

  .partner-link {
    color: $link-color;
    padding: 1px 5px;
    border-radius: 5px;

    &:hover {
      background-color: $link-hover-color;
    }
  }
}
</style>


