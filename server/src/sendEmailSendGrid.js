var Promise = require("bluebird");

var api_key_gmail = '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';
var from_who = 'yyujjiang@gmail.com';

var sg = require('sendgrid')(api_key_gmail);

function getRecipientsArray(recipients) {
    var generatedArr = [];
    for (var email of recipients) {
        console.log(email);
        generatedArr.push({
            email: email
        });
    }
    return generatedArr;
}

function sendEmail(emailParams) {
    console.log('sendEmailSendGrid is called');

    var body = {
        personalizations: [
            {
                to: getRecipientsArray(emailParams.recipient.split(',')),
                subject: emailParams.subject,
            },
        ],
        from: {
            email: from_who,
        },
        content: [
            {
                type: 'text/plain',
                value: emailParams.body,
            },
        ],
    };

    if (emailParams.cc) {
		body.personalizations[0].cc = getRecipientsArray(emailParams.cc.split(','));
	}
	
	if (emailParams.bcc) {
		body.personalizations[0].bcc = getRecipientsArray(emailParams.bcc.split(','));
	}

    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: body
    });

    //return promise
    return sg.API(request);
}

module.exports = sendEmail