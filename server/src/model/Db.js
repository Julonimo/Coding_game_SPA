const mongoose = require('mongoose');
let uri = 'mongodb://JuridicalPen:1492Mongo1492@ds121652.mlab.com:21652/spa';
mongoose.connect(uri, { useNewUrlParser: true});
const Schema = require('./Schema');
const animals = [
	'Chat',
	'Chien',
	'Perroquet',
	'Lapin'
];

function checkUserFields(req, res){
	if (typeof req.body.creneau !== 'string' || req.body.creneau.length > 12) {
		console.log("Creneau");
		res.status(400).send({"error": req.body.creneau + ' is not valid'});
		return false;
	}
	if (!req.body.author || req.body.author.length < 1) {
		console.log("Author");
		res.status(400).send({"error": req.body.author + ' is not valid'});
		return false;
	}
	if (!req.body.animal || req.body.animal.length < 1) {
		if (!req.body.animal.include(animals)) {
			res.status(400).send({"error": "Type of animal unknown"});
			return false;
		}
		res.status(400).send({"error": req.body.animals + ' is not valid'});
		return false;
	}
	if (!req.body.color || req.body.color.length < 1) {
		res.status(400).send({"error": req.body.color + ' is not valid'});
		return false;
	}
	if (!req.body.adress || req.body.adress.length < 1) {
		res.status(400).send({"error": req.body.adress + ' is not valid'});
		return false;
	}
	if (!req.body.state || req.body.state.length < 1) {
		res.status(400).send({"error": req.body.state + ' is not valid'});
		return false;
	}
	return true;
}

exports.getAll = function(req,res) {
	let result = new Promise(function(resolve, reject){
		Schema.Alertes.find({}, function(err, data){
			if(err){
				console.log(err);
				reject();
			} else {
				console.log("DATA", data);
				resolve(res.status(200).send(data));
			}
		});
	});
}

exports.create = function (req,res) {
	let result = new Promise(function(resolve, reject){
		if(checkUserFields(req, res)){
			let necklace = null;
			if (req.body.necklace && req.body.necklace.length >0) {
				if (req.body.necklace === "Oui") {
					necklace = 1;
				} else {
					necklace = 0;
				}
			}

			Schema.Alertes.create({
			creneau: req.body.creneau,
			author: req.body.author,
			animal: req.body.animal,
			color: req.body.color,
			adress: req.body.adress,
			state: req.body.state,
			necklace: necklace !== null ? necklace:''}
			, function(err, entry) {
				if(err) {
					console.log(err);
					reject();
				}
				console.log("Saved : ", entry);
				resolve(res.status(200).send(entry));
			});
		}
	});
}
