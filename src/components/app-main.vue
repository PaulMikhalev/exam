<template>
	<div class="weather">
		<div class="weather_box">
			<div class="weather_top">
				<div class="weather_icon"><iconSun/></div>
				<div class="weather_value">{{value}}°</div>
			</div>
			<div class="weather_description">{{description}}</div>
		</div>
	</div>
</template>

<script>
	import iconSun from '../assets/img/sun.svg'

	export default {
		name: 'app-main',
		components: {
			iconSun
		},
		data() {
			return {
				value: 19,
				description: 'Солнечно'
			}
		}
	}
</script>

<style lang="stylus">
	.weather
		display: flex
		justify-content: center
		align-items: center
		width: 100%
		height: 100%

		&_box
			margin-bottom: 30px // svg icon margin fix

		&_top
			display: flex
			align-items: center

		&_description
			text-align: center
			font-size: 25px

		&_value
			font-family: 'PT Sans'
			font-size: 120px
</style>