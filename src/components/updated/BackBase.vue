<template>
	<div class="breadcrumbs">
		<div class="container">
			<a @click="hasHistory ? $router.go(-1) : $router.push('/')" class="breadcrumb">
				<div class="breadcrumb__icon">
					<svg width="14" height="12" viewBox="0 0 14 12" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M6.47577 0.334661C6.18288 0.0417673 5.70801 0.0417665 5.41511 0.334659L0.280096 5.46966C0.139443 5.61031 0.0604248 5.80108 0.0604248 5.99999C0.0604248 6.1989 0.139443 6.38967 0.280096 6.53032L5.41511 11.6653C5.70801 11.9582 6.18288 11.9582 6.47577 11.6653C6.76867 11.3724 6.76866 10.8976 6.47577 10.6047L2.62109 6.74999L13.1894 6.74999C13.6037 6.74999 13.9394 6.4142 13.9394 5.99999C13.9394 5.58577 13.6037 5.24999 13.1894 5.24999L2.62109 5.24999L6.47577 1.39532C6.76866 1.10243 6.76867 0.627555 6.47577 0.334661Z"
							fill="#1E222E" fill-opacity="0.64" />
					</svg>
				</div>
				<div class="breadcrumb__text">Вернуться</div>
			</a>
		</div>
	</div>
</template>

<script setup>
const hasHistory = () => { return window.history.length > 2 }
</script>
