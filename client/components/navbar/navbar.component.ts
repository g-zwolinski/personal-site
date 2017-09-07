'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');

export class NavbarComponent {
  menu = [{
    'title': 'PORTFOLIO',
    'state': 'portfolio'
  },
  {
    'title': 'ABOUT',
    'state': 'about'
  },
  {
    'title': 'BLOG',
    'state': 'blog'
  },
  {
    'title': 'GET IN TOUCH',
    'state': 'contact'
  }];
  isCollapsed = true;


}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
