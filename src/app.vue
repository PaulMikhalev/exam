<template>
	<div id="app">
		<app-header/>
		<app-main/>
		<app-footer/>
	</div>
</template>

<script>
	import appHeader from './components/app-header'
	import appMain from './components/app-main'
	import appFooter from './components/app-footer'

	import {mapActions} from 'vuex'

	export default {
		name: 'app',
		components: {
			appFooter,
			appHeader,
			appMain
		},
		data() {
			return {
				city: {
					name: this.$store.state.cityName
				}
			}
		},
		methods: {
			...mapActions(['getWeatherByCityName']),
		},
		mounted() {
			this.getWeatherByCityName()
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
</style>