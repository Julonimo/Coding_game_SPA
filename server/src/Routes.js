//Listing all the routes


module.exports = function(app){
	const Db = require('./model/Db');
	const path = require('path');
	//const index = require('./content.html');
	console.log(Db);

	/*app.route('*').get(
		function(req,res){
			res.status(200).
			send({"message": "ok"});
		}
	);*/

	app.route('/home').get(Db.getAll);

	app.route('/update').post(Db.update);

	//save entry in db
	app.route('/create').post(Db.create);

	app.route('/delete').post(Db.delete);

	app.route('/content').get(function(res, res){
		console.log(__dirname);
		res.sendFile(path.join(__dirname+'/content.html'));
	})
}
