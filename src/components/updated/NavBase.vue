<template>
	<div class="brands block inner">
		<div class="container">
			<div class="block__title h3 _bold" v-if="!props.main">
				Каталог
			</div>
			<h1 class="block__title h1 _bold catalog__title" v-else>
				Каталог автомобилей
			</h1>
			<div class="brands__row">
			<RouterLink to="/catalog" class="button _full button brands__button _mob" v-if="!props.main">
				Посмотреть все машины
			</RouterLink>
				<RouterLink :to="'/catalog'" class="button _full" v-if="props.main">
					<div class="p3">Все автомобили</div>
				</RouterLink>
				<template v-for="item in store.brands">
					<RouterLink :to="'/catalog/' + item.slug" class="brand" v-if="item.get_product_count">
						<div class="brand__icon"><img :src="'https://12official.com/storage/images/brands/logo/' + item.logo"></div>
						<div class="brand__title p3">{{ item.name }}</div>
					</RouterLink>
				</template>
			</div>
			<RouterLink to="/catalog" class="block__button button brands__button _desk" v-if="!props.main">
				Посмотреть все машины
			</RouterLink>
		</div>
	</div>
</template>

<script setup>
import { store } from '@/store';
import { reactive } from 'vue';
const api = reactive({
	brands: [],
});
const props = defineProps({
	brand: String,
	main: Boolean,
});
</script>
