import angular from 'angular';
import 'angular-ui-router';

import 'angular/angular-csp.css';
import './index.scss';

import sendEmailModule from './sendEmail/sendEmailModule';

angular.module('main', [
  'ui.router',
  sendEmailModule,
])
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .config(function routing($urlRouterProvider, $locationProvider, $stateProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(function () {
      window.location.replace('404.html');
    });

    $stateProvider
      .state('home', {
        url: '/',
        template: '<send-email></send-email>'
      })
      .state('submitted', {
        url: '/submitted',
        template: 'aaa'
      });

  });

angular.element(function () {
  angular.bootstrap(document, ['main']);
});