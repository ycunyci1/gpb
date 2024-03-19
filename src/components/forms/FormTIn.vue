<template>
    <form id="tin_form" @submit.prevent="saveForm">
        <div class="form__column">
            <input type="text" required placeholder="Имя*" name="name" class="input input-styled">
            <input type="tel" required placeholder="Телефон*" name="phone" class="input input-styled"  v-mask="'+7 (###) ###-##-##'">
            <input type="email" placeholder="E-mail" name="email" class="input input-styled">
            <input type="text" placeholder="Город" name="city" class="input input-styled">
            <input type="text" placeholder="VIN" name="vin" class="input input-styled">
            <input type="text" placeholder="Марка и модель" name="model" class="input input-styled">
            <input type="text" placeholder="Пробег" name="mileage" class="input input-styled">
            <input type="submit" class="button button_secondary">
            <div class="acceptance">Нажимая кнопку “Отправить” вы соглашаетесь на <br><router-link to="/privacy"
                    target="_blank">обработку
                    персональных
                    данных.</router-link></div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const errors = ref('');
const saveForm = async () => {
    console.log(1);
    errors.value = ''
    let form = document.getElementById("tin_form");
    form.querySelector('.button').value = 'Отправляем';
    let formData = new FormData(form);
    try {
        await axios.post(`https://12official.com/api/trade_in_send`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        );
        form.reset();
        form.querySelector('.button').value = 'Успешно';
        ym(95838644,'reachGoal','tradein_form_ok');
        form.querySelector('.button').classList.add('success');
        setTimeout(function () {
            form.querySelector('.button').value = 'Отправить';
        }, 3000);
    } catch (e) {
        if (e.response.status === 422) {

            form.querySelector('.button').value = 'Ошибка';
            setTimeout(function () {
                form.querySelector('.button').value = 'Отправить';
            }, 3000);
            for (const key in e.response.data.errors) {
                errors.value = e.response.data.errors
            }
            for (const key in e.response.data.errors) {
                form.querySelector("[name='" + key + "']").classList.add('input-error');
                setTimeout(function () {
                    form.querySelector("[name='" + key + "']").classList.remove('input-error');
                }, 3000);
            }
        }
    } finally {
    }
}
</script>
