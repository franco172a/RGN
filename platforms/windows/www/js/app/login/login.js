$.support.cors = true;
(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'loginController';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('main').controller(controllerId,
        ['common', '$location', '$routeParams',  loginController]);

    function loginController(common, $location, $routeParams) {
        var vm = this;

        var loadResource = common.myResource.loginResource;
        var getUrl = common.myResource.getUrl;
        var currentUrl = localStorage.getItem('urlstorageSource');
        var loginurl = currentUrl + '/Login';
        var checkedURL = localStorage.getItem('checkedURL');
        vm.showLoginForm = true;
        vm.showLoading = false;
        vm.loadingMsg = 'Connecting to server, please wait...';
        vm.message = "";
        vm.userError = false;
        vm.passwordError = false;
        vm.userModel = { userName: '', password: '' };
        vm.userLogin = userLogin;
        vm.setUrl = setUrl;

        

        
        function existURL(){

            getUrl().loginResource.getConnection(function (successResult) {

                if(successResult[4] == 'c')
                {
                    vm.showLoginForm = true;
                }
                else{
                    vm.showLoginForm = false;
                }

                }, function (errorResult) {
            
                    vm.showLoginForm = false;
            });
        
        };

        existURL();
		
            function userLogin() {
            vm.showLoading = true;

            loadResource.login(vm.userModel, function (successResult) {

                    vm.showLoading = false;
                    vm.message = successResult.Message

                    localStorage.setItem('userName', successResult.UserName);
                    localStorage.setItem('password', successResult.Password);
                    localStorage.setItem('token', successResult.token);

                    if (successResult.UserValid) {
                        window.location.href = 'propertyList.html#' + successResult.SecUserId;
                    }

                }, function (errorResult) {

                    vm.errorResult = errorResult.data.message;
                    vm.showLoading = false;
                });
            };
        
		
            function setUrl(){
            var url = document.getElementById("urlString").value;
            
            if(url != undefined)
            {
                var loginurl = url + '/Login';
                document.getElementById("urlLoadingMessage").style.display = "block";
                document.getElementById("urlValidationMessage").style.display = "none";

                $.ajax({
                    url: loginurl,
                    cache: false,
                    dataType: 'json',
                    success: function(successResult) {
                        
                        if(successResult == 'successful')
                        {
                            localStorage.setItem('urlstorageSource', url);
                        }
                        window.location.reload();
                        document.getElementById("urlLoadingMessage").style.display = "none";
                    }
                });
            }
        };
        
        
		
		var offlineMode = localStorage.getItem('offlineMode');
            if(offlineMode == 'true')
            {
                var userName = localStorage.getItem('userName');
                var password = localStorage.getItem('password');
                var secUserId = localStorage.getItem('secUserId');

                if(vm.userModel.userName == userName && vm.userModel.password == password)
                {
                    window.location.href = 'propertyList.html#' + secUserId;
                }
            }
            else
            {
                vm.message = '';
                vm.userError = false;
                vm.passwordError = false;

                var errors = 0;
                if (vm.userModel.userName == '') {
                    vm.userError = true;
                    errors++;
                }
                if (vm.userModel.password == '') {
                    vm.passwordError = true;
                    errors++;
                }

                if (errors > 0) {
                    return;
                }
                vm.showLoading = true;

                getUrl().loginResource.login(vm.userModel, function (successResult) {

                    vm.message = successResult.Message
                    
                    var userName = successResult.UserName;
                    var password = successResult.Password;
                    var secUserId = successResult.SecUserId;

                    localStorage.setItem('userName', userName);
                    localStorage.setItem('password', password);
                    localStorage.setItem('secUserId', secUserId);

                    vm.showLoading = false;

                    if (successResult.UserValid) {
                        window.location.href = 'propertyList.html#' + successResult.SecUserId;
                    }

                }, function (errorResult) {

                    vm.errorResult = errorResult.data.message;
                    vm.showLoading = false;
                });
            }

			
			loadResource.login(vm.userModel, function (successResult) {
                vm.message = successResult.Message
                vm.showLoading = false;
                if (successResult.UserValid) {
                    window.location.href = 'propertyList.html#' + successResult.SecUserId;
                }

            }, function (errorResult) {

                vm.errorResult = errorResult.data.message;
                vm.showLoading = false;
            });

  
        };

        })();