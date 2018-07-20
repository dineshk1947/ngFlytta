app.controller('homemainController', ['$scope','$rootScope','$aside', 'main_serv', 'serv', 'bootstrap3ElementModifier', 'localStorageService', '$location', 'mover_serv', '$window', function($scope,$rootScope,$aside, main_serv, serv, bootstrap3ElementModifier, localStorageService, $location, mover_serv, $window) {
    bootstrap3ElementModifier.enableValidationStateIcons(false);
    var userId = amplify.store("email");
    amplify.store("search_count",0); 
    var p_count = 0;
    $scope.button_text = "Search";
    $scope.check_area = [];
    $scope.d_value = true; //to disable the filters
    $scope.show_filters = false;
    $scope.inter = true;
    // $scope.r_areas = [{ "id": "156", value: "Gachibowli" }, { "id": "275", value: "Kondapur" }, { "id": "310", value: "Madhapur" }, { "id": "331", value: "Manikonda" }];
    $scope.r_areas = ["Gachibowli", "Kondapur", "Madhapur", "Manikonda"];
    var r_areasid = [{ "id": "ChIJ387edqKTyzsR4kSTb57nEiw", "value": "Gachibowli" }, { "id": "ChIJa6NJKMmTyzsR-hJVkDTADd4", "value": "Kondapur" }, { "id": "ChIJBbIB8liRyzsRG0GSd77nuxE", "value": "Madhapur" }, { "id": "ChIJ97MvUyKUyzsR8SouPdD6k8c", "value": "Manikonda" }];
    $scope.multipleDemo = {};
    $scope.multipleDemo.inputareas;
    $scope.house_show = true;
    $scope.mover_show = false;
    $scope.settlein_show = false;
    $scope.bhks = ['1 BHK', '2 BHK', '3 BHK', '4 BHK+'];
    $scope.rentto = ['Family', 'Bachelor-Male', 'Bachelor-Female'];
    $scope.notification = "";
    $rootScope.g_items;
    $scope.selected = 0;
    var city = "Hyderabad";
    var g_data ={};
    var temp = {};
    var filter_array = {};
    var temp_data;
    var temp_area = "";
    var mover_status;
    var landdata={};
    var place;
    var bound_data = {};
    var placeid;
    $scope.fildiv=false;
    $scope.radrange = 2;
    var bhkurl= "2BHK-3BHK-4BHK";
    var minbud=10000;
    var maxbud=50000;
    var fururl="Furnished-SemiFurnished-NotFurnished";
    var rtourl="Family-Bachelor";
    //pre-load
    $scope.selectbtn = function(item) {
        if (item == 0) {
            $scope.house_show = true;
            $scope.mover_show = false;
            $scope.settlein_show = false;
        } else if (item == 1) {
            $scope.mover_show = true;
            $scope.house_show = false;
            $scope.settlein_show = false;
            if (amplify.store("email") && amplify.store("uid")) {
                mover_serv.getValue().success(function(data) {
                    if (data["data"] == "1") {
                        mover_status = data["status"];
                        landdata = data["value"];
                        //mover_preload();
                    }
                });
            }
        } else if (item == 2) {
            $scope.settlein_show = true;
            $scope.mover_show = false;
            $scope.house_show = false;
            $scope.settle.name = amplify.store("name");
            $scope.settle.email = amplify.store("email");
            if(amplify.store("phone")){
                if(typeof(amplify.store("phone")) == "string"){
                    $scope.settle.phone = parseInt(amplify.store("phone"));                                
                }
                else{
                    $scope.settle.phone = amplify.store("phone"); 
                }
                //$scope.settle.phone = parseInt(amplify.store("phone").slice(3));
            }
        }
        $scope.selected = item;
    }
    if ($location.path() == "/home/home_property") {
        $scope.house_show = true;
        $scope.mover_show = false;
        $scope.settlein_show = false;
        $scope.selected = 0;
    } else if ($location.path() == "/home/home_mover") {
        $scope.mover_show = true;
        $scope.house_show = false;
        $scope.settlein_show = false;
        if (amplify.store("email") && amplify.store("uid")) {
            mover_serv.getValue().success(function(data) {
                if (data["data"] == "1") {
                    mover_status = data["status"];
                    landdata = data["value"];
                    //mover_preload();
                }
            });
        }
        $scope.selected = 1;
    } else if ($location.path() == "/home/home_settling") {
        $scope.settlein_show = true;
        $scope.mover_show = false;
        $scope.house_show = false;
        $scope.selected = 2;
    }
    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
    //overlay is not present
    // if (amplify.store("o_city") && amplify.store("o_city_val")) {
    //     $scope.mover = {};
    //     console.log(amplify.store("o_city") + amplify.store("o_city_val"));
    //     $scope.mover.city1 = { cvalue: amplify.store("o_city_val"), cname: amplify.store("o_city") };
    // }
    // main_serv.getArea('hyd').success(function(info){
    //     for(var i in info){
    //         $scope.areas[i] = {"id": i,"value":info[i]}; 
    //     }
    // });
//calculate number of property in an area after
    var calculatePropertyNumber = function(type,property_array){
        //console.log(property_array);
        // var property_array1 = [];
        // for(var i in property_array){
        //     if(property_array[i]['occupy_status'] == "0"){
        //         property_array1.push(property_array[i]);
        //     }
        // }
        //if(property_array != undefined){
        p_count = 0;
        if (type == 'remove') {
            p_count = 0;
            console.log(p_count);
        } else if (type == 'add') {
            p_count += property_array.length;
            // for (var i in $scope.p_data) {
            //     $scope.p_count += $scope.p_data[i].length;
            // }
        }
        var place = {};
        if (place.name || p_count) {
            //alert(p_count);
            $scope.d_value = false;
            if (p_count > 0) {
                $scope.fildiv=true;
                $scope.show_filters = true;
                $scope.button_text = "View " + p_count + "  Properties";
            }
            else{
              alert('divs');
                $scope.fildiv=true;
                $scope.show_filters = true;
                $scope.button_text = "View Properties";
            }
        } else {
            $scope.d_value = true;
            $scope.show_filters = false;
            $scope.button_text = "Search";
        }
        $('#btn-search').html($scope.button_text);
        $('#btn-search2').html($scope.button_text);
        console.log($scope.show_filters);
    //}
    }
    //city name as parameter
    $scope.onRemoveCallback = function(item) {
        console.log(item);
        if ($scope.p_data[item]) {
            delete $scope.p_data[item];
            delete g_data[item];
           // delete temp[item];
            //g_data = angular.copy($scope.p_data);
            $scope.button_text = "Search";
        }
        calculatePropertyNumber('remove');
        $scope.check_area['area_' + item] = false;
    }    
    // city name as parameter
    $scope.onSelectCallback = function(item) {
       // alert("Hi");
        // if(temp_area!=""){
        //     $scope.onRemoveCallback(temp_area);
        // }
        $scope.show_filters = true;
        $scope.check_area['area_' + item] = true;
        temp_area = item;
        if (!temp[item]) {         
            main_serv.getProp(item, city).success(function(info2){
                temp[item] = info2;
            //  console.log(temp);
                g_data = temp;
                $scope.p_data[item] = temp[item];
               // $scope.multipleDemo.inputareas = item;
               // p_count = angular.copy($scope.p_data[temp_area].length);
                calculatePropertyNumber('add',$scope.p_data[temp_area]);
            });
        }
        else{

          //    console.log(temp[item]);
            calculatePropertyNumber('add',temp[item]);
        }
        //console.log(temp);
    }    

    $scope.setSelectedArea = function(getarea) {
      //alert(getarea);
    if(getarea != null){
    var input = document.getElementById(getarea).value;
    console.log(input)
      //var autocomplete = new google.maps.places.Autocomplete(input,options);
    //  google.maps.event.addDomListener(window, 'load', function () {
    //     alert(getarea);
    //         var places = new google.maps.places.Autocomplete(document.getElementById(getarea));
    //         google.maps.event.addListener(places, 'place_changed', function () {
    //     var place = autocomplete.getPlace();                 
    //        var loca_name = place.name;                  
    //         placeid = place.place_id; 
    //         console.log(placeid);
    //   });
    // });
for (var i in $scope.r_areas) {
    console.log($scope.r_areas[i]);
    if ($scope.r_areas[i] != getarea) {
        $scope.check_area['area_' + $scope.r_areas[i]] = false;
    }
   
}
if($scope.check_area['area_' + getarea] == true){
    $scope.p_data = {};
    var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'address': getarea}, function(results, status) {
          if (status === 'OK') {
            var bounds = results[0].geometry.viewport; 
            console.log(results[0]);
            placeid=results[0].place_id;
            var bound_data = {};
            bound_data = {"ne":{"lat":bounds.getNorthEast().lat(),"lng":bounds.getNorthEast().lng()},
                           "sw":{"lat":bounds.getSouthWest().lat(),"lng":bounds.getSouthWest().lng()}};  
            console.log(bound_data);
            serv.getlatlon(bound_data).success(function(latlonProp){
                console.log(latlonProp);
                if(latlonProp["data"] == "1"){
                    temp[getarea] = latlonProp["item"];
                    g_data = temp;
                    $scope.p_data[getarea] = temp[getarea];
                    $scope.multipleDemo.inputareas = getarea;
                    $scope.fildiv=true;
                    $scope.vacount = latlonProp["item"].length;
                    console.log($scope.vacount); 
                p_count = angular.copy($scope.p_data[getarea].length);
                    $scope.onSelectCallback(getarea);
                   }
                else{
                    $scope.fildiv=true;
                    $scope.vacount = 0;
                    //calculatePropertyNumber('remove');
                   // $scope.onRemoveCallback(getarea);
                }
                //$scope.setSelectedArea(getarea);
               // calculatePropertyNumber('add',$scope.p_data[getarea]);
             });  
          }
        });
}
else{
//calculatePropertyNumber('remove');
    $scope.p_data[getarea] = [];
    delete $scope.multipleDemo.inputareas;
    $scope.fildiv=false;
    $scope.vacount = 0;
    $scope.onRemoveCallback(getarea);
}
}

      // place = autocomplete.getPlace();                 
      //      var loca_name = place.name;                  
      //       placeid = place.place_id;    

      // console.log(autocomplete);

        //  console.log($scope.check_area['area_' + getarea]);       
        // for(var i in r_areasid){
        //     if(r_areasid[i]['value']== getarea){
        //         placeid=r_areasid[i]['id'];
        //         console.log(placeid);
        //     }
        // }
        // for (var i in $scope.r_areas) {
        //     console.log($scope.r_areas[i]);
        //     if ($scope.r_areas[i] != getarea) {
        //         //alert('false');
        //         $scope.check_area['area_' + $scope.r_areas[i]] = false;
        //     }
        //     // else{
        //     //     $scope.check_area['area_' + $scope.r_areas[i]] = true;
        //     // }
        // }
        // if ($scope.check_area['area_' + getarea]) {
        //  //  alert('areatrue');
        //  $scope.fildiv=true;
        //    //$scope.vacount=1;
        //    $scope.multipleDemo.inputareas = getarea;
        //    // alert($scope.multipleDemo.inputareas);
        //     $scope.p_data = {};
        //   //  temp = {};
        //     $scope.onSelectCallback(getarea);

        // } else {
        //     $scope.fildiv=false;
        //    //$scope.vacount=0;
        //     //alert('areafalse');
        //     delete $scope.multipleDemo.inputareas;
        //     $scope.onRemoveCallback(getarea);
        // }
         
      //   console.log($scope.multipleDemo.inputareas);
        // $scope.mover_bhk1 = false;
        // $scope.mover_bhk2 = false;
        // $scope.mover_bhk3 = false;
        // $scope.mover_bhk4 = false;
    }

var getProperty = function(item1,bound_data){
    
    
    // alert(item1);
   // $scope.vacount = 1;
    console.log(bound_data);
    temp_area = item1;
    $scope.p_data = {};
    console.log(bound_data);
    serv.getlatlon(bound_data).success(function(latlonProp){
        console.log(latlonProp);
        if(latlonProp["data"] == "1"){
            temp[item1] = latlonProp["item"];
            g_data = temp;
            $scope.p_data[item1] = temp[item1];
            $scope.fildiv=true;
            $scope.vacount = latlonProp["item"].length;
            console.log($scope.vacount);             
            calculatePropertyNumber('add',$scope.p_data[item1]);
           }        
        if(latlonProp["data"] == "0"){        
            //delete $scope.multipleDemo.inputareas;
            //alert('Hi');
            $scope.show_filters = true;
            $scope.vacount = 0;
            p_count = 0;
            calculatePropertyNumber('remove'); 
        }

       // p_count = angular.copy($scope.p_data[item1].length);
     // $scope.setSelectedArea(item1);
    });  

}
var southWest = new google.maps.LatLng( 17.158714685480376, 78.09278986269533 );
var northEast = new google.maps.LatLng( 17.74824117801626, 78.96620294863283 );
var hyderabadBounds = new google.maps.LatLngBounds( southWest, northEast );    
var options = {
   bounds: hyderabadBounds,
   strictBounds: true,
   types: ['geocode'],
   componentRestrictions: {country: 'IN'}
};


var screenWidth = $window.innerWidth;
    if (screenWidth < 800){            
        var input = document.getElementById('localmbl');
    }
    else{
        var input = document.getElementById('local');
    }

    var autocomplete = new google.maps.places.Autocomplete(input,options);

    google.maps.event.addListener(autocomplete, 'place_changed', function (event) {
         console.log(autocomplete);
         
    

            //console.log($scope.fildiv);
        // if (event.keyCode === 13) { 
        //     event.preventDefault(); 
        // }else{
        //     setTimeout(function () {
        // $scope.$apply(function () {
        //     console.log($scope.vacount);
        // });
        // }, 2000);
        // }
           // console.log('Hi');
            place = autocomplete.getPlace();                 
           var loca_name = place.name;                  
            placeid = place.place_id;                       
         console.log(loca_name);
                            $scope.check_area['area_' + loca_name] = true;
                           // $scope.multipleDemo.inputareas=loca_name;
                            var bounds = place.geometry.viewport; 
                            var bound_data = {};
                            bound_data = {"ne":{"lat":bounds.getNorthEast().lat(),"lng":bounds.getNorthEast().lng()},
                                           "sw":{"lat":bounds.getSouthWest().lat(),"lng":bounds.getSouthWest().lng()}};  
                                          // alert(loca_name);   
                            var areaarra = ["Gachibowli", "Kondapur", "Madhapur", "Manikonda"];           
                            for(i = 0; i < areaarra.length; i++){
                                if(areaarra[i] == loca_name){       
                                    if (document.getElementById(loca_name).checked == false){                              
                                        $('#'+areaarra[i]).trigger('click').prop('checked', true);
                                      }
                                    }                                
                                else{                                                 
                                    document.getElementById(areaarra[i]).checked=false;           
                                }
                            }                                

                           // if(loca_name)
                           $('#local').val(loca_name).trigger('input');
                                //document.getElementById('local').value=loca_name;     
                                //$scope.setSelectedArea(loca_name);
                            getProperty(loca_name, bound_data);
                      
        //}

    });
    var applyfilters = function(filters_){
        var m_data =  {};
        m_data[temp_area] =  temp[temp_area];
        angular.forEach(m_data, function(value, key){
            temp2 = [];
            angular.forEach(value, function(value1, key1){
                var flag_g = true;
                angular.forEach(filters_, function(value2, key2) {
                    var flag = false;
                    if(key2 == "budget"){
                        if (value1["m_rent"] >= value2[0] && value1["m_rent"] <= value2[1]){
                            flag = true;
                        }
                    }
                    if (value2.length > 0) {
                        angular.forEach(value2, function(value3, key3) {
                            if (value1[key2] == value3) {
                                flag = true;
                            }
                        });
                    } else {
                        flag = true;
                    }
                    if (!flag) {
                        flag_g = false;
                    }
                });
                if (flag_g) {
                    temp2.push(value1);
                }
            });
            $scope.p_data[key] = temp2;
        });
        p_count = angular.copy($scope.p_data[temp_area].length);
        $scope.button_text = "View " + p_count + "  Properties";
        $('#btn-search').html($scope.button_text);
        $('#btn-search2').html($scope.button_text);
    }

    //get budget value and store it in array
    // $scope.passValueHere = function() {
    // alert('hi');       
    //     var f = parseInt($('#side1').text());
    //     var s = parseInt($('#side2').text());
    //     filter_array["budget"]=[f,s];
    //     $scope.applyfilters(filter_array);
    // }
    $scope.passValueHere = function() {
    //alert('hi666');        
        $scope.radrange = parseInt($('#rrange').text());
        var f = parseInt($('#side1').text());
        var s = parseInt($('#side2').text());
        filter_array["budget"]=[f,s];
        applyfilters(filter_array);
        console.log($scope.radrange);
        minbud=f;
        maxbud=s;
        console.log(minbud);
        console.log(maxbud);
    }
    //get other filters and store it in array
    $scope.filter_bhk = function($event, arraylist, key){
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
            var bhkatos = temp_array.toString();        
            bhkatos=bhkatos.replace(/,/g,'-');
            bhkurl=bhkatos.replace(/ /g,'');
        }
        if (key == 'furnishing') {
            if (filter_array["fur"]) {
                var temp_array = filter_array["fur"];
            }
            var action = (checkbox.checked ? 'add' : 'remove');
            if (action == 'add' & temp_array.indexOf(arraylist) == -1) temp_array.push(arraylist);
            if (action == 'remove' && temp_array.indexOf(arraylist) != -1) temp_array.splice(temp_array.indexOf(arraylist), 1);

            filter_array["fur"] = temp_array;
            var funarray = [];
           // console.log(temp_array);
            for(var i in temp_array){
                if(temp_array[i] == "furnished"){
                    funarray.push('Furnished');
                }
                if(temp_array[i] == "s_furnished"){
                    funarray.push('Semi Furnished');
                }
                if(temp_array[i] == "n_furnished"){
                    funarray.push('Not Furnished');
                }
            }
           // console.log(funarray);            
            var valstr = funarray.toString();
            valstr=valstr.replace(/,/g,'-');
            fururl=valstr.replace(/ /g,'');
           //  console.log(fururl);
        } else if (key == 'rent') {
            if (filter_array["rent_to"]) {
                var temp_array = filter_array["rent_to"];
            }
            var action = (checkbox.checked ? 'add' : 'remove');
            if (action == 'add' & temp_array.indexOf(arraylist) == -1) temp_array.push(arraylist);
            if (action == 'remove' && temp_array.indexOf(arraylist) != -1) temp_array.splice(temp_array.indexOf(arraylist), 1);
            filter_array["rent_to"] = temp_array;
            var rtoarray = [];
            for(var i in temp_array){
                if(temp_array[i] == "Family"){
                    rtoarray.push('Family');
                }
                if(temp_array[i] == "Single (Men)"){
                    rtoarray.push('Bachelor');
                }
            }
            // console.log(rtoarray);
            var valstr = rtoarray.toString();
            valstr=valstr.replace(/,/g,'-');
            rtourl=valstr.replace(/ /g,'');
        } 
        //console.log(temp_array);        
            
             //console.log(rtourl);
         applyfilters(filter_array);
    };     

    //call to action to property portal
    $scope.SearchPage = function(){
        console.log($scope.multipleDemo.inputareas);
        amplify.store("search_count",0);
        amplify.store("total_properties",null);
        amplify.store("visit_dateTime",null);
        amplify.store("visit_property",null);
        amplify.store("wish_property",null);
        amplify.store("confirm",null);
        $scope.notification;
        if(temp[temp_area]){
            var pjson = {'property':temp,'filter':filter_array};
           // amplify.store("total_properties",pjson, {path:'/'});
            var area_temp2=[];
            var s_area=[];           
            s_area.push($scope.multipleDemo.inputareas);
            amplify.store("selected_area",$scope.multipleDemo.inputareas);
            var jdata = {'filter':filter_array,'area':s_area};
            if(amplify.store("uid") && amplify.store("email")){
                serv.show().success(function(items){
                    if(items["data"]=="1"){
                        $rootScope.g_items = angular.copy(items);
                        console.log($rootScope.g_items);
                        amplify.store("status",items["status"]);  
                        if(items["item"]["original_date"]){
                             amplify.store("original_date", items["item"]["original_date"]); 
                        }
                        if(items["status"]>5){
                            amplify.store("confirm",items["item"]["confirm"]);
                            $scope.notification = "You have confirmed a property on "+items["item"]["confirm_pay"]+". Click <b>OK</b> to check the property details."                      
                            $("#notification2").html($scope.notification);
                            $('#return_user2').modal('show'); 
                        }
                        else if(items["status"]>4){
                            amplify.store("visit_dateTime", items["item"]["visit_date"]);
                            var info_visit_date = amplify.store("visit_dateTime");
                            var myarray = [];
                            $scope.values = {};
                            for (var i in info_visit_date) {
                                $scope.values["date_" + i] = info_visit_date[i]["date"];
                                $scope.values["time_" + i] = info_visit_date[i]["time"];
                                myarray.push(i);

                            }
                            var new_data1 = {"value":myarray};                 
                            main_serv.multiIds(new_data1).success(function(data_ide){
                                if(data_ide["data"] == "1"){
                                    amplify.store("visit_property",data_ide["prop"]);
                                    $scope.notification ="You have already paid the relocation assistance charge for the selected properties. Click <b>OK</b> to complete the confirmation process."; 
                                    $("#notification2").html($scope.notification);
                                    $('#return_user2').modal('show'); 
                                }                                                       
                            });                             
                        }
                        else if(items["status"]>2){
                            if(items["item"]["visit_date"]){
                                 amplify.store("visit_dateTime", items["item"]["visit_date"]); 
                            }
                            if(items["status"] == 4){
                                    if(items["item"]["area"].length>1){
                                        var area_string = "";
                                        for(var i in items["item"]["area"]){
                                            area_string += ""+items["item"]["area"][i];
                                            if(items["item"]["area"].length != i){
                                                area_string += ", ";
                                            }
                                        }
                                    }
                                    $scope.notification = "You have shortlisted "+items["item"]["visit"].length+" properties in "+items["item"]["area"]+" , Hyderabad to visit. <br/>Click <b>OK</b> to schedule your visiting time.<br/>Click <b>Cancel</b> to start a new search";
                                    $("#notification1").html($scope.notification);
                                    $('#return_user').modal('show');
                            }
                            else if(items["status"] == 3){
                                if(items["item"]["area"] != $scope.multipleDemo.inputareas){
                                    $scope.notification = "You have shortlisted "+items["item"]["visit"].length+" properties in "+items["item"]["area"]+" , Hyderabad to visit.<br/>Click <b>OK</b> to proceed with your shortlisted properties.<br/>Click <b>Cancel</b> to start a new search";
                                    $("#notification1").html($scope.notification);
                                    $('#return_user').modal('show');
                                }
                                else{
                                    $scope.previousSearch();
                                }
                            }
                        }
                        else if(items["status"]>1){
                            if(items["item"]["area"] != $scope.multipleDemo.inputareas){
                                $scope.notification = "You have shortlisted "+items["item"]["wish"].length+" properties in "+items["item"]["area"]+" , Hyderabad.<br/>Click <b>OK</b> to proceed with your shortlisted properties.<br/>Click <b>Cancel</b> to start a new search";
                                $("#notification1").html($scope.notification);
                                $('#return_user').modal('show');
                            }
                            else{
                                $scope.previousSearch();
                            }                    
                        }
                        else {
                            $scope.newSearch();
                        }
                    }
                    else{
                        // $scope.newSearch();
                        serv.preselect(jdata).success(function(data) {
                            if (data.data == "0") {
                                ////console.log("Error");
                            } else if (data.data == "1") {
                                // var screenWidth = $window.innerWidth;
                                // if (screenWidth < 700){
                                  //  console.log("/property/search/"+$scope.radrange+"-"+s_area+"-"+city+"/"+bhkurl+"/"+minbud+"-"+maxbud+"/"+fururl+"/"+rtourl+"/"+placeid);
                                   location.href =  "/property/search/"+$scope.radrange+"-"+s_area+"-"+city+"/"+bhkurl+"/"+minbud+"-"+maxbud+"/"+fururl+"/"+rtourl+"/"+placeid;
                                // }else{
                                //     location.href = "/property/search/"+city+"/"+s_area;
                                // }   
                            }
                        }); 
                    }
                });
            }
            else{
                $scope.newSearch();
            }
        }
    }
    
    //deletes the old data and start a new search (store filter and area)
    $scope.newSearch = function(){
        if(amplify.store("uid") && amplify.store("email")){
            serv.deleteProp().success(function(info){
                if(info["data"] == "1" || info["data"] == "2"){
                  var a_area = amplify.store("selected_area");
                    var s_area=[];            
                    s_area.push(a_area);
                    var jdata = {'filter':filter_array,'area':s_area};
                    serv.preselect(jdata).success(function(data) {
                        if (data.data == "0"){
                        } else if (data.data == "1") {
                            // var screenWidth = $window.innerWidth;
                            // if (screenWidth < 700){
                            //  location.href = "/property/search/"+city+"/"+a_area;
                            // }else{
                            //     console.log(a_area);
                            //   location.href = "/property/search/"+city+"/"+a_area;
                            // }
                            location.href =  "/property/search/"+$scope.radrange+"-"+s_area+"-"+city+"/"+bhkurl+"/"+minbud+"-"+maxbud+"/"+fururl+"/"+rtourl+"/"+placeid;
                            // console.log("/property/search/"+$scope.radrange+"-"+s_area+"-"+city+"/"+bhkurl+"/"+minbud+"-"+maxbud+"/"+fururl+"/"+rtourl+"/"+placeid);
                        }
                    });                    
                }
            });
        }
        else{
           var a_area = amplify.store("selected_area");
           //var a_area = $scope.multipleDemo.inputareas
            // var screenWidth = $window.innerWidth;
            // if (screenWidth < 700){
            //    location.href = "/property/search/"+city+"/"+a_area;
            // }else{
            //     location.href = "/property/search/"+city+"/"+a_area;
            // } 
            location.href =  "/property/search/"+$scope.radrange+"-"+a_area+"-"+city+"/"+bhkurl+"/"+minbud+"-"+maxbud+"/"+fururl+"/"+rtourl+"/"+placeid;
            // console.log("/property/search/"+$scope.radrange+"-"+a_area+"-"+city+"/"+bhkurl+"/"+minbud+"-"+maxbud+"/"+fururl+"/"+rtourl+"/"+placeid);
        }       
    }

//continue with old data 
    $scope.previousSearch = function(){
        console.log($rootScope.g_items);
        var t_temp={}; 
        main_serv.getProp($rootScope.g_items["item"]["area"],city).success(function(info){
          t_temp[$rootScope.g_items["item"]["area"]] = info;
          var t_data = {"filter":$rootScope.g_items["item"]["filter"],"property":t_temp};
          console.log(t_data);

            var bhkurlar=$rootScope.g_items["item"]['filter']['configuration'];
            if(bhkurlar){
                if(bhkurlar.length > 0){
                    var bhkstr = bhkurlar.toString();                  
                    var bhkstr1=bhkstr.replace(/,/g,'-');            
                    var bhkstr2=bhkstr1.replace(/ /g,'');
                    var bhkstrfnl = bhkstr2;
                    console.log(bhkstrfnl);
                }
                else{
                    bhkstrfnl = '2BHK-3BHK-4BHK';
                }  
            }
            else{
                bhkstrfnl = '2BHK-3BHK-4BHK';
            }          
            var budurlar=$rootScope.g_items["item"]['filter']['budget'];
            if(budurlar){
                if(budurlar.length > 0){
                var budurl = budurlar[0]+"-"+budurlar[1];
                console.log(budurl);   
                }
                else{
                    var budurl = "18000-50000";
                } 
            }
            else{
                var budurl = "18000-50000";
            }        
            var rnturlar=$rootScope.g_items["item"]['filter']['rent_to'];
            if(rnturlar){
                if(rnturlar.length > 0){
                    var rntstr = rnturlar.toString();               
                    var rntstrfnl=rntstr.replace(/,/g,'-');              
                    console.log(rntstrfnl);
                }
                else{
                    var rntstrfnl = "Family-Bachelor";
                }
            }
            else{
                var rntstrfnl = "Family-Bachelor";
            }
            var fururlar=$rootScope.g_items["item"]['filter']['fur'];
            if(fururlar){
                if(fururlar.length > 0){
                    var fururlstg = fururlar.toString();              
                    var fururlstg1=fururlstg.replace(/,/g,'-');            
                    var fururlstg2=fururlstg1.replace(/ /g,'');       
                    var fururlfnl =  fururlstg2;  
                    console.log(fururlfnl);
                }
                else{
                    var fururlfnl = "furnished-s_furnished-n_furnished";
                }
            }
            else{
                var fururlfnl = "furnished-s_furnished-n_furnished";
            }

           //amplify.store("total_properties",t_data);
           var s_area=$rootScope.g_items["item"]["area"];
           if($rootScope.g_items["status"]==4){
                var new_data1 = {"value":$rootScope.g_items["item"]["visit"]};
                main_serv.multiIds(new_data1).success(function(data_ide){
                    if(data_ide["data"] == "1"){
                        amplify.store("visit_property",data_ide["prop"]);
                        console.log(amplify.store("visit_property"));
                        var new_data2 = {"value":$rootScope.g_items["item"]["wish"]};
                        main_serv.multiIds(new_data2).success(function(data_ide1){
                            if(data_ide1["data"] == "1"){
                                amplify.store("wish_property",data_ide1["prop"]);
                                location.href = "/property/schedule-visit";
                            }                                                       
                        });
                    }                                                       
                });
           }
           else if($rootScope.g_items["status"]==3){
                var new_data2 = {"value":$rootScope.g_items["item"]["wish"]};
                main_serv.multiIds(new_data2).success(function(data_ide){
                    if(data_ide["data"] == "1"){
                        amplify.store("wish_property",data_ide["prop"]); 
                        location.href =  "/property/search/"+$scope.radrange+"-"+s_area+"-"+city+"/"+bhkstrfnl+"/"+budurl+"/"+fururlfnl+"/"+rntstrfnl+"/"+placeid;
                        // var screenWidth = $window.innerWidth;
                        // if (screenWidth < 700){
                        //    location.href = "/property/search/"+city+"/"+s_area;
                        // }else{
                        //     location.href = "/property/search/"+city+"/"+s_area;
                        // }
                    }                                                       
                });                 
           }
           else if($rootScope.g_items["status"]==2){
            console.log($rootScope.g_items["item"]['filter']);

                $rootScope.g_items["item"]["area"] = $scope.multipleDemo.inputareas;  
                // for(var j in  $scope.areas){
                //     if($scope.areas[j]["value"] ==  $rootScope.g_items["item"]["area"]){
                //         area_temp2 = $scope.areas[j];
                //     }
                // }
               amplify.store("selected_area",$rootScope.g_items["item"]["area"]);
                var new_data2 = {"value":$rootScope.g_items["item"]["wish"]};
                main_serv.multiIds(new_data2).success(function(data_ide){
                    if(data_ide["data"] == "1"){
                        amplify.store("wish_property",data_ide["prop"]);                         
                     location.href =  "/property/search/"+$scope.radrange+"-"+s_area+"-"+city+"/"+bhkstrfnl+"/"+budurl+"/"+fururlfnl+"/"+rntstrfnl+"/"+placeid;
                        // var screenWidth = $window.innerWidth;
                        // if (screenWidth < 700){
                        //    location.href = "/property/search/"+city+"/"+s_area;
                        // }else{
                        //     location.href = "/property/search/"+city+"/"+s_area;
                        // }
                    }                                                       
                });   
            }
        });  
    }
    $scope.status6=function(){
        $('#return_user2').modal('hide');
        $('.modal-backdrop').remove();
        location.href = "/property/confirm-property";
    }

    //Movers
    $scope.mover = [];
    var json = {};
    var city1,city2,area1,area2;
    $scope.cities1 = [{ 'cname': 'Hyderabad', 'cvalue': 'hyd' }];
    $scope.bhks = ['1 BHK', '2 BHK', '3 BHK', '4 BHK+'];
    $scope.Liftstatus=['Yes', 'No'];
    $scope.changeactive = function() {
        angular.element(document.querySelector("#intra")).removeClass("active");
        angular.element(document.querySelector("#inter")).addClass("active");
    }
    $scope.changeactive1 = function(){
        angular.element(document.querySelector("#intra")).addClass("active");
        angular.element(document.querySelector("#inter")).removeClass("active");
    }   
    $scope.goMover = function(){
        //console.log($scope.mover.ar1);
        if($scope.mover.ar1 && $scope.mover.ar2  && $scope.mover.city2 && $scope.mover.bhk1 && $scope.mover.bhk2 && $scope.mover.lift1 && $scope.mover.lift2){
            var dcity = city1;
            var ccity = city2;
            var bhk = $scope.mover.bhk1;
            var estcharge={'Current_place':{'curr_city':city1, 'curr_area':area1, 'lift':$scope.mover.lift1, 'BHK': $scope.mover.bhk1}, 
                            'Destination_place':{"dest_city":city2, "dest_area":area2, 'lift':$scope.mover.lift2, "BHK": $scope.mover.bhk2}};
            mover_serv.getEsti(estcharge).success(function(estimated){
                $scope.estimated_charges = estimated;
                json["Estimated_charge"] = estimated;
                json["Destination_place"] = {"dest_city":city2, "dest_area":area2,"BHK": $scope.mover.bhk2,"Lift":$scope.mover.lift2};
                json["Current_place"] = {"curr_city":city1, "curr_area":area1,"BHK": $scope.mover.bhk1,"Lift":$scope.mover.lift1};             
                if(amplify.store("uid") && amplify.store("email")){
                    if(mover_status){
                        if(mover_status == 4){
                            location.href='/mover/completed'; 
                        }
                        else if(mover_status==3 || mover_status==2 ){
                            location.href='/mover/confirm';   
                        }
                        else if(mover_status == 1){
                            json1=JSON.stringify(json);
                            amplify.store("mover_item", json1);
                            JSON.stringify(amplify.store("mover_item"));
                            var j_data = {"user":amplify.store("email"),"value":json,"status":1};
                            var j_data = JSON.stringify(j_data);
                            mover_serv.sendValue(j_data).success(function(data){
                                if(data["data"] == "0"){
                                    console.log("Error");
                                }
                                else if(data["data"] == "1"){
                                    console.log("Value added successfully");
                                    location.href='/mover/add-details';
                                } 
                            });
                        }
                    }
                    else{
                        amplify.store("mover_item",json);
                        var j_data = {"user":amplify.store("email"),"value":json,"status":1};
                        var j_data = JSON.stringify(j_data);
                        mover_serv.sendValue(j_data).success(function(data){
                            if(data["data"] == "0"){
                                console.log("Error");
                            }
                            else if(data["data"] == "1"){
                                console.log("Value added successfully");
                                location.href='/mover/add-details';
                            }
                        });
                    }       
                }
                else{
                    amplify.store("mover_item",json);
                    location.href='/mover/add-details';
                }
                
            });         
        }
        else{
            $("#mainError").html("Please fill all the input fields.");
            $("#errorModal").modal("show");
        }
        
    }    

    var mover_preload = function(){
        main_serv.getCities().success(function(data3){
            $scope.cities = data3;   
            landdata=amplify.store("mover_item");
            console.log(landdata);
            if(landdata != null && !landdata){
                for(var i in $scope.cities){
                    if($scope.cities[i]['cname'] == landdata['Current_place']['curr_city']){
                        var cityvalue1=$scope.cities[i]['cvalue'];
                    }
                }
                $scope.mover['city1']=landdata['Current_place']['curr_city'];
                $scope.getareas(cityvalue1);
                $scope.mover.bhk1 = landdata['Current_place']['BHK'];
                $scope.mover.lift1 = landdata['Current_place']['lift'];
                for (var i in $scope.cities) {
                    if ($scope.cities[i]['cname'] == landdata['Destination_place']['dest_city']) {
                        var cityvalue2 = $scope.cities[i]['cvalue'];
                    }
                }
                $scope.mover['city2'] = landdata['Destination_place']['dest_city'];
                $scope.getareas1(cityvalue2);
                $scope.mover.bhk2 = landdata['Destination_place']['BHK'];
                $scope.mover.lift2 = landdata['Destination_place']['lift'];
            }
        });
    }

    $scope.getareas = function(item) {
        $scope.city_areas1 = [];
        for(var i in $scope.cities){
            if($scope.cities[i]["cvalue"] == item){
                city1 = $scope.cities[i]["cname"];
            }
        }
        main_serv.getArea(item).success(function(data2) {
            for (var i in data2) {
                $scope.city_areas1.push({ "id": i, "value": data2[i] });
                if (landdata != null && !landdata) {
                    if (landdata["Current_place"]["curr_area"] == data2[i]) {
                        $scope.mover.ar1 = landdata["Current_place"]["curr_area"];
                    }
                }
            }
            $scope.mover['area1'] = $scope.city_areas1;
        });
    }

    $scope.getareas1 = function(item) {
        $scope.city_areas2 = [];
        for(var i in $scope.cities){
            if($scope.cities[i]["cvalue"] == item){
                city2 = $scope.cities[i]["cname"];
            }
        }
        main_serv.getArea(item).success(function(data2) {
            $scope.mover['area2'] = $scope.city_areas2;
            for (var i in data2) {
                $scope.city_areas2[i] = { "id": i, "value": data2[i] };
                if (landdata != null && !landdata) {
                    if (landdata["Destination_place"]["dest_area"] == data2[i]) {
                        $scope.mover.ar2 = landdata["Destination_place"]["dest_area"];
                    }
                }
            }
            $scope.mover['area2'] = $scope.city_areas2;
            if ($scope.intra) {
                city1 = city2;
                $scope.city_areas1 = $scope.city_areas2;
                $scope.mover['area1'] = $scope.city_areas1;
            }
        });
    }
    
    if(amplify.store("cityin")){
        var cityarr = amplify.store("cityin");
        console.log(cityarr);
        $scope.mover.city1 = cityarr[0];
        $scope.mover.city2 = cityarr[1];
        $scope.getareas($scope.mover.city1);
        $scope.getareas1($scope.mover.city2)
        amplify.store("cityin", '');
    }
    $scope.gotopackers =function(city1, city2){
        var cityarray =[];
        cityarray.push(city1);
        cityarray.push(city2);
        amplify.store("cityin", cityarray);
        location.href = "/home/home_mover";

        // alert(area1);
        // alert(area2);
    }
    $scope.getareas11 = {
        placeholder: 'Select origin city',
         allowSearch: true,
        onChange: function(val) {
            console.log('New value of dropdown is '+val);
            $scope.getareas(val)
        }
    }
    $scope.getareas21 = {
        placeholder: 'Select destination city',
        allowSearch: false,
        onChange: function(val) {
            console.log('New value of dropdown is '+val);
            $scope.getareas1(val)
        }
    }
    $scope.getar11 = {
        placeholder: 'Select origin locality',
        allowSearch: true,
        onChange: function(val) {
            console.log('New value of dropdown is '+val);
            area1 = val;
            console.log($scope.mover.ar1);
        }
    };
    $scope.getar21 = {
        placeholder: 'Select destination locality',
        allowSearch: true,
        onChange: function(val) {
            console.log('New value of dropdown is '+val);
            area2 = val;
        }
    };
    $scope.getbhk11 = {
        placeholder: 'Select origin BHK',
        allowSearch: false,
        onChange: function(val) {
            console.log('New value of dropdown is '+val);
             $scope.mover.bhk1 = val;
        }
    };
    $scope.getbhk21 = {
        placeholder: 'Select destination BHK',
        allowSearch: false,
        onChange: function(val) {
            console.log('New value of dropdown is '+val);
            $scope.mover.bhk2 = val;
        }
    };
    $scope.getlift1 = {
        placeholder: 'Lift facility at origin',
        allowSearch: false,
        onChange: function(val) {
            console.log('New value of dropdown is '+val);
            $scope.mover.lift1 = val;
        }
    };

    $scope.getlift2 = {
        placeholder: 'Lift facility at destination',
        allowSearch: false,
        onChange: function(val) {
            console.log('New value of dropdown is '+val);
            $scope.mover.lift2 = val;
        }
    };    

    //settling services
    $scope.settling = [];
    $scope.settle = {};    
    $scope.settle.s_city='Hyderabad';
    $scope.mainError;
    $scope.cheked_values = true;
    var m_info1, m_info2, m_info3;
    $scope.test1=function(){
       $scope.settling_div = false;
   }
    $scope.gethydarea=function(val){
     main_serv.getArea(val).success(function(data2) {
                for (var i in data2) {
                    $scope.settling[i] = { "id": i, "value": data2[i] };
                }
            });
    }
    $scope.gethydarea('hyd');
    $scope.get_s_city = {
        placeholder: 'Select your city',
        allowSearch: true,
        onChange: function(val) {
            console.log('New value of dropdown is '+val);
            $scope.s_city = val;
           

        }
    };
    $scope.get_s_area = {
        placeholder: 'Select your locality',
        allowSearch: true,
        onChange: function(val) {
            console.log('New value of dropdown is '+val);
            $scope.s_area = val;
        }
    };
    $scope.storeServices =function(){
        m_info1 =  $scope.settle.telecom;
        m_info2 =  $scope.settle.gas;
        m_info3 =  $scope.settle.home;
        if($scope.settling.telecom || $scope.settling.gas || $scope.settling.home){
            $scope.settling_div = true;
        }
        else{
            $("#mainError").html("Please select at least one service to proceed");
            $("#errorModal").modal("show");
        }
    }
    $scope.test=function(){        
        if(!$scope.settling.telecom && !$scope.settling.gas && !$scope.settling.home){
            $scope.settling_div = false;
        }
    }
    $scope.submit_settle = function() {
        var currentdate = new Date();
        var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
        var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var datetime = date + " at " + time;
        var service_flag = false;
        var service_array = [];
        if($scope.settling.telecom){
            service_array.push("telecom");
            service_flag = true;
        }
        if($scope.settling.gas){
            service_array.push("gas");
            service_flag = true;
        }
        if($scope.settling.home){
            service_array.push("home");
            service_flag = true;
        }
        console.log(service_array);
        console.log($scope.settle.name);
        var s_flag = true;
        if (!service_flag || $scope.settle.name == undefined|| $scope.settle.email == undefined || $scope.settle.phone == undefined || $scope.settle.s_city == undefined || $scope.settle.s_area == undefined) {
            s_flag = false;
        }
        if (s_flag) {
            var s_data = {
                "name": $scope.settle.name,
                "email": $scope.settle.email,
                "phone": $scope.settle.phone,
                "services": service_array,
                "m_info": $scope.settle.other,
                "m_info1": m_info1,
                "m_info2": m_info2,
                "m_info3": m_info3,
                "datetime": datetime,
                "city": $scope.settle.s_city["cname"],
                "area": $scope.settle.s_area["value"],
                "type": "Services"
            };
            main_serv.getSettleIn(s_data).success(function(data) {
                if (data["data"] == "0") {
                } else if (data["data"] == "1") {
                      $("#myModalSubmit").modal("show");
                    $scope.settle.other = '';
                    $scope.settle.telecom = '';
                    $scope.settle.gas = '';
                    $scope.settle.home = '';
                    $scope.settle.s_city = '';
                    $scope.settle.s_area = '';
                }
            });
        } else {
            $("#mainError").html("Please fill all the required fields.");
            $("#errorModal").modal("show");
        }
    }
    var sub  = function(){         
         var currentdate = new Date();
        var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
        var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var datetime = date + " at " + time;
        var jdata = { "name": $scope.name, "email": $scope.mail, "phone": $scope.phone, "m_info": $scope.message, "datetime": datetime}; //origin and destination city removed.
        main_serv.sendProp1(jdata).success(function(info2) {
            console.log(info2);
            //$('#digitModal').modal('hide');
            $("#successquery").modal("show");
        });
    }
    $scope.onSubmit = function() {
        var flag = false;
        if ($scope.name && $scope.mail && $scope.phone && $scope.message) {
            flag = true;
        }
        if (flag) {
            //  $('#digitModal').modal('show');
            // $('#placefordigit').html("");
            // Digits.embed({
            //   phoneNumber: '+91'+$scope.phone,
            //     container: '#placefordigit',
            //     theme: 'height:400px;'
            // })
            // .done(sub);
            sub();
            
        } else {
            alert("please fill all the details");
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

    //sends eamil id to db
    $scope.subscription=function(){
        var submail =$scope.subemail;
        main_serv.subscript(submail).success(function(info2) {
                console.log(info2);
                $scope.subemail='';
                //alert('subscription succuess');
                $("#successsub").modal("show");
            });

    }

}]);

