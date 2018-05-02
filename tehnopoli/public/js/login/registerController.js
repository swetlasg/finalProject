

<<<<<<< HEAD
app.controller('registerController', function ($scope, registerService) {
   $scope.newUser = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    repeatedpass: "",
    cart: [],
    favorite: [],
    orders: [],
    isAdmin: false
   }

   $scope.wrongEmail = false;
   $scope.wrongFirstName = false;
   $scope.wrongLastName = false;
   $scope.wrongPassword = false;
   $scope.wrongReapedPass = false;
   $scope.wrongPhoneNumber = false;
   $scope.registered = false;

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
  
  function isValidPhoneNumber(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone));
  };

  $scope.clearAllInput = function (){
      $scope.newUser.email = "";
      $scope.newUser.password = "";
      $scope.newUser.firstname = "";
      $scope.newUser.lastname = "";
      $scope.newUser.repeatedpass = "";
      $scope.newUser.phone = "";
  }

  
  $scope.userRegister = function ($event) {
    $event.preventDefault();
    if (!(isValidEmail($scope.newUser.email))){
        $scope.wrongEmail = true;
        $scope.newUser.email = "";
        return;
=======
app.controller('registerController', function ($scope, registerService, $location) {
    $scope.newUser = {
     firstname: "",
     lastname: "",
     email: "",
     phone: "",
     password: "",
     repeatedpass: "",
     cart: [],
     favorite: [],
     orders: [],
     isAdmin: false
>>>>>>> f6ba3dedec8b652a3ac5f73a02939c8cb2b37608
    }
 
    $scope.wrongEmail = false;
    $scope.wrongFirstName = false;
    $scope.wrongLastName = false;
    $scope.wrongPassword = false;
    $scope.wrongReapedPass = false;
    $scope.wrongPhoneNumber = false;
    $scope.registered = false;
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
   
   function isValidPhoneNumber(phone) {
     var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
     return re.test(String(phone));
   };
 
//    $scope.clearAllInput = function (){
//        $scope.newUser.email = "";
//        $scope.newUser.password = "";
//        $scope.newUser.firstname = "";
//        $scope.newUser.lastname = "";
//        $scope.newUser.repeatedpass = "";
//        $scope.newUser.phone = "";
       
//    }

    $scope.changeLocation = function (path){
        $location.path(path);
    };

   angular.element("#emailForRegister").on("focus", function(){
    $scope.wrongEmail = false;
    $scope.isError = false;
   });

   angular.element("#password").on("click", function(){
    $scope.wrongPassword = false;
   });

   angular.element("#password").on("click", function(){
    $scope.wrongPassword = false;
   
   });

   angular.element("#firstname").on("click", function(){
    $scope.wrongFirstName = false;
   });

   angular.element("#lastname").on("click", function(){
    $scope.wrongLastName = false;
   });

   angular.element("#confirmPassword").on("click", function(){
    $scope.wrongReapedPass = false;
   });

   angular.element("#phone").on("click", function(){
    $scope.wrongPhoneNumber = false;
   });

   angular.element("#cancelRegForm").on("click", function(){
    $location.path("/");
   });
   
  

   $scope.userRegister = function ($event, path) {
     $event.preventDefault();
     if (!(isValidEmail($scope.newUser.email))){
         $scope.wrongEmail = true;
         $scope.newUser.email = "";
         return;
     }
    
     if (!(isValidPassword($scope.newUser.password))){
         $scope.wrongPassword = true;
         $scope.newUser.password = '';
         return;
     } 
 
     if (!(isValidString($scope.newUser.firstname))){
         $scope.wrongFirstName = true;
         $scope.newUser.firstname = "";
         return;
     }
 
     if (!(isValidString($scope.newUser.lastname))){
         $scope.wrongLastName = true;
         $scope.newUser.lastname="";
         return;
     }
 
     if (!($scope.newUser.password===$scope.newUser.repeatedpass)){
         $scope.wrongReapedPass = true;
         $scope.newUser.repeatedpass = "";
         return;
     } 
     if (!(isValidPhoneNumber($scope.newUser.phone))){
         $scope.wrongPhoneNumber = true;
         $scope.newUser.phone = "";
         return;
     }


     registerService.register($scope.newUser)
        .then(function (data) {
            $location.path('/login')
        })
        .catch (function(err) {
            if (err){
                $scope.isError = true;
                $scope.error = err.data.statusText;
            } 
            
        })

        $scope.changeLocation = function (path){
            $location.path(path);
        };
    }
<<<<<<< HEAD
    registerService.register($scope.newUser)
    .then(function (data) {
        location.replace('#');
        $scope.$apply(function () {
            $scope.registered = true;
            console.log($scope.reqistered)
            })
        
    })
}

})
=======

 })
>>>>>>> f6ba3dedec8b652a3ac5f73a02939c8cb2b37608
