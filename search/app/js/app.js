(function () {
  'use strict';
  angular
    .module("myApp", ['ngRoute', 'ngResource', 'pascalprecht.translate', 'ngCookies'])
    .config(['$routeProvider', '$translateProvider', '$translatePartialLoaderProvider', function ($routeProvider, $translateProvider, $translatePartialLoaderProvider) {
      console.log($routeProvider)

        $routeProvider
        .when("/test", {
          templateUrl: "pages/test.html",


        })

      $translateProvider.useSanitizeValueStrategy(null);
      $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: 'https://www.jobsmatcher.com/label/THA'
      });
      $translatePartialLoaderProvider.addPart('main');


    }])
    .filter('image_company',function () {

          return function (input) {
            if (input != null) {
                return "https://www.jobsmatcher.com/resource/thumbnail/200x200" + input;
            }
            else {
                return 'resource/img/icon_02.png';
            }
        }
      // return function (items, props) {
      //   var out = [];

      //   if (angular.isArray(items)) {
      //     var keys = Object.keys(props);

      //     items.forEach(function (item) {
      //       var itemMatches = false;

      //       for (var i = 0; i < keys.length; i++) {
      //         var prop = keys[i];
      //         var text = props[prop].toLowerCase();
      //         if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
      //           itemMatches = true;
      //           break;
      //         }
      //       }

      //       if (itemMatches) {
      //         out.push(item);
      //       }
      //     });
      //   } else {
      //     // Let the output be the input untouched
      //     out = items;
      //   }

      //   return out;
      // };
    })


})();