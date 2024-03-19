<template>
	<div class="calc">
		<div class="calc__item">
			<div class="calc__title p4">
				Сумма кредита
			</div>
			<div class="calc__container">
				<div type="text" class="calc__result">{{ formatNumber('' + data.sum) + ' ₽' }}</div>
				<input type="number" @keydown="preventSum" @change="formatSum" class="calc__input" v-model="data.sum">
			</div>
			<input type="range" class="calc__range" min="1000000" max="7000000" step="100000" v-model="data.sum"  :style="'background: linear-gradient(to right, rgba(43, 97, 236, 1) 0%, rgba(43, 97, 236, 1) ' + ((+data.sum - 1000000)/60000) + '%, rgba(223, 223, 223, 1) ' + ((+data.sum - 1000000)/60000) + '%, rgba(223, 223, 223, 1) 100%)'">
		</div>
		<div class="calc__item">
			<div class="calc__title p4">
				Срок кредита
			</div>
			<div class="calc__container">
				<div type="text" class="calc__result">{{ formatMonth('' + data.cred) }}</div>
				<input type="number" @keydown="preventSum" @change="formatDate" class="calc__input" v-model="data.cred">
			</div>
			<input type="range" class="calc__range" name="vol" min="13" max="96" step="1" v-model="data.cred" :style="'background: linear-gradient(to right, rgba(43, 97, 236, 1) 0%, rgba(43, 97, 236, 1) ' + ((+data.cred-13)/(96-13)*100) + '%, rgba(223, 223, 223, 1) ' + ((+data.cred-13)/(96-13)*100) + '%, rgba(223, 223, 223, 1) 100%)'">
		</div>
		<div class="calc__item">
			<div class="calc__title">
				Ежемесячный платёж
			</div>
			<input type="text" class="calc__result h6 _bold" disabled :value="getMonthly(data.sum, data.cred)">
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
const num_word = (value, words) => {
	value = Math.abs(value) % 100;
	var num = value % 10;
	if (value > 10 && value < 20) return words[2];
	if (num > 1 && num < 5) return words[1];
	if (num == 1) return words[0];
	return words[2];
}
const formatNumber = (number) => {
	return number.split(' ').join('').split(/(?=(?:...)*$)/).join(' ');
};
const formatMonth = (date) => {
	return date + ' ' + num_word(date, ['месяц', 'месяца', 'месяцев']);
}
const formatSum = () => {
	data.sum = (data.sum < 1000000) ? 1000000 : (data.sum > 7000000) ? 7000000 : data.sum;
}
const formatDate = () => {
	data.cred = (data.cred < 13) ? 13 : (data.cred > 90) ? 90 : data.cred;
}
const preventSum = (e) => {
	let preventButtons = ['+', '-', 'e', 'E', '.', ','];
	if (preventButtons.includes(e.key)) {
		e.preventDefault();
	}
}
const getMonthly = (sum, date) => {
	let dot = 2.4;
	let finaldot = +dot / 1200;
	let coeff = +(finaldot * (1 + finaldot) ** date) / ((1 + finaldot) ** date - 1);
	return formatNumber(''+Math.round(sum*coeff))+' ₽'
}
let data = ref({
	sum: 2000000,
	cred: 60,
})
</script>