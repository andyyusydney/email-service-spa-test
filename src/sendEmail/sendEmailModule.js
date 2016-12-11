import angular from 'angular';
import sendEmailComponent from './sendEmail.component';
import multipleEmailsInputDirective from './multipleEmailsInput.directive';
import './sendEmail.scss';

export default angular
  .module('sendEmailModule', [])
  .component('sendEmail', sendEmailComponent)
  .directive('multipleEmails', multipleEmailsInputDirective)
  .name;