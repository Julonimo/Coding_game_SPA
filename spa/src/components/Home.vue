<template>
	<div>
		<h1> Rescue pets</h1>
		<button>
		<a href="http://localhost:8080/#/map">Carte</a>
		</button>
		<h1> Add annonce </h1>
		<p v-if='errors.length'>
			<ul>
				<li class="errors" v-for="error in errors">{{ error }}</li>
			</ul>
		</p>
		<p>
			<label for="animal"> Type d'animal </label>
			<select v-model="animal" name="animal">
				<option>Chien</option>
				<option>Chat</option>
				<option>Lapin</option>
				<option>Perroquet</option>
			</select>
		</p>
		<p>
			<label for="animal"> Email </label>
			<input type="email" name="author" placeholder="Email" v-model="author">
		</p>
		<p>
			<label for="state"> Etat de l'animal </label>
			<select v-model="state" name="state">
				<option>Très faible</option>
				<option>Faible</option>
				<option>Moyen</option>
				<option>Bon</option>
			</select>
		</p>
		<p>
			<label for="necklace"> Collier </label>
			<select v-model="necklace" name="necklace">
				<option>Oui</option>
				<option>Non</option>
			</select>
		</p>
		<p>
			<label for="color">Couleur</label>
			<input type="text" name="color" placeholder="Color" v-model="color">
		</p>
		<p>
			<label for="adress"> Adresse </label>
			<input type="text" name="adress" placeholder="3 rue La Fayette, Paris" v-model="adress">
		</p>
		<p>
			<label for="creneau"> Heure de la perte </label>
			<input type="text" name="creneau" placeholder="Heure de la perte" v-model="creneau">
		</p>
		<button @click="create"> Create </button>
		<div>
			<span v-if="created">Annonce created</span>
		</div>

		<h1> Dashboard </h1>
		<div v-for="alt in alerte.data" :key="alt._id" class="container_annonce">
			<div class="annonce">
				<p> Animal: {{alt.animal}} </p>
				<p> Auteur: {{alt.author}} </p>
				<p> Adresse: {{alt.adress}} </p>

				<p> Status:
					<select v-on:change="update(alt)" v-model="alt.status" name="status">
						<option>Signalé</option>
						<option>Assignée</option>
						<option>Sauvé</option>
						<option>Echec</option>
						<option>Annulé</option>
					</select>
				</p>
				<p> Brigade:
					<select v-on:change="update(alt)" v-model="alt.brigade" name="brigade">
						<option>75015-A</option>
						<option>75015-B</option>
						<option>75002</option>
						<option>75001</option>
						<option>75006-C</option>
					</select>
				</p>
				<button @click="remove(alt)"> Delete </button>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
	name: 'Home',
	data () {
		return {
			modif: false,
			created: false,
			animal:null,
			author: null,
			state: null,
			necklace: null,
			color: null,
			adress: null,
			creneau: null,
			alerte: [],
			status: null,
			brigade: null,
			errors: [],
		}
	},
	methods: {
		checkForms(){
			const specialCharacters = /[A-Za-z0-9'\.\-\s\,]/;
			if (this.author) {
				const rgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				if (rgx.test(this.author)) {
				}else {
					this.errors.push("Invalid Email");
					return false;
				}
			}else { this.errors.push("Email not filled"); return false;}

			if (!this.color || !this.adress || !this.necklace || !this.animal || !this.creneau || !this.state) {
				this.errors.push("Merci de remplir tous les champs"); return false;
				return false;
			}

			return true;
		},
		remove(alt) {
			this.alerte.data.splice(this.alerte.data.indexOf(alt), 1);
			axios
			.post('http://localhost:4242/delete', {id: alt._id})
			.then(function(response){
				console.log(response);
			})
		},
		update(alt) {
			if (alt.status === "Signalé") {
				alt.status = "Assignée";
				this.status = "Assignée";
			}
			axios
			.post('http://localhost:4242/update', {alt: alt})
			.then(function(response){
				console.log(response);
			})
		},
		create(){
			this.errors = [];
			if (this.checkForms()) {
				this.alerte.data.push({
					animal: this.animal,
					author: this.author,
					state: this.state,
					necklace: this.necklace,
					color: this.color,
					adress: this.adress,
					creneau: this.creneau,
					status: 'Signalé'
				});
				this.created = false;
				let vm = this;
				axios
				.post('http://localhost:4242/create', {
					animal: this.animal,
					author: this.author,
					state: this.state,
					necklace: this.necklace,
					color: this.color,
					adress: this.adress,
					creneau: this.creneau
				})
				.then(function(response){
					if(response.data._id && response.data._id.length >0) {
						vm.created = true;
						setTimeout(function(){ vm.created = false }, 3000);
					}
				})
			}
		},
	},
	mounted () {
		axios
		.get('http://localhost:4242/home')
		.then(response => (this.alerte = response))
		console.log(response);
	}

}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.errors {
	color: red;
}
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
