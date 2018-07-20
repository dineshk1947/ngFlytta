app.controller('profileController',['$scope','serv','main_serv','mover_serv','$window',function($scope,serv,main_serv,mover_serv,$window){

$scope.moveritemdiv=true;
$scope.moverschvend=false;
    $scope.index = 0;
$scope.uemail=amplify.store('email');
$scope.uname=amplify.store('name');
$scope.uphone=amplify.store('phone');
    serv.show().success(function(items){
        if(items["data"]==1){
            $scope.status = items["status"];
            amplify.store("status",items["status"]);
            amplify.store("selected_area",items["item"]["area"]); 
             if(items["status"]>5){
                if(items["item"]["visit_date"] != {}){
                    $scope.dateTime = items["item"]["visit_date"];
                    console.log($scope.dateTime);
                } 
                console.log(items);
                main_serv.getPropSid(items["item"]["confirm"]).success(function(data){
                    $scope.confirm =  data["item"];
                    amplify.store("confirm", $scope.confirm);
                    console.log($scope.confirm);
                });
                if(items["item"]["visit_date"] != {}){
                    $scope.dateTime = items["item"]["visit_date"];
                    console.log($scope.dateTime);
                }            

                var new_data1 = {"value":items["item"]["wish"]};
                main_serv.multiIds(new_data1).success(function(data_ide){
                    if(data_ide["data"] == "1"){
                        amplify.store("wish_property",data_ide["prop"]); 
                        $scope.wish_list = amplify.store("wish_property");
                    }                                                       
                });

                var new_data1 = {"value":items["item"]["visit"]};
                main_serv.multiIds(new_data1).success(function(data_ide){
                    if(data_ide["data"] == "1"){
                        amplify.store("visit_property",data_ide["prop"]); 
                        $scope.visit_list = amplify.store("visit_property");
                    }                                                       
                });
            }
            else if(items["status"]>4){
                if(items["item"]["visit_date"] != {}){
                    $scope.dateTime = items["item"]["visit_date"];
                    console.log($scope.dateTime);
                }      

                var new_data1 = {"value":items["item"]["wish"]};
                main_serv.multiIds(new_data1).success(function(data_ide){
                    if(data_ide["data"] == "1"){
                        amplify.store("wish_property",data_ide["prop"]); 
                        $scope.wish_list = amplify.store("wish_property");
                    }                                                       
                });             
                var new_data1 = {"value":items["item"]["visit"]};
                main_serv.multiIds(new_data1).success(function(data_ide){
                    if(data_ide["data"] == "1"){
                        amplify.store("visit_property",data_ide["prop"]); 
                        $scope.visit_list = amplify.store("visit_property");
                    }                                                       
                });
            }
            else if(items["status"]>2){
                if(items["item"]["visit_date"] != {}){
                    $scope.dateTime = items["item"]["visit_date"];
                }                            
                var new_data1 = {"value":items["item"]["wish"]};
                main_serv.multiIds(new_data1).success(function(data_ide){
                    if(data_ide["data"] == "1"){
                        amplify.store("wish_property",data_ide["prop"]); 
                        $scope.wish_list = amplify.store("wish_property");
                    }                                                       
                });
                var new_data1 = {"value":items["item"]["visit"]};
                main_serv.multiIds(new_data1).success(function(data_ide){
                    if(data_ide["data"] == "1"){
                        amplify.store("visit_property",data_ide["prop"]); 
                        $scope.visit_list = amplify.store("visit_property");
                    }                                                       
                });        
            }
            else if(items["status"]>1){                           
                var new_data1 = {"value":items["item"]["wish"]};
                main_serv.multiIds(new_data1).success(function(data_ide){
                    if(data_ide["data"] == "1"){
                        amplify.store("wish_property",data_ide["prop"]); 
                        $scope.wish_list = amplify.store("wish_property");
                    }                                                       
                });                       
            }
            else {
            }
        }
        else{
            $scope.status = 0;
        }
    });

     mover_serv.show().success(function(data){
        if(data["data"] == "1"){
            $scope.item_list = [];
            $scope.m_status = parseInt(data["item"]["status"]);
            console.log($scope.m_status);
            $scope.m_json = data["item"]["value"];
            for(var i in $scope.m_json){
                if(i != "Current_place" && i != "Destination_place" && i != "Estimated_charge"  && i != "date"  && i !="payment"){
                    $scope.item_list.push($scope.m_json[i]);
                }
            }
            console.log($scope.item_list);
            if($scope.item_list.length == 0){
                $scope.moveritemdiv=false;
                $scope.moverschvend=true;
            }
            amplify.store("mover_item", data["item"]["value"]);
        }
     });

    $scope.gotoLink = function(property){
        console.log(property);
    }
    $scope.new_data=[];
if(amplify.store("prop_1")){
         $scope.new_data=amplify.store("prop_1");
         console.log($scope.new_data['property']);
}
    $scope.new_prop2 = function(prop_id) {
        $scope.new_data = {};
        console.log(prop_id);
        main_serv.getPropSid(prop_id).success(function(data) {                 
        console.log(data['item']);
         amplify.store("prop_1", data['item']);
         $window.open("/search/available-for-"+data['item']['rent_to']+"-"+data['item']['configuration']+"-"+data['item']['area']+"-"+data['item']['city']+"-"+data['item']['service_id'], '_blank');
        })        
         // $window.open("/property/property1", '_blank');

    }
    $scope.changeactive = function() {
        angular.element(document.querySelector("#pmtab")).removeClass("active");
        angular.element(document.querySelector("#housetab")).addClass("active");
    }
    $scope.changeactive1 = function(){
        angular.element(document.querySelector("#pmtab")).addClass("active");
        angular.element(document.querySelector("#housetab")).removeClass("active");
    }  
    $scope.mchangeactive = function() {
        angular.element(document.querySelector("#mpmtab")).removeClass("active");
        angular.element(document.querySelector("#mhousetab")).addClass("active");
    }
    $scope.mchangeactive1 = function(){
        angular.element(document.querySelector("#mpmtab")).addClass("active");
        angular.element(document.querySelector("#mhousetab")).removeClass("active");
    }  

    $scope.gotovisitlist=function(){
        var v_tab = 1;
        amplify.store("visit_tab", v_tab);
        location.href='/property/search/map';

    }


    $scope.onSubmit = function() {
        $scope.message=$scope.uquery;
        var flag = false;
        if ($scope.message) {
            flag = true;
        }
        if (flag) {
        var currentdate = new Date();
        var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
        var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var datetime = date + " at " + time;
        var jdata = { "name": $scope.uname, "email": $scope.uemail, "phone": $scope.uphone, "m_info": $scope.message, "datetime": datetime};
        main_serv.sendProp1(jdata).success(function(info2) {
            console.log(info2);
            $("#successquery").modal("show");
        });

            
        } else {
            alert("please fill the query");
        }
    }
}]);