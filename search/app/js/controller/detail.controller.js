(function () {
    'use strict';

    angular
        .module("myApp")


        .controller('DetailController', ['$scope', '$resource', 'DetailService', 'DetailServiceCompany', '$routeParams', '$translate', '$cookies', function ($scope, $resource, DetailService, DetailServiceCompany, $routeParams, $translate, $cookies) {

            //before load
            var lang = $cookies.get("LCODE");
            console.log(lang);
            if (lang === undefined)
                lang = "ENG";
            $translate.use("ENG");
            //after load

            //$scope.detailcard = DetailService.query();
            $scope.createFilterStatusEx = function (query) {
                return function filterFn(ele) {
                    if (ele.status.trim() == "")
                        return false;
                    return (ele.status != query);
                };
            }
            DetailService.get({ 'idVacancy': $routeParams.id }).$promise.then(function (data) {
                // console.error(data);
                $scope.detailCardQuery = data;
                // $scope.detailCardQuery.vaEcWorkPlaces = data.vaEcWorkPlaces.filter( $scope.createFilterStatusEx('I'));
                DetailServiceCompany.get({ 'idCorporate': $scope.detailCardQuery.corporate.idCorporate }).$promise.then(function (data) {
                    // console.error(data);
                    $scope.detailCardQueryComnapy = data;
                    $scope.show = true;
                    // $scope.detailCardQuery.vaEcWorkPlaces = data.vaEcWorkPlaces.filter( $scope.createFilterStatusEx('I'));
                });
            });


            $scope.coCoContactAddressesFilterNull = function () {
                return function filterFn(ele) {
                    if (ele.address != "" && ele.address != null && ele.address != undefined && ele.choiceAddressType != "" && ele.choiceAddressType != null && ele.choiceAddressType != undefined)
                        return ele;
                    else
                        return
                };
            }


            $scope.responsiblePositionsFilterNull = function () {
                return function filterFn(ele) {
                    if (ele.jobExperience.name != "" && ele.jobExperience.name != null && ele.jobExperience.name != undefined)
                        return ele;
                    else
                        return
                };
            }

            $scope.vaEcEmploymentTasksFilterNull = function () {
                return function filterFn(ele) {
                    console.log("eeeeee", ele);

                    if (ele.employmentTask != "" && ele.employmentTask != null && ele.employmentTask != undefined)
                        return ele;
                    else
                        return
                };
            }

            $scope.vaEcFringeBenefitsFilterNull = function () {
                return function filterFn(ele) {
                    console.log("eeeeee", ele);

                    if (ele.fringeBenefit.name != "" && ele.fringeBenefit.name != null && ele.fringeBenefit.name != undefined)
                        return ele;
                    else
                        return
                };
            }

            $scope.userMapPhonesFilterNull = function () {
                return function filterFn(ele) {
                    console.log("eeeeee", ele);

                    if (ele.phone.phoneNo != "" && ele.phone.phoneNo != null && ele.phone.phoneNo != undefined)
                        return ele;
                    else
                        return
                };
            }

        }])
})();
