app.factory('mover_serv', ['$http',function($http) {
 var mover_serv={};
var userId = amplify.store("email");
 mover_serv.getItems=function(){
    return $http.get('/assets/json/mover_j.json')
          .success(function(data2) {
            return data2;
    });
 };
 mover_serv.sendValue=function(jdata){  
    return $http.post(fldb+'/flytta_api/v0.1/user_mover/add/value', jdata)          
         .success(function(data) {              
           return data;        
        });   
         
 }; 
 mover_serv.getEsti=function(jdata){  
    return $http.post(fldb+'/flytta_api/v0.1/portal/mover/price',jdata)          
         .success(function(data2) {              
           return data2;        
        });          
 };
 mover_serv.sendPayment=function(jdata){  
    return $http.post(fldb+'/flytta_api/v0.1/user_mover/add/payment', jdata)          
         .success(function(data) {              
           return data;        
        });   
         
 }; 
 mover_serv.getValue=function(){  
    console.log(amplify.store("email"));
    return $http.get(fldb+'/flytta_api/v0.1/user_mover/value/'+userEmail)          
         .success(function(data) {              
           return data;        
        });      
 }; 
 mover_serv.getPayment=function(){  
    return $http.get(fldb+'/flytta_api/v0.1/user_mover/payment/'+userId)          
         .success(function(data) {              
           return data;        
        });      
 };
 mover_serv.show=function(){  
    return $http.get(fldb+'/flytta_api/v0.1/user_mover/show/'+userId)          
         .success(function(data) {              
           return data;        
        });   
         
 };     
 mover_serv.couponApply=function(couponid,cammnt){  
    return $http.get(fldb+'/flytta_api/v0.1/coupon/find/'+couponid+'/'+cammnt+'/Movers')          
         .success(function(data2) {              
           return data2;        
        });          
 };       
 return mover_serv;
}]);
