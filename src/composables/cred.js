import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useCreds() {
    const cred = ref([])
    const creds = ref([])

    const errors = ref('')
    const router = useRouter()

    const getCreds = async () => {
        let response = await axios.get('/api/cred_calculators')
        creds.value = response.data
    }

    const getCred = async (id) => {
        let response = await axios.get(`/api/cred_calculators/${id}`)
        cred.value = response.data
    }

    const storeCred = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/cred_calculators', data)
            await router.push({ name: 'admin.cred' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }

    }

    const updateCred = async (id) => {
        errors.value = ''
        try {
            await axios.patch(`/api/cred_calculators/${id}`, cred.value)
            await router.push({ name: 'admin.cred' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const destroyCred = async (id) => {
        await axios.delete(`/api/cred_calculators/${id}`)
    }

    return {
        errors,
        cred,
        creds,
        getCred,
        getCreds,
        storeCred,
        updateCred,
        destroyCred
    }
}
