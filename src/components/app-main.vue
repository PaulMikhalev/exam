<template>
	<div class="weather">
		<div class="weather_box">
			<div class="weather_top">
				<div class="weather_icon"><component :is="parsedIconName(weather.weather[0].icon)"/></div>
				<div class="weather_value">{{weather.main.temp}}°</div>
			</div>
			<div class="weather_description">{{weather.weather[0].description}}</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	// icons
	import iconClear from '../assets/img/weatherIcons/sun.svg'
	import iconClouds from '../assets/img/weatherIcons/cloud.svg'
	import iconRain from '../assets/img/weatherIcons/rain.svg'
	import iconThunderstorm from '../assets/img/weatherIcons/strom.svg'
	import iconFewClouds from '../assets/img/weatherIcons/partly-cloudy.svg'

	export default {
		name: 'app-main',
		components: {
			iconClear,
			iconFewClouds,
			iconClouds,
			iconRain,
			iconThunderstorm
		},
		data() {
			return {
				value: 19,
				description: 'Солнечно',
				icon: 'icon-thunderstorm'
			}
		},
		methods: {
			...mapGetters(['getWeather']),
			parsedIconName(id) {
				const parsedId = id.slice(0, 2)

				switch (parsedId) {
					case '01': return 'iconClear'
					case '02': return 'iconFewClouds'
					case '03': return 'iconClouds'
					case '09': return 'iconRain'
					case '10': return 'iconRain'
					case '11': return 'iconThunderstorm'
					default: return 'iconClouds'
				}
			}
		},
		computed: {
			weather() {
				return this.getWeather()
			}
		},
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