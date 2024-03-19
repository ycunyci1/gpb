import { reactive } from 'vue'

export const store = reactive({
	products: [],
	brands: [],
	popups: {
		form: {
			active: 0,
		},
		mob: {
			active: 0,
		},
		buy: {
			active: 0,
			model: '',
		},
		credit: {
			active: 0,
		},
		creditmain: {
			active: 0,
		},
		creditbuy: {
			active: 0,
			model: '',
		},
		tradein: {
			active: 0,
		},
		kasko: {
			active: 0,
			mark: '',
			model: '',
			new: '',
			year: '',
			power: '',
			price: '',
		},
		callback: {
			active: 0,
		}
	},
})
