<template>
  <div id="app" class="container my-4">
    <h1 class="text-center mb-3 header">Где купить</h1>
    <p class="text-center sub-header">Контакты наших партнеров</p>
    <div class="row">
      <!-- Панель фильтров -->
      <div class="col-md-4">
        <FilterPanel
            @applyFilters="applyFilters"
        />
      </div>
      <!-- Список партнеров -->
      <div class="col-md-8">
        <PartnersList
            :filteredPartners="filteredPartners"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePartnersStore } from './stores/partnersStore';
import FilterPanel from '~/components/FilterPanel.vue';
import PartnersList from './components/PartnersList.vue';

const store = usePartnersStore();

// Загрузка данных
store.loadPartners();
// Локальное состояние для отфильтрованных данных
const filteredPartners = ref(store.partners);
// Слушаем изменения фильтров и обновляем список
const applyFilters = () => {
  filteredPartners.value = store.filterPartners();
};
// Обновление списка при изменении данных
watch(() => store.partners, () => {
  filteredPartners.value = store.filterPartners();
});
</script>

<style lang="scss" scoped>
#app {
  .header {
    font-size: 48px;
    color: #26263A;
    font-weight: 800;
  }
  .sub-header {
    font-size: 20px;
    color: #26263A;
    font-weight: 300;
  }
}
</style>


