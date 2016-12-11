var Promise = require("bluebird");
var Mailgun = require('mailgun-js');

var api_key_gmail = 'key-e9718badae7ebe5381ea981d66527439';
var domain_gmail = 'sandbox8815fe5d39b54fd482775e3737fad0b4.mailgun.org';
var from_who = 'yyujjiang@gmail.com';

var mailgun = new Mailgun({
	apiKey: api_key_gmail,
	domain: domain_gmail
});
	
function sendEmail(emailParams) {
	var data = {
		from: from_who,
		to: emailParams.recipient,
		subject: 'Hello from Mailgun',
		text: 'This is a test email.'
		//text: '' // fail the service
	}
	
	if (emailParams.cc) {
		data.cc = emailParams.cc
	}
	
	if (emailParams.bcc) {
		data.bcc = emailParams.bcc
	}
	
	var emailSendPromise = new Promise(function(resolve, reject){
		mailgun.messages().send(data, function (err, body) {
			if (err) {
				console.log("got an error 1: ", err);
				reject(err);
			} else {
				console.log(body);
				resolve(body);
			}
		});
	});
	
	return emailSendPromise;
}

module.exports = sendEmail