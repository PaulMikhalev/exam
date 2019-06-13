import Vue from 'vue'
import Vuex from 'vuex'
import $api from './api'

Vue.use(Vuex)

const apiKey = '86215701c26c937ceabd07b643b43744'

export default new Vuex.Store({
	state: {
		weather: {},
		isLoading: true,
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
					resolve()
				}).catch(() => {
					state.isLoading = false
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
						resolve()
					}).catch(() => {
						state.isLoading = false
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
		getCityName: state => {
			return state.cityName
		}
	}
})
