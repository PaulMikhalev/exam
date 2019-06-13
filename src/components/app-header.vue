<template>
	<div class="app-header">
		<div class="city">
			<div class="city_selected">
				<h1 class="city_selected--name">{{cityName}}</h1>
				<div class="city_selected--btns">
					<button class="city_selected--change" @click.prevent="openInput">Сменить город</button>
					<button class="city_selected--gps" @click.prevent="getLocation"><iconGps class="city_selected--gps-icon"/> Моё местоположение</button>
				</div>
			</div>
			<div class="city_change" v-if="isChangeCity">
				<input class="city_change--input" type="text" @keyup.enter="changeCity" v-model="city.name"/>
				<button class="city_change--submit" @click.prevent="changeCity">OK</button>
			</div>
		</div>

		<div class="temperature">
			<span class="temperature_text">°</span>
			<div class="temperature_box">
				<label :key="units.value" :class="['temperature_item', {'_selected': appState.units === units.value}]" v-for="units in temperatures">
					<span class="temperature_name">{{units.shortName}}</span>
					<input type="radio" name="temperature" class="temperature_units" :value="units.value" v-model="appState.units" @change="changeUnits">
				</label>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'

	import iconGps from '../assets/img/gps.svg'

	export default {
		name: 'app-header',
		data() {
			return {
				appState: this.$store.state,
				temperatures: [
					{
						shortName: 'C',
						value: 'metric'
					},
					{
						shortName: 'F',
						value: 'imperial'
					},
				],
				city: {
					name: this.$store.state.cityName
				},
				cityNameCache: '',
				isChangeCity: false
			}
		},
		methods: {
			...mapActions(['getWeatherByCityName', 'getWeatherByCoords']),
			...mapGetters(['getCityName']),
			openInput() {
				this.cityNameCache = this.city.name = this.$store.state.cityName
				this.isChangeCity = true
			},
			closeInput() {
				this.isChangeCity = false
			},
			changeCity() {
				if (this.city.name === '') {
					this.city.name = this.cityNameCache
				}

				if (this.cityNameCache !== this.city.name) {
					this.getWeatherByCityName(this.city.name)
				}

				this.closeInput()
			},
			changeUnits() {
				this.getWeatherByCityName()
			},
			getLocation() {
				this.$getLocation()
					.then(coordinates => {
						this.$store.state.coords = {
							lat: coordinates.lat,
							lng: coordinates.lng
						}

						this.getWeatherByCoords()

						this.city.name = this.getCityName()
					});
			}
		},
		computed: {
			cityName() {
				return this.getCityName()
			}
		},
		components: {
			iconGps
		}
	}
</script>

<style lang="stylus">
	.app-header
		position: relative
		width: 100%
		display: flex
		justify-content: space-between
		align-items: flex-start

	.city
		&_selected
			&--name
				height: 61px
				font-size: 50px
				margin: 0 0 10px

			&--btns
				display: flex
				align-items: center

			&--change
			&--gps
				display: inline-flex
				align-items: center
				opacity: 0.6
				margin-right: 30px
				font-size: 18px
				transition: opacity .3s

				&:hover
					opacity: 1

				&-icon
					margin-right: 15px

		&_change
			position: absolute
			top: 0
			left: 0
			/*max-width: 580px*/
			width: 580px

			&--input
				width: 100%
				line-height: 100px
				border: none
				border-radius: 8px
				padding: 0 32px
				background-color: #ffffff
				box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15)
				font-size: 30px

			&--submit
				position: absolute
				right: 32px
				top: 50%
				transform: translateY(-50%)
				font-size: 30px
				color: #1086ff
				text-transform: uppercase

	.temperature
		display: inline-flex
		font-size: 18px
		color: rgba(#fff, .4)

		&_text
			font-family: 'PT Sans'
			margin-right: 10px
			user-select: none

		&_box
			border: 1px solid rgba(#fff, .4)
			border-radius: 8px
			overflow: hidden

		&_item
			display: inline-flex
			align-items: center
			justify-content: center
			width: 38px
			height: 30px
			cursor: pointer
			user-select: none
			transition: color .3s

			&:hover
				color: #ffffff

			&._selected
				background-color: rgba(#fff, .2)
				color: #ffffff

		&_name
			._selected &
				font-weight: 700

		&_units
			display: none
</style>