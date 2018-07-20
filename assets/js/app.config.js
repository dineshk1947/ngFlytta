// routes
var options = {
        "defaultLocation":"IN",
        "icon": "http://www.goflytta.com/img/flytta_logo.png",
        "primaryColor": "#f39c12",
        "responseType": "token",
        "autoclose": true,
        "focusInput": false,
        "popup": true,
        "socialBigButtons": true,
        "dict": {
            "title": "Login/Signup"
        },
        "connections": ["google-oauth2", "facebook"]
    };
app.config(['$routeProvider','$locationProvider','$windowProvider','ngMetaProvider', function($routeProvider,$locationProvider,$windowProvider,ngMetaProvider) {
   var $window = $windowProvider.$get();
   $routeProvider.when('/', {
    templateUrl: 'assets/tpl/home/main.html',
    data: {
      meta: {
        'title': 'Flytta | Relocation | Housing | Packers and movers | Settling-in services in India',
        'description': 'Flytta is a one stop relocation shop for corporates and professionals who are  searching for house, flats, space for office or any other business for rent including packers and movers and settling-in services.'
      }
    },
    // controller: 'homemainController',
    //         resolve: {
    //             lazyLoad: ['$ocLazyLoad', function($ocLazyLoad) {
    //                 return $ocLazyLoad.load({
    //                     name: 'app',
    //                     files: [
    //                         'https://embed.small.chat/T3UMS95SQG5GA1RH2Q.js',
    //                     ]
    //                 })
    //             }]
    //         }
  }).when('/home/home_property', {
    templateUrl: 'assets/tpl/home/home_property.html',
    data: {
      meta: {
        'title': 'Flytta | House rental services | Flats and office spaces for rent Hyderabad',
        'description': 'Flytta is the relocating company which is providing house and flat rental services and also offices spaces for rent depending on your requirements and at your desired area in Hyderabad India.'
      }
    }
  }).when('/home/home_mover', {
    templateUrl: 'assets/tpl/home/home_mover.html',
    data: {
      meta: {
        'title': 'Flytta | Safe Packers and Movers in India | House rental services',
        'description': 'Flytta is the Packers and movers company which is providing packing and moving services from any place to any place in India. We provide safe packing and moving services with insurance for your home items.'
      }
    }
  }).when('/home/home_settling', {
    templateUrl: 'assets/tpl/home/home_settling.html',
    data: {
      meta: {
        'title': 'Flytta | Settling-in Services in Hyderabad | Telecom, Internet, Electrician, Plumber',
        'description': 'Flytta is the Relocating company which is providing Settling-in services including assistance to schooling, DTH, telecom, gas, Electrician, plumber, home maker and essentials, home services and city experiences.'
      }
    }
  })
   // .when('/request', {
   //    redirectTo: function() {
   //      window.location = "http://web.goflytta.com/request";
   //    }
   //  })
   .when('/hello-world', {
      redirectTo: function() {
        window.location = "http://web.goflytta.com/hello-world";
      }
    }).when('/rent', {
      redirectTo: function() {
        window.location = "http://web.goflytta.com/rent";
      }
    }).when('/invoice/:no/:s_no', {
     templateUrl: function(attr){
       return 'assets/tpl/invoice.html';
     }
   })
    .when('/fl-prop/:id', {
      templateUrl: function(attr){
        return 'assets/tpl/property/property1.html';
      }
    })
    .when('/search/:id', {
      templateUrl: function(attr){
        return 'assets/tpl/property/property1.html';
      }
    })
   .when('/confirm-schedule/:sid', {
      templateUrl: function(attr){
        return 'assets/tpl/property/confirm-schedule.html';
      }
    })
    .when('/property/search/:formatted_address/:bhk/:budget/:furnishing/:rent_to/:place_id',{
      templateUrl: function(attr){
        var screenWidth = $window.innerWidth;
        if (screenWidth < 700) {
          return 'assets/tpl/property/search/list.html';
        }
        else{
          return 'assets/tpl/property/search/map.html'; 
        }
      },
      data: {
        meta: {
          'title': 'Flytta | Flats, Apartments, Houses for rent in Hyderabad',
          'description': 'Rental properties by area, in this map page you can find the number of house rental properties, flats for rent and spaces for office based on your required area or city.'
        }
      }
    }).when('/property/schedule-visit', {
    templateUrl: 'assets/tpl/property/schedule-visit.html',
    data: {
      meta: {
        'title': 'Flytta | Schedule visit date and time for selected rental properties | Flats for rent Hyderabad',
        'description': 'In this page you can Schedule visit date and time for selected rental properties. So that you can visit selected properties at your desired date and time.'
      }
    }
  }).when('/property/confirm-property', {
    templateUrl: 'assets/tpl/property/confirm-property.html',
    data: {
      meta: {
        'title': 'Flytta | Confirm your selected rental property | House for rent Hyderabad',
        'description': 'Here you can Confirm your selected rental property (Flats/Houses/Office Spaces) and make a payment as our rental assistance charges then after you can download invoice that provided by us.'
      }
    }
  }).when('/mover/add-details', {
      templateUrl: 'assets/tpl/mover/add-details.html',
      data: {
        meta: {
          'title': 'Flytta | Select Packers and movers Items | Packers and movers in India',
          'description': 'In Packers and movers add details page you have to provide details like Origin address, Destination address, Moving on date and time and list of your home items.'
        }
      }
    }).when('/mover/add-details', {
      templateUrl: 'assets/tpl/mover/add-details.html',
      data: {
        meta: {
          'title': 'Flytta | Select Packers and movers Items | Packers and movers in India',
          'description': 'In Packers and movers add details page you have to provide details like Origin address, Destination address, Moving on date and time and list of your home items.'
        }
      }
    }).when('/mover/confirm', {
      templateUrl: 'assets/tpl/mover/confirm.html',
      data: {
        meta: {
          'title': 'Flytta | Packers and movers confirm items and payment | Packers and movers in India',
          'description': 'Here you need to confirm your listed items and origin and destination address details and get packing and moving charges to make a payment after item verification is done.'
        }
      }
    }).when('/mover/completed', {
      templateUrl: 'assets/tpl/mover/completed.html',
      data: {
        meta: {
          'title': 'Flytta | Packers and movers download invoice  | Packers and movers in India',
          'description': 'In this packers and movers download invoice page you can find and download invoice for your packers and movers service.'
        }
      }
    }).when('/request', {
      templateUrl: 'assets/tpl/request.html',
      data: {
        meta: {
          'title': 'Flytta | Request Services | House rental, Packers and movers and Settling-in Services',
          'description': 'Here you can request your required services like house rentals based on area, budget, BHK and packers and movers from any place to any place and also settling-in services.'
        }
      }
    }).when('/how', {
      templateUrl: 'assets/tpl/how.html',
      data: {
        meta: {
          'title': 'Flytta | How it works | House rental, Packers and movers and Settling-in Services',
          'description': 'Here we are providing complete information about house rentals, packers and movers and settling-in services like how they are works step by step process.'
        }
      }
    }).when('/profile', {
      templateUrl: 'assets/tpl/profile.html',
      data: {
        meta: {
          'title': 'Flytta | User profile| House rental, Packers and movers and Settling-in Services',
          'description': 'User profile provides complete information about user like name, email and selected services like house rentals, packers and movers and settling-in services, status of user requested service.'
        }
      }
    }).when('/about', {
      templateUrl: 'assets/tpl/about.html',
      data: {
        meta: {
          'title': 'About Flytta | House rental, Packers and movers and Settling-in Services',
          'description': 'Flytta is a one stop relocation shop. It is a solution for corporates and professionals, providing end to end services like house rentals, packers and movers and settling-in services for their relocation.'
        }
      }
    }).when('/contact', {
      templateUrl: 'assets/tpl/contact.html',
      data: {
        meta: {
          'title': 'Contact Flytta | House rental, Packers and movers and Settling-in Services',
          'description': 'Flytta is a one stop relocation shop. Contact us page for who wants to contact Flytta or have any queries please get in touch with us through contact us page.'
        }
      }
    })
   .when('/:folder1/:folder2/:tpl', {
      templateUrl: function(attr){
        return 'assets/tpl/' + attr.folder1 + '/'+ attr.folder2 + '/' + attr.tpl + '.html';
      }
    }).when('/:folder/:tpl', {
      templateUrl: function(attr){
        return 'assets/tpl/' + attr.folder + '/' + attr.tpl + '.html';
      }     
    })
    .when('/:tpl', {
      templateUrl: function(attr){
        return '  assets/tpl/' + attr.tpl + '.html';
      }
    })
    // .when('fl-prop/:tpl', {
    //   templateUrl: function(attr){
    //     return '  assets/tpl/' + attr.tpl + '.html';
    //   }
    // })
    .otherwise({ redirectTo: '/404' });
    $locationProvider.html5Mode(true).hashPrefix('!');
    $locationProvider.html5Mode(true);   
}]);
app.run(['ngMeta', function(ngMeta) { 
  ngMeta.init();
}]);
// app.run( function($rootScope, $location) {
//  if()
// });
// app.value('$routerRootComponent', 'materialism');
// app.component('materialism',{
//     templateUrl: 'assets/tpl/home/main.html',
//     $routeConfig: [
//     {path: '/property/...', name: 'Property', component: 'property', useAsDefault: true},
//     {path: '/mover/...', name: 'Mover', component: 'mover' }
//   ]
// });



//auth0
// .config(['lockPasswordlessProvider',function(lockPasswordlessProvider) {
//   lockPasswordlessProvider.init({
//     clientID: 'lmfPrLVC7LJFBwFKvAz0F49eDyrbItZK',
//     domain: 'flytta.auth0.com',
//     options:options
//   });
// }])

// google maps
app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });
}])

// loading bar settings
// .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
//   cfpLoadingBarProvider.includeSpinner = false;
//   cfpLoadingBarProvider.latencyThreshold = 300;
// }])

// defaults for date picker
app.config(['$datepickerProvider', function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    iconLeft: 'md md-chevron-left',
    iconRight: 'md md-chevron-right',
    autoclose: true,
  });
}])

// defaults for date picker
app.config(['$timepickerProvider', function($timepickerProvider) {
  angular.extend($timepickerProvider.defaults, {
    ampm: true,    
    timeFormat: 'HH:mm',
    iconUp: 'md md-expand-less',
    iconDown: 'md md-expand-more',
    hourStep: 1,
    minuteStep: 30,
    hourMin: 9,
    hourMax: 22,
    arrowBehavior: 'picker',
    modelTimeFormat: 'HH:mm',

  });
}])

// disable nganimate with adding class
app.config(['$animateProvider', function($animateProvider) {
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
}])

// set constants
app.run(['$rootScope', 'APP', function ($rootScope, APP) {
  $rootScope.APP = APP;
}]);
app.run(['$templateCache', function ($templateCache) {
  $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
  $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
}])
app.config(['lazyImgConfigProvider', function(lazyImgConfigProvider){
  var scrollable = document.querySelector('#scrollable');
  lazyImgConfigProvider.setOptions({
    offset: 100000, // how early you want to load image (default = 100)
    errorClass: 'error', // in case of loading image failure what class should be added (default = null)
    successClass: 'success', // in case of loading image success what class should be added (default = null)
    onError: function(image){}, // function fired on loading error
    onSuccess: function(image){}, // function fired on loading success
    container: angular.element(scrollable) // if scrollable container is not $window then provide it here
  });
}])
app.directive('furnishedState', function(){
  return {
    restrict: 'E',
    templateUrl: 'assets/tpl/property/furstat.html'
  }
});
var mydire = true;
app.directive('myDirective', function() {
  //$scope.name = 'World';
  return{
    link: function(scope, element, attr) {
    console.log(element);
      var mydire = true;
    element.on('scroll', function() {
      if(mydire == true){
      if($(this).scrollTop() + $(this).innerHeight()+40 >= $(this)[0].scrollHeight){       
        $("#flux").modal({ backdrop: 'static', keyboard: false }).modal("show");
        mydire = false;
     }
    }
    });
  }
    
  }}
);
// app.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
//     //Redirect any unmatched url
//     $urlRouterProvider.otherwise("/");
    
//     //home
//     $stateProvider.state('index', {
//         url: "/",
//         templateUrl: "assets/tpl/home/main.html"
//         resolve: {
//             deps: function ($ocLazyLoad) {
//                 return $ocLazyLoad.load('assets/js/all-controllers.min.js');
//             }
//         }
//     });

//    $ocLazyLoadProvider.config({
//       debug: true
//     });

// });
// app.config(function($stateProvider) {
// $stateProvider.state('/', {
//             url: '/',
//             templateUrl: 'assets/tpl/home/main.html',
//             controller: 'homemainController',
//             resolve: {
//                 lazyLoad: ['$ocLazyLoad', function($ocLazyLoad) {
//                     return $ocLazyLoad.load({
//                         name: 'app',
//                         files: [
//                             'assets/js/all-controllers.min.js',
//                         ]
//                     })
//                 }]
//             }
//         })
// })

