const request = require('request');

exports.geocode = function(adress){
	return new Promise((resolve, reject) => {
		let uri = "https://api-adresse.data.gouv.fr/search/?q=" + adress;
		request(uri, function(err,response){
			if(err){ reject(err)}
			data = JSON.parse(response.body);
			resolve(data.features[0].geometry.coordinates);
		});
	});
}
