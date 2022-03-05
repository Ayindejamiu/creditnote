(function(){
 


    
var app = angular.module("myApp",["ngRoute", "firebase"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"main.html",
        controller:"myCtrl"
    })


    .when("/index",{
        templateUrl:"main.html",
        controller:"myCtrl"
    })

    .when("/main",{
        templateUrl:"main.html",
        controller:"myCtrl"
    })

    .when("/about",{
        templateUrl:"about.html",
        controller:"myCtrl"
    })

      .when("/editlog/:Insurer/:Underwriter/:Iclass/:Premium/:Commission/:Netpremium/:MyStartdate/:MyEnddate/:timestamp",{
        templateUrl:"editlog.html",
        controller:"editController"
    })

    .when("/editlog/",{
        templateUrl:"editlog.html",
        controller:"myCtrl"
    })

    .when("/log",{
        templateUrl:"log.html",
        controller:"dataController"
    })

    .when("/data",{
        templateUrl:"data.html",
        controller:"dataController"
    })
    .when("/error",{
        templateUrl:"error.html",
        controller:"myCtrl"
    })

    .otherwise({
        redirectTo:"/error"
    })

   });

}());