'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
const ngTouch = require('angular-touch');

const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
// const ngMessages = require('angular-messages');



import {routeConfig} from './app.config';


import navbar from '../components/navbar/navbar.component';
import main from './main/main.component';
import footer from '../components/footer/footer.component';
import constants from './app.constants';
import util from '../components/util/util.module';

//scrollspy
require('../../node_modules/angular-scroll/angular-scroll.js');
//angular-material
require('../../node_modules/angular-material/angular-material.css');
require('../../node_modules/angular-animate/angular-animate.js');
require('../../node_modules/angular-aria/angular-aria.js');
require('../../node_modules/angular-messages/angular-messages.js');
require('../../node_modules/angular-material/angular-material.js');

import './app.scss';

angular.module('biznesportApp', [
  ngCookies,
  ngResource,
  ngSanitize,
  ngTouch,

  uiRouter,
  uiBootstrap,
  navbar,
  main,
  footer,
  constants,

  util,

  'duScroll',
  'ngMaterial', 
  'ngMessages'
])
  .config(routeConfig)
  .config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('none')
    $mdThemingProvider.setDefaultTheme('none');
    $mdThemingProvider.disableTheming();
   }])
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
   }])
  .config(['$mdGestureProvider', function($mdGestureProvider) {

    // For mobile devices without jQuery loaded, do not
    // intercept click events during the capture phase.
    $mdGestureProvider.skipClickHijack();

  }])
  .value('duScrollOffset', 60);

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['biznesportApp'], {
      strictDi: true
    });
  });
