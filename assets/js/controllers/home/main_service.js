app.factory('main_serv', ['$http',function($http) {
  var main_serv={};
  //var fldb = '128.199.221.74:3013';
  var userId = amplify.store("email");
  main_serv.getProp=function(area,city){   
    return $http.get(fldb+'/flytta_api/v0.1/portal/property/partial/'+area+'/'+city)          
        .success(function(data2) {              
            return data2;         
        });           
  };
   main_serv.serviceid=function(propid){   
    return $http.post(fldb+'/flytta_api/v0.1/property/multi_service_id',propid)  
          .success(function(data) {              
            return data;      
    });           
  };
  main_serv.getArea=function(city){   
    return $http.get('assets/json/'+city+'.json')  
          .success(function(data) {              
            return data;      
    });           
  };    
  main_serv.getCities=function(){   
    return $http.get('assets/json/city_india.json')  
          .success(function(data) {              
            return data;      
    });           
  }; 
  main_serv.getSettleIn=function(jdata){   
    return $http.post(fldb+'/flytta_api/v0.1/contact',jdata)  
          .success(function(data) {              
            return data;      
    });           
  }; 
  main_serv.multiIds=function(jdata){   
    return $http.post(fldb+'/flytta_api/v0.1/property/multi_id',jdata)  
          .success(function(data) {              
            return data;      
    });           
  };         
  main_serv.sendProp1=function(jdata){  
    return $http.post(fldb+'/flytta_api/v0.1/contact/',jdata)          
         .success(function(data2) {              
           return data2;        
        });          
 };                      
main_serv.req_reloc=function(rdata){  
    return $http.post(fldb + '/flytta_api/v0.1/service_data',rdata)          
         .success(function(data2) {              
           return data2;        
        });          
 };                           
main_serv.subscript=function(submail){  
    return $http.post(fldb + '/flytta_api/v0.1/fcrm/subscribe/'+submail)          
         .success(function(data2) {              
           return data2;        
        });          
 }; 
main_serv.invdetails=function(invno){   
  return $http.get(fldb + '/flytta_api/v0.1/payment/invoice/'+invno)  
        .success(function(data) {              
          return data;      
  });           
};  
main_serv.csCust=function(rid){   
  return $http.get(fldb + '/flytta_api/v0.1/customer_schedule/customer/'+rid)  
        .success(function(data) {              
          return data;      
  });           
};  
main_serv.csPropid=function(csid){   
  return $http.get(fldb + '/flytta_api/v0.1/customer_schedule/schedule/'+csid)  
        .success(function(data) {              
          return data;      
  });           
};                       
main_serv.sendCSchdata=function(csid, cs_status){  
    return $http.post(fldb + '/flytta_api/v0.1/customer_schedule/update_status/'+csid+'/'+cs_status)          
         .success(function(data2) {              
           return data2;        
        });          
 };                        
main_serv.getPropSid=function(gsid){  
    return $http.get(fldb + '/flytta_api/v0.1/portal/property/findserviceid/'+gsid)          
         .success(function(data2) {              
           return data2;        
        });          
 }; 
  return main_serv;
}]);

