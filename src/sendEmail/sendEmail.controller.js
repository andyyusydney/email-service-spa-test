export default class WelcomeController {
  constructor($http) {
    this.submitted = false;
    this.$http = $http;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit called');

    console.log('email=%s, emailCc=%s, emailBcc=%s, emailSubject=%s, emailBody=%s', this.email, this.emailCc, this.emailBcc, this.emailSubject, this.emailBody);

    if (this.email) {
      this.$http({ // TODO: move to service
        method: 'POST',
        url: 'http://localhost:3000/send/email',
        data: {
          'email': this.email,
          'email-cc': this.emailCc || '',
          'email-bcc': this.emailBcc || '',
          'email-subject': this.emailSubject,
          'email-body': this.emailBody,
        }
      }).then((response) => { // success
        this.submitted = true;
        this.sentResponseText = 'Email sent successfully';
      }, (response) => { // error
        this.submitted = true;
        this.sentResponseText = 'Email sent failed';
      });
    } else {
      alert('Email Address is required!');
    }
  }
}

WelcomeController.$inject = ['$http'];