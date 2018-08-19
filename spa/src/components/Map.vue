<template>
	<h1> {{map}}</h1>
</template>

<script>
import axios from 'axios';
/* eslint-disable */
export default {
	name: 'Map',
	data () {
		return {
			map: 'Cartes des annonces',
			points:[]
		}
	},
	mounted () {
		axios
		.get('http://localhost:4242/home')
		.then(response => (this.points = response))
	}
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container_annonce{
	display: flex;
	justify-content: space-around;
	flex-direction: row;
	width: 100%;
}
.annonce{
	background-color: black;
	width: 33%;
	border: solid red 2px;
}
.annonce p {
	color: white;
}

</style>
