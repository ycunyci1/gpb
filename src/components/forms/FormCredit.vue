<template>
    <form id="credit_form" @submit.prevent="saveForm">
        <div class="form__column">
            <input type="hidden" name="credit" value="3">
            <input type="text" required placeholder="Имя*" name="name" class="input input-styled" v-model="state.name">
            <div class="popup__text _red" v-if="state.nameError">
                {{ state.nameError }}
            </div>
            <input type="text" placeholder="Марка и модель" name="model" class="input input-styled" v-model="store.popups.creditbuy.model">
            <input type="tel" required placeholder="Телефон*" name="phone" class="input input-styled" v-model="state.phone"  v-mask="'+7 (###) ###-##-##'">
            <div class="popup__text _red" v-if="state.phoneError">
                {{ state.phoneError }}
            </div>
            <input type="email" placeholder="E-mail" name="email" class="input input-styled" v-model="state.email">
            <div class="popup__text _red" v-if="state.mailError">
                {{ state.mailError }}
            </div>
            <input type="submit" class="button button_secondary" value="Продолжить">
            <div class="acceptance">Нажимая кнопку “Продолжить” вы соглашаетесь на <br><router-link to="/privacy"
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
import { reactive } from 'vue'
import { store } from '@/store';

const errors = ref('')
const initialState = reactive({
    name: '',
    nameError: '',
    phone: '',
    phoneError: '',
    mail: '',
    mailError: '',
    validationErrors: '',
})
const state = reactive({
    name: '',
    nameError: '',
    phone: '',
    phoneError: '',
    mail: '',
    mailError: '',
    validationErrors: '',
})

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const stateCheck = () => {
    state.validationErrors = false;
    state.nameError = '';
    state.phoneError = '';
    state.mailError = '';
    if (!state.name) {
        state.validationErrors = true;
        state.nameError = 'Данное поле необходимо заполнить';
    }
    if (state.phone.length < 18) {
        state.validationErrors = true;
        state.phoneError = 'Введите полный номер телефона';
    }
    if (state.mail) {
        if (!validateEmail(state.mail)) {
            state.validationErrors = true;
            state.mailError = 'Введите корректный адрес электронной почты';
        }
    }

}
const saveForm = async () => {
    stateCheck();
    let form = document.getElementById("credit_form");
    if (state.validationErrors) {
        form.querySelector('.button').value = 'Проверьте заполнение';
        setTimeout(function () {
            form.querySelector('.button').value = 'Продолжить';
        }, 3000);
        return;
    }
    errors.value = '';
    form.querySelector('.button').value = 'Отправляем';
    let formData = new FormData(form);
    try {
        await axios.post(`https://12official.com/api/application_send`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        );
        form.reset();
        form.querySelector('.button').value = 'Успешно';
        //ym(95838644,'reachGoal','purchase_form_ok')
        state.name = '';
        state.phone = '';
        state.mail = '';
        form.querySelector('.button').classList.add('success');
        setTimeout(function () {
            form.querySelector('.button').value = 'Продолжить';
        }, 3000);
        document.location.href = "https://www.gazprombank.ru/full/loan-auto/car/?utm_source=flatter&utm_medium=cpa&utm_content=flatter&utm_campaign=cn:CPA_CAMPAIGN%7Cd:perform%7Cpn:auto_credit%7Crt:site%7Crk:partner_activity&product=auto_credit";
    } catch (e) {
        if (e.response.status === 422) {
            form.querySelector('.button').value = 'Ошибка';
            setTimeout(function () {
                form.querySelector('.button').value = 'Продолжить';
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
