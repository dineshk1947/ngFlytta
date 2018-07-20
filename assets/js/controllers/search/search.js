app.controller('SearchProperty', ['$scope', '$rootScope', '$route', '$document', '$http', '$aside', 'serv', 'main_serv', '$location', 'PlaceholderTextService', 'localStorageService', '$window', 'ngGPlacesAPI','uiGmapGoogleMapApi', function($scope, $rootScope, $route, $document, $http, $aside, serv, main_serv, $location, PlaceholderTextService, localStorageService, $window, ngGPlacesAPI,uiGmapGoogleMapApi) {
    // if(amplify.store("request_stat") != 1){
    //     if (!amplify.store("email") || !amplify.store("uid")) {
            
    //         location.href = "/";
    //     }
    // }    
    $scope.request_stat = false;
    if(!amplify.store()){
         location.href = "/";
    }
    if(amplify.store("request_stat") == 1){
        $scope.request_stat = true;
    }
    else{
        $scope.request_stat = false;
    }
    var query_area;
    var info;
    var all_markers = [];
    $scope.flags = false;
    $scope.vall = true;
    var p_markers = [];
    var g_data;
    var wpdata = [];
    $scope.p_data;
    var filter_array = {};
    var temp2 = [];
    var temp = {};
    $scope.model_filter = {};
    var budget_data = [];
    var budget_flag = false;
    $scope.not_paid = true;
    $scope.swnum = true;
    $scope.favgray = true;
    $scope.favyell = false;
    $scope.vcheck = [];
    $scope.selected = 0;
    $scope.multipleDemo = {};
    $scope.multipleDemo.inputareas;
    $scope.values = {};
    $scope.cnfpay = true;
    $scope.dwninv = false;
    var stoptime;
   // $scope.city_areas3 = [];
    // $scope.bhk_count = "";
    // $scope.fur_count = "";
    // $scope.rent_count = "";   
    var center_lat, center_lon;
    $scope.cities1 = [{ 'cname': 'Hyderabad', 'cvalue': 'hyd' }];
    $scope.searchCity = 'Hyderabad';
    var city = 'Hyderabad';
    $scope.bhks = [{'id':'1 BHK','value':'1 BHK'},{'id':'2 BHK','value':'2 BHK'},{'id':'3 BHK','value':'3 BHK'},{'id':'4 BHK','value':'4 BHK+'}];
    $scope.k_value = "Budget";
    var value = $scope.cities1[0]["cvalue"];
    var range = 2000;
    var place_id = "";
    $scope.tomorrow = new Date();
    //$scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
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
    // $scope.filterareas = function(value){
    //     $scope.reqpcity = value;
    //     main_serv.getArea(value).success(function(data2){
    //         for (var i in data2) {
    //             $scope.city_areas3[i] = { "id": i, "value": data2[i] };
    //         }
    //     });
    // }
    $scope.onSelectCallback1 = {
        placeholder: 'Select the city',
        allowSearch: true,
        onChange: function(val) {
            //$scope.filterareas(val);
        }
    };
    $scope.selectcardlitest=function(index){
            $scope.selectedli = index;
    }
    var dntscroll;
    $scope.scrollTo = function(element) {
        console.log(element);
        var container = $('.onlyscroll'),
        scrollTo = $(element);

        container.scrollTop(
            scrollTo.offset().top - container.offset().top + container.scrollTop()
        );
    }
 
    $scope.map = {
        center: {
            latitude: 17.4430548,
            longitude: 78.4004418
        },
        zoom: 15,
        markers: p_markers,
        markersEvents: {
            click: function(marker, eventName, model) {
                console.log(model);
                var index = $scope.map.markers.indexOf(model);
                console.log(index);
                $scope.s_prop = model["data"];
                $scope.pdetails(model["id"], index);
                $scope.selectcardlitest(index);
                $scope.scrollTo('#list_'+index);
                $scope.map.window.model = model;
                $scope.map.window.show = false;
            },
            mouseover: function(marker, eventName, model) { 
                    console.log(model['data']['picurl'][0]); 
                    var propimg = model['data']['picurl'][0];          
                    $scope.map.window.model = model;
                    $scope.map.window.show = true;
                    if(model['data']['totalArea'].indexOf('Feet')<0){
                        model['data']['totalArea'] = model['data']['totalArea']+" Sq Feet";      
                    }
                    $scope.map.window.options.content = "<div class='hello' style='overflow-y:hidden; height:168px; max-width:132px;'><img src='"+propimg+"' style='min-width:100px; height:100px'  /><div style='padding:5px; text-align:left'><b>Rs. "+model['data'].m_rent+"</b>, <br />"+model['data'].configuration+",<br />"+model['data'].totalArea+"</div></div>";
            },
            mouseout: function(marker, eventName, model) { 
                    $scope.map.window.show = false;
            }
        },
        window: {
            marker: {},
            show: false,
            closeClick: function() {
                this.show = false;
            },
            options: { 
                    maxWidth:100,
                    pixelOffset: {
                        width: -1,
                        height: -45
                    },                
            }
        },        
    };
    var init = function() {       
        var tem_newdata = [];
        var info_confirm = amplify.store("confirm");
        if (amplify.store("search_count") == 0) {            
         //  preload_properties();
            var info_status = amplify.store("status");
            if (info_status > 5) {
                if(amplify.store("uid") && amplify.store("email")){
                    var info_confirm = amplify.store("confirm");
                    if(info_confirm){
                    if(info_confirm.length > 0){
                        main_serv.getPropSid(info_confirm[0]).success(function(data) {
                            $scope.p = data["item"];
                                $scope.cnfpay = false;
                                $scope.dwninv = true;
                        });
                    }
                }
            }else{
                $scope.auth0_login("/property/confirm-property");
            }
            } else if (info_status > 4) {
                if(amplify.store("uid") && amplify.store("email")){
                    $scope.dwninv = false;
                    $scope.cnfpay = true;
                    var info_visit_date = amplify.store("visit_dateTime");
                    var info_visit_original = amplify.store("original_date");
                    var myarray = [];
                    for (var i in info_visit_date) {
                        $scope.values["date_" + i] = info_visit_date[i]["date"];
                        $scope.values["time_" + i] = info_visit_date[i]["time"];
                    }
                    $scope.visit_list = amplify.store("visit_property");
                    $scope.p = $scope.visit_list[0];
                    if ($scope.p){
                        $scope.selectedcard = $scope.p['service_id'];
                        $scope.prosel = [];
                        $scope.prosel[$scope.p['service_id']] = true;
                    }
                }
                else{
                    $scope.auth0_login("/property/confirm-property");
                }
            } else if (info_status > 2) {
                var info_visit_date = amplify.store("visit_dateTime");
                $scope.visit_list = amplify.store("visit_property");             
                console.log($scope.visit_list);
                $scope.vcheck={};
                if($scope.visit_list){
                    for(var i in  $scope.visit_list){
                        $scope.vcheck['che_' +  $scope.visit_list[i]["service_id"]]=true;
                    }
                }   
                $scope.wish_list = amplify.store("wish_property");
                var info_visit_original = amplify.store("original_date");
                if (info_status == 4) {
                    if(amplify.store("uid") && amplify.store("email")){
                        for (var j in info_visit_original) {
                            $scope.values["date_"+j] = info_visit_original[j]["date"];
                            $scope.values["time_"+j] = info_visit_original[j]["time"];
                        }
                    }else{
                        $scope.auth0_login("/property/schedule-visit");
                    }

                   // if($location.path() != "/property/schedule-visit"){
                   //  location.href = "/property/schedule-visit";
                   // }   
                } else if (info_status == 3) {
                    $scope.visit_list = amplify.store("visit_property"); 
                    $scope.wish_list = amplify.store("wish_property");
                    //var screenWidth = $window.innerWidth;
                    //if ($location.path() != "/property/search/map" && $location.path() != "/property/search/list") {
                        // if (screenWidth < 700) {
                        //     location.href = "/property/search/list";
                        // } else {
                        //     location.href = "/property/search/map";
                        // }
                    //}
                    if($location.path().indexOf("/property/search/")<0){
                        location.href = "/property/search/"+$scope.searchCity+"/"+$scope.multipleDemo.inputareas;
                    }
                }
            } else if (info_status == 2) {
                $scope.wish_list = amplify.store("wish_property");
            }
        } 
        else if(amplify.store("search_count") == 1){
            if(amplify.store("uid") && amplify.store("email")){
                serv.show().success(function(items) {
                    if (items["data"] == "1") {
                        amplify.store("status", items["status"]);
                        var t_temp = {};
                        if (items["status"] > 5) {
                            if(amplify.store("uid") && amplify.store("email")){
                                if(items["item"]["confirm"].length > 0){
                                    main_serv.getPropSid(items["item"]["confirm"][0]).success(function(data) {
                                        $scope.p = data["item"];
                                             $scope.cnfpay = false;
                                             $scope.dwninv = true;
                                            if ($location.path() != "/property/confirm-property") {
                                                location.href = "/property/confirm-property";
                                            }
                                    });
                                }
                            }
                            else{
                                $scope.auth0_login("/property/confirm-property");
                            }
                        } else if (items["status"] > 4) {
                            if(amplify.store("uid") && amplify.store("email")){
                              //  preload_properties();
                                $scope.dwninv = false;
                                $scope.cnfpay = true;
                                amplify.store("visit_dateTime", items["item"]["visit_date"]);
                                var info_visit_date = amplify.store("visit_dateTime");
                                var myarray = [];
                                for (var i in info_visit_date) {
                                    $scope.values["date_" + i] = info_visit_date[i]["date"];
                                    $scope.values["time_" + i] = info_visit_date[i]["time"];
                                    myarray.push(i);

                                }
                                var new_data1 = {"value":myarray};
                                main_serv.multiIds(new_data1).success(function(data_ide){
                                    if(data_ide["data"] == "1"){
                                        amplify.store("visit_property",data_ide["prop"]);
                                        $scope.visit_list = amplify.store("visit_property");                                
                                        $scope.p = $scope.visit_list[0];
                                        if ($scope.p) {
                                            $scope.selectedcard = $scope.p['service_id'];
                                            $scope.prosel = [];
                                            $scope.prosel[$scope.p['service_id']] = true;
                                        }
                                        if ($location.path() != "/property/confirm-property") {
                                            location.href = "/property/confirm-property";
                                        }
                                    }                                                       
                                });                               
                            }
                            else{
                                $scope.auth0_login("/property/confirm-property");
                            }
                        } else if (items["status"] > 2) {
                           // preload_properties();
                            $scope.vcheck={};
                                var new_data1 = {"value":items["item"]["visit"]};
                                main_serv.multiIds(new_data1).success(function(data_ide){
                                    if(data_ide["data"] == "1"){
                                        amplify.store("visit_property",data_ide["prop"]);
                                        $scope.visit_list = amplify.store("visit_property");
                                        for(var i in $scope.visit_list){
                                            $scope.vcheck['che_' + $scope.visit_list[i]["service_id"]]=true;
                                        }
                                    }
                                });
                                var new_data2 = {"value":items["item"]["wish"]};
                                main_serv.multiIds(new_data2).success(function(data_ide){
                                    if(data_ide["data"] == "1"){
                                        amplify.store("wish_property",data_ide["prop"]);
                                        $scope.wish_list = amplify.store("wish_property");
                                        calcualteWishlist(); 
                                    }
                                }); 
                            if (items["status"] == 4) {
                               // console.log(item);
                                if(amplify.store("uid") && amplify.store("email")){
                                    amplify.store("original_date", items["item"]["original_date"]);
                                    amplify.store("visit_dateTime", items["item"]["visit_date"]);
                                    console.log(amplify.store("visit_dateTime"));
                                    var info_visit_original = amplify.store("original_date");
                                    var info_visit_date = amplify.store("visit_dateTime");
                                    if (Object.keys(info_visit_date).length > 0) {
                                        for (var i in info_visit_original) {
                                            $scope.values["date_" + i] = info_visit_original[i]["date"];
                                            $scope.values["time_" + i] = info_visit_original[i]["time"];
                                        }
                                    }                             
                                }
                                else{
                                    $scope.auth0_login("/property/schedule-visit");
                                }

                              //  if($location.path() != "/property/schedule-visit"){
                              //   location.href = "/property/schedule-visit";
                              // }                            
                            }
                            else if(items["status"] == 3){
                                if($location.path().indexOf("/property/search/")<0){
                                    location.href = "/property/search/"+$scope.searchCity+"/"+$scope.multipleDemo.inputareas;
                                }
                            }
                        } else if (items["status"] > 1) {
                         //   preload_properties();
                            var new_data2 = {"value":items["item"]["wish"]};
                            main_serv.multiIds(new_data2).success(function(data_ide){
                                if(data_ide["data"] == "1"){
                                    amplify.store("wish_property",data_ide["prop"]);
                                    $scope.wish_list = amplify.store("wish_property");
                                    calcualteWishlist();
                                }
                            }); 
                            if($location.path().indexOf("/property/search/")<0){
                                location.href = "/property/search/"+$scope.searchCity+"/"+$scope.multipleDemo.inputareas;
                            }
                        } else if (items["status"] == 1) {
                          //  preload_properties();
                        }

                    } else {
                      //  preload_properties();
                    }
                    
                });
            }
            else{
               // preload_properties();
            }
           
        }
     amplify.store("search_count", 1);   
    }
    $scope.getinCircle = function(){  
        var amplify_data = amplify.store("total_properties");
        g_data = amplify_data["property"];
        var temp_prop = [];      
        for(var i in g_data){
            var loc1 = new google.maps.LatLng(g_data[i]["lat"], g_data[i]["lon"]);
            var loc2 = new google.maps.LatLng(center_lat, center_lon);
            console.log(google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2));
            var distance_from_center = (google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2) / 1000).toFixed(2);
            if(distance_from_center < range/1000){
                temp_prop.push(g_data[i]);
            }
        }
        g_data = temp_prop;
        $scope.p_data = temp_prop;
        applyfilters(filter_array);

    }
    if($location.path().indexOf('property/search') > -1){
        var url=$location.path();
        var fields = url.split('/');
        console.log(fields);
        if(fields[7].indexOf("Bachelor")>-1){
            fields[7]=fields[7].replace("Bachelor","Single (Men)");
            console.log(fields[7])
        }    
        var fuarray = fields[6].split('-');
        console.log(fuarray);    
       var fielvalue = [];
       for(var i in  fuarray){
        //alert(i);
            if(fuarray[i] == 'Furnished'){
                 fielvalue.push('furnished');
            }
            if(fuarray[i] == 'NotFurnished'){
                 fielvalue.push('n_furnished');
            }
            if(fuarray[i] == 'SemiFurnished'){
                 fielvalue.push('s_furnished');
            }
       }
        // if(fields[6].indexOf("Furnished")>-1){
        //   //  alert(fields[6]);
        //    // fields[6]=fields[6].replace("Furnished","furnished");
        //    fielvalue.push('furnished');
        //   //alert(fields[6]);
        // }
        // if(fields[6].indexOf("NotFurnished")>-1){
        //   //  fields[6]=fields[6].replace("NotFurnished","n_furnished");
        //    fielvalue.push('n_furnished');
        // }
        // if(fields[6].indexOf("SemiFurnished")>-1){
        //  //   fields[6]=fields[6].replace("SemiFurnished","s_furnished");
        //    fielvalue.push('s_furnished');
        //   // alert(fields[6]);
        // }
        // fielvalue = fielvalue.toString();
        // fielvalue=fielvalue.replace(/,/g,'-');
        console.log(fielvalue);
        place_id = fields[8];
        var address = fields[3].split('-');
        range = address[0]*1000;
        var area = address[1];
        var city = address[2];
        var temp_bhk = fields[4].split('-');
        var bhk = [];
        for(var i in temp_bhk){
            var parts = temp_bhk[i].match(/[a-z]+|[^a-z]+/gi);
            var t_bhk = parts[0]+" "+parts[1];
            bhk.push(t_bhk);
        }
        console.log(bhk);
        // var parts = bhk1.split(/[^0-9a-zA-Z]+/g);
        // var bhk = parts[0]+" "+parts[1];
        // console.log(bhk);
        var budget = fields[5].split('-');
        var furnishing = fielvalue;
        console.log(furnishing);
        var rent_to = fields[7].split('-');        
        filter_array["configuration"] = bhk;
        filter_array["rent_to"] = rent_to;
        filter_array["budget"] = budget;
        filter_array["fur"] = furnishing;
        console.log(range);
        $('#rrange').text(range/1000);
        $('.radrange').text(range/1000);
        $scope.rangeModel=range/1000;
        $scope.budstart=budget[0];
        $scope.budend=budget[1];
        $('#side1').text(budget[0]);
        $('.sliderval11').text(budget[0]);
        $('#side2').text(budget[1]);
        $('.sliderval22').text(budget[1]);
        
        angular.forEach(filter_array, function(filter_values, filter_key) {
            $scope.model_filter[filter_key] = {};
            angular.forEach(filter_values, function(filter_value, key) {
                $scope.model_filter[filter_key][filter_value] = true;
            });
        });
        console.log(filter_array);
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'placeId': place_id}, function(results, status){
          if (status === 'OK') {
            if (results[0]) {
                var position = results[0].formatted_address;
                $scope.multipleDemo.inputareas = position;
                //query_area = position;
                center_lat = results[0].geometry.location.lat();
                center_lon = results[0].geometry.location.lng();
                $scope.map.center = {latitude: center_lat,
                        longitude: center_lon};
                $scope.map.zoom = 14;
                $scope.map.circle = {
                    center: $scope.map.center,
                    radius: range,
                    stroke: {
                        color: '#aecbf9',
                        weight: 2,
                        opacity: 1
                    },
                    fill: {
                        color: '#aecbf9 ',
                        opacity: 0.3
                    },
                };
                var bounds = results[0].geometry.viewport; 
                var bound_data = {};
                var bound_data = {"ne":{"lat":bounds.getNorthEast().lat(),"lng":bounds.getNorthEast().lng()},
                               "sw":{"lat":bounds.getSouthWest().lat(),"lng":bounds.getSouthWest().lng()}
                              };
                serv.getlatlon(bound_data).success(function(latinfo){
                    console.log(latinfo);
                    if(latinfo["data"]=="1"){
                        g_data = latinfo["item"];
                        $scope.p_data = g_data;
                        $scope.vacount = g_data.length;
                        if($scope.vacount == 0){
                            if(amplify.store("email")){
                                $scope.model.q_email = amplify.store("email");
                            }
                            if(amplify.store("name")){
                                $scope.model.q_name = amplify.store("name");
                            }
                            if(amplify.store("phone")){
                                if(typeof(amplify.store("phone")) == "string"){
                                    $scope.model.phone = parseInt(amplify.store("phone"));                                
                                }
                                else{
                                    $scope.model.phone = amplify.store("phone"); 
                                }
                               // $scope.model.phone = parseInt(number.slice(3));
                            }
                            $scope.model.q_city = "Hyderabad";
                            $scope.model.q_area = $scope.multipleDemo.inputareas;
                            
                            $("#resfreshModal").modal("show");                         
                        }
                        else{                            
                            var j_data = { "filter": filter_array, "property": latinfo["item"]};
                            amplify.store("total_properties",j_data);
                            $scope.getinCircle();
                        }
                        init();
                    }
                });
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
    }
    else{
        init();
    }

   
    var southWest = new google.maps.LatLng( 17.158714685480376, 78.09278986269533 );
    var northEast = new google.maps.LatLng( 17.74824117801626, 78.96620294863283 );
    var hyderabadBounds = new google.maps.LatLngBounds( southWest, northEast );
    var options = {   
       bounds: hyderabadBounds,
       strictBounds: true,
       types: ['geocode'],
       componentRestrictions: {country: 'IN'}
      // componentRestrictions: {locality: "Hyderabad"}
    };
    var input = document.getElementById('local');
    var autocomplete = new google.maps.places.Autocomplete(input,options);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace(); 
        place_id = place.place_id;
        location.href = "/property/search/"+(range/1000)+"-"+place.name+"-"+city+"/"+fields[4]+"/"+fields[5]+"/"+fields[6]+"/"+fields[7]+"/"+place_id;    
      //  var place_bound = autocomplete.getBounds();                  
    });      
    
    $scope.passRangeHere = function(){
        alert("pass here");
    } 
    
    var load_markers = function() {
        p_markers = [];
        var icon_img;
        var cnt = 0;
        for (i in $scope.p_data) {
            if ($scope["favicon_" + $scope.p_data[i]["service_id"]]) {
                icon_img = 'assets/img/markers/home.png';
            } else {
                cnt++;
                icon_img = 'assets/img/markers/wish_home.PNG';
            }
            p_markers.push({
                id: $scope.p_data[i]["service_id"],
                data: $scope.p_data[i],
                latitude: $scope.p_data[i]["lat"],
                longitude: $scope.p_data[i]["lon"],
                icon: icon_img
            });
        }
        $scope.map.markers = p_markers;
        all_markers = p_markers;
    }
    var calculateFilters = function(){
        var list_filter = 0;
        if(filter_array && filter_array != {}){
            angular.forEach(filter_array, function(value, key){
                if(value.length > 0){
                    $scope[key] = "("+value.length+")";
                     list_filter ++;  
                }
                else{
                    $scope[key] = "";
                }              
            });
            if(list_filter>0){
                $scope.list_filter_string = "("+list_filter+")";  
            }
            else{
                $scope.list_filter_string = "";
            }
        }
        else{
            $scope["configuration"] = "";
            $scope["rent_to"] = "";
            $scope["fur"] = "";
        }
    }
    $scope.furstatedata = {};
    var applyfilters = function(filters_) {   
        calculateFilters();     
        var temp2 = [];
        $scope.m_data = angular.copy(g_data);
        angular.forEach($scope.m_data, function(value1, key1) {
            value1['shortgray'] = true;
            console.log(value1['shortgray']);
            $scope["favicon_" + value1["service_id"]] = true;
            console.log(value1["service_id"]);
            var flag_g = false;
            var flag_count = 0;
            angular.forEach(filters_, function(value2, key2) {
                var flag1=false;
                var flag2=false;
                if(key2 == "budget"){
                   //  flag = false;
                    if (parseInt(value1["m_rent"]) >= parseInt(value2[0]) && parseInt(value1["m_rent"]) <= parseInt(value2[1])){
                        flag1 = true;
                        flag_count++;
                    }
                }
                else if(key2 != "budget" && value2.length > 0) {
                    angular.forEach(value2, function(value3, key3) {
                     //   $scope.model_filter[key2][value3] = true;
                        if (value1[key2] == value3) {
                            flag2 = true;
                        }
                    });
                }
                else{
                    flag2 = true;
                }
                if(flag2 == true){
                    flag_count++;                    
                }
                // if (flag1 == false && flag2 == false){
                //     flag_g = false;
                // }
                // else
                // {
                //     flag_g=true;
                // }
            });
            if (flag_count == Object.keys(filters_).length){
                temp2.push(value1);
            }
        });
        $scope.p_data = temp2;
        console.log($scope.p_data);
        //$scope.p_data1 = [];
        var furstatedata1=$scope.p_data;
        console.log(furstatedata1);
        for(var i  in furstatedata1){
            if(furstatedata1[i]['fur']){
                if(furstatedata1[i]['fur'] == 'furnished'){
                    $scope.p_data[i]['fur1'] = 'Furnished';
                }
                if(furstatedata1[i]['fur'] == 's_furnished' || furstatedata1[i]['fur'] == 'Semi furnished'){
                    $scope.p_data[i]['fur1'] = 'Semi Furnished';
                }
                if(furstatedata1[i]['fur'] == 'n_furnished' || furstatedata1[i]['fur'] == 'Not furnished'){
                    $scope.p_data[i]['fur1'] = 'Not Furnished';
                }
            }
        }
        console.log($scope.p_data);

        $scope.vacount = $scope.p_data.length; 
        // var j_data = amplify.store("total_properties");
        // console.log(j_data);
        // j_data["filter"]= filters_;
        // amplify.store("total_properties", j_data);
        calcualteWishlist();
        load_markers();              
    }
    // var preload_properties = function(){
    //     info = amplify.store('total_properties');
    //     if (info) {
    //         if (info["property"]) {
    //             var temp_p_data = [];
    //             var s_area=$scope.multipleDemo.inputareas;
    //             if(info['property'][s_area]) {
    //                 for (var j in info['property'][s_area]) {
    //                     $scope["favicon_" + info['property'][s_area][j]["_id"]] = true;
    //                     info['property'][s_area][j]['shortgray'] = true;
    //                     temp_p_data.push(info['property'][s_area][j]);
    //                 }   
    //                 g_data = temp_p_data;
    //                 $scope.p_data = g_data;
    //                 load_markers();
    //                 $scope.vacount = $scope.p_data.length;
    //                 if($scope.vacount == 0){
    //                     if(amplify.store("email")){
    //                         $scope.model.q_email = amplify.store("email");
    //                     }
    //                     if(amplify.store("name")){
    //                         $scope.model.q_name = amplify.store("name");
    //                     }
    //                     if(amplify.store("phone")){
    //                         if(typeof(amplify.store("phone")) == "string"){
    //                             $scope.model.phone = parseInt(amplify.store("phone"));                                
    //                         }
    //                         else{
    //                             $scope.model.phone = amplify.store("phone"); 
    //                         }
    //                        // $scope.model.phone = parseInt(number.slice(3));
    //                     }
    //                     $scope.model.q_city = "Hyderabad";
    //                     $scope.model.q_area = $scope.multipleDemo.inputareas;
    //                     $("#resfreshModal").modal("show"); 
    //                 }
    //             }
    //             else{
    //                 main_serv.getProp(s_area, city).success(function(info2){
    //                     if (info2.length>0) {
    //                         for(var i in info2){
    //                             info2[i]['shortgray'] = true;
    //                             temp_p_data.push(info2[i]);
    //                         }
    //                         g_data = temp_p_data;
    //                         $scope.p_data = g_data;
    //                         load_markers();
    //                         $scope.vacount = $scope.p_data.length;
    //                         if($scope.vacount == 0){
    //                             if(amplify.store("email")){
    //                                 $scope.model.q_email = amplify.store("email");
    //                             }
    //                             if(amplify.store("name")){
    //                                 $scope.model.q_name = amplify.store("name");
    //                             }
    //                             if(amplify.store("phone")){
    //                                 $scope.model.phone = parseInt(amplify.store("phone").slice(3));
    //                             }
    //                             $scope.model.q_city = "Hyderabad";
    //                             $scope.model.q_area = $scope.multipleDemo.inputareas;
    //                             $("#resfreshModal").modal("show");  
    //                             //  main_serv.getArea("hyd").success(function(data2) {
    //                             //     for (var i in data2) {
    //                             //         $scope.city_areas3[i] = { "id": i, "value": data2[i] };
    //                             //     }
    //                             //     //if($scope.vacount ==0){
    //                             //         $scope.model.q_area = $scope.multipleDemo.inputareas;
    //                             //                       
    //                             //     //}
    //                             // });
    //                         }
    //                     }
    //                 });
    //             }
                
    //         }
    //         if (info["filter"]) {
    //             filter_array = info['filter'];
    //             angular.forEach(filter_array, function(filter_values, filter_key) {
    //                 $scope.model_filter[filter_key] = {};
    //                 angular.forEach(filter_values, function(filter_value, key) {
    //                     $scope.model_filter[filter_key][filter_value] = true;
    //                 });
    //             });
    //             applyfilters(filter_array);
    //         }
    //     }
    // }
    var calcualteWishlist =function(){
        var wish_num = amplify.store('wish_property');
        console.log(wish_num);
        if (wish_num != null) {
            var wnum1 = wish_num.length;
            if (wnum1 < 1) {
                $scope.favgray = true;
                $scope.favyell = false;
                $scope.wnum = '';
            } else {
                $scope.favgray = false;
                $scope.favyell = true;
                $scope.isActive1 = function(item) {
                    return $scope.selected === item;
                };
                $scope.selected = 0;
                $scope.isActive1();
                $scope.wnum = "(" + wnum1 + ")";
            }
            for (var i in wish_num) {
                wish_num[i]['shortgray'] = false;
                $scope["favicon_" + wish_num[i].service_id] = false;
            }
        }
        var v_selected = amplify.store('visit_property');
        if (v_selected != null) {
            for (var i in v_selected) {
                $scope.vcheck['che_' + v_selected[i]['service_id']] = true;
            }
        }
    }
    //init();
    $scope.refresh_page = function() {
         var r_info = amplify.store('total_properties');
         r_info["filter"] = {};
         $scope["configuration"] = "";
         $scope["rent_to"] = "";
         amplify.store('total_properties',r_info);
         $scope.model_filter = {};
         init();
    }
    $scope.onRemoveCallback = function(item) {
        var temp = amplify.store("total_properties");
        if (temp['property'][item]) {
            delete temp['property'][item];
            amplify.store("total_properties", temp);
            amplify.store("selected_area", $scope.multipleDemo.inputareas)
            init();
        }
    }
    $scope.onSelectCallback = function(item) {
        $scope.reqparea = item;
        amplify.store("selected_area", $scope.multipleDemo.inputareas);
        temp = amplify.store("total_properties");
        if (temp && temp['property']) {
            if (!temp['property'][item]) {
                main_serv.getProp(item, city).success(function(info2) {
                    if (info2.length == 0) {
                        $('#emptyprop').modal('show');
                    }
                    var temp_prop = [];
                    for(var i in info2){
                        var loc1 = new google.maps.LatLng(info2[i]["lat"], info2[i]["lon"]);
                        var loc2 = new google.maps.LatLng(center_lat, center_lon);
                        var distance_from_center = (google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2) / 1000).toFixed(2);
                        if(distance_from_center < range/1000){
                            temp_prop.push(info2[i]);
                        }
                    }                    
                    temp['property'][item] = temp_prop;
                    console.log(temp_prop); 
                    var t_data = { "filter": filter_array, "property": temp['property'] };
                    amplify.store("total_properties", t_data);
                    var area_temp = [];
                    area_temp.push($scope.multipleDemo.inputareas);
                    var jdata = {'filter': filter_array, 'area': area_temp};
                    if(amplify.store("uid") && amplify.store("email")){
                        serv.preselect(jdata).success(function(data) {
                            if (data.data == "0") {
                            } else if (data.data == "1") {
                               //init();
                               location.href = "/property/search/"+$scope.searchCity+"/"+$scope.multipleDemo.inputareas;
                            }
                        });    
                    }
                    else{
                        init();
                       // location.href = "/property/search/"+$scope.searchCity+"/"+$scope.multipleDemo.inputareas;
                    }
                });
            } else {
                main_serv.getProp(item, city).success(function(info2) {
                    var temp_prop = [];
                    for(var i in info2){
                        var loc1 = new google.maps.LatLng(info2[i]["lat"], info2[i]["lon"]);
                        var loc2 = new google.maps.LatLng(center_lat, center_lon);
                        var distance_from_center = (google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2) / 1000).toFixed(2);
                        if(distance_from_center < range/1000){
                            temp_prop.push(info2[i]);
                        }
                    }                    
                    temp['property'][item] = temp_prop;
                    console.log(temp_prop); 

                   // temp['property'][item] = info2;
                    var t_data = { "filter": filter_array, "property": temp['property'] };
                    amplify.store("total_properties", t_data);
                    var area_temp = [];
                    area_temp.push($scope.multipleDemo.inputareas);
                    var jdata = { 'filter': filter_array, 'area': area_temp };
                    if(amplify.store("uid") && amplify.store("email")){
                                serv.preselect(jdata).success(function(data) {
                                    if (data.data == "0") {
                                    } else if (data.data == "1") {
                                       //init();
                                       location.href = "/property/search/"+$scope.searchCity+"/"+$scope.multipleDemo.inputareas;
                                    }
                                });   
                    }
                    else{
                        init();
                      //  location.href = "/property/search/"+$scope.searchCity+"/"+$scope.multipleDemo.inputareas;
                    }
                });
            }
        } else {
            temp = {};
            temp['property'] = {};
            main_serv.getProp(item, city).success(function(info2) {
                temp['property'][item] = info2;
                var t_data = { "filter": filter_array, "property": temp['property'] };
                amplify.store("total_properties", t_data);
                var area_temp = [];
                area_temp.push($scope.multipleDemo.inputareas);
                var jdata = { 'filter': filter_array, 'area': area_temp };
                if(amplify.store("uid") && amplify.store("email")){
                    serv.preselect(jdata).success(function(data) {
                        if (data.data == "0") {
                        } else if (data.data == "1") {
                           //init();
                           location.href = "/property/search/"+$scope.searchCity+"/"+$scope.multipleDemo.inputareas;
                        }
                    });   
                }
                else{
                    //init();
                   // location.href = "/property/search/"+$scope.searchCity+"/"+$scope.multipleDemo.inputareas;
                }
            });
        }       

    }
    var new_p;
    if ($scope.p_data) {
        if ($scope.p_data.length == 0) {
            $('#emptyprop').modal('show');
        }
    }

   var propidind={};
    $scope.new_prop = function(prop) {
        $scope.new_data = prop;
        console.log($scope.new_data);
        var propidind= {"propid": prop['property']['_id'], "index_no": $scope.new_data['index_no']};
        //amplify.store("prop_id", propidind);
        console.log(propidind);
       $window.open("/search/available-for-"+prop['property']['rent_to']+"-"+prop['property']['configuration']+"-"+prop['property']['area']+"-"+prop['property']['city']+"-"+prop['property']['service_id']+"-"+$scope.new_data['index_no'], '_blank');
    }
    $scope.new_prop2 = function(prop_id, indexnum) {
        $scope.new_data = {};
        main_serv.getPropSid(prop_id).success(function(data) {
        var propidind= {"propid": prop_id};
        amplify.store("prop_id", propidind);    
         $window.open("/search/available-for-"+data['item']['rent_to']+"-"+data['item']['configuration']+"-"+data['item']['area']+"-"+data['item']['city']+"-"+data['item']['service_id']+"-"+indexnum, '_blank');
        })        
        
    }

    $scope.query_sub  =function(){
        var user_source = "";
        var currentdate = new Date();
        var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
        var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var datetime = date + " at " + time;
        if(amplify.store("utm_status") == true){
            user_source = "dm";
        }
        else{
            user_source = "organic";
        }
        //var j_data = {"name":$scope.model.q_name, "email":$scope.model.q_email,"phone":$scope.model.q_phone, "city":$scope.model.q_city["value"],"area":$scope.model.q_area["value"],"m_info":$scope.model.m_info,"datetime":datetime};
        var j_data = {"name":$scope.model.q_name, "email":$scope.model.q_email,"phone":$scope.model.q_phone, "city":"Hyderabad","area":$scope.model.q_area,"m_info":$scope.model.m_info,"source":user_source,"datetime":datetime};
        main_serv.sendProp1(j_data).success(function(data){
            $("#resfreshModal").modal("hide");
            if (data["data"] == '0') {
                $scope.rvisit = "There was some error. Please try again.";
                $("#rvisit").html($scope.rvisit);
            } else if (data["data"] == '1') {
                $scope.rvisit = "We got your query. We will get back to you soon.";
                $("#rvisit").html($scope.rvisit);
            }
            $("#req_visit").modal("show");
        });
    }

    var old_item;
    var old_img;
    $scope.pdetails = function(prop_id, item) {
        console.log(prop_id);
        if ($scope.selected == 0) {
            if (item != 0) {
                $scope.map.markers[0]["icon"] = 'assets/img/markers/home.png';
            }
        }
        if ($scope.selected == 1) {
            if (item != 0) {
                $scope.map.markers[0]["icon"] = 'assets/img/markers/wish_home.PNG';
            }
        }
        if (old_item) {
            console.log(old_item);
            $scope.map.markers[old_item]["icon"] = old_img;
        }
        for(var i in $scope.map.markers){
                if($scope.map.markers[i]['id'] == prop_id){
                    $scope.map.markers[i]["icon"] = 'assets/img/markers/pin.png';
                }
                else{                   
                    if ($scope["favicon_" + $scope.p_data[i]["service_id"]] == true) {
                            $scope.map.markers[i]["icon"] = 'assets/img/markers/home.png';
                        } else {
                            $scope.map.markers[i]["icon"] = 'assets/img/markers/wish_home.PNG';
                    }
                }
            }
        // old_img = $scope.map.markers[item]["icon"];        
        // old_item = item;
        main_serv.getPropSid(prop_id).success(function(data) {
            var property = data["item"];
            console.log($scope["favicon_" + property.service_id]);
            if ($scope["favicon_" + property.service_id]== true) {
                property['shortgray'] = true;
            }
            if ($scope["favicon_" + property.service_id] == false) {
                 property['shortgray'] = false;
            }
            $scope.s_prop = { "property": property, "index_no": item };
            console.log($scope.s_prop["property"]);
            $scope.furstatedata=$scope.s_prop;
            $scope.amn = [];
            for (var i in $scope.ammenities) {
                if ($scope.s_prop["property"][$scope.ammenities[i]['id']] == "check" || $scope.s_prop["property"][$scope.ammenities[i]['id']] == "true" || $scope.s_prop["property"][$scope.ammenities[i]['id']].match(/^[0-9()]+$/)) {
                    $scope.amn.push($scope.ammenities[i]);
                }
            }
            console.log($scope.s_prop);
            $scope.createItem();
        });
    }

    $scope.settings = {
        singular: 'Item',
        plural: 'Items',
        cmd: 'Add'
    };
    // defining template
    var formTpl = $aside({
        scope: $scope,
        templateUrl: 'assets/tpl/property/search/propertydiv.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-left'
    });
    // methods
    $scope.checkAll = function() {
        angular.forEach($scope.data, function(item) {
            item.selected = !item.selected;
        });
    };

    $scope.editItem = function(item) {
        if (item) {
            item.editing = true;
            $scope.item = item;
            $scope.settings.cmd = 'Edit';
            showForm();
        }
    };

    $scope.viewItem = function(item) {
        if (item) {
            item.editing = false;
            $scope.item = item;
            $scope.settings.cmd = 'View';
            showForm();
        }
    };

    $scope.createItem = function() {
        var item = {
            icon: PlaceholderTextService.createIcon(true),
            editing: true
        };
        $scope.item = item;
        $scope.settings.cmd = 'New';
        showForm();
    };

    $scope.saveItem = function() {
        if ($scope.settings.cmd == 'New') {
            $scope.data.push($scope.item);
        }
        hideForm();
    };

    $scope.remove = function(item) {
        if (confirm('Are you sure?')) {
            if (item) {
                $scope.data.splice($scope.data.indexOf(item), 1);
            } else {
                $scope.data = $scope.data.filter(
                    function(item) {
                        return !item.selected;
                    }
                );
                $scope.selectAll = false;
            }
        }
    };

    showForm = function() {
        angular.element('.tooltip').remove();
        formTpl.show();
    };

    hideForm = function() {
        formTpl.hide();
    };

    $scope.$on('$destroy', function() {
        hideForm();
    });

    $scope.settings1 = {
        singular: 'Item',
        plural: 'Items',
        cmd: 'Add'
    };
    $scope.selectedcardclose = function() {
        if ($scope.selected == 0) {
            load_markers();
        }
        if ($scope.selected == 1) {
            $scope.wish_lists();
        }
        $scope.selectcardlitest();
    }

    $scope.wishProp1 = function(obj, item) {
        wpdata = amplify.store('wish_property');
        var vdata = amplify.store('visit_property');
        if (wpdata == null || wpdata.length == 0) {
            wpdata = [];
            obj['shortgray'] = false;
            wpdata.push(obj);
            $scope.swnum = true;
            $scope.favgray = false;
            $scope.favyell = true;
            amplify.store('wish_property', wpdata);
          //  $scope.map.markers[item]["icon"] = 'assets/img/markers/wish_home.PNG';
            $scope["favicon_" + obj.service_id] = false;
            var wish_num = amplify.store('wish_property');
            var wnum1 = wish_num.length;
            $scope.wnum = "(" + wnum1 + ")";
            $scope.isActive1 = function(item) {
                return $scope.selected === item;
            };
            $scope.selected = 0;
            $scope.isActive1();
            if(amplify.store("uid") && amplify.store("email")){
                serv.addWish(obj["service_id"]).success(function(data) {
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
        } else {
            $scope.swnum = true;
            var wish_flag = false;
            for (var i = 0; i < wpdata.length; i++) {
                if (angular.equals(wpdata[i].service_id, obj.service_id)) {
                    wish_flag = true;
                    wpdata.splice(i, 1);
                    amplify.store('wish_property', wpdata);
                    $scope.wish_list = amplify.store('wish_property');
                    obj['shortgray'] = true;
                    // $scope.pdetails(obj['_id'], item);
                    $scope["favicon_" + obj.service_id] = true;
                 //   $scope.map.markers[item]["icon"] = 'assets/img/markers/home.png';
                    var wnum1 = $scope.wish_list.length;
                    if (wnum1 < 1) {
                        $scope.swnum = false;
                        $scope.favgray = true;
                        $scope.favyell = false;
                    } else {
                        $scope.favgray = false;
                        $scope.favyell = true;
                    }
                    $scope.wnum = "(" + wnum1 + ")";
                    return false;
                }
            }
            for (var i in vdata) {
                if (vdata[i]["service_id"] == obj["service_id"]) {
                    vdata.splice(i, 1);
                }
            }
            amplify.store('visit_property', vdata);
            if (wish_flag) {
                if(amplify.store("uid") && amplify.store("email")){
                    serv.removeWish(obj["service_id"]).success(function(data) {
                        if (data["data"] == "0") {
                        } else if (data["data"] = "1") {
                            console.log("data sent successfully");
                        }
                    });
                }
            } else {
                wpdata.push(obj);
                amplify.store('wish_property', wpdata);
                amplify.store('wish_property');
                obj['shortgray'] = false;
                $scope["favicon_" + obj.service_id] = false;
              //  $scope.map.markers[item]["icon"] = 'assets/img/markers/wish_home.PNG';
                if(amplify.store("uid") && amplify.store("email")){
                    serv.addWish(obj["service_id"]).success(function(data) {
                        if (data["data"]["data"] == "0") {
                            ////alert("Error");
                        } else if (data["data"]["data"] = "1") {
                            console.log("data sent successfully");
                        }
                    });
                }
            }
            var wish_num = amplify.store('wish_property');
            var wnum1 = wish_num.length;
            if (wnum1 == 0) {
                wnum1 = '';
            }
            $scope.wnum = "(" + wnum1 + ")";
            return true;
        }
    };

  $scope.wishProp = function(obj, item) {   
        wpdata = amplify.store('wish_property');
        var vdata = amplify.store('visit_property');
        if (wpdata == null || wpdata.length == 0) {
            wpdata = [];
            obj['shortgray'] = false;
            $scope.s_prop = { "property": obj};
            $scope["favicon_" + obj.service_id] = false;
            //$scope.pdetails(obj['_id'], item);
            wpdata.push(obj);
            $scope.swnum = true;
            $scope.favgray = false;
            $scope.favyell = true;
            amplify.store('wish_property', wpdata);
            console.log(amplify.store('wish_property'));            
            for(var i in $scope.map.markers){
               if($scope.map.markers[i].id == obj.service_id){
                    $scope.map.markers[i]["icon"] = 'assets/img/markers/wish_home.PNG';
               }
            }
            // $scope.map.markers[item]["icon"] = 'assets/img/markers/wish_home.PNG';
            for(var i in $scope.map.markers.id){
                console.log($scope.map.markers.id);
            }
            var wish_num = amplify.store('wish_property');
            var wnum1 = wish_num.length;
            $scope.wnum = "(" + wnum1 + ")";
            $scope.isActive1 = function(item) {
                return $scope.selected === item;
            };
            $scope.selected = 0;
            $scope.isActive1();
            if(amplify.store("uid") && amplify.store("email")){
                serv.addWish(obj["service_id"]).success(function(data) {
                    if (data["data"] == "0") {
                        ////alert("Error");
                    } else if (data["data"] = "1") {
                         console.log("data sent successfully");                      
                    }
                    $('#myTooltip').tooltip("show");
                    setTimeout(function () {
                    $('#myTooltip').tooltip('hide');
                    }, 5000);
                });
            }
        } else {
            $scope.swnum = true;
            var wish_flag = false;
            for (var i = 0; i < wpdata.length; i++) {
                if (angular.equals(wpdata[i].service_id, obj.service_id)) {
                    wish_flag = true;
                    wpdata.splice(i, 1);
                    amplify.store('wish_property', wpdata);
                    $scope.wish_list = amplify.store('wish_property');
                    obj['shortgray'] = true;
                    $scope.s_prop = { "property": obj};
                  //  $scope.pdetails(obj['_id'], item); //change
                    $scope["favicon_" + obj.service_id] = true;
                      for(var i in $scope.map.markers){
                           if($scope.map.markers[i].id == obj.service_id){
                                $scope.map.markers[i]["icon"] = 'assets/img/markers/pin.png';
                           }
                        }
                   // $scope.map.markers[item]["icon"] = 'assets/img/markers/home.png';
                    var wnum1 = $scope.wish_list.length;
                    if (wnum1 < 1) {
                        $scope.swnum = false;
                        $scope.favgray = true;
                        $scope.favyell = false;
                    } else {
                        $scope.favgray = false;
                        $scope.favyell = true;
                    }
                    $scope.wnum = "(" + wnum1 + ")";
                     return false;
                    //$scope.pdetails(obj['_id'], item);
                }
            }
            for (var i in vdata) {
                if (vdata[i]["service_id"] == obj["service_id"]) {
                    vdata.splice(i, 1);
                }
            }
            amplify.store('visit_property', vdata);
            console.log(wish_flag);
            if (wish_flag) {
                if(amplify.store("uid") && amplify.store("email")){
                    serv.removeWish(obj["service_id"]).success(function(data) {
                        if (data["data"] == "0") {
                            ////alert("Error");
                        } else if (data["data"] = "1") {
                            console.log("data sent successfully");
                        }
                    });
                }
            } else {
                console.log("next else");
                wpdata.push(obj);
                amplify.store('wish_property', wpdata);
                console.log(amplify.store('wish_property'));
                obj['shortgray'] = false;  
                $scope.s_prop = { "property": obj};              
             //   $scope.pdetails(obj['_id'], item);
                $scope["favicon_" + obj.service_id] = false;
                for(var i in $scope.map.markers){
                   if($scope.map.markers[i].id == obj.service_id){
                        $scope.map.markers[i]["icon"] = 'assets/img/markers/wish_home.PNG';
                   }
                }
                //$scope.map.markers[item]["icon"] = 'assets/img/markers/wish_home.PNG';
                if(amplify.store("uid") && amplify.store("email")){
                    serv.addWish(obj["service_id"]).success(function(data) {
                        if (data["data"]["data"] == "0") {
                            ////alert("Error");
                        } else if (data["data"]["data"] = "1") {
                            console.log("data sent successfully");
                        }
                    });
                }
            }
            var wish_num = amplify.store('wish_property');
            var wnum1 = wish_num.length;
            if (wnum1 == 0) {
                $scope.wnum = '';
            }
            $scope.wnum = "(" + wnum1 + ")";
            return true; 
        }
    };
    var calcualteWish = function(){
        var wish_num = amplify.store('wish_property');
        var wnum1 = wish_num.length;
        if (wnum1 == 0) {
            $scope.wnum = '';
        }
        $scope.wnum = "(" + wnum1 + ")";
    }
    $scope.addwish1 = function(project1, item) {
        var new_data;
        main_serv.getPropSid(project1["service_id"]).success(function(data) {
            var project = data["item"];
            wpdata = amplify.store('wish_property');
            if(wpdata == null || wpdata.length == 0){
                wpdata = [];                
                $scope.p_data[item].shortgray = false;
                // $("#favicon_" + project["_id"]).hide();
                // $("#newfavicon_" + project["_id"]).show();
                $scope["favicon_" + project["service_id"]] = false;
               // $scope.s_prop["property"]["shortgray"] = false;
                project["shortgray"] = false;
                wpdata.push(project);
                $scope.swnum = true;
                $scope.favgray = false;
                $scope.favyell = true;
                amplify.store('wish_property', wpdata);
                console.log(amplify.store('wish_property'));
                $(".favorites").html("");
                $scope.s_prop = { "property": $scope.p_data[item], "index_no": item };
                for(var i in $scope.map.markers){
                   if($scope.map.markers[i].id == project1['service_id']){
                        $scope.map.markers[i]["icon"] = 'assets/img/markers/wish_home.PNG';
                   }
                }
               // $scope.map.markers[item]["icon"] = 'assets/img/markers/wish_home.PNG';
                if(amplify.store("uid") && amplify.store("email")){
                    serv.addWish(project["service_id"]).success(function(data) {
                        if (data["data"] == "0") {
                            ////alert("Error");
                        } else if (data["data"] = "1") {
                             console.log("data sent successfully");                      
                        }
                        $('#myTooltip').tooltip("show");
                        setTimeout(function () {
                        $('#myTooltip').tooltip('hide');
                        }, 5000);
                    });
                }
            }
            else{
                if($scope.s_prop && $scope.s_prop.property.service_id == project.service_id && $scope.s_prop.property.shortgray == true){
                    var S_flag = true;
                }
                else{
                    var S_flag = false;
                }
                if($scope.p_data[item]["shortgray"] == true || S_flag == true){
                    $scope.p_data[item].shortgray = false;
                    // $("#favicon_"+project["_id"]).hide();
                    // $("#newfavicon_"+project["_id"]).show();
                    $scope.swnum = true;
                 //   $scope.s_prop["property"]["shortgray"] = false;
                    project["shortgray"] = false;
                    wpdata.push(project);
                    amplify.store('wish_property', wpdata);
                    amplify.store('wish_property');
                    console.log(amplify.store('wish_property'));
                    $scope["favicon_" + project.service_id] = false;
                    $scope.s_prop = { "property": $scope.p_data[item], "index_no": item };
                    for(var i in $scope.map.markers){
                       if($scope.map.markers[i].id == project1['service_id']){
                            $scope.map.markers[i]["icon"] = 'assets/img/markers/wish_home.PNG';
                       }
                    }
                   // $scope.map.markers[item]["icon"] = 'assets/img/markers/wish_home.PNG';
                    if(amplify.store("uid") && amplify.store("email")){
                        serv.addWish(project["service_id"]).success(function(data) {
                            if (data["data"]["data"] == "0") {
                                ////alert("Error");
                            } else if (data["data"]["data"] = "1") {
                                console.log("data sent successfully");
                            }
                        });
                    }
                }
            }
          //  $scope.pdetails(project['_id'],item);
            calcualteWish();
        });             
    }
    $scope.removewish = function(project, item) {
        var wpdata = amplify.store('wish_property')
        var vdata = amplify.store("visit_property");
        for (var i = wpdata.length - 1; i >= 0; i--) {

            if (wpdata[i].service_id == project) {
                wpdata.splice(i, 1);
            }
        }
        for (var i in vdata) {
            if (vdata[i]["service_id"] == project) {
                vdata.splice(i, 1);
            }
        }
        $scope.vcheck['che_' + project] = false;   
        $scope["favicon_" + project] = true;
        for(var i in $scope.map.markers){
           if($scope.map.markers[i].id == project){
                $scope.map.markers[i]["icon"] = 'assets/img/markers/home.png';
           }
        }
        if(!$scope.vall){
            $scope.map.markers.splice(item, 1);
        }
        
        //$scope.map.markers[item]["icon"] = 'assets/img/markers/home.png';
       
        amplify.store('visit_property', vdata);
        amplify.store('wish_property', wpdata);
        console.log(amplify.store('wish_property'));
        $scope.wish_list = amplify.store('wish_property');
        var wish_num = amplify.store('wish_property');
        var wnum1 = wish_num.length;
        if (wnum1 < 1) {
            $scope.wnum = '';
        } else {
            $scope.wnum = "(" + wnum1 + ")";
        }
     //   $scope.pdetails(project,item);
        if(amplify.store("uid") && amplify.store("email")){
            serv.removeWish(project).success(function(data) {
                if (data["data"] == "0") {
                    ////alert("Error");
                } else if (data["data"] = "1") {
                    ////console.log("data sent successfully");
                }
            });
        }
    }
    $scope.removevisit = function(project, item) {
        console.log(project);
        var vdata = amplify.store("visit_property");
        for (var i in vdata) {
            if (vdata[i]["service_id"] == project) {
                vdata.splice(i, 1);
            }
        }
        amplify.store('visit_property', vdata);
        if(amplify.store("uid") && amplify.store("email")){
            serv.removeVisit(project).success(function(data) {
                if (data["data"] == "0") {
                    ////alert("Error");
                } else if (data["data"] = "1") {
                    console.log("data sent successfully");
                    init();
                }
            });
        }
    }

    $scope.view_all = function() {
        $scope.flags = false;
        $scope.vall = true;
        load_markers();
        $scope.map.markers = all_markers;
    };
    $scope.wish_lists = function() {
        old_item = undefined;
        $scope.flags = true;
        $scope.vall = false;
        $scope.wish_list = amplify.store('wish_property');
        p_markers = [];
        for (i in $scope.wish_list) {
            p_markers.push({
                id: $scope.wish_list[i]["service_id"],
                data: $scope.wish_list[i],
                latitude: $scope.wish_list[i]["lat"],
                longitude: $scope.wish_list[i]["lon"],
                icon: 'assets/img/markers/wish_home.PNG'
            });
        }
        $scope.map.markers = p_markers;
        hideForm();
        setTimeout(function () {            
           $('#myrhouse').tooltip("show");
        }, 1000);
        setTimeout(function () {
             $('#myrhouse').tooltip('hide');
        }, 5000);
    };
    
    $scope.select = function(item) {
        $scope.selected = item;
        if (item == 0) {
            $scope.wish_list = amplify.store('wish_property');
            if ($scope.wish_list != null) {
                var wnum1 = $scope.wish_list.length;
                ////console.log($scope.wnum1);          
                if (wnum1 == 0) {
                    $scope.favgray = true;
                    $scope.favyell = false;
                } else {
                    $scope.favgray = false;
                    $scope.favyell = true;
                }
            }
        }
        if (item == 1) {
            $scope.favgray = true;
            $scope.favyell = false;
        }
    };
    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
    $scope.selected = 0;
    $scope.selectbtn = function(item) {
        $scope.selected = item;
    }
    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
    $scope.selectcard = function(item) {
        if (!$scope.dwninv) {
            $scope.selectedcard = item;
        }
    }
    $scope.isActive2 = function(item) {
        return $scope.selectedcard === item;
    };
    $scope.selectcardli = function(item) {
        $scope.selectedcardli1 = item;
    }
    $scope.isActive3 = function(item) {
        return $scope.selectedcardli1 === item;
    };

    // Update the selection when a checkbox is clicked.
    $scope.updateSelection = function($event, prop) {
        clearTimeout(stoptime);
        if (amplify.store('visit_property') == null) {
            var selected = [];
        } else {
            var selected = amplify.store('visit_property');
        }
        if ($scope.vcheck['che_' + prop['service_id']] == true) {
            if (selected.length >= 3) {
                $scope.vcheck['che_' + prop['service_id']] = false;
                $scope.rvisit = "Cannot add the property. Maximum 3 properties can be visited";
                $("#rvisit").html($scope.rvisit);
                $('#req_visit').modal('show');
                return false;
            } else {
                selected.push(prop);
                if(amplify.store("uid") && amplify.store("email")){
                    serv.addVisit(prop["service_id"]).success(function(data) {
                        if (data["data"] == "0") {
                            ////alert("Error");
                        } else if (data["data"] = "1") {
                            ////console.log("data sent successfully");
                        }
                    });
                }
            }
        }
        if ($scope.vcheck['che_' + prop['service_id']] == false) {
            selected.splice(selected.indexOf(prop), 1);
            if(amplify.store("uid") && amplify.store("email")){
                serv.removeVisit(prop["service_id"]).success(function(data) {
                    if (data["data"] == "0") {
                        ////alert("Error");
                    } else if (data["data"] = "1") {
                        ////console.log("data sent successfully");
                    }
                });
            }
        }
        amplify.store('visit_property', selected);
    };
    $scope.filter_bhk = function($event, arraylist, key) {
        $scope.flags = false;
        $scope.vall = true;
        $scope.select(0);
        console.log(arraylist);
        var checkbox = $event.target;
        var temp_array = [];
        if (key == "bhk") {
            if (filter_array["configuration"]) {
                var temp_array = filter_array["configuration"];
            }
            var action = (checkbox.checked ? 'add' : 'remove');
            if (action == 'add' & temp_array.indexOf(arraylist) == -1) temp_array.push(arraylist);
            if (action == 'remove' && temp_array.indexOf(arraylist) != -1) temp_array.splice(temp_array.indexOf(arraylist), 1);

            filter_array["configuration"] = temp_array;
        }
        if (key == 'furnishing') {
            if (filter_array["fur"]) {
                var temp_array = filter_array["fur"];
            }
            var action = (checkbox.checked ? 'add' : 'remove');
            if (action == 'add' & temp_array.indexOf(arraylist) == -1) temp_array.push(arraylist);
            if (action == 'remove' && temp_array.indexOf(arraylist) != -1) temp_array.splice(temp_array.indexOf(arraylist), 1);

            filter_array["fur"] = temp_array;
        } else if (key == 'rent') {
            if (filter_array["rent_to"]) {
                var temp_array = filter_array["rent_to"];
            }
            var action = (checkbox.checked ? 'add' : 'remove');
            if (action == 'add' & temp_array.indexOf(arraylist) == -1) temp_array.push(arraylist);
            if (action == 'remove' && temp_array.indexOf(arraylist) != -1) temp_array.splice(temp_array.indexOf(arraylist), 1);
            filter_array["rent_to"] = temp_array;
        }
        console.log(filter_array);
        console.log($scope.model_filter['configuration']);
        applyfilters(filter_array);
    };

     var thousand_to_k =function(num){
        var value = parseInt(num/1000)+'K';
        return value;
    }

    $scope.passValueHere = function(type) {
  //      console.log($scope.rangeModel);
        if(type == 'radius'){
            range = parseInt($('#rrange').text())*1000;
            $scope.map.circle.radius = range;
            $scope.getinCircle();            
        }
        else if(type == 'budget'){
            var f = $('#side1').text();
            var s = $('#side2').text();
            filter_array["budget"]=[f,s];
            console.log(filter_array);
            applyfilters(filter_array);
            var first_val = thousand_to_k(f);
            var sec_val = thousand_to_k(s);
            $scope.k_value = first_val+" - "+sec_val; 
        }
        
    }
    if($scope.budstart && $scope.budend){
            $scope.passValueHere('budget');
        }
    $scope.orderProperty = "";
    $scope.low_high = function(column) {
        $scope.orderProperty = "m_rent";
    };
    $scope.high_low = function(column) {
        $scope.orderProperty = "-m_rent";
    };
    $scope.rhousevisit = function() {

        $scope.visit_list = amplify.store('visit_property');
        amplify.store('selected_area', $scope.multipleDemo.inputareas)
        if ($scope.visit_list == null || $scope.visit_list.length == 0) {
            //alert("here1");
            $scope.rvisit = "You have not selected any property to visit. Please select atleast one property to proceed";
            $("#rvisit").html($scope.rvisit);
            $('#req_visit').modal('show');
        }
        //  else if ($scope.visit_list.length == 0) {
        //     $scope.rvisit = "Please select visit properties";
        //     $('#req_visit').modal('show');
        // }
        else {
           // alert("here2");
            if(amplify.store("uid") && amplify.store("email")){
                serv.reqVisit().success(function(data) {
                    console.log(data);
                    if (data["data"] == "0") {
                        alert("Error");
                    } else if (data["data"] == "1") {
                        console.log("data sent successfully");
                        $scope.visit_list = amplify.store('visit_property');
                        location.href = "/property/schedule-visit";
                    }
                });
            }
            else{
               $scope.auth0_login("/property/schedule-visit"); 
            }
        }
    }
    var getdate = function(datetime) {
        var date = "";
        var re1 = '((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Tues|Thur|Thurs|Sun|Mon|Tue|Wed|Thu|Fri|Sat))'; // Day Of Week 1
        var re2 = '(\\s+)'; // White Space 1
        var re3 = '((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Sept|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?))'; // Month 1
        var re4 = '(\\s+)'; // White Space 2
        var re5 = '(\\d+)'; // Integer Number 1
        var re6 = '(\\s+)'; // White Space 3
        var re7 = '((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3})))(?![\\d])'; // Year 1
        var re8 = '(\\s+)'; // White Space 4
        var re9 = '((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)'; // HourMinuteSec 1
        var re10 = '(\\s+)'; // White Space 5
        var re11 = '(GMT)'; // Word 1
        var re12 = '([-+]\\d+)'; // Integer Number 1
        var re13 = '(\\s+)'; // White Space 6
        var re14 = '(\\(.*\\))'; // Round Braces 1
        var p = new RegExp(re1 + re2 + re3 + re4 + re5 + re6 + re7 + re8 + re9 + re10 + re11 + re12 + re13 + re14, ["i"]);
        var m = p.exec(datetime);
        if (m != null) {
            var dayofweek1 = m[1];
            var ws1 = m[2];
            var month1 = m[3];
            var ws2 = m[4];
            var int1 = m[5];
            var ws3 = m[6];
            var year1 = m[7];
            var ws4 = m[8];
            var time1 = m[9];
            var ws5 = m[10];
            var word1 = m[11];
            var signed_int1 = m[12];
            var ws6 = m[13];
            var rbraces1 = m[14];
            //document.write("("+dayofweek1.replace(/</,"&lt;")+")"+"("+ws1.replace(/</,"&lt;")+")"+"("+month1.replace(/</,"&lt;")+")"+"("+ws2.replace(/</,"&lt;")+")"+"("+int1.replace(/</,"&lt;")+")"+"("+ws3.replace(/</,"&lt;")+")"+"("+year1.replace(/</,"&lt;")+")"+"("+ws4.replace(/</,"&lt;")+")"+"("+time1.replace(/</,"&lt;")+")"+"("+ws5.replace(/</,"&lt;")+")"+"("+word1.replace(/</,"&lt;")+")"+"("+signed_int1.replace(/</,"&lt;")+")"+"("+ws6.replace(/</,"&lt;")+")"+"("+rbraces1.replace(/</,"&lt;")+")"+"\n");
            date = month1.replace(/</, "&lt;") + "-" + int1.replace(/</, "&lt;") + "-" + year1.replace(/</, "&lt;");
        }
        return date;
    }
    var gettime = function(datetime) {
        var time = "";
        var re1 = '((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Tues|Thur|Thurs|Sun|Mon|Tue|Wed|Thu|Fri|Sat))'; // Day Of Week 1
        var re2 = '(\\s+)'; // White Space 1
        var re3 = '((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Sept|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?))'; // Month 1
        var re4 = '(\\s+)'; // White Space 2
        var re5 = '(\\d+)'; // Integer Number 1
        var re6 = '(\\s+)'; // White Space 3
        var re7 = '((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3})))(?![\\d])'; // Year 1
        var re8 = '(\\s+)'; // White Space 4
        var re9 = '((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)'; // HourMinuteSec 1
        var re10 = '(\\s+)'; // White Space 5
        var re11 = '(GMT)'; // Word 1
        var re12 = '([-+]\\d+)'; // Integer Number 1
        var re13 = '(\\s+)'; // White Space 6
        var re14 = '(\\(.*\\))'; // Round Braces 1
        var p = new RegExp(re1 + re2 + re3 + re4 + re5 + re6 + re7 + re8 + re9 + re10 + re11 + re12 + re13 + re14, ["i"]);
        var m = p.exec(datetime);
        if (m != null) {
            var dayofweek1 = m[1];
            var ws1 = m[2];
            var month1 = m[3];
            var ws2 = m[4];
            var int1 = m[5];
            var ws3 = m[6];
            var year1 = m[7];
            var ws4 = m[8];
            var time1 = m[9];
            var ws5 = m[10];
            var word1 = m[11];
            var signed_int1 = m[12];
            var ws6 = m[13];
            var rbraces1 = m[14];
            //document.write("("+dayofweek1.replace(/</,"&lt;")+")"+"("+ws1.replace(/</,"&lt;")+")"+"("+month1.replace(/</,"&lt;")+")"+"("+ws2.replace(/</,"&lt;")+")"+"("+int1.replace(/</,"&lt;")+")"+"("+ws3.replace(/</,"&lt;")+")"+"("+year1.replace(/</,"&lt;")+")"+"("+ws4.replace(/</,"&lt;")+")"+"("+time1.replace(/</,"&lt;")+")"+"("+ws5.replace(/</,"&lt;")+")"+"("+word1.replace(/</,"&lt;")+")"+"("+signed_int1.replace(/</,"&lt;")+")"+"("+ws6.replace(/</,"&lt;")+")"+"("+rbraces1.replace(/</,"&lt;")+")"+"\n");
            time = time1.replace(/</, "&lt;");
        }
        return time;
    }
    $scope.showTime = function(prop_id) {
        var dt_data = amplify.store("visit_dateTime");
        var original_time = $scope.values["time_" + prop_id];
        var v_time = gettime($scope.values["time_" + prop_id]);
        var j_data = { "time": v_time, "o_time": original_time, "prop_id": prop_id };
        serv.addTime(j_data).success(function(data) {
            if (data["data"] == "0") {
                ////alert("Error");
            } else if (data["data"] = "1") {
                console.log("data sent successfully");
                // if (dt_data["date"]) {node serv
                if (dt_data[prop_id]) {
                    dt_data[prop_id]["time"] = v_time;
                } else {
                    dt_data[prop_id] = {};
                    dt_data[prop_id]["time"] = v_time;
                }
                // } else {
                // dt_data["date"] = {};
                if (dt_data[prop_id]) {
                    dt_data[prop_id]["time"] = v_time;
                } else {
                    dt_data[prop_id] = {};
                    dt_data[prop_id]["time"] = v_time;
                }
                //    }
                amplify.store("visit_dateTime", dt_data);
            }
        });
    }

    $scope.showDate = function(prop_id) {
        var j_data = amplify.store("visit_dateTime");
        var original_date = $scope.values["date_" + prop_id];
        var v_date = getdate($scope.values["date_" + prop_id]);
        serv.addDate(prop_id, v_date, original_date).success(function(data) {
            if (data["data"] == "0") {
                ////alert("Error");
            } else if (data["data"] = "1") {
                console.log("data sent successfully");
                //  if (j_data["date"]) {
                if (j_data[prop_id]) {
                    j_data[prop_id]["date"] = v_date;
                } else {
                    j_data[prop_id] = {};
                    j_data[prop_id]["date"] = v_date;
                }

                //   } else {
                //j_data["date"] = {};
                if (j_data[prop_id]) {
                    j_data[prop_id]["date"] = v_date;
                } else {
                    j_data[prop_id] = {};
                    j_data[prop_id]["date"] = v_date;
                }
                //}
                amplify.store("visit_dateTime", j_data);
            }
        });
    }

    var prop;

    function return_pre_payment(res) {
        serv.prePay(res).success(function(data) {
            if (data["data"] == "1") {
                ////alert("Error");
            } else if (data["data"] = "0") {
                $scope.p = prop;
                var invoiceno= data["invoice_no"];
                var s_no= data["s_no"];
                 //location.href = "/invoice/"+invoiceno+"/"+s_no;
               $("#confirmpaymodal").modal({ backdrop: 'static', keyboard: false }).modal("show");
            }
        });
    }


    if (amplify.store('visit_property')) {
        $scope.visit_list = amplify.store('visit_property');
        $scope.cost = $scope.visit_list.length * 100;
    }

    $scope.values = {};
    $scope.confirmpay = function(a) {
        prop = a;
        $scope.visit_list = amplify.store('visit_property');
        amplify.store("temp_visit", $scope.visit_list);
        $scope.visit_timedate = amplify.store("visit_dateTime");
        if($scope.couponapplied==true){
            var amount = $scope.rvamount*100;
        }
        else{
            var amount = 20000;
        }
        var options = {
            "key": "rzp_live_S86zhLgjeRbDVe",
            "amount": amount, // 2000 paise = INR 20
            "name": "Flytta",
            "description": "House Visit Charges",
            "image": "/assets/img/logo_flytta.ico",
            "handler": return_pre_payment,
            "prefill": {
                "name": amplify.store("name"),
                "email": amplify.store("email"),
                "contact":amplify.store("phone")
            },
            "theme": {
                "color": "#232323"

            }
        };
        if ($scope.visit_list.length != Object.keys($scope.visit_timedate).length) {
            $scope.rvisit = "Please select date and time for all the properties.";
            $("#rvisit").html($scope.rvisit);
            $('#req_visit').modal('show');   
        }   
        else{
            var rzp1 = new Razorpay(options);
            rzp1.open();
        }
    }
    $scope.confirmpayonsite=function(prop){
        console.log(prop);        
        $scope.visit_list = amplify.store('visit_property');
        $scope.visit_timedate = amplify.store("visit_dateTime");
        if ($scope.visit_list.length != Object.keys($scope.visit_timedate).length) {
            $scope.rvisit = "Please select date and time for all the properties.";
            $("#rvisit").html($scope.rvisit);
            $('#req_visit').modal('show');   
        }   
        else{
        serv.prePayos().success(function(data) {
            console.log(data);
            if (data["data"] == "1") {
                $scope.p = prop;
                $('#payonsite').modal({backdrop: "static", keyboard: false }).modal('show');
                //$('#payonsite').modal('show'); 
                //location.href = "/property/confirm-property";
            } else if (data["data"] = "0") {
                ////alert("Error");
            }
        });
        }
    }
    $scope.rvamount=200;
    $scope.couponapplied=false;
    $scope.couponnotvalid=false;    
    $scope.couapld=true;
    $scope.couponapply=function(){ 
        $scope.rvamount=200;
        var couponid=$scope.couponcode;       
        serv.couponApply(couponid, $scope.rvamount).success(function(data) {
            if (data["data"] == "1") {
                $scope.couapld = false;
                $scope.couponnotvalid=false;
                $scope.couponapplied=true;
                $scope.rvamount=data["item"];
            }
            else{
                $scope.couponnotvalid=true;
                $scope.couponapplied=false;
            }
        });
    }
    $scope.couponapplyCp=function(paycpamount){ 
        //alert(paycpamount);
        $scope.cpamount=paycpamount;
        var couponid=$scope.couponcode;       
        serv.couponApply(couponid, $scope.cpamount).success(function(data) {
            if (data["data"] == "1") {
                $scope.couapld = false;
                $scope.couponnotvalid=false;
                $scope.couponapplied=true;
                $scope.cpamount=data["item"];
                $scope.Cpdescription=data["description"];
            }
            else{
                $scope.couponnotvalid=true;
                $scope.couponapplied=false;
            }
        });
    }
    if (amplify.store("temp_visit")) {
        $scope.visit_temp = amplify.store("temp_visit");
        $scope.visit_timedate = amplify.store("visit_dateTime");
        $scope.p = $scope.visit_temp[0];
        if ($scope.p) {
            $scope.selectedcard = $scope.p['service_id'];
            $scope.prosel = [];
            $scope.prosel[$scope.p['service_id']] = true;
        }
    }
    $scope.propdiv = function(selectedpro, num) {
        if (!$scope.dwninv) {
            $scope.num = num;
            $scope.p = selectedpro;
            console.log($scope.p);
        }
        $scope.prosel = [];
        $scope.prosel[num] = true;
    }

    var final_property;

    function return_property_payment(res) {
        ////alert(res.razorpay_payment_id);
        $scope.p = final_property;
        $scope.not_paid = false;
        serv.confirmPay(final_property["service_id"], res).success(function(data) {
            if (data["data"] == "1") {
                ////alert("Error");
            } else if (data["data"] = "0") {                
                $scope.invoiceno= data["invoice_no"];
                $scope.cnfpay = false;
                $scope.dwninv = true;
                $scope.selectedcard = item;
                for (var i in $scope.visit_list) {
                    if (i == item) {} else {
                        angular.element(document.querySelector("#d_" + i)).removeClass("card2");
                    }
                }
                console.log("data sent successfully");
                $("#confirmpaymodal1").modal({ backdrop: 'static', keyboard: false }).modal("show");
              //  location.href = "/property/confirm-property";
            }
        });
    }  

    $scope.confirm_pay = function(confirmed_pro, item) {
        final_property = confirmed_pro;        
        if($scope.couponapplied==true){
            var amount = $scope.cpamount * 100;
        }
        else{
            var amount = (parseInt(confirmed_pro['m_rent']) / 2) * 100;
        }
        //var amount = 
        // var amount = 100;
        ////alert(amount);
        var options = {
            "key": "rzp_live_S86zhLgjeRbDVe",
            "amount": amount, // 2000 paise = INR 20
            "name": "Flytta",
            "description": "House Rental Service Charge",
            "image": "/assets/img/logo_flytta.ico",
            "handler": return_property_payment,
            "prefill": {
                "name": amplify.store("name"),
                "email": amplify.store("email"),
                "contact":amplify.store("phone")
            },
            "theme": {
                "color": "#232323"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    $scope.backfrmsch = function() {     
    var bhkurl;
    var budurl;
    var fururl;
    var rtourl;
    if(amplify.store("uid") && amplify.store("email")){
                serv.show().success(function(items) {
                    if (items["data"] == "1") {                        
                    var sel_area = items['item']['area'];
                    sel_area = sel_area.toString();
                        console.log(items['item']);
                        if(items['item']['filter']['configuration']){
                            var temp_bhkurl=items['item']['filter']['configuration'];
                            temp_bhkurl = temp_bhkurl.toString();
                            temp_bhkurl=temp_bhkurl.replace(/,/g,'-');
                            bhkurl=temp_bhkurl.replace(/ /g,'');
                            console.log(temp_bhkurl);
                        }
                        else{
                            bhkurl='2BHK-3BHK-4BHK';
                        }
                        if(items['item']['filter']['budget']){
                            var temp_budurl=items['item']['filter']['budget'];
                            temp_budurl = temp_budurl.toString();
                            budurl=temp_budurl.replace(/,/g,'-');
                        }
                        else{
                            budurl ="10000-50000"
                        }
                        if(items['item']['filter']['fur']){
                            var temp_fururl=items['item']['filter']['fur'];
                            var temp_fururl1 = [];
                            for(var i in  temp_fururl){
                                if(temp_fururl[i] == 'furnished'){
                                     temp_fururl1.push('Furnished');
                                }
                                if(temp_fururl[i] == 'n_furnished'){
                                     temp_fururl1.push('NotFurnished');
                                }
                                if(temp_fururl[i] == 's_furnished'){
                                     temp_fururl1.push('SemiFurnished');
                                }
                           }
                            temp_fururl1 = temp_fururl1.toString();
                            fururl=temp_fururl1.replace(/,/g,'-');
                        }
                        else{
                            fururl='Furnished-SemiFurnished-NotFurnished';
                        }
                        if(items['item']['filter']['rent_to']){
                            var temp_rtourl=items['item']['filter']['rent_to'];
                                for(var i in  temp_rtourl){
                                    if(temp_rtourl[i] == 'Single (Men)'){
                                        temp_rtourl[i]=temp_rtourl[i].replace(/Single (Men)/g, 'Bachelor');
                                    }
                                }
                                console.log(temp_rtourl);
                            temp_rtourl = temp_rtourl.toString();
                            temp_rtourl=temp_rtourl.replace(/,/g,'-');
                            rtourl=temp_rtourl.replace(/ /g,'');                            
                        }
                        else{
                            rtourl='Family-Bachelor';
                        }

                        geocoder.geocode({'address': sel_area}, function(results, status) {
                          if (status === 'OK') {
                            var bounds = results[0].geometry.viewport; 
                            console.log(results[0]);
                            placeid=results[0].place_id;
                            console.log(placeid);
                          location.href =  "/property/search/2-"+sel_area+"-"+city+"/"+bhkurl+"/"+budurl+"/"+fururl+"/"+rtourl+"/"+placeid;
                        }
                      });
                    }
                })
         }
        
    }

    $scope.requestprop = function() {
        var rpname = $scope.reqpname;
        var rpemail = $scope.reqpemail;
        var rpphone = $scope.reqpphone;
        var rpcity = $scope.reqpcity;
        var rparea = $scope.reqparea;
        var rpreq = $scope.reqpqry;
        var datetime = new Date();

        var reqprop = {};
        reqprop = {
                "name": rpname,
                "email": rpemail,
                "phone": rpphone,
                "m_info": rpreq,
                "datetime": datetime,
                "city": rpcity,
                "area": rparea,
                "type": "Rental Property"
            },
        serv.reqProp(reqprop).success(function(data) {
            if (data["data"] == "0") {
                ////alert("Error");
            } else if (data["data"] = "1") {
                console.log("data sent successfully");
            }
        });
    }
    $scope.imgmodal=function(pdata){
        $scope.pimgdata=pdata;
        $("#imageModal1").modal("show");

    }
    $scope.acttab=0;
   $scope.selecttab=function(tabno){
       $scope.acttab=tabno;
   }
   // $scope.gobackfromsch=function(){
   //     window.history.back();
   // }
       $scope.gotoappntpage = function(invoiceno){        
              // location.href = "/invoice/"+invoiceno;
              location.href = "/property/confirm-property";
    }
    $scope.gotodipage=function(){
              location.href = "/invoice/"+invoiceno+"/"+s_no;

   }
   $scope.notfindprop = function(){
        location.href = "/request";
   }
   var preheightvapin;
   $scope.checkheightdiv = function(){
        var element = angular.element(document.querySelector('#vallprop')); 
        var heightvap = element[0].offsetHeight;
        var element = angular.element(document.querySelector('#vallpropin')); 
        var heightvapin = element[0].offsetHeight;
        // alert(heightvap);
        // alert(heightvapin);
        if(heightvapin != preheightvapin){
            if(heightvap >= heightvapin-40){
                preheightvapin=heightvapin;  
                stoptime = setTimeout(function() { 
                    $("#flux").modal({ backdrop: 'static', keyboard: false }).modal("show");
                }, 20000);              
                
            }
        }
   }
    $scope.model={};
    if(amplify.store("uid") && amplify.store("email")){
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'placeId': place_id}, function(results, status){
          if (status === 'OK') {
            if (results[0]) {
                var qarea = results[0].formatted_address;            
                $scope.model.q_name=amplify.store("name");
                console.log($scope.model.q_name);
                $scope.model.q_email=amplify.store("email");
                $scope.model.q_phone=amplify.store("phone");
                $scope.model.q_phone=parseInt($scope.model.q_phone);
                $scope.model.q_area=qarea;
          //  console.log(query_area);
            }
          }
        })
      }
   $scope.notfindproprp=function(){
        $("#flux").modal({ backdrop: 'static', keyboard: false }).modal("hide");
        $("#resfreshModal").modal("show");  
   }

}]);



