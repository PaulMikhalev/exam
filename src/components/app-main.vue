<template>
	<div class="weather">
		<div class="weather-main">
			<div class="weather-main_box">
				<div class="weather-main_top">
					<div class="weather-main_icon"><component :is="parsedIconName(weather.weather[0].icon)"/></div>
					<div class="weather-main_value">{{weather.main.temp}}°</div>
				</div>
				<div class="weather-main_description">{{weather.weather[0].description}}</div>
			</div>
		</div>
		<div class="weather-additional-data">
			<div class="weather-additional-data_item" :key="data.title" v-for="data in additionalData">
				<div class="weather-additional-data_title">{{data.title}}</div>
				<div class="weather-additional-data_value">{{data.value}}</div>
			</div>
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
				icon: 'icon-thunderstorm',
			}
		},
		methods: {
			...mapGetters(['getWeather', 'getAdditionalData']),
			parsedIconName(id) {
				const parsedId = id.slice(0, 2)

				switch (parsedId) {
					case '01': return 'iconClear'
					case '02': return 'iconFewClouds'
					case '03': return 'iconClouds'
					case '04': return 'iconClouds'
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
			},
			additionalData() {
				return this.getAdditionalData()
			}
		},
	}
</script>

<style lang="stylus">
	.weather
		position: relative
		height: 100%
		width: 100%
		display: flex
		flex-direction: column
		opacity: 1
		transition: opacity .3s

		&._loading
			opacity: .4

		&-main
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

		&-additional-data
			display: flex
			justify-content: space-between

			&_item
				/*margin-right: 50px*/

			&_title
				font-size: 18px
				opacity: .6
				margin-bottom: 10px

			&_value
				font-size: 25px
				font-weight: 700
</style>