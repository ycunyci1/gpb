<template>
	<template v-for="car in store.products">
		<template v-if="car.id == single">
			<div class="car">
				<div class="container">
					<div class="car__title h4 _bold">
						<div class="car__brand _bold"><img
								:src="'https://12official.com/storage/images/brands/logo/' + car.get_brand.logo">
						</div>
						<div class="car__name _bold">{{ car.get_brand.name }} {{ car.name }}</div>
						<template v-for="att in car.values">
							<div class="car__year _bold" v-if="att.attribute_id == 6">{{ att.value }}</div>
						</template>
					</div>
					<div class="car__grid">
						<div class="car__gallery">
							<swiper-container class="car__swiper"
								:pagination="{ type: 'bullets', el: '.banners__nav', clickable: true }"
								:thumbs-swiper="'.car__thumbs'">
								<template v-for="img in car.images">
									<swiper-slide><img
											:src="'https://12official.com/storage/images/products/' + img.full"></swiper-slide>
								</template>
							</swiper-container>
							<swiper-container class="car__thumbs _desk" :slides-per-view="4" :space-between="28">
								<template v-for="img in car.images">
									<swiper-slide class="car__thumb"><img
											:src="'https://12official.com/storage/images/products/' + img.full"></swiper-slide>
								</template>
							</swiper-container>
							<div class="banners__nav _mob"></div>
						</div>
						<div class="car__form">
							<div class="car__price">
								<div class="car__detail">
									<div class="item__price">
										<div class="item__old">
											<div v-if="car.price_cred && car.price_cred != car.price">
												{{ car.price_cred_form }} ₽
											</div>
										</div>
										<div class="item__bottom p1">
											<div class="_bold">Стоимость</div>
											<div class="_bold">{{ car.price_form }} ₽</div>
										</div>
									</div>
								</div>
								<div class="car__button button _full"
									@click="store.popups.buy.model = car.get_brand.name + ' ' + car.name; store.popups.buy.active = (store.popups.buy.active) ? 0 : 1">
									Купить</div>
							</div>
							<div class="car__calc">
								<div class="h4 _bold">Кредитный калькулятор</div>
								<Calc></Calc>
								<div class="car__cred button _full"
									@click="store.popups.creditbuy.model = car.get_brand.name + ' ' + car.name; store.popups.creditbuy.active = (store.popups.creditbuy.active) ? 0 : 1">
									Купить в кредит
								</div>
								<div class="car__tin button _full"
									@click="store.popups.tradein.active = (store.popups.tradein.active) ? 0 : 1">
									Подать заявку на Trade IN
								</div>
							</div>
							<div class="car__savings">
								<div class="p1 _bold _center">Рассчитать страховку</div>
								<div class="save__button button _full" @click="triggerKasko(car)">КАСКО/ОСАГО</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="chars">
				<div class="container">
					<div class="chars__grid">
						<template v-for="val in car.values">
							<div class="char" :style="'order:' + val.attribute_id" v-if="info.values[val.attribute_id]">
								<div class="char__icon">
									<img :src="'https://12official.com' + info.values[val.attribute_id].image">
								</div>
								<div class="char__info">
									<div class="char__title tag">{{ info.values[val.attribute_id].name }}</div>
									<div class="char__value _bold">{{ val.value }}{{ info.values[val.attribute_id].text }}
									</div>
								</div>
							</div>
						</template>
					</div>
				</div>
			</div>
			<div class="details">
				<div class="container">
					<div class="details__switches">
						<div class="details__switch p2" :class="{ 'active': info.tab == 0 }" @click="info.tab = 0">
							Характеристики
						</div>
						<div class="details__switch p2" :class="{ 'active': info.tab == 1 }" @click="info.tab = 1">
							Комплектация</div>
					</div>
					<div class="details__tabs">
						<div class="details__tab" v-if="!info.tab">
							<div class="details__title h4 _bold">
								Характеристики
							</div>
							<ul class="details__info">
								<template v-for="char in car.characterists.split(';')">
									<li>{{ char }}</li>
								</template>
							</ul>
						</div>
						<div class="details__tab" v-else>
							<div class="details__title h4 _bold">
								Комплектация
							</div>
							<ul class="details__info">
								<template v-for="char in car.equipment.split(';')">
									<li>{{ char }}</li>
								</template>
							</ul>
						</div>
						<div class="details__tab"></div>
					</div>
				</div>
			</div>
		</template>
	</template>
</template>

<script setup>
import { store } from '@/store';
import { ref } from 'vue';
import Calc from '@/components/templates/Calc.vue';
const props = defineProps({
	single: String,
})
const triggerKasko = (currentCar) => {
	store.popups.kasko.mark = currentCar.get_brand.name;
	store.popups.kasko.model = currentCar.name;
	store.popups.kasko.new = 'Да';
	store.popups.kasko.price = currentCar.price_form;
	for (let el in currentCar.values) {
		let attr = currentCar.values[el];
		if (attr.attribute_id == 6) {
			store.popups.kasko.year = attr.value;
		}
		if (attr.attribute_id == 2) {
			store.popups.kasko.power = attr.value;
		}
	}
	store.popups.kasko.active = (store.popups.kasko.active) ? 0 : 1;
}
const info = ref({
	tab: 0,
	values: {
		1: {
			name: 'Объём',
			text: ' л',
			image: '/img/icon_piston.svg',
		},
		2: {
			name: 'Мощность',
			text: ' л.с.',
			image: '/img/icon_power.svg',
		},
		3: {
			name: 'Тип двигателя',
			text: '',
			image: '/img/icon_engine.svg',
		},
		4: {
			name: 'Коробка',
			text: '',
			image: '/img/icon_transmission.svg',
		},
		5: {
			name: 'Привод',
			text: '',
			image: '/img/icon_drive.svg',
		},
	},
})
</script>
