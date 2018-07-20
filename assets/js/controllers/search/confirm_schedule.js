app.controller('cofirmSchedule', ['$scope', '$rootScope', '$route', '$document', '$http', '$aside', 'serv', 'main_serv', '$location', 'PlaceholderTextService', 'localStorageService','ngGPlacesAPI', '$window', 'uiGmapGoogleMapApi','uiGmapIsReady', function($scope, $rootScope, $route, $document, $http, $aside, serv, main_serv, $location, PlaceholderTextService, localStorageService, ngGPlacesAPI, $window, uiGmapGoogleMapApi,uiGmapIsReady) {
    
    var url=$location.path();
    var fields = url.split('/');
    var csid = fields[2];
$scope.notconsch = [];
$scope.consch = [];
//alert(csid);
    main_serv.csCust(csid).success(function(cstdata){
        console.log(cstdata['item']);
        $scope.cus_data=cstdata['item'];
        console.log($scope.cus_data);
    });

        var pid = [];
        var temp_obj = {};
    main_serv.csPropid(csid).success(function(cstPdata){     
    console.log(cstPdata);
        console.log(cstPdata['item']);
        $scope.pdatestatus = cstPdata['item'];
        console.log($scope.pdatestatus);
        $scope.pdata = cstPdata['item']['schedule']; 
        console.log($scope.pdata);
        $scope.p_details = [];
        var temp = [];
        for(var i in $scope.pdata){
            temp.push($scope.pdata[i]['prop_id']);
            // if($scope.pdata[i]['status']){
            //     if($scope.pdata[i]['status'] == 'Yes'){
            //         $scope.consch['che_'+$scope.pdata[i]['prop_id']] = true;
            //         $scope.notconsch['che_'+$scope.pdata[i]['prop_id']] = false;
            //     }
            //     else{
            //         $scope.consch['che_'+$scope.pdata[i]['prop_id']] = false;
            //         $scope.notconsch['che_'+$scope.pdata[i]['prop_id']] = true;                    
            //     }
            // }
        }

                 console.log(temp)
                 temp_obj = {"value": temp};
                 console.log(temp_obj['value']);
                 main_serv.serviceid(temp_obj).success(function(totalpData){
                //serv.singleProp($scope.pdata[i]['prop_id']).success(function(totalpData){
                    console.log(totalpData);
                var totprop = totalpData['prop'];
                console.log(totprop)
                for(var i in temp){
                    for(var j in totalpData['prop']){
                        if($scope.pdata[i]['prop_id'] == totprop[j]['service_id']){
                            totprop[j]['sch_date'] = $scope.pdata[i]['time'];
                            totprop[j]['sch_time'] = $scope.pdata[i]['date'];
                        }
                    }
                }
                $scope.p_details=totprop;
                console.log(totprop)
                // for(var j in totprop){
                //     $scope.notconsch['che_'+totprop[j]['_id']] = true;
                // }
               // temp.push(totalpData['item'])
               // $scope.p_details[i]= {"prop":totalpData['item'], "time":$scope.pdata[i]['time']};
    // console.log($scope.p_details[0]['totalArea']);
    // if($scope.p_details[0]['totalArea'].indexOf('Feet') > -1){
    //     alert('is there');
    // }
            });


    });

$scope.confirmedsch = function(p_id){
  //  console.log($scope.consch);
    if($scope.consch['che_'+p_id] == true){
        $scope.notconsch['che_'+p_id] = false;
        for(var i in $scope.p_details){
            if($scope.p_details[i]['_id'] == p_id){
                $scope.p_details[i]['status'] = 'Yes';
            }
            if($scope.pdatestatus['schedule'][i]['prop_id'] == p_id){
                $scope.pdatestatus['schedule'][i]['status'] = 'Yes';
            }
        }
        
        console.log($scope.pdatestatus);
    }
    else{
        $scope.notconsch['che_'+p_id] = true;
        for(var i in $scope.p_details){
            if($scope.p_details[i]['_id'] == p_id){        
                $scope.p_details[i]['status'] = 'No';
            }
            if($scope.pdatestatus['schedule'][i]['prop_id'] == p_id){
                $scope.pdatestatus['schedule'][i]['status'] = 'No';
            }
    }
        console.log($scope.pdatestatus);
    }
}
$scope.notconfirmedsch = function(p_id){
  //  console.log($scope.consch);
    if($scope.notconsch['che_'+p_id] == true){
        $scope.consch['che_'+p_id] = false;
        for(var i in $scope.p_details){
            if($scope.p_details[i]['_id'] == p_id){
                $scope.p_details[i]['status'] = 'No';
            }
            if($scope.pdatestatus['schedule'][i]['prop_id'] == p_id){
                $scope.pdatestatus['schedule'][i]['status'] = 'No';
            }
        }
        
        console.log($scope.pdatestatus);
    }
    else{
        $scope.consch['che_'+p_id] = true;
        for(var i in $scope.p_details){
            if($scope.p_details[i]['_id'] == p_id){        
                $scope.p_details[i]['status'] = 'Yes';
            }
            if($scope.pdatestatus['schedule'][i]['prop_id'] == p_id){
                $scope.pdatestatus['schedule'][i]['status'] = 'Yes';
            }
    }
        console.log($scope.pdatestatus);
    }
}
$scope.accepted=true;
$scope.confirschsub=function(){    
    $scope.accepted=false;
    console.log($scope.pdatestatus['schedule']);
    // var final_sch = {"schedule": $scope.pdatestatus['schedule'], "request_id": $scope.pdatestatus['request_id'], "status":"accepted"}
    var final_sch = "accepted"
    console.log(final_sch);
    main_serv.sendCSchdata(csid, final_sch).success(function(info2) {
        console.log(info2);
    });

}
}]);
