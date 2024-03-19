import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useAttributeValues() {
    const attributeValue = ref([])
    const attributeValues = ref([])

    const errors = ref('')
    const router = useRouter()

    const getAttributeValues = async () => {
        let response = await axios.get('/api/attributevalues')
        attributeValues.value = response.data
    }

    const getAttributeValue = async (id) => {
        let response = await axios.get(`/api/attributevalues/${id}`)
        attributeValue.value = response.data
    }

    const storeAttributeValue = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/attributevalues', data)
            await router.push({ name: 'admin.atts' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }

    }

    const updateAttributeValue = async (id) => {
        errors.value = ''
        try {
            await axios.patch(`/api/attributevalues/${id}`, attributeValue.value)
            await router.push({ name: 'admin.atts' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const destroyAttributeValue = async (id) => {
        await axios.delete(`/api/attributeValues/${id}`)
    }

    return {
        errors,
        attributeValue,
        attributeValues,
        getAttributeValue,
        getAttributeValues,
        storeAttributeValue,
        updateAttributeValue
    }
}
