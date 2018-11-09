(function () {
    'use strict';

    angular
        .module("myApp")
        .factory('DetailService',['$resource', function ($resource) {
            //return $resource('https://www.jobsmatcher.com/api/vacancydetail/252'); // Note the full endpoint address
            var data = $resource('https://www.jobsmatcher.com/api/vacancydetail/:idVacancy', { idVacancy : '@idVacancy'}, {
                'get': { method: 'GET'}
            });
            return data;
        }])

        .factory('DetailServiceCompany',['$resource', function ($resource) {
            //return $resource('https://www.jobsmatcher.com/api/vacancydetail/252'); // Note the full endpoint address
            var data = $resource('https://www.jobsmatcher.com/api/corporate/:idCorporate', { idCorporate : '@idCorporate'}, {'get': { method: 'GET'}
            });
            return data;
        }]);
})();