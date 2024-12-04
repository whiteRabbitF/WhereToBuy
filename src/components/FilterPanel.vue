<template>
  <div class="filter-panel p-3">
    <!-- Фильтр по стране -->
    <div class="filter-tabs d-flex flex-column gap-1">
      <label>Уточните адрес</label>
      <div class="mb-3">
        <select id="country" class="form-select" v-model="filters.country">
          <option value="" disabled>Страна</option>
          <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
        </select>
      </div>

      <!-- Фильтр по городу -->
      <div class="mb-3">
        <select id="city" class="form-select" v-model="filters.city">
          <option value="" disabled>Город</option>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>

      <!-- Фильтр по типу продукта -->
      <div class="mb-3">
        <label>Выберите тип продукта</label>
        <div class="d-flex gap-2">
          <button
              v-for="type in productTypes"
              :key="type"
              class="btn"
              :class="filters.productType === type ? 'btn-primary' : 'btn-outline-primary'"
              @click="filters.productType = filters.productType === type ? '' : type"
          >
            {{ type }}
          </button>
        </div>
      </div>

      <!-- Фильтр по продукту -->
      <div class="mb-3">
        <label>Выберите продукт</label>
        <div class="d-flex gap-2">
          <button
              v-for="product in products"
              :key="product"
              class="btn"
              :class="filters.selectedProducts.includes(product) ? 'btn-primary' : 'btn-outline-primary'"
              @click="toggleProduct(product)"
          >
            {{ product }}
          </button>
        </div>
      </div>

      <!-- Фильтр по типу партнера -->
      <div class="mb-3">
        <label>Выберите тип партнёра</label>
        <div class="d-flex gap-2 flex-wrap">
          <button
              v-for="type in partnerTypes"
              :key="type"
              class="btn"
              :class="filters.selectedPartnerTypes.includes(type) ? 'btn-primary' : 'btn-outline-primary'"
              @click="togglePartnerType(type)"
          >
            {{ type }}
          </button>
        </div>
      </div>
    </div>

    <div class="filter-buttons">
    <!-- Кнопки управления -->
      <div class="container-fluid d-flex gap-2 justify-content-lg-start">
        <button class="btn btn-secondary w-100" @click="clearFilters">Очистить</button>
        <button class="btn btn-primary w-100" @click="applyFilters">Найти</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePartnersStore } from '../stores/partnersStore';
import { computed } from 'vue';

const store = usePartnersStore();
const filters = computed(() => store.filters);

const countries = computed(() => [...new Set(store.partners.map((p) => p.country))].filter(Boolean));

const cities = computed(() => {
  return store.filters.country
      ? [...new Set(store.partners.filter((p) => p.country === store.filters.country).map((p) => p.city))].filter(Boolean)
      : [...new Set(store.partners.map((p) => p.city))].filter(Boolean);
});

const productTypes = ['Для дома', 'Для бизнеса'];

const products = ['Антивирус', 'GetScreen', 'Passwork'];

const partnerTypes = [
  'Партнеры Retail',
  'Партнеры Corporate',
  'Интернет-провайдеры',
  'Online партнеры',
  'Продажи партнерам',
  'Education партнеры',
  'MSP Партнеры',
];

const clearFilters = () => store.clearFilters();

const applyFilters = () => {
  store.filterPartners()
  //console.log('Применены фильтры:', filters.value);
};

// Табы для множественного выбора
const toggleProduct = (product: string) => {
  const index = filters.value.selectedProducts.indexOf(product);
  if (index >= 0) {
    filters.value.selectedProducts.splice(index, 1);
  } else {
    filters.value.selectedProducts.push(product);
  }
};

const togglePartnerType = (type: string) => {
  const index = filters.value.selectedPartnerTypes.indexOf(type);
  if (index >= 0) {
    filters.value.selectedPartnerTypes.splice(index, 1);
  } else {
    filters.value.selectedPartnerTypes.push(type);
  }
};
</script>

<style lang="scss">
@use '~/assets/styles/variables' as *;
.filter-panel {

  label {
    color: $filter-header-color;
    margin-bottom: 15px;
  }

  .filter-tabs {
    .form-select {
      border: 1px solid $inactive-filter-bk-color;
      height: 58px;

      &:focus {
        border-color: $btn-primary-bk-color !important;
        box-shadow: none !important;
      }
    }

    .form-select:focus {
      border-color: $btn-primary-bk-color !important;
      box-shadow: none !important;
    }

    button.btn-outline-primary {
      border: 1px solid $inactive-filter-bk-color;
      color: $inactive-filter-color;
      background-color: $inactive-filter-bk-color;
      border-radius: $filter-tab-border-radius;

      &:hover {
        background-color: $active-filter-bk-color;
        color: $active-filter-color;
        border-color: $active-filter-bk-color;
      }
    }

    button.btn-primary {
      border: 1px solid $active-filter-bk-color;
      color: $active-filter-color;
      background-color: $active-filter-bk-color;
      border-radius: $filter-tab-border-radius;

      &:hover {
        background-color: $active-filter-bk-color;
        border: 1px solid $inactive-filter-bk-color;
      }
    }

    button.btn-secondary {
      background-color: $btn-secondary-bk-color;
      color: $btn-secondary-color;
      border: $btn-secondary-border;

      &:hover {
        background-color: $btn-secondary-bk-color, 10%;
        color: $btn-secondary-color;
      }
    }
  }

  .filter-buttons {
    margin-top: 40px;
    /* Стили для кнопки очистки и поиска */
    button.btn-secondary {
      background-color: $btn-secondary-bk-color;
      color: $btn-secondary-color;
      border: $btn-secondary-border;
      transition: transform 0.3s ease;

      &:active {
        transform: scale(0.92)
      }
    }

    button.btn-primary {
      background-color: $btn-primary-bk-color;
      color: $btn-primary-color;
      border: $btn-primary-border;
      transition: transform 0.3s ease;

      &:active {
        transform: scale(0.92)
      }
    }
  }
}
</style>

