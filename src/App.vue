<script setup>
import { RouterView } from 'vue-router'
import HeaderBase from '@/components/updated/HeaderBase.vue';
import PopupBase from '@/components/updated/PopupBase.vue';
import FooterBase from '@/components/updated/FooterBase.vue';
import { onBeforeMount, onMounted } from 'vue';
import axios from 'axios';
import { store } from './store';

const formatNumber = (number) => {
	return number.split(' ').join('').split(/(?=(?:...)*$)/).join(' ');
};
onBeforeMount(() => {
	axios
		.get('https://12official.com/api/products')
		.then(response => {
			store.products = response.data; 
			for (let item in store.products) {
				store.products[item].price_cred_form = formatNumber(''+store.products[item].price_cred);
				store.products[item].price_form = formatNumber(''+store.products[item].price);
			}
		});
		axios
		.get('https://12official.com/api/brands')
		.then(response => {store.brands = response.data;});
})
</script>

<template>
  <HeaderBase />
  <RouterView />
  <PopupBase />
  <FooterBase />

</template>

<style scoped>

</style>
