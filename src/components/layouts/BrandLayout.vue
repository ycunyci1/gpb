<template>
	<main class="main _catalog">
		<BackBase></BackBase>
		<NavBase :brand="props.brand" :main="true"></NavBase>
		<CatBase :brand="props.brand" :special="false"></CatBase>
	</main>
</template>

<script setup>
import BackBase from '@/components/updated/BackBase.vue';
import NavBase from '@/components/updated/NavBase.vue';
import CatBase from '@/components/updated/CatBase.vue';
const props = defineProps({
	brand: String,
})
</script>