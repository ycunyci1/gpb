<template>
	<div class="cat" :class="{ 'block': props.special }">
		<div class="container" v-if="props.special">
			<h2 class="block__title h3 _bold">
				Специальные предложения
			</h2>
			<div class="cat__row">
				<template v-for="item in store.products">
					<RouterLink :to="'/catalog/' + item.id" class="item" v-if="item.published && item.range && item.range > 0">
						<div class="item__title h6 _center _bold">
							{{ item.get_brand.name }} {{ item.name }}
						</div>
						<div class="item__photo">
							<img :src="'https://12official.com/storage/images/products/' + item.main_image.full" :alt="item.name">
						</div>
						<div class="item__info">
							<div class="item__params">
								<template v-for="spec in item.values">
									<div class="item__param" :style="'order:' + spec.attrbiute.id" v-if="spec.value == '-'">
										<div class="item__param-title _bold">{{ spec.attrbiute.name }}</div>
										<div class="item__param-value">{{ spec.value }} {{ spec.attrbiute.unit }}</div>
									</div>
									<div class="item__param" :style="'order:' + spec.attrbiute.id" v-else>
										<div class="item__param-title _bold">{{ spec.attrbiute.name }}</div>
										<div class="item__param-value">{{ spec.value }} {{ spec.attrbiute.unit }}</div>
									</div>
								</template>
							</div>
							<div class="item__price">
								<div class="item__old">
									<div v-if="item.price_cred && item.price_cred != item.price">
										{{ item.price_cred_form }}
									</div>
								</div>
								<div class="item__bottom p1">
									<div class="_bold">Стоимость</div>
									<div class="_bold">{{ item.price_form }}</div>
								</div>
							</div>
						</div>
					</RouterLink>
				</template>
			</div>
		</div>
		<div class="container" v-else-if="props.similar">
			<h2 class="block__title h3 _bold">
				Похожие авто
			</h2>
			<div class="cat__row">
				<template v-for="find in store.products">
					<template v-if="find.id == single">
						<template v-for="item in store.products">
							<RouterLink :to="'/catalog/' + item.id" class="item"
								v-if="item.published && (item.carbody[0].value == find.carbody[0].value && item.id != find.id && find.price <= (item.price + 1000000) && find.price >= (item.price - 1000000))">
								<div class="item__title h6 _center _bold">
									{{ item.get_brand.name }} {{ item.name }}
								</div>
								<div class="item__photo">
									<img :src="'https://12official.com/storage/images/products/' + item.main_image.full" :alt="item.name">
								</div>
								<div class="item__info">
									<div class="item__params">
										<template v-for="spec in item.values">
											<div class="item__param" :style="'order:' + spec.attrbiute.id" v-if="spec.value == '-'">
												<div class="item__param-title _bold">{{ spec.attrbiute.name }}</div>
												<div class="item__param-value">{{ spec.value }} {{ spec.attrbiute.unit }}</div>
											</div>
											<div class="item__param" :style="'order:' + spec.attrbiute.id" v-else>
												<div class="item__param-title _bold">{{ spec.attrbiute.name }}</div>
												<div class="item__param-value">{{ spec.value }} {{ spec.attrbiute.unit }}</div>
											</div>
										</template>
									</div>
									<div class="item__price">
										<div class="item__old">
											<div v-if="item.price_cred && item.price_cred != item.price">
												{{ item.price_cred_form }}
											</div>
										</div>
										<div class="item__bottom p1">
											<div class="_bold">Стоимость</div>
											<div class="_bold">{{ item.price_form }}</div>
										</div>
									</div>
								</div>
							</RouterLink>
						</template>
					</template>
				</template>
			</div>
		</div>
		<div class="container" v-else>
			<div class="cat__brands">
				<template v-for="brand in store.brands">
					<div class="cat__brand" v-if="brand.get_product_count && (!props.brand || props.brand == brand.slug)">
						<RouterLink :to="'/catalog/' + brand.slug" class="brand cat__logo">
							<div class="brand__icon"><img :src="'https://12official.com/storage/images/brands/logo/' + brand.logo">
							</div>
							<div class="brand__title p3">{{ brand.name }}</div>
						</RouterLink>
						<div class="cat__row">
							<template v-for="item in store.products">
								<RouterLink class="item" :to="'/catalog/' + item.id"
									v-if="item.published && item.get_brand.slug == brand.slug">
									<div class="item__title h6 _center _bold">
										{{ item.get_brand.name }} {{ item.name }}
									</div>
									<div class="item__photo">
										<img :src="'https://12official.com/storage/images/products/' + item.main_image.full" :alt="item.name">
									</div>
									<div class="item__info">
										<div class="item__params">
											<template v-for="spec in item.values">
												<div class="item__param" :style="'order:' + spec.attrbiute.id" v-if="spec.value == '-'">
													<div class="item__param-title _bold">{{ spec.attrbiute.name }}</div>
													<div class="item__param-value">{{ spec.value }} {{ spec.attrbiute.unit }}</div>
												</div>
												<div class="item__param" :style="'order:' + spec.attrbiute.id" v-else>
													<div class="item__param-title _bold">{{ spec.attrbiute.name }}</div>
													<div class="item__param-value">{{ spec.value }} {{ spec.attrbiute.unit }}</div>
												</div>
											</template>
										</div>
										<div class="item__price">
											<div class="item__old">
												<div v-if="item.price_cred && item.price_cred != item.price">
													{{ item.price_cred_form }}
												</div>
											</div>
											<div class="item__bottom p1">
												<div class="_bold">Стоимость</div>
												<div class="_bold">{{ item.price_form }}</div>
											</div>
										</div>
									</div>
								</RouterLink>
							</template>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
import { store } from '@/store';
const props = defineProps({
	brand: String,
	similar: Boolean,
	special: Boolean,
	single: String,
});
</script>
