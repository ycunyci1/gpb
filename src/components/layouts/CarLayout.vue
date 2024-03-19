<template>
	<main class="main">
		<BackBase></BackBase>
		<CarBase :single="props.id"></CarBase>
		<CatBase :similar="true" :single="props.id"></CatBase>
	</main>
</template>


<script setup>

import CarBase from '@/components/updated/CarBase.vue';
import BackBase from '@/components/updated/BackBase.vue';
import CatBase from '@/components/updated/CatBase.vue';
const props = defineProps({
	id: String,
});
</script>


<style>
@import 'swiper/css';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';
</style>