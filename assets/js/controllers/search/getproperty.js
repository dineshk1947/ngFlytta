app.factory('serv', ['$http',function($http) {
 var serv={};
  serv.getlatlon=function(jdata){  
    return $http.post(fldb+'/flytta_api/v0.1/portal/property/latlon',jdata)          
         .success(function(data2) {              
           return data2;        
        });          
 };
 serv.getProp=function(area,city){  
    return $http.get(fldb+'/flytta_api/v0.1/portal/property/partial/'+area+'/'+city)          
         .success(function(data2) {              
           return data2;        
        });          
 };
  serv.singleProp=function(prop_id){  
    return $http.get(fldb+'/flytta_api/v0.1/portal/property/find/'+prop_id)          
         .success(function(data2) {              
           return data2;        
        });          
 };
  serv.show=function(){  
    return $http.get(fldb+'/flytta_api/v0.1/user_prop/show/'+amplify.store("email"))          
         .success(function(data2) {              
           return data2;        
        });          
 };
 serv.preselect=function(jdata){  
    return $http.post(fldb+'/flytta_api/v0.1/user_prop/preselect/'+amplify.store("email"),jdata)          
         .success(function(data2) {              
           return data2;        
        });          
 };
 serv.addWish=function(prop_id){  
    return $http.post(fldb+'/flytta_api/v0.1/user_prop/add_wish/'+amplify.store("email")+'/'+prop_id)          
         .success(function(data2) {              
           return data2;        
        });          
 };
 serv.removeWish=function(prop_id){  
    return $http.post(fldb+'/flytta_api/v0.1/user_prop/remove_wish/'+amplify.store("email")+'/'+prop_id)          
         .success(function(data2) {              
           return data2;        
        });          
 };
 serv.addVisit=function(prop_id){  
    return $http.post(fldb+'/flytta_api/v0.1/user_prop/add_visit/'+amplify.store("email")+'/'+prop_id)          
         .success(function(data2) {              
           return data2;        
        });          
 };
  serv.removeVisit=function(prop_id){  
    return $http.post(fldb+'/flytta_api/v0.1/user_prop/remove_visit/'+amplify.store("email")+'/'+prop_id)          
         .success(function(data2) {              
           return data2;        
        });          
 };
serv.addDate=function(prop_id,date,o_date){  
    return $http.post(fldb+'/flytta_api/v0.1/user_prop/add_date/'+amplify.store("email")+'/'+prop_id+'/'+date+'/'+o_date)          
         .success(function(data2) {              
           return data2;        
        });          
 };
  serv.addTime=function(j_data){  
    return $http.post(fldb+'/flytta_api/v0.1/user_prop/add_time/'+amplify.store("email"),j_data)          
         .success(function(data2) {              
           return data2;        
        });          
 };
  serv.prePay=function(bod){  
    return $http.post(fldb+'/flytta_api/v0.1/payment/pre_pay/'+amplify.store("email"),bod)          
         .success(function(data2) {              
           return data2;        
        });          
 };
  serv.prePayos=function(){  
    return $http.post(fldb+'/flytta_api/v0.1/user_prop/pre_pay/'+amplify.store("email"))          
         .success(function(data2) {              
           return data2;        
        });          
 };
 serv.reqVisit=function(){  
    return $http.post(fldb+'/flytta_api/v0.1/user_prop/req_visit/'+amplify.store("email"))          
         .success(function(data2) {              
           return data2;        
        });          
 };
 serv.confirmPay=function(prop_id,bod){  
    return $http.post(fldb+'/flytta_api/v0.1/property_pay/'+amplify.store("email")+'/'+prop_id,bod)          
         .success(function(data2) {              
           return data2;        
        });          
 };
 serv.reqProp=function(rpdata){  
    return $http.post(fldb + '/flytta_api/v0.1/contact/',rpdata)          
         .success(function(data2) {              
           return data2;        
        });          
 };
 serv.deleteProp=function(rpdata){  
    return $http.delete(fldb + '/flytta_api/v0.1/user_prop/delete/'+amplify.store("email"))          
         .success(function(data2) {              
           return data2;        
        });          
 }; 
 serv.couponApply=function(couponid,cammnt){  
    return $http.get(fldb+'/flytta_api/v0.1/coupon/find/'+couponid+'/'+cammnt+'/Property')          
         .success(function(data2) {              
           return data2;        
        });          
 };         
 return serv;
}]);
