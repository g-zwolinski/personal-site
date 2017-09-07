const angular = require('angular');

export class FooterComponent {

	 constructor() {

	}
}

export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
