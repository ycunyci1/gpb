<template>
	<div class="banners block">
		<div class="container">
			<div class="banners__cat">
				<swiper-container class="banners__swiper" :effect="'fade'" :loop="true" :navigation="{
					nextEl: '.banners__next',
					prevEl: '.banners__prev',
				}" :pagination="{
	el: '.banners__nav',
	type: 'bullets',
	clickable: true,
}">
					<swiper-slide>
						<div style="cursor: pointer;"
							@click="store.popups.tradein.active = (store.popups.tradein.active) ? 0 : 1"><img
								src="/img/xlp1.jpg" class="_desk"><img src="/img/xlp1_mob.jpg" class="_mob"></div>
					</swiper-slide>
					<swiper-slide><img src="/img/xlp2.jpg" class="_desk"><img src="/img/xlp2_mob.jpg"
							class="_mob"></swiper-slide>
				</swiper-container>
				<div class="banners__prev banners__btn">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14px"
						height="14px" viewBox="-4.5 0 20 20" version="1.1">
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="Dribbble-Light-Preview" transform="translate(-305.000000, -6679.000000)" fill="#000000">
								<g id="icons" transform="translate(56.000000, 160.000000)">
									<path
										d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"
										id="arrow_right-[#336]">

									</path>
								</g>
							</g>
						</g>
					</svg>
				</div>
				<div class="banners__next banners__btn">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14px"
						height="14px" viewBox="-4.5 0 20 20" version="1.1">
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="Dribbble-Light-Preview" transform="translate(-305.000000, -6679.000000)" fill="#000000">
								<g id="icons" transform="translate(56.000000, 160.000000)">
									<path
										d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"
										id="arrow_right-[#336]">
									</path>
								</g>
							</g>
						</g>
					</svg>
				</div>
			</div>
			<div class="banners__nav"></div>
		</div>
	</div>
</template>

<script setup>
import { store } from '@/store';
</script>

<style>@import 'swiper/css';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';</style>
