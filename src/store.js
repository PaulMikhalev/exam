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
		units: 'metric'
	},
	mutations: {
		SET_WEATHER: (state, response) => {
			state.weather = response
		}
	},
	actions: {
		getWeatherFromCity({commit, state}, city = state.cityName) {
			return new Promise(resolve => {
				state.isLoading = true
				$api({
					url: `weather?APPID=${apiKey}&units=${state.units}&lang=ru&q=${city}`
				}).then((response) => {
					commit('SET_WEATHER', response)
					state.isLoading = false
					resolve()
				}).catch(() => {
					state.isLoading = false
					resolve()
				})
			})
		},
	},
	getters: {
		getWeather: state => {
			return state.weather
		}
	}
})
