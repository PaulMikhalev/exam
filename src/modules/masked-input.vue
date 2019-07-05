<template>
	<div class="masked-input" :class="{_active: obj.val}">
		<label class="masked-input__name">{{obj.name}}</label>
		<masked-input class="masked-input__item" mask="1.1" type="text" v-model="obj.val" />
	</div>
</template>

<script>
	import maskedInput from 'vue-masked-input'

	export default {
		name: 'input',
		props: {
			obj: Object
		},
		components: {
			maskedInput
		},
		data() {
			return {
				focused: false
			}
		},
	}
</script>

<style lang="stylus">
	.masked-input
		margin-top: 20px
		position: relative
		width: 100%

		&__name
			position: absolute
			left: 10px
			top: 10px
			transition-property: font-size, line-height, color
			transition-duration: .3s
			pointer-events none
			line-height: 36px

			._active &
				font-size: 12px
				color: rgba(#fff, 0.5)
				line-height: 12px

		&__item
			width: 100%
			background: none
			border-radius: 5px
			border: 1px solid #fff
			padding: 30px 10px 10px
			outline: none
			color: rgba(#fff, 0)
			transition-property: color
			transition-duration: .3s
			transition-delay: .15s

			._active &
				color: rgba(#fff, 1)
				transition-delay: 0s


</style>