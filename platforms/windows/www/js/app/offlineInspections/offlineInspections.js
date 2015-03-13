$.support.cors = true;
(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'offlineController';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('main').controller(controllerId,
        ['common', '$location', '$routeParams', offlineController]);

    function offlineController(common, $location, $routeParams) {
        var vm = this;

        var loadResource = common.myResource.loginResource;
        //var getUrl = common.myResource.getUrl;
        var currentUrl = localStorage.getItem('urlstorageSource');
        var loginurl = currentUrl + '/Login';
        var checkedURL = localStorage.getItem('checkedURL');
        vm.showLoginForm = true;
        vm.showLoading = false;
        vm.loadingMsg = 'Connecting to server, please wait...';

        var user = localStorage.getItem('userName');
        var pass = localStorage.getItem('password');
        vm.userModel = { userName: user, password: pass };

        vm.redirectToPropertyList = redirectToPropertyList;

        vm.mySpotNameOne = JSON.parse(localStorage.getItem('mySpotNameOne'));
        vm.mySpotNameTwo = JSON.parse(localStorage.getItem('mySpotNameTwo'));
        vm.mySpotNameThree = JSON.parse(localStorage.getItem('mySpotNameThree'));
        vm.mySpotNameFour = JSON.parse(localStorage.getItem('mySpotNameFour'));
        vm.mySpotNameFive = JSON.parse(localStorage.getItem('mySpotNameFive'));

        function redirectToPropertyList() {

            vm.showLoading = true;
            loadResource.login(vm.userModel, function (successResult) {
                vm.showLoading = false;
                vm.message = successResult.Message

                if (successResult.UserValid) {
                    window.location.href = 'propertyList.html#' + successResult.SecUserId;
                }

            }, function (errorResult) {

                vm.errorResult = errorResult.data.message;
                vm.showLoading = false;
            });
        };


//        function getProperties() {           

//        debugger;
//            vm.propertyInspectionsList.push(mySpotNameOne);


//        };

    }



})();
