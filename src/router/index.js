import { createRouter, createWebHashHistory } from 'vue-router'
import CatLayout from '@/components/layouts/CatLayout.vue'
import CarLayout from '@/components/layouts/CarLayout.vue'
import ContLayout from '@/components/layouts/ContLayout.vue'
import PrivacyLayout from '@/components/layouts/PrivacyLayout.vue'
import InfoLayout from '@/components/layouts/InfoLayout.vue'
import BrandLayout from '@/components/layouts/BrandLayout.vue'
const router = createRouter({
	history: createWebHashHistory(),
	scrollBehavior(to, from, savedPosition) {
			return { top: 0 }
	},
	routes: [
		{
			path: '/',
			name: 'home',
			component: CatLayout,
		},
		{
			path: '/contacts',
			name: 'contacts',
			component: InfoLayout,
		},
		{
			path: '/info',
			name: 'info',
			component: ContLayout,
		},
		{
			path: '/privacy',
			name: 'privacy',
			component: PrivacyLayout,
		},
		{
			path: '/catalog/:id(\\d+)',
			name: 'catalog.car',
			component: CarLayout,
			props: true,
		},
		{
			path: '/catalog/:brand',
			name: 'brand',
			component: BrandLayout,
			props: true,
		},
		{
			path: '/catalog',
			name: 'catalog',
			component: BrandLayout,
			props: true,
		},
		{ 
      path: '/:catchAll(.*)', 
      component: CatLayout,
      name: 'NotFound'
    }
	],
})

export default router
