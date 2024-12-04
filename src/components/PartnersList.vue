<template>
  <div class="partners-list d-flex flex-column">
    <div
        v-if="filteredPartners.length === 0"
        class="text-center p-4"
    >
      <h4 class="mb-4 text-danger">Партнеры не найдены.</h4>
      <p>Попробуйте изменить параметры фильтрации.</p>
    </div>
    <div v-else>
      <PartnerCard
          v-for="partner in filteredPartners"
          :key="partner.id"
          :partner="partner"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePartnersStore } from "~/stores/partnersStore";
import PartnerCard from "./PartnerCard.vue";

const store = usePartnersStore();
const filteredPartners = computed(() => store.filterPartners());
</script>
