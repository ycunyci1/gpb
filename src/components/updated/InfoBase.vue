<template>
	<div class="info">
		<div class="container">
			<div class="block__title info__title h1 _bold mh3" v-if="false">
				Точки выдачи автомобилей
			</div>
			<div class="info__points">

				<template v-for="point in info.points">
					<div class="info__point">
						<div class="point__title h3 mh5 _bold _center" :class="{ '_blue': point.blue, }">
							{{ point.name }}
						</div>
						<div class="point__grid p4">
							<template v-for="char in point.values">
								<div class="point__char">
									<div class="point__param">{{ char.title }}</div>
									<div class="point__value">{{ char.value }}</div>
								</div>
							</template>
						</div>
						<div class="point__map" v-if="point.ymap">
							<div :id="point.ymap" class="point__container"></div>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
onMounted(() => {
	ymaps.ready(init);
	function init() {
		var myMap = new ymaps.Map("map1", {
			center: [55.720530, 37.615506],
			zoom: 15
		});
		var myMsap = new ymaps.Map("map2", {
			center: [55.607768, 37.330875],
			zoom: 15
		});
		myMap.geoObjects.add(new ymaps.Placemark([55.720530, 37.615506], {
			balloonContent: 'Офис ON-LINE. город Москва, Мытная д.46, к.5, офис 604',
			iconCaption: 'Офис',
		}, {
			preset: 'islands#blueCircleDotIconWithCaption',
			iconColor: '#476BF0',
		}));
		myMsap.geoObjects.add(new ymaps.Placemark([55.607768, 37.330875], {
			balloonContent: 'Точка выдачи автомобилей ON-LINE. Москва, г. Московский, д. Лапшинка, вл. 7, к.1',
			iconCaption: 'Точка выдачи автомобилей',
		}, {
			preset: 'islands#blueCircleDotIconWithCaption',
			iconColor: '#476BF0',
		}));
		/*
	myMsap.geoObjects.add(new ymaps.Placemark([55.607768, 37.330875], {
			balloonContent: 'Точка выдачи автомобилей'
		}, {
			preset: 'islands#icon',
			iconColor: '#476BF0',
		}));
		*/
	}
})
const info = ref({
	points: [
		{
			name: 'Москва - Офис',
			values: [
				{
					title: 'Адрес',
					value: '115162, Россия, город Москва, Мытная д.46, к.5, офис 604'
				}
			],
			ymap: 'map1',
			blue: true,
		},
		{
			name: 'Точка выдачи автомобилей',
			values: [
				{
					title: 'Адрес',
					value: 'Москва, г. Московский, д. Лапшинка, вл. 7, к.1'
				}
			],
			ymap: 'map2',
			blue: false,
		},
		{
			name: 'Реквизиты',
			values: [
				{
					title: '',
					value: 'ООО « ФЛАТТЕР »'
				},
				{
					title: 'ИНН:  ',
					value: '7751082874'
				},
				{
					title: 'КПП: ',
					value: '770301001'
				},
				{
					title: 'ОГРН:  ',
					value: '5177746012065'
				},
				{
					title: 'ОКПО: ',
					value: '19678897'
				},
				{
					title: 'Расчетный счет: ',
					value: '40702810502300008629 '
				},
				{
					title: 'Банк: ',
					value: 'АО "АЛЬФА-БАНК"'
				},
				{
					title: 'БИК:',
					value: '044525593'
				},
				{
					title: 'Корр. счет: ',
					value: '30101810200000000593'
				},
			],
			ymap: '',
			blue: true,
		},
	]
})
</script>
