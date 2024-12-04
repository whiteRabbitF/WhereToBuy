import { defineStore } from 'pinia';
import partnersData from '../data/partners.json';

interface Partner {
    id: number;
    logo: string;
    name: string;
    phone: string;
    email: string;
    website: string;
    status: string;
    country: string;
    city: string;
    productType: string;
    products: string[];
    partnerType: string[];
}

export const usePartnersStore = defineStore('partners', {
    state: () => ({
        partners: [] as Partner[],
        filters: {
            country: '',
            city: '',
            productType: '',
            selectedProducts: [] as string[],
            selectedPartnerTypes: [] as string[],
        },
    }),
    actions: {
        // Загрузка данных из JSON
        loadPartners() {
            this.partners = partnersData;
        },
        // Сброс фильтров
        clearFilters() {
            this.filters = {
                country: '',
                city: '',
                productType: '',
                selectedProducts: [],
                selectedPartnerTypes: [],
            };
        },
        // Фильтрация данных
        filterPartners() {
            return this.partners.filter((partner) => {
                const { country, city, productType, selectedProducts, selectedPartnerTypes } = this.filters;

                const matchesCountry = !country || partner.country === country;
                const matchesCity = !city || partner.city === city;
                const matchesProductType = !productType || partner.productType === productType;
                const matchesProducts =
                    !selectedProducts.length || selectedProducts.some((p) => partner.products.includes(p));
                const matchesPartnerTypes =
                    !selectedPartnerTypes.length || selectedPartnerTypes.some((type) => partner.partnerType.includes(type));

                return matchesCountry && matchesCity && matchesProductType && matchesProducts && matchesPartnerTypes;
            });
        },
    },
});

