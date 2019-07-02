import Vue from 'vue'
import Vuex from 'vuex'
import $api from './api'

Vue.use(Vuex)

const apiKey = '86215701c26c937ceabd07b643b43744'

export default new Vuex.Store({
	state: {
		weather: null,
		isLoading: true,
		isError: false,
		cityName: 'Омск',
		units: 'metric',
		coords: null
	},
	mutations: {
		SET_WEATHER: (state, response) => {
			state.weather = response
		},
		SET_CITY_NAME: (state, response) => {
			state.cityName = response
		}
	},
	actions: {
		getWeatherByCityName({commit, state}, city = state.cityName) {
			return new Promise(resolve => {
				state.isLoading = true
				commit('SET_CITY_NAME', city)
				$api({
					url: `weather?APPID=${apiKey}&units=${state.units}&lang=ru&q=${city}`
				}).then((response) => {
					commit('SET_WEATHER', response.data)
					state.isLoading = false
					state.isError = false
					resolve()
				}).catch(() => {
					state.isLoading = false
					state.isError = true
					resolve()
				})
			})
		},
		getWeatherByCoords({commit, state}) {
			return new Promise(resolve => {
				if (state.coords) {
					state.isLoading = true

					$api({
						url: `weather?APPID=${apiKey}&units=${state.units}&lang=ru&lat=${state.coords.lat}&lon=${state.coords.lng}`
					}).then((response) => {
						commit('SET_CITY_NAME', response.data.name)
						commit('SET_WEATHER', response.data)
						state.isLoading = false
						state.isError = false
						resolve()
					}).catch(() => {
						state.isLoading = false
						state.isError = true
						resolve()
					})
				} else {
					resolve()
				}
			})
		}
	},
	getters: {
		getWeather: state => {
			return state.weather
		},
		getAdditionalData: state => {
			const weather = state.weather
			const speedTime = state.units === 'metric' ? 'с' : 'ч'

			const parsedArray = state.weather ? [
				{
					title: 'Ветер',
					value: `<b>${weather.wind.speed}</b> м/${speedTime}, ${getCardinalDirection(weather.wind.deg)}`
				},
				{
					title: 'Давление',
					value: `<b>${weather.main.pressure}</b> мм рт. ст.`
				},
				{
					title: 'Влажность',
					value: `<b>${weather.main.humidity}%</b>`
				},
				{
					title: 'Облачность',
					value: `<b>${weather.clouds.all}%</b>`
				},
			] : []

			function getCardinalDirection(angle) {
				const directions = ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 'южный', 'юго-западный', 'западный', 'северо-западный']
				return directions[Math.round(angle / 45) % 8]
			}

			return parsedArray
		},
		getCityName: state => {
			return state.cityName
		},
		loading: state => {
			return state.isLoading
		},
		error: state => {
			return state.isError
		},
	}
})
