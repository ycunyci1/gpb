<template>
	<div class="mobmenu" :class="{ 'active': store.popups.mob.active }">
		<div class="moboverlay" @click="store.popups.mob.active = 0"></div>
		<div class="container">
			<div class="mob__nav" @click="store.popups.mob.active = 0">
				<RouterLink to="/catalog">Каталог</RouterLink>
				<RouterLink to="/info">Важная информация</RouterLink>
				<RouterLink to="/contacts">Контакты</RouterLink>
			</div>
			<div class="mob__button button _full" @click="store.popups.mob.active = 0; store.popups.callback.active = 1">
				Обратная связь</div>
		</div>
	</div>
	<div class="popup" :class="{ 'active': store.popups.callback.active }">
		<div class="overlay" @click="store.popups.callback.active = 0"></div>
		<div class="popup-content">
			<div class="popup-top">
				<div class="popup-title p1">
					Заявка на обратную связь
				</div>
				<div class="popup-close" @click="store.popups.callback.active = 0">
					x
				</div>
			</div>
			<FormBase></FormBase>
		</div>
	</div>
	<div class="popup" :class="{ 'active': store.popups.buy.active }">
		<div class="overlay" @click="store.popups.buy.active = 0"></div>
		<div class="popup-content">
			<div class="popup-top">
				<div class="popup-title p1">
					Заполните заявку
				</div>
				<div class="popup-close" @click="store.popups.buy.active = 0">
					x
				</div>
			</div>
			<FormBuy></FormBuy>
		</div>
	</div>
	<div class="popup" :class="{ 'active': store.popups.creditmain.active }">
		<div class="overlay" @click="store.popups.creditmain.active = 0"></div>
		<div class="popup-content">
			<div class="popup-top">
				<div class="popup-title p1">
					Заполните заявку на кредит
				</div>
				<div class="popup-close" @click="store.popups.creditmain.active = 0">
					x
				</div>
			</div>
			<div class="popup-text">
				Необходимо подтвердить переход на сайт «Газпромбанк» <br> для подачи документов на Кредит.
			</div>
			<FormCreditMain></FormCreditMain>
		</div>
	</div>
	<div class="popup" :class="{ 'active': store.popups.creditbuy.active }">
		<div class="overlay" @click="store.popups.creditbuy.active = 0"></div>
		<div class="popup-content">
			<div class="popup-top">
				<div class="popup-title p1">
					Цена для клиентов "Газпромбанк"
				</div>
				<div class="popup-close" @click="store.popups.creditbuy.active = 0">
					x
				</div>
			</div>

			<div class="popup-text">
				Необходимо подтвердить переход на сайт «Газпромбанк» <br> для подачи документов на Кредит.
			</div>
			<FormCredit></FormCredit>
		</div>
	</div>
	<div class="popup" :class="{ 'active': store.popups.tradein.active }">
		<div class="overlay" @click="store.popups.tradein.active = 0"></div>
		<div class="popup-content">
			<div class="popup-top">
				<div class="popup-title p1">
					Заполните заявку на Trade IN
				</div>
				<div class="popup-close" @click="store.popups.tradein.active = 0">
					x
				</div>
			</div>
			<FormTIn></FormTIn>
		</div>
	</div>
	<div class="popup" :class="{ 'active': store.popups.kasko.active }">
		<div class="overlay" @click="store.popups.kasko.active = 0"></div>
		<div class="popup-content">
			<div class="popup-top">
				<div class="popup-title p1">
					Заполните заявку на оформление страховки
				</div>
				<div class="popup-close" @click="store.popups.kasko.active = 0">
					x
				</div>
			</div>
			<FormKasko></FormKasko>
		</div>
	</div>
</template>

<script setup>
import { store } from '@/store';
import FormBase from '@/components/forms/FormBase.vue';
import FormBuy from '@/components/forms/FormBuy.vue';
import FormCredit from '@/components/forms/FormCredit.vue';
import FormCreditMain from '@/components/forms/FormCreditMain.vue';
import FormKasko from '@/components/forms/FormKasko.vue';
import FormMain from '@/components/forms/FormMain.vue';
import FormTIn from '@/components/forms/FormTIn.vue';
</script>

<style scoped></style>