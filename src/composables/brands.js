import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useBrands() {
    const brand = ref([])
    const brands = ref([])

    const errors = ref('')
    const router = useRouter()

    const getBrands = async () => {
        let response = await axios.get('/api/brands')
        brands.value = response.data
    }

    const getBrand = async (id) => {
        let response = await axios.get(`/api/brands/${id}`)
        brand.value = response.data
    }

    const storeBrand = async (data) => {
        errors.value = ''

        try {
            await axios.post('/api/brands', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            await router.push({ name: 'admin.brands' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }

    }

    const updateBrand = async (id) => {
        errors.value = ''
        try {
            await axios.post(`/api/brands/${id}`, brand.value, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await router.push({ name: 'admin.brands' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const destroyBrand = async (id) => {
        await axios.delete(`/api/brands/${id}`)
    }

    return {
        errors,
        brand,
        brands,
        getBrand,
        getBrands,
        storeBrand,
        updateBrand,
        destroyBrand
    }
}
