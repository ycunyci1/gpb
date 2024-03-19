<template>
	<div class="mainform block">
		<div class="container">
			<div class="mainform__wrapper">
				<div class="mainform__left">
					<div class="mainform__title h3 _bold">
						Оставить заявку
					</div>
					<div class="mainform__form">
						<FormBaseMain></FormBaseMain>
					</div>
				</div>
				<div class="mainfrom__right">
					<div class="mainform__title h3 _bold">
						Кредитный калькулятор
					</div>
					<div class="mainform__calc">
						<Calc></Calc>
					</div>
					<div class="mainform__acceptance">
            <div class="acceptance">Нажимая кнопку “Отправить” вы соглашаетесь на <br><router-link to="/privacy"
                    target="_blank">обработку
                    персональных
                    данных.</router-link></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import FormBaseMain from '@/components/forms/FormBaseMain.vue';
import Calc from '@/components/templates/Calc.vue';
</script>
