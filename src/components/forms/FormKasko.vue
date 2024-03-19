<template>
    <form id="kas_form" @submit.prevent="saveForm">
        <div class="form__column">
            <input type="text" placeholder="ФИО*" required name="fullname" class="input input-styled" v-model="state.name">
            <div class="popup__text _red" v-if="state.nameError">
                {{ state.nameError }}
            </div>
            <input type="tel" required placeholder="Телефон*" name="phone" class="input input-styled" v-model="state.phone"
                v-mask="'+7 (###) ###-##-##'">
            <div class="popup__text _red" v-if="state.phoneError">
                {{ state.phoneError }}
            </div>
            <div class="popup__text">
                Новое ТС?
            </div>
            <select type="text" placeholder="Новое ТС" name="new_vehicle" class="input input-styled" v-model="store.popups.kasko.new">
                <option value="">Новое ТС?</option>
                <option value="Да">Да</option>
                <option value="Нет">Нет</option>
            </select>
            <input type="text" placeholder="Марка" name="brand" class="input input-styled" v-model="store.popups.kasko.mark">
            <input type="text" placeholder="Модель" name="model" class="input input-styled" v-model="store.popups.kasko.model">
            <div class="popup__text">
                Год выпуска
            </div>
            <input type="text" placeholder="Год выпуска" name="year" class="input input-styled" v-model="store.popups.kasko.year">
            <div class="popup__text">
                Страховая сумма (руб.)
            </div>
            <input type="text" placeholder="Страховая сумма (руб.)" name="insurance_sum" class="input input-styled" v-model="store.popups.kasko.price">
            <div class="popup__text">
                Мощность (л.с.)
            </div>
            <input type="text" placeholder="Мощность (л.с.)" name="power" class="input input-styled"  v-model="store.popups.kasko.power">
            <div class="popup__text">
                VIN
            </div>
            <input type="text" placeholder="VIN" name="vin" class="input input-styled">
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
import { reactive } from 'vue'
import { store } from '@/store';

const errors = ref('')
const initialState = reactive({
    name: '',
    nameError: '',
    phone: '',
    phoneError: '',
    validationErrors: '',
})
const state = reactive({
    name: '',
    nameError: '',
    phone: '',
    phoneError: '',
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

}
const saveForm = async () => {
    stateCheck();
    let form = document.getElementById("kas_form");
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
        await axios.post(`https://12official.com/api/insurance_send`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        );
        form.reset();
        form.querySelector('.button').value = 'Успешно';
        ym(95838644,'reachGoal','ins_form_ok')
        state.name = '';
        state.phone = '';
        form.querySelector('.button').classList.add('success');
        setTimeout(function () {
            form.querySelector('.button').value = 'Отправить';
        }, 3000);
    } catch (e) {
        console.log(e)
        if (e.response) {
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
            } else {
                console.log(e);
            }
        }
    } finally {
    }
}
</script>
