<template>
	<div class="app-footer">
		<div class="additional-data">
			<div class="additional-data_item" :key="data.title" v-for="data in additionalData">
				<div class="additional-data_title">{{data.title}}</div>
				<div class="additional-data_value">{{data.value}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app-footer',
		data() {
			return {
				additionalData: [
					{
						title: 'Ветер',
						value: '5 м/c, западный'
					},
					{
						title: 'Давление',
						value: '752 мм рт. ст.'
					},
					{
						title: 'Влажность',
						value: '60%'
					},
					{
						title: 'Вероятность дождя',
						value: '10%'
					},
				]
			}
		}
	}
</script>

<style lang="stylus">
	.additional-data
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