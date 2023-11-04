<template>
	<div class="square">
		<div class="aspect"></div>
		<div class="aspect"></div>
		<div class="aspect"></div>
		<div class="aspect"></div>
		<div class="aspect"></div>
		<div class="aspect"></div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.square {
	z-index: -1;
	position: fixed;
	width: 200px;
	height: 300px;
	top: 50%;
	left: 50%;
	transform-style: preserve-3d;
	transform: translate(-50%, -50%) rotate3d(1, -1, 0, 30deg); //
	transition: all .3;
	// animation: square 2s linear none infinite;

	.aspect {
		width: 100%;
		height: 100%;

		&:nth-child(-n+2) {
			height: 200px;
		}

		background-color: rgba(0, 0, 0, 0.1);
		border: 1px solid silver;
		position: absolute;

		&:nth-child(1) {
			transform: rotate3d(1, 0, 0, 90deg) translate3d(0px, 0px, 100px);
		}

		&:nth-child(2) {
			transform: rotate3d(1, 0, 0, 270deg) translate3d(0, 0, 200px);
		}

		&:nth-child(3) {
			transform: rotate3d(0, 1, 0, 270deg) translate3d(0, 0, 100px);
		}

		&:nth-child(4) {
			transform: rotate3d(0, 1, 0, 90deg) translate3d(0, 0, 100px);
		}

		&:nth-child(5) {
			transform: translate3d(0, 0, 100px);
		}

		&:nth-child(6) {
			transform: translate3d(0, 0, 100px);
		}
	}
}

@keyframes square {
	0% {
		transform: scaleY(.5);
	}

	25% {
		transform: scaleY(1);
	}

	50% {
		transform: scaleX(2);
	}

	75% {
		transform: scaleX(1);
	}

	100% {
		transform: scaleY(.5);
	}
}
</style>