<template>
	<div class="app-header">
		<div class="city">
			<div class="city_selected">
				<h1 class="city_selected--name">{{city}}</h1>
				<div class="city_selected--btns">
					<button class="city_selected--change" @click.prevent="isChangeCity = true">Сменить город</button>
					<button class="city_selected--gps"><iconGps class="city_selected--gps-icon"/> Моё местоположение</button>
				</div>
			</div>
			<div class="city_change" v-if="isChangeCity">
				<input class="city_change--input" type="text" v-model="city"/>
				<button class="city_change--submit" @click.prevent="isChangeCity = false">OK</button>
			</div>
		</div>

		<div class="temperature">
			<span class="temperature_text">°</span>
			<div class="temperature_box">
				<label :key="unit" :class="['temperature_item', {'_selected': temperatureUnit === unit}]" v-for="unit in temperatures">
					<span class="temperature_name">{{unit}}</span>
					<input type="radio" name="temperature" class="temperature_unit" :value="unit" v-model="temperatureUnit">
				</label>
			</div>
		</div>
	</div>
</template>

<script>
	import iconGps from '../assets/img/gps.svg'

	export default {
		name: 'app-header',
		data() {
			return {
				temperatureUnit: 'C',
				temperatures: ['C', 'F'],
				city: 'Омск',
				isChangeCity: false
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

			&._selected
				background-color: rgba(#fff, .2)
				color: #ffffff

		&_name
			._selected &
				font-weight: 700

		&_unit
			display: none
</style>