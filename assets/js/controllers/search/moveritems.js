app.factory('getMoverItems', ['$http',function($http) {
  var getMoverItems={};
  getMoverItems.getItems=function(){
    return $http.get('/assets/json/mover_j.json')
          .success(function(data2) {
            return data2;
    });
  };
  return getMoverItems;
}]);

