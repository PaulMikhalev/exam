import axios from 'axios'

const instance = axios.create({
	baseURL: `https://api.openweathermap.org/data/2.5/`,
	method: 'GET',
	timeout: 5000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
})

export default instance
