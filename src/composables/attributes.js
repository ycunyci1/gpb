import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useAttributes() {
    const attribute = ref([])
    const attributes = ref([])

    const errors = ref('')
    const router = useRouter()

    const getAttributes = async () => {
        let response = await axios.get('/api/attributes')
        attributes.value = response.data
    }

    const getAttribute = async (id) => {
        let response = await axios.get(`/api/attributes/${id}`)
        attribute.value = response.data
    }

    const storeAttribute = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/attributes', data)
            await router.push({ name: 'admin.atts' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }

    }

    const updateAttribute = async (id) => {
        errors.value = ''
        try {
            attribute.value.values = '';
            await axios.patch(`/api/attributes/${id}`, attribute.value)
            await router.push({ name: 'attributes.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const destroyAttribute = async (id) => {
        await axios.delete(`/api/attributes/${id}`)
    }

    return {
        errors,
        attribute,
        attributes,
        getAttribute,
        getAttributes,
        storeAttribute,
        updateAttribute
    }
}
