<template>
    <form class="form lend__form" id="main_form" @submit.prevent="saveForm">
        <div class="title lend__title">
            Обратная связь
        </div>
        <div class="form__grid">
            <input type="text" name="name" placeholder="Имя*" required class="input input-styled" v-model="state.name">
            <div class="popup__text _red" v-if="state.nameError">
                {{ state.nameError }}
            </div>
            <input type="text" name="model" placeholder="Марка и модель" class="input input-styled">
            <input type="tel" name="phone" placeholder="Телефон*" required class="input input-styled" v-model="state.phone" v-mask="'+7 (###) ###-##-##'">
            <div class="popup__text _red" v-if="state.phoneError">
                {{ state.phoneError }}
            </div>
            <input type="email" name="email" placeholder="E-mail" class="input input-styled"  v-model="state.mail">
            <div class="popup__text _red" v-if="state.mailError">
                {{ state.mailError }}
            </div>
            <textarea name="message" placeholder="Сообщение..." class="textarea input-styled textarea-styled"></textarea>
        </div>
        <input type="submit" class="button button_secondary">
        <div class="acceptance">Нажимая кнопку “Отправить” вы соглашаетесь на <br><a :href="'/privacy'"
                target="_blank">обработку
                персональных
                данных.</a></div>
    </form>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
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
    let form = document.getElementById("main_form");
    if (state.validationErrors) {
        form.querySelector('.button').value = 'Проверьте заполнение';
        setTimeout(function () {
            form.querySelector('.button').value = 'Отправить';
        }, 3000);
        return;
    }
    errors.value = ''
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
