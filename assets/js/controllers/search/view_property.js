app.controller('ViewProperty', ['$scope', '$rootScope', '$route', '$document', '$http', '$aside', 'serv', 'main_serv', '$location', 'PlaceholderTextService', 'localStorageService','ngGPlacesAPI', '$window', 'uiGmapGoogleMapApi','uiGmapIsReady', function($scope, $rootScope, $route, $document, $http, $aside, serv, main_serv, $location, PlaceholderTextService, localStorageService, ngGPlacesAPI, $window, uiGmapGoogleMapApi,uiGmapIsReady) {
    
if($location.path().indexOf("fl-prop")>-1){
            var url = $location.path();
            url = url.split("/");
            var ser_id = url[2];
            main_serv.getPropSid(ser_id).success(function(data){       

            $location.url("/search/available-for-"+data['item']['rent_to']+"-"+data['item']['configuration']+"-"+data['item']['area']+"-"+data['item']['city']+"-"+data['item']['service_id']);
        });
       }

    var url = $location.path();
    url = url.split("/");
    var newstate = url[2].split("-");
    var prop_id = newstate[6];
    var propind = newstate[7];    
    console.log(prop_id);
    // serv.singleProp(prop_id).success(function(data) {
    //     tem_newdata['property'] = data["item"];
    // });

    $scope.ammenities = [{ "id": "gym", "name": "Gym", "icn": "assets/img/search/ICONS-01.png" },
        { "id": "atm", "name": "ATM", "icn": "assets/img/search/ICONS-02.png" },
        { "id": "elevator", "name": "Elevator", "icn": "assets/img/search/ICONS-03.png" },
        { "id": "security", "name": "Security", "icn": "assets/img/search/ICONS-04.png" },
        { "id": "intercom", "name": "Intercom", "icn": "assets/img/search/ICONS-09.png" },
        { "id": "swim", "name": "Swimming", "icn": "assets/img/search/ICONS-05.png" },
        { "id": "internet", "name": "Internet", "icn": "assets/img/search/ICONS-08.png" },
        { "id": "play", "name": "Play Ground", "icn": "assets/img/search/ICONS-06.png" },
        { "id": "ac", "name": "AC", "icn": "assets/img/search/ICONS-11.png" },
        { "id": "water", "name": "Water", "icn": "assets/img/search/ICONS-10.png" },
        { "id": "v_parking", "name": "Visitor Parking", "icn": "assets/img/search/ICONS-12.png" }
    ];    
    $scope.mark=[];
    $scope.map1=[];
    $scope.map1.circle={};
    $scope.map1.circle.radius=1000;
    $scope.marks={};
    var wishdata = [];
    $scope.new_data={};    
    var tem_newdata=[];
    var prop_details={};
    //if(amplify.store("prop_id")){
    if(prop_id){
        // console.log(amplify.store("prop_id"));
        // var prop_details=amplify.store("prop_id");
        // var prop_id=prop_details['propid'];
        // var propind=prop_details['index_no'];
         $scope.map1 = {
        center: {
            latitude: 17.4430548,
            longitude: 78.4004418
        },
        zoom: 14,
        };
        
        main_serv.getPropSid(prop_id).success(function(data){   
        tem_newdata['property'] = data["item"];

          wishdata = amplify.store('wish_property'); 
            console.log(wishdata);
            if(wishdata == undefined){
                tem_newdata['property']['shortgray'] = true;            
         }
         else{
            if(wishdata.length == 0){
                tem_newdata['property']['shortgray'] = true; 
            }
            else{
                for(var i in wishdata){
                console.log(wishdata[i]['_id']);
                if(wishdata[i]['_id'] == prop_id){
                    tem_newdata['property']['shortgray'] = false;  
                }
                else{
                    tem_newdata['property']['shortgray'] = true;  
                }
            }
         }
         }
         init(tem_newdata);
    });
        // serv.singleProp(propid).success(function(data) {                 
        //  console.log(data['item']);
        //  tem_newdata['property'] = data['item'];
        //  tem_newdata['index_no'] = propind;
        //     wishdata = amplify.store('wish_property'); 
        //     console.log(wishdata);
        //     if(wishdata == undefined){
        //         tem_newdata['property']['shortgray'] = true;            
        //  }
        //  else{
        //     if(wishdata.length == 0){
        //         tem_newdata['property']['shortgray'] = true; 
        //     }
        //     else{
        //         for(var i in wishdata){
        //         console.log(wishdata[i]['_id']);
        //         if(wishdata[i]['_id'] == prop_id){
        //             tem_newdata['property']['shortgray'] = false;  
        //         }
        //         else{
        //             tem_newdata['property']['shortgray'] = true;  
        //         }
        //     }
        //  }
        //  }
        //  init(tem_newdata);
        // })    
    }


    $scope.nearbyarea = function(type, newdata1) {
        if ($scope.directionsDisplay != null) {
                $scope.directionsDisplay.setMap(null);
                $scope.directionsDisplay = null;
                $scope.map1.window.show = false;
            }
            $scope.mark=[];
            $scope.nearname = type;
           // var tem_newdata = [];
            // if (amplify.store("prop_id")) {
            //     serv.singleProp(prop_id).success(function(data) {                 
            //      console.log(data['item']);
            //      //amplify.store("prop_1", data['item']);
            //      tem_newdata['property'] = data['item'];
            //     // $scope.new_data=tem_newdata;
            //     // console.log($scope.new_data);
            //     getdata(tem_newdata);
            //     // tem_newdata['property'] = amplify.store("prop_1");
            //     // $scope.new_data=tem_newdata;                
            // })    
            // }
            if(newdata1['property']['fur'] == "s_furnished"){
                newdata1['property']['fur'] = "Semi furnished"
            }
            if(newdata1['property']['fur'] == "furnished"){
                newdata1['property']['fur'] = "Furnished"
            }
            if(newdata1['property']['fur'] == "n_furnished"){
                newdata1['property']['fur'] = "Not furnished"
            }
            console.log(newdata1['property']['fur']);
            $scope.new_data=newdata1;
            console.log($scope.new_data);
            var propmarker = {
            id: $scope.new_data['property']["_id"],
            coords: {
                latitude: $scope.new_data['property']["lat"],
                longitude: $scope.new_data['property']["lon"],
            },
            icon: 'assets/img/markers/home.png',
        }
        $scope.mark.push(propmarker);
        ngGPlacesAPI.nearbySearch({ latitude: $scope.new_data['property']["lat"], longitude: $scope.new_data['property']["lon"], types: [type], radius: $scope.map1.circle.radius}).then(function(data) {
            $scope.data = data;
            var distlist = [];
            var distobj = {};  
            console.log($scope.data);
            for (var i in $scope.data) {
                var temp1 = ($scope.data[i]['geometry']['viewport']['b']['b'] + $scope.data[i]['geometry']['viewport']['b']['f']) / 2;
                var temp2 = ($scope.data[i]['geometry']['viewport']['f']['b'] + $scope.data[i]['geometry']['viewport']['f']['f']) / 2;
                var loc1 = new google.maps.LatLng($scope.new_data['property']["lat"], $scope.new_data['property']["lon"]);
                var loc2 = new google.maps.LatLng(temp2, temp1);
                var distance_from_center = (google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2) / 1000).toFixed(2);

               // distobj = {"id": }

                distlist.push(distance_from_center);

                $scope.marks = {
                    id: i,
                    coords: {
                        latitude: temp2,
                        longitude: temp1,
                    },
                    icon: 'assets/img/markers/map_service_icons/' + type + '.png',
                }
                $scope.mark.push($scope.marks);
            }
            console.log($scope.mark);
            console.log(distlist);
        });
    }
   // $scope.nearbyarea('school');
    // get the db data    
    $scope.increradius = function() {
        var range = $scope.map1.circle.radius / 1000;
        if (range == 5) {
            ////alert('You can only check nearby 5 Km distance.');
        } else {
            range++;
            $scope.map1.circle.radius = range * 1000;
            if ($scope.nearname) {
                $scope.nearbyarea($scope.nearname, $scope.new_data);
            }
        }
    }
    $scope.decreradius = function() {
        var range = $scope.map1.circle.radius / 1000;
        if (range == 1) {
            return false;
        } else {
            range--;
            $scope.map1.circle.radius = range * 1000;
            if ($scope.nearname) {
                $scope.nearbyarea($scope.nearname, $scope.new_data);
            }
        }
    }
    var init = function(newdata) {       

            $scope.new_data=newdata;
            $scope.furstatedata = $scope.new_data;
            console.log($scope.new_data);
            for (var i in $scope.ammenities) {
                if ($scope.new_data['property'][$scope.ammenities[i]['id']] == "uncheck" || $scope.new_data['property'][$scope.ammenities[i]['id']] == "false" || $scope.new_data['property'][$scope.ammenities[i]['id']] == "") {
                    $scope['alpha_' + $scope.ammenities[i]['id']] = true;
                }
            }
            var propmarker = {
                id: $scope.new_data['property']["_id"],
                coords: {
                    latitude: $scope.new_data['property']["lat"],
                    longitude: $scope.new_data['property']["lon"],
                },
                icon: 'assets/img/markers/home.png',
            };
            $scope.mark = [];
            $scope.mark.push(propmarker);
            console.log($scope.mark);
            $scope.map1 = {
                center: {
                    latitude: $scope.new_data['property']["lat"],
                    longitude: $scope.new_data['property']["lon"]
                },
                zoom: 14,
                marker: {
                    id: $scope.new_data['property']["_id"],
                    coords: {
                        latitude: $scope.new_data['property']["lat"],
                        longitude: $scope.new_data['property']["lon"]
                    },
                    data: 'restaurant'
                },                                
                markersEvents: {
                    mouseover: function(marker, eventName, model) {

                        if ($scope.directionsDisplay != null) {
                            $scope.directionsDisplay.setMap(null);
                            $scope.directionsDisplay = null;
                        }
                        uiGmapGoogleMapApi.then(function(maps) {
                            console.log('uiGmapGoogleMapApi done');                                   

                            $scope.map = {
                                center: $scope.map1.center,
                            };
                               $scope.directionsService = new maps.DirectionsService();
                               $scope.directionsDisplay = new maps.DirectionsRenderer();
                            return uiGmapIsReady.promise(1);
                        })
                        .then( function(instances) {                            
                            var instanceMap = instances[0].map;
                            console.log(instanceMap);
                            origin = $scope.map.center.latitude+", "+$scope.map.center.longitude;
                            $scope.directionsDisplay.setMap(instanceMap);
                            var directionsServiceRequest = {
                                origin: origin,
                                destination: model['coords']["latitude"]+", "+model['coords']["longitude"],
                                travelMode: google.maps.TravelMode['WALKING'],
                                optimizeWaypoints: true,
                                unitSystem: google.maps.UnitSystem.IMPERIAL,
                                provideRouteAlternatives: true,
                            };
                            $scope.directionsService.route(directionsServiceRequest, function(response, status) {                                 
                               if (status == google.maps.DirectionsStatus.OK) {
                                    $scope.directionsDisplay.setOptions({ preserveViewport: true });
                                    $scope.directionsDisplay.setOptions( { suppressMarkers: true } );
                                    $scope.directionsDisplay.setDirections(response);
                               }
                            });
                        });

                        if($scope.new_data['property']["lat"] != model['coords']["latitude"]){     
                            for (var i in $scope.data) {
                            var temp1 = ($scope.data[i]['geometry']['viewport']['b']['b'] + $scope.data[i]['geometry']['viewport']['b']['f']) / 2;
                            var temp2 = ($scope.data[i]['geometry']['viewport']['f']['b'] + $scope.data[i]['geometry']['viewport']['f']['f']) / 2;
                            if(temp2 == model['coords']["latitude"]){
                                    var nearname = $scope.data[i]['name'];
                                }
                            }
                            var loc1 = new google.maps.LatLng($scope.new_data['property']["lat"], $scope.new_data['property']["lon"]);
                            var loc3 = new google.maps.LatLng(model['coords']["latitude"], model['coords']["longitude"]);      
                            console.log(model['coords']);
                            var distance_from_center = (google.maps.geometry.spherical.computeDistanceBetween(loc1, loc3) / 1000).toFixed(2);
                            $scope.map1.window.model = model['coords'];
                            $scope.map1.window.show = true;
                            $scope.map1.window.options.content = "<b>"+nearname+"</b><br />"+distance_from_center+" KM";
                        }
                    },
                    mouseout:function(marker, eventName, model){
                        $scope.map1.window.show = false;
                    }
                },
                window: {
                    marker: {},
                    show: false,
                    closeClick: function() {
                        show = false;
                    },
                    options: {
                        content: "",                        
                        pixelOffset: {
                            width: -1,
                            height: -32
                        },                           
                    }
                },
            };
            $scope.map1.circle = {
                center: $scope.map1.center,
                radius: 1000,
                stroke: {
                    color: '#aecbf9 ',
                    weight: 2,
                    opacity: 1
                },
                fill: {
                    color: '#aecbf9 ',
                    opacity: 0.3
                },
            };
            console.log($scope.mark);


         $scope.nearbyarea('school', $scope.new_data);
    }
//init();

$scope.openarrow = false;
    $scope.openmapdiv = true;
    $scope.openar = function() {
        $scope.openarrow = true;
        $scope.openmapdiv = false;
    }    
    $scope.openar1 = function() {
        $scope.openarrow = false;
        $scope.openmapdiv = true;
    }

    $scope.selectcardli = function(item) {
        //alert('selectcardli');
        $scope.selectedcardli1 = item;
    }
    $scope.isActive3 = function(item) {
        return $scope.selectedcardli1 === item;
    };    
    $scope.selectcardli(0);
    $scope.map= {};
    $scope.map.markers = [];
    $scope.wishProp1 = function(obj, item) {
       // console.log(obj);
        wpdata = amplify.store('wish_property');
        var vdata = amplify.store('visit_property');
        if (wpdata == null || wpdata.length == 0) {
            wpdata = [];
            obj['shortgray'] = false;
            // $scope.pdetails(obj['_id'], item);
            wpdata.push(obj);
            $scope.swnum = true;
            $scope.favgray = false;
            $scope.favyell = true;
            amplify.store('wish_property', wpdata);
         //   $scope.map.markers[item]["icon"] = 'assets/img/markers/wish_home.PNG';
            $scope["favicon_" + obj._id] = false;
            var wish_num = amplify.store('wish_property');
            $scope.wnum1 = wish_num.length;
            $scope.wnum = "(" + $scope.wnum1 + ")";
            $scope.isActive1 = function(item) {
                return $scope.selected === item;
            };
            $scope.selected = 0;
            $scope.isActive1();
            if(amplify.store("uid") && amplify.store("email")){
                serv.addWish(obj["_id"]).success(function(data) {
                    if (data["data"] == "0") {
                        ////alert("Error");
                    } else if (data["data"] = "1") {
                        console.log("data sent successfully");
                        $('#myTooltip').tooltip("show");
                        setTimeout(function () {
                         $('#myTooltip').tooltip('hide');
                       }, 5000);

                    }
                });
            }
            else{
                var this_path = $location.path();
                $scope.auth0_login(this_path)
            }
        } else {
            $scope.swnum = true;
            var wish_flag = false;
            for (var i = 0; i < wpdata.length; i++) {
                if (angular.equals(wpdata[i]._id, obj._id)) {
                    wish_flag = true;
                    wpdata.splice(i, 1);
                    amplify.store('wish_property', wpdata);
                    $scope.wish_list = amplify.store('wish_property');
                    obj['shortgray'] = true;
                    // $scope.pdetails(obj['_id'], item);
                    $scope["favicon_" + obj._id] = true;
                 //   $scope.map.markers[item]["icon"] = 'assets/img/markers/home.png';
                    $scope.wnum1 = $scope.wish_list.length;
                    if ($scope.wnum1 < 1) {
                        $scope.swnum = false;
                        $scope.favgray = true;
                        $scope.favyell = false;
                    } else {
                        $scope.favgray = false;
                        $scope.favyell = true;
                    }
                    $scope.wnum = "(" + $scope.wnum1 + ")";
                    return false;
                }
            }
            for (var i in vdata) {
                if (vdata[i]["_id"] == obj["_id"]) {
                    vdata.splice(i, 1);
                }
            }
            amplify.store('visit_property', vdata);
            if (wish_flag) {
                if(amplify.store("uid") && amplify.store("email")){
                    serv.removeWish(obj["_id"]).success(function(data) {
                        if (data["data"] == "0") {
                            ////alert("Error");
                        } else if (data["data"] = "1") {
                            console.log("data sent successfully");
                        }
                    });
                }
            } else {
                obj['shortgray'] = false;
                wpdata.push(obj);
                amplify.store('wish_property', wpdata);
                amplify.store('wish_property');
                // $scope.pdetails(obj['_id'], item);
                $scope["favicon_" + obj._id] = false;
             //   $scope.map.markers[item]["icon"] = 'assets/img/markers/wish_home.PNG';
                if(amplify.store("uid") && amplify.store("email")){
                    serv.addWish(obj["_id"]).success(function(data) {
                        if (data["data"]["data"] == "0") {
                            ////alert("Error");
                        } else if (data["data"]["data"] = "1") {
                            console.log("data sent successfully");
                        }
                    });
                }
            }
            var wish_num = amplify.store('wish_property');
            $scope.wnum1 = wish_num.length;
            if ($scope.wnum1 == 0) {
                $scope.wnum = '';
            }
            $scope.wnum = "(" + $scope.wnum1 + ")";
            return true;
        }
    };

}]);
