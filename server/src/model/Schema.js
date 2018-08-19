const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const signalementSchema = new Schema({
	date : {type : Date, default: Date.now} ,
	creneau: {type : String, required: true},
	author: {type: String, required: true} ,
	animal: {type: String, required: true} ,
	color: {type: String, required: true},
	adress: {type: String, required: true},
	state: {type: String, required: true},
	necklace: {type: Number},
	status: {type: String, default: 'Signalé'} ,
	brigade: {type: String, default: ''},
	coord: {type: String, default: null}
});

const Alertes = mongoose.model('Alertes', signalementSchema);

module.exports = {
	signalementSchema: signalementSchema,
	Alertes : Alertes
};
