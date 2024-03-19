<template>
	<header class="header">
		<div class="container">
			<div class="header__row">
				<RouterLink to="/" class="header__creds">
					<div class="header__logo">
						<img src="/img/logo.svg">
					</div>
					<div class="header__info">
						<div class="header__title _blue h6 _bold">
							ON-LINE DEALER
						</div>
						<div class="header__text p4 _blue _desk">
							Сервис продажи машин от Газпромбанка
						</div>
					</div>
				</RouterLink>
				<div class="header__nav _desk">
					<RouterLink to="/catalog">Каталог</RouterLink>
					<RouterLink to="/info">Важная информация</RouterLink>
					<RouterLink to="/contacts">Контакты</RouterLink>
				</div>
				<div class="header__button button p2 _bold _desk" @click="store.popups.callback.active = 1">Обратная связь</div>
				<div class="header__burger _mob" :class="{'active': store.popups.mob.active,}" @click="store.popups.mob.active = (store.popups.mob.active) ? 0 : 1">
					<img src="/img/burger.svg">
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { store } from '@/store.js';
</script>
