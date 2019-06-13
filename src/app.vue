<template>
	<div id="app">
		<app-header/>

		<div class="error" v-if="isError">
			<h1>
				Ошибка =(
			</h1>
			<p>Попробуйте ввести другой город</p>
		</div>

		<div class="loader" v-if="dataLoading">
			<h1>
				Загрузка ...
			</h1>
		</div>

		<app-main v-if="!isError && !dataLoading" :class="{_loading: this.$store.state.isLoading}"/>
	</div>
</template>

<script>
	import appHeader from './components/app-header'
	import appMain from './components/app-main'

	import {mapActions, mapGetters} from 'vuex'

	export default {
		name: 'app',
		components: {
			appHeader,
			appMain
		},
		data() {
			return {
				city: {
					name: this.$store.state.cityName
				},
				dataLoading: true
			}
		},
		methods: {
			...mapActions(['getWeatherByCityName']),
			...mapGetters(['error', 'loading']),
		},
		computed: {
			isError() {
				return this.error()
			},
			isLoading() {
				return this.loading()
			},
		},
		async mounted() {
			await this.getWeatherByCityName()

			this.dataLoading = false
		}
	}
</script>

<style lang="stylus">
	font(name, file, weight = 400)
		@font-face
			font-family: name
			src: url('./assets/fonts/'+file+'.eot')
			src: url('./assets/fonts/'+file+'.eot?#iefix') format("embedded-opentype"),
					url('./assets/fonts/'+file+'.woff') format("woff"),
					url('./assets/fonts/'+file+'.ttf') format("truetype")
			font-weight: weight
			font-style: normal

	font('Proxima Nova', 'ProximaNova-Regular', 400)
	font('Proxima Nova', 'ProximaNova-Bold', 700)

	*
		box-sizing: border-box

	body, html
		position: relative
		width: 100%
		height: 100%
		margin: 0
		color: #ffffff
		font-family: "Proxima Nova"

	button
		background: none
		outline: none
		border: none
		color: #ffffff
		padding: 0
		cursor: pointer
		user-select: none
		font-family: "Proxima Nova"

	#app
		position: relative
		padding: 75px 75px 120px 100px
		display: flex
		flex-direction: column
		width: 100%
		height: 100%
		background-color: #498cec

		@media (max-width: 670px)
			padding: 20px 40px 40px 20px

	.error
	.loader
		position: relative
		display: flex
		justify-content: center
		align-items: center
		flex-direction: column
		width: 100%
		height: 100%
		top: 0
		left: 0
		font-size: 30px

		@media (max-width: 670px)
			font-size: 20px
</style>