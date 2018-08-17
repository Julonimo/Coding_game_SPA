const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pierre.letestor@gmail.com',
    pass: '1492Letestor!'
  }
});

exports.sendTo = function(destination, subject, content){
	console.log("EMETTEUR",transporter);
	console.log("DESTINAIRE", destination);
	console.log("CONTENT", content);
	let mailOptions = {
	  from: 'pierre.letestor@gmail.com',
	  to: destination,
	  subject: subject,
	  text: 'Une annonce a été publiée le '
	  + content.date + ' '
	  + 'par: ' + content.author,
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Send !');
			console.log('Email sent: ' + info.response);
		}
	});
}
