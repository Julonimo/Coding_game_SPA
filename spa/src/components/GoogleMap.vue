<template>
  <div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 500px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 48.866667, lng: 2.333333 },
      markers: [],
      places: [],
	  alerte: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
	axios
	.get('http://localhost:4242/home')
	.then((response) => {
		for (let i = 0; i < response.data.length; i++) {
			response.data[i].coord = response.data[i].coord.split(',');;
			console.log(response.data[i].coord);
			let marker = {
				position: {lat: parseFloat(response.data[i].coord[1]), lng: parseFloat(response.data[i].coord[0])}
			}
			this.addMarker(marker);
		}
	})
  },

  methods: {

    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker(marker) {
        this.markers.push(marker);
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>
