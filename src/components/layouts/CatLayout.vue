<template>
	<main class="main">
		<SwiperBase></SwiperBase>
		<ProsBase />
		<NavBase />
		<CatBase :special="true"/>
		<BankBase />
		<MainFormBase />
	</main>
</template>

<script setup>
import SwiperBase from '@/components/updated/SwiperBase.vue';
import ProsBase from '@/components/updated/ProsBase.vue';
import NavBase from '@/components/updated/NavBase.vue';
import CatBase from '@/components/updated/CatBase.vue';
import BankBase from '@/components/updated/BankBase.vue';
import MainFormBase from '@/components/updated/MainFormBase.vue';
const props = defineProps({
	brand: String,
})
</script>