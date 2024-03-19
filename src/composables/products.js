import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useProducts() {
    const product = ref({
        carbody: [{
            value: '',
        }],
    })
    const productBrand = ref([])
    const productPrev = ref('')
    const productPrevGal = ref([])
    const products = ref([])
    const productArray = ref({})
    const errors = ref('')
    const router = useRouter()

    const getProducts = async () => {
        let response = await axios.get('https:/12official.com/api/products')
        products.value = response.data
    }

    const getProduct = async (id) => {
        let response = await axios.get(`https:/12official.com/api/products/${id}`)
        product.value = response.data
        productPrev.value = response.data.main_image ? response.data.main_image.full : ''
        for (let image in response.data.images) {
            productPrevGal.value[image] = response.data.images[image].full;
        }
        for (let attr in response.data.values) {
            productArray.value[response.data.values[attr].attribute_id] = response.data.values[attr].value;
        }
        let brandResponse = await axios.get(`/api/brands/${response.data.brand_id}`)
        productBrand.value = brandResponse.data
    }

    const storeProduct = async (data) => {
        errors.value = ''
        try {
            await axios.post('https:/12official.com/api/products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            await router.push({ name: 'admin.cars' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }

    }

    const updateProduct = async (id) => {
        errors.value = ''
        try {
            document.getElementById('save_product').setAttribute('disabled', true);
            document.getElementById('save_product').innerHTML = 'Сохраняем';
            product.value.values = '';
            product.value.get_brand = '';
            product.value.main_image = '';
            product.value.images = '';
            if (product.value.main_imagenew) {
                product.value.main_image = product.value.main_imagenew;
            }
            if (product.value.imagesnew) {
                product.value.images = product.value.imagesnew;
            }
            product.value.attributes = productArray.value
            await axios.post(`/api/products/${id}`, product.value, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await router.push({ name: 'admin.cars' })
        } catch (e) {
            if (e.response.status === 422) {
                document.getElementById('save_product').setAttribute('disabled', false)
                document.getElementById('save_product').innerHTML = 'Ошибка';
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const destroyProduct = async (id) => {
        await axios.delete(`/api/products/${id}`)
    }

    const publishProduct = async (id, status) => {
        await axios.post(`/api/products_published/${id}`, {
            published: status,
        })
    }

    const destroyProductImage = async (id, prodId) => {
        await axios.delete(`/api/images/${id}`)
    }

    return {
        errors,
        product,
        productBrand,
        products,
        getProduct,
        getProducts,
        storeProduct,
        updateProduct,
        destroyProduct,
        productArray,
        productPrev,
        productPrevGal,
        destroyProductImage,
        publishProduct
    }
}
