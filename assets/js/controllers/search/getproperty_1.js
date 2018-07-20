app.factory('sure', ['$http',function($http) {
 var sure={};
 sure.getProp=function(){  
    return $http.get(fldb+'/flytta_api/v0.1/portal/property/data/Madhapur/Hyderabad')          
         .success(function(data2) {              
           return data2;        
        });          
 };
 sure.sendProp1=function(jdata){  
    return $http.post(fldb+'/flytta_api/v0.1/contact/',jdata)          
         .success(function(data2) {              
           return data2;        
        });          
 };
  sure.sendProp2=function(jdata){  
    return $http.post(fldb+'/flytta_api/v0.1/profile_query',jdata)          
         .success(function(data2) {              
           return data2;        
        });          
 };
 sure.sendProp3=function(jdata){  
    return $http.post(fldb+'/flytta_api/v0.1/wish_new/add', jdata)          
         .success(function(data2) {              
           return data2;        
        });   
         
 };

             
 return sure;
}])



