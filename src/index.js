import angular from 'angular';
import 'angular-ui-router';

import 'bootstrap-css-only/css/bootstrap.min.css'
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
      });
  });

angular.element(function () {
  angular.bootstrap(document, ['main']);
});