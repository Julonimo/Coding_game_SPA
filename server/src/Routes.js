//Listing all the routes


module.exports = function(app){
	const Db = require('./model/Db');
	const path = require('path');

	app.route('/home').get(Db.getAll);

	//update an entry in db
	app.route('/update').post(Db.update);

	//save entry in db
	app.route('/create').post(Db.create);

	app.route('/delete').post(Db.delete);

}
