//Listing all the routes


module.exports = function(app){
	const Db = require('./model/Db');
	console.log(Db);

	/*app.route('*').get(
		function(req,res){
			res.status(200).
			send({"message": "ok"});
		}
	);*/

	app.route('/home').get(Db.getAll);

	//save entry in db
	app.route('/create').post(Db.create);
}
