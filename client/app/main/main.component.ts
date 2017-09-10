const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;

  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($scope, $mdDialog, $window, $timeout) {
    $scope.project = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    //zmienne do obsługi karuzeli
    $scope.currentPage = 0;
    $scope.itemsPerPage = 0;
    $scope.pagesAmount = 0;

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == '37') {
          $scope.changePage(-1);
        }
        else if (e.keyCode == '39') {
          $scope.changePage(1);
        }
        $scope.$apply();
    }

    $scope.hasToDrawLines = function(){
      if ($scope.currentPage != $scope.pagesAmount-1) return true;

      var amountOnLastPage = $scope.portfolio.length%$scope.pagesAmount;

      switch($scope.itemsPerPage){
        case 5:
          if(amountOnLastPage >= 3){
            return true;
          }
        break;
        default:
          if(amountOnLastPage == 0){
            return true;
          }
        break;
      }
      return false;
    }

    $scope.definePagesRange = function(){
      var arr = [];
      for(var i = 0; i < $scope.pagesAmount; i++){
        arr[i] = i;
      }
      return arr;
    }

    $scope.goToPage = function(page){
      $scope.currentPage = page;
    }

    $scope.changePage = function(changer){
      if(($scope.currentPage + changer >= 0) && ($scope.currentPage + changer < $scope.pagesAmount)){
        $scope.currentPage = $scope.currentPage + changer;
      }else if($scope.currentPage + changer >= $scope.pagesAmount){
        $scope.currentPage = 0;
      }else if($scope.currentPage + changer < 0){
        $scope.currentPage = $scope.pagesAmount - 1;
      }
    }

    $scope.countAmountOfItemsPerPage = function(value){
      if(value <= 600){
        return 5;
      }else if(value <= 900){
        return 7;
      }else{
        return 13;
      }
    };

    $scope.countPagesAmount = function(arrayLength, itemsPerPage){
      var pagesAmount = arrayLength / itemsPerPage;
      return pagesAmount.toFixed(0);
    }

    $scope.showItems = function(array){
      if($scope.pagesAmount >= 0 && $scope.itemsPerPage > 0 && $scope.pagesAmount > $scope.currentPage){
        return array.slice($scope.currentPage*$scope.itemsPerPage, ($scope.currentPage+1)*$scope.itemsPerPage);
      }
    }

    $scope.itemsPerPage = $scope.countAmountOfItemsPerPage($window.innerWidth);

    var w = angular.element($window);
    $scope.$watch(
      function () {
        return $window.innerWidth;
      },
      function (value) {
        var oldPagesAmount = $scope.pagesAmount;
        $scope.itemsPerPage = $scope.countAmountOfItemsPerPage(value);
        $scope.pagesAmount = $scope.countPagesAmount($scope.portfolio.length, $scope.itemsPerPage);

        if((oldPagesAmount != $scope.pagesAmount) && ($scope.currentPage >= $scope.pagesAmount)){
          $scope.currentPage = $scope.pagesAmount - 1;
        }

      },
      true
    );

    w.bind('resize', function(){
      $scope.$apply();
    });

    $scope.portfolio = [];
   
    for(var i = 0; i < 39; i++){
      $scope.portfolio[i] = {
        img: 'assets/images/' + Math.floor((Math.random() * 13) + 1) + '.png',
        title: 'This is a title'+i,
        text: 'Some sample text about the article this hex leads to'
      };
    };

    $scope.pagesAmount = $scope.countPagesAmount($scope.portfolio.length, $scope.itemsPerPage);

    $scope.socialLinks = {
      facebook: {
        link: '1',
        opacity: '1',
        d: "M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z"
      },
      twitter: {
        link: '2',
        opacity: '0.5',
        d: "M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
      },
      google: {
        link: '3',
        opacity: '0.7',
        d: "M7.635 10.909v2.619h4.335c-.173 1.125-1.31 3.295-4.331 3.295-2.604 0-4.731-2.16-4.731-4.823 0-2.662 2.122-4.822 4.728-4.822 1.485 0 2.479.633 3.045 1.178l2.073-1.994c-1.33-1.245-3.056-1.995-5.115-1.995C3.412 4.365 0 7.785 0 12s3.414 7.635 7.635 7.635c4.41 0 7.332-3.098 7.332-7.461 0-.501-.054-.885-.12-1.265H7.635zm16.365 0h-2.183V8.726h-2.183v2.183h-2.182v2.181h2.184v2.184h2.189V13.09H24"
      },
      pintrest: {
        link: '4',
        opacity: '1',
        d: "M13.25,17.25C12.25,17.25 11.29,16.82 10.6,16.1L9.41,20.1L9.33,20.36L9.29,20.34C9.04,20.75 8.61,21 8.12,21C7.37,21 6.75,20.38 6.75,19.62C6.75,19.56 6.76,19.5 6.77,19.44L6.75,19.43L6.81,19.21L9.12,12.26C9.12,12.26 8.87,11.5 8.87,10.42C8.87,8.27 10.03,7.62 10.95,7.62C11.88,7.62 12.73,7.95 12.73,9.26C12.73,10.94 11.61,11.8 11.61,13C11.61,13.94 12.37,14.69 13.29,14.69C16.21,14.69 17.25,12.5 17.25,10.44C17.25,7.71 14.89,5.5 12,5.5C9.1,5.5 6.75,7.71 6.75,10.44C6.75,11.28 7,12.12 7.43,12.85C7.54,13.05 7.6,13.27 7.6,13.5A1.25,1.25 0 0,1 6.35,14.75C5.91,14.75 5.5,14.5 5.27,14.13C4.6,13 4.25,11.73 4.25,10.44C4.25,6.33 7.73,3 12,3C16.27,3 19.75,6.33 19.75,10.44C19.75,13.72 17.71,17.25 13.25,17.25Z"
      },
      linkedin: {
        link: '5',
        opacity: '0.5',
        d: "M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z"
      },
      dribble: {
        link: '6',
        opacity: '0.5',
        d: "M16.42,18.42C16,16.5 15.5,14.73 15,13.17C15.5,13.1 16,13.06 16.58,13.06H16.6V13.06H16.6C17.53,13.06 18.55,13.18 19.66,13.43C19.28,15.5 18.08,17.27 16.42,18.42M12,19.8C10.26,19.8 8.66,19.23 7.36,18.26C7.64,17.81 8.23,16.94 9.18,16.04C10.14,15.11 11.5,14.15 13.23,13.58C13.82,15.25 14.36,17.15 14.77,19.29C13.91,19.62 13,19.8 12,19.8M4.2,12C4.2,11.96 4.2,11.93 4.2,11.89C4.42,11.9 4.71,11.9 5.05,11.9H5.06C6.62,11.89 9.36,11.76 12.14,10.89C12.29,11.22 12.44,11.56 12.59,11.92C10.73,12.54 9.27,13.53 8.19,14.5C7.16,15.46 6.45,16.39 6.04,17C4.9,15.66 4.2,13.91 4.2,12M8.55,5C9.1,5.65 10.18,7.06 11.34,9.25C9,9.96 6.61,10.12 5.18,10.12C5.14,10.12 5.1,10.12 5.06,10.12H5.05C4.81,10.12 4.6,10.12 4.43,10.11C5,7.87 6.5,6 8.55,5M12,4.2C13.84,4.2 15.53,4.84 16.86,5.91C15.84,7.14 14.5,8 13.03,8.65C12,6.67 11,5.25 10.34,4.38C10.88,4.27 11.43,4.2 12,4.2M18.13,7.18C19.1,8.42 19.71,9.96 19.79,11.63C18.66,11.39 17.6,11.28 16.6,11.28V11.28H16.59C15.79,11.28 15.04,11.35 14.33,11.47C14.16,11.05 14,10.65 13.81,10.26C15.39,9.57 16.9,8.58 18.13,7.18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      },
    };

    $scope.submit = function() {
      if ($scope.project) {

        $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Thanks '+$scope.project.name+'!')
          .textContent('I\'ll contact you soon!')
          .ariaLabel('Thanks')
          .ok('Okay!')
        );

        $scope.project.name = '';
        $scope.project.email = '';
        $scope.project.subject = '';
        $scope.project.message = '';

        $scope.projectForm.$setPristine();
        $scope.projectForm.$setUntouched();

      }
    };
  }

  $onInit() {
    console.log("Z powodu usterki (blokowanie pozostałych kierunków swipe, po dodaniu obsługi któregokolwiek), zmuszony zostałem do skorzystania z ngTouch, mimo zaimplementowanej obsługi gestów w angular material. Stąd też powyższe ostrzeżenie.");
  }
}

export default angular.module('biznesportApp.main', [
  uiRouter])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController
    })
    .name;
