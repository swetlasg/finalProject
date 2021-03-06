app.controller('loginController', function ($scope,$http, $rootScope, loginService, $location) {
    //login
    $scope.wrongPassword = false;
    $scope.wrongEmail = false;
    $scope.noUser = false;
    $scope.loggedUserMail = "";
   

    $scope.logedUser = {
        email: '',
        password: '',
    }

    $scope.isError = false;
    

    const PASS_LENGHT = 8;
    const MAX_LENGHT = 25;
 
    function isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
   
   function isValidString(str) {
     return (typeof str === 'string' && str.length > 0 && str.length <=MAX_LENGHT);
   };
   
   
   function isValidPassword(pass) {
     return (isValidString && pass.length >= PASS_LENGHT && pass.length<=MAX_LENGHT)
   };

   function changeLocation (path){
    $location.path(path);
 }
    angular.element('#loginEmail').on('click', function () {
        
            $scope.wrongEmail = false;
            $scope.noUser = false;
        
    });

    angular.element('#loginPassword').on('focus', function () {
            $scope.wrongPassword = false;
            $scope.noUser = false;
            $scope.isError = false;
        
    });

    $scope.userLogin = function ($event, path) {
        $event.preventDefault();
        

        if (!isValidEmail($scope.logedUser.email)) {
            $scope.wrongEmail = true;
            return;
        }
        if (!isValidPassword($scope.logedUser.password)) {
            $scope.wrongPassword = true;
            return;
        }

        loginService.login($scope.logedUser)
            .then(function (response) {
                $scope.isLoged = false;
                if (response.status >= 200 && response.status <= 399) {
                    $rootScope.logedUser = response.data;
                    alert ("Вие влязохте успешно" + response.data)
                    console.log(response.data)
                    $scope.loggedUserMail = response.data.isLogged

                    $location.path('/');
                  }
                })
                  .catch(function (err) {
                    alert("Грешно име или парола");
                  });
            
              } 
              
              
})