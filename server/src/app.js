var express = require('express');

var path = require('path');
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var sendEmailMailGun = require('./sendEmailMailGun');
var sendEmailSendGrid = require('./sendEmailSendGrid');

app.use(function (req, res, next) { // CORS allow all origins
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

if (isProduction) {
	app.use(express.static(path.join(__dirname, '/../client/js'))); // serve static files

	app.get('/', function (req, res) { // default index.html
		res.sendFile(path.join(__dirname + '/../client/index.html'));
	})
}

app.post('/send/email', function (req, res) { // send email
	var sendParams = {
		recipient: req.body.email,
		cc: req.body['email-cc'],
		bcc: req.body['email-bcc'],
		subject: req.body['email-subject'],
		body: req.body['email-body'],
	}
	console.log('sendParams=', sendParams);

	sendEmailMailGun(sendParams) // send via MailGun service
		.then(
			(body) => {
				res.status('200').json({
					status: 'submitted',
					data: {
						email: sendParams.recipient
					}
				})
			},
			(err) => {
				sendEmailSendGrid(sendParams).then(response => {
					console.log(response.statusCode);
					console.log(response.body);
					console.log(response.headers);
					res.status('200').json({
						status: 'submitted',
						data: {
							email: sendParams.recipient
						}
					});
				})
				.catch(error => {
					//error is an instance of SendGridError
					//The full response is attached to error.response
					console.log(error.response.statusCode);
					res.status('422').json({
						status: 'email sent failed',
						data: {
							err: error
						}
					});
				});
			}
		);
});

app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!');
})


/* test */
/*
var sendParams = {
	recipient: 'yyujjiang@hotmail.com',
	cc: '',
	bcc: ''
};

sendEmailSendGrid(sendParams).then(response => {
	console.log(response.statusCode);
	console.log(response.body);
	console.log(response.headers);
})
	.catch(error => {
		//error is an instance of SendGridError
		//The full response is attached to error.response
		console.log(error.response.statusCode);
	});
*/


