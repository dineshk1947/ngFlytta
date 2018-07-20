app.controller('requestController',['$scope','serv','main_serv', '$window',function($scope,serv,main_serv,$window){

$scope.dropdownOptions = {
    placeholder: 'Select your origin city',
    allowSearch: true,
    // allowMultipleSelection: true,
    // extraClasses: ['fluid'],
    onChange: function(val) {
        console.log('New value of dropdown is ' + val);
    }
};

// bounds: new google.maps.Circle({center:new google.maps.LatLng( 17.3914,72.936035 ),
//                                 radius:5000}).getBounds(),
var southWest = new google.maps.LatLng( 17.158714685480376, 78.09278986269533 );
var northEast = new google.maps.LatLng( 17.74824117801626, 78.96620294863283 );
var hyderabadBounds = new google.maps.LatLngBounds( southWest, northEast );
var options = {   
   bounds: hyderabadBounds,
   strictBounds: true,
   types: ['geocode'],
   componentRestrictions: {country: 'IN'},
  // componentRestrictions: {locality: "Hyderabad"}
};
var input = document.getElementById('local1');
var autocomplete1 = new google.maps.places.Autocomplete(input,options);
google.maps.event.addListener(autocomplete1, 'place_changed', function () {
               var place = autocomplete1.getPlace();
               $scope.placeid=place.place_id;
              console.log($scope.placeid);
               $scope.loc_pre_1=place.name;
              console.log($scope.loc_pre_1);  

});

var options = {
   bounds: hyderabadBounds,
   strictBounds: true,
   types: ['geocode'],
   componentRestrictions: {country: 'IN'}
};
var input = document.getElementById('local2');
var autocomplete2 = new google.maps.places.Autocomplete(input,options);
google.maps.event.addListener(autocomplete2, 'place_changed', function () {
               var place = autocomplete2.getPlace();
              // console.log(place.name);
               $scope.loc_pre_2=place.name;
              console.log($scope.loc_pre_2);  

});

var options = {
   bounds: hyderabadBounds,
   strictBounds: true,
   types: ['geocode'],
   componentRestrictions: {country: 'IN'}
};
var input = document.getElementById('local3');
var autocomplete3 = new google.maps.places.Autocomplete(input,options);
google.maps.event.addListener(autocomplete3, 'place_changed', function () {
               var place = autocomplete3.getPlace();
               $scope.loc_pre_3=place.name;
             console.log($scope.loc_pre_3);  

});

var screenWidth = $window.innerWidth;
$scope.bhks = ['1 BHK', '2 BHK', '3 BHK', '4 BHK+'];
$scope.cities1 = [{ 'cname': 'Hyderabad', 'cvalue': 'hyd' }];
$scope.rentto = ['Family','Bachelor-Male','Bachelor-Female'];
$scope.housebudget = ['18001 to 20000', '20001 to 25000', '25001 to 30000', '30001 to 35000', '35001 to 40000'];
$scope.fur_state = ["Furnished", "Semi Furnished (Wardrobes and Modular Kitchen only)", "Unfurnished"];
$scope.tomorrow = new Date();
$scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
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

 main_serv.getArea('hyd').success(function(info){
     for(var i in info){
         $scope.areas[i] = {"id": i,"value":info[i]}; 
     }
 });

 // $scope.onSelectCallback1 = function(item){
 //    console.log(item);
 //    $scope.loc_pre_1=item;
 //        console.log($scope.loc_pre_1);
 //    var index_item =  $scope.areas.indexOf(item);
 //    if(index_item > -1){
 //        $scope.areas.splice(index_item,1);
 //    }
 // }
 $scope.onSelectCallback1 = {
    placeholder: 'Select the locality',
    allowSearch: true,
    // allowMultipleSelection: true,
    // extraClasses: ['fluid'],
    onChange: function(val) {
        console.log('New value of dropdown is ' + val);
        $scope.loc_pre_1=val;
        console.log($scope.loc_pre_1);
        // var index_item =  $scope.areas.indexOf(val);
        // if(index_item > -1){
        //     $scope.areas.splice(index_item,1);
        // }
    }
};
 // $scope.onSelectCallback2 = function(item){
 //    console.log(item);
 //    $scope.loc_pre_2=item;
 //        console.log($scope.loc_pre_2);
 //    var index_item =  $scope.areas.indexOf(item);
 //    if(index_item > -1){
 //        $scope.areas.splice(index_item,1);
 //    }
 // }
 $scope.onSelectCallback2 = {
        placeholder: 'Select the locality',
        allowSearch: true,
        // allowMultipleSelection: true,
        // extraClasses: ['fluid'],
        onChange: function(val) {
            console.log('New value of dropdown is ' + val);
            $scope.loc_pre_2=val;
            console.log($scope.loc_pre_2);
            // var index_item =  $scope.areas.indexOf(val);
            // if(index_item > -1){
            //     $scope.areas.splice(index_item,1);
            // }
        }
    };
 // $scope.onSelectCallback3 = function(item){
 //    console.log(item);
 //    $scope.loc_pre_3=item;
 //        console.log($scope.loc_pre_3);
 //    var index_item =  $scope.areas.indexOf(item);
 //    if(index_item > -1){
 //        $scope.areas.splice(index_item,1);
 //    }
 // }
 $scope.onSelectCallback3 = {
        placeholder: 'Select the locality',
        allowSearch: true,
        // allowMultipleSelection: true,
        // extraClasses: ['fluid'],
        onChange: function(val) {
            console.log('New value of dropdown is ' + val);
            $scope.loc_pre_3=val;
            console.log($scope.loc_pre_3);
            // var index_item =  $scope.areas.indexOf(val);
            // if(index_item > -1){
            //     $scope.areas.splice(index_item,1);
            // }
        }
    };

$scope.rrrent_tem=[];
    $scope.reqrent = {
        placeholder: 'Family/Bachelors',
        allowSearch: false,
        // allowMultipleSelection: true,
        // extraClasses: ['fluid'],
        onChange: function(val) {
            console.log('New value of dropdown is ' + val);
             $scope.rrrent=val;
        }
    };
    $scope.addreqbhk = {
        placeholder: 'Select your BHK',
        allowSearch: false,
        allowMultipleSelection: true,
        onChange: function(val) {
            console.log('New value of dropdown is ' + val);
            $scope.reqbhk = val;
        }
    };
     $scope.addreqbud = {
        placeholder: 'House Rental Budget',
        allowSearch: false,
        allowMultipleSelection: true,
        onChange: function(val) {
            console.log('New value of dropdown is ' + val);
             $scope.reqbud = val;
             console.log($scope.reqbud)
        }
    };
     $scope.addfurnishing = {
        placeholder: 'Furnishing',
        allowSearch: false,
        allowMultipleSelection: true,
        onChange: function(val) {
            console.log('New value of dropdown is ' + val);
             $scope.fur = val;
             console.log($scope.fur);
        }
    };
    $scope.reqorgin = {
        placeholder: 'Select your origin city',
        allowSearch: true,
        // allowMultipleSelection: true,
        // extraClasses: ['fluid'],
        onChange: function(val) {
            console.log('New value of dropdown is ' + val);
            $scope.rrorgin=val;
        }
    };
    $scope.reqdest = {
        placeholder: 'Select your destination city',
        allowSearch: false,
        // allowMultipleSelection: true,
        // extraClasses: ['fluid'],
        onChange: function(val) {
            console.log('New value of dropdown is ' + val);
            $scope.rrdest=val;
        }
    };
   
    $scope.reqdate=function(){
        $scope.rrdate1=$scope.rrdate['req_date'];
        $scope.tem_rdate = getdate($scope.rrdate1);
       // console.log(tem_rdaate);
    }



var temp2 = {};
$scope.req_relocation=function(){
    // var temp_loc11=$('#local1').val();
    // var loc_array=temp_loc11.split(',');
    // $scope.loc_pre_1=loc_array[0];
    console.log($scope.loc_pre_1);
    // var temp_loc12=$('#local2').val();
    // var loc_array=temp_loc12.split(',');
    // $scope.loc_pre_2=loc_array[0];    
    console.log($scope.loc_pre_2);
    // var temp_loc13=$('#local3').val();
    // var loc_array=temp_loc13.split(',');
    // $scope.loc_pre_3=loc_array[0];
    console.log($scope.loc_pre_3);
    console.log($scope.reqbud);
    $scope.reqbud=$scope.reqbud.toString();
    // var budarray = [];
    // var budarrayfinal = [];
    // for(var i in $scope.reqbud){
    //     var tem_value=$scope.reqbud[i].split(' to ');
    //     tem_value=tem_value.toString();
    //     budarray.push(tem_value);
    // }
    // budarray1=budarray.toString();
    // budarrayfinal=budarray1.split(',');
    // console.log(budarrayfinal);

    // var budmin = Math.min.apply(null, budarrayfinal);
    // var budmax = Math.max.apply(null, budarrayfinal);
    // console.log(budmin);
    // console.log(budmax);
    $scope.budurl=$scope.reqbud+"-50000";
    
    

    $scope.error_request_data = "";
    var count = 0;
    var error_flag = true;
    if($scope.rr_name == undefined){
        count++;
        $scope.error_request_data += count+". Name<br/>";
        error_flag = false;
    }
    if($scope.rr_mail == undefined){
        count++;
        $scope.error_request_data += count+". Email<br/>";
        error_flag = false;
    }
    if($scope.rr_contact == undefined){
        count++;
        $scope.error_request_data += count+". Phone Number<br/>";
        error_flag = false;
    }
    if($scope.reqbhk == undefined || $scope.reqbhk.length < 1){
        count++;
        $scope.error_request_data += count+". BHK<br/>";
        error_flag = false;
    }
    else{
        var bhks=$scope.reqbhk.toString();
        var bhks1 = bhks.replace(/ /g, '').replace(/,/g, '-').replace(/\+/g, '')
        $scope.bhkurl=bhks1;
    }
    if($scope.reqbud == undefined){
        count++;
        $scope.error_request_data += count+". House Rental Budget<br/>"; 
        error_flag = false;
    }
    if($scope.fur == undefined || $scope.fur.length < 1){
        count++;
        $scope.error_request_data += count+". Furnishing<br/>"; 
        error_flag = false;
    }
    else{
        var furs=$scope.fur.toString();
        var furs1 = furs.replace(/ /g, '').replace(/,/g, '-');
        $scope.fururl = furs1;
    }
    if($scope.rrrent== undefined){
        count++;
        $scope.error_request_data += count+". Family/Bachelors<br/>";
        error_flag = false;
    }
    if($scope.rrorgin == undefined){
        count++;
        $scope.error_request_data += count+". Origin City<br/>";
        error_flag = false;
    }
    if($scope.rrdest == undefined){
        count++;
        $scope.error_request_data += count+". Destination City<br/>";
        error_flag = false;
    }
    if($scope.loc_pre_1 == undefined){
        count++;
        $scope.error_request_data += count+". Locality(Preference 1)<br/>";
        error_flag = false;
    }
    if($scope.loc_pre_2 == undefined){
        count++;
        $scope.error_request_data += count+". Locality(Preference 2)<br/>";
        error_flag = false;
    }
    if($scope.loc_pre_3 == undefined){
        count++;
        $scope.error_request_data += count+". Locality(Preference 3)<br/>";
        error_flag = false;
    }
    if($scope.tem_rdate== undefined){
        count++;
        $scope.error_request_data += count+". Relocation Date<br/>";
        error_flag = false;
    }
    if(error_flag == false){
        $("#error_data").html($scope.error_request_data);       
        $("#error_request").modal("show");
    }
    else{
        $("#req_rel").modal("show");
    }
}

    $scope.req_start=function(){
        $("#req_rel").modal("hide");
        var phone = $scope.rr_contact.toString();
      //  $scope.rr_contact=$scope.rr_contact.toString();
        var areapre = $scope.loc_pre_1;
        console.log(areapre);
        var req_data = {
            "name": $scope.rr_name,
            "email": $scope.rr_mail,
            "phone": phone,
            "m_info": $scope.request_query,
            "price": $scope.reqbud,
            "bhk": $scope.reqbhk,
            "furnishing" : $scope.fur,            
            "service_for": $scope.rrrent,
            "from": $scope.rrorgin, 
            "city": $scope.rrdest,
            "date": $scope.tem_rdate,
            "loca1": $scope.loc_pre_1,
            "loca2": $scope.loc_pre_2,
            "loca3": $scope.loc_pre_3
        };
        amplify.store("email",$scope.rr_mail);
        amplify.store("name",$scope.rr_name);      
        amplify.store("selected_area", $scope.loc_pre_1);
        main_serv.getProp($scope.loc_pre_1,$scope.rrdest).success(function(info){
            console.log(info);
            var rent_to_array = [];  
            if($scope.rrrent == "Bachelor-Female" || $scope.rrrent == "Bachelor-Male"){
                rent_to_array.push("Single (Men)");    
            }
            else if($scope.rrrent == "Family"){
                rent_to_array.push("Family");
            }
            if($scope.reqbhk.indexOf("4 BHK+")>-1){
                $scope.reqbhk.splice($scope.reqbhk.indexOf("4 BHK+"),1,"4 BHK");
            }
            var temp1= { "configuration": $scope.reqbhk, "rent_to": rent_to_array};
            temp2[areapre]=info;

            var f_data = { "filter": temp1, "property": temp2 };
            amplify.store("total_properties",f_data);
            amplify.store("request_stat", 1);   
            main_serv.req_reloc(req_data).success(function(info2) {
                    console.log(info2);
                    $("#successreqquery").modal("show");
                });
        });
    }
    $scope.redirect_home=function(){
        $("#successreqquery").modal("hide");
        amplify.store("search_count",0);
           location.href = "/property/search/2-"+$scope.loc_pre_1+"-"+$scope.rrdest+"/"+$scope.bhkurl+"/"+$scope.budurl+"/"+$scope.fururl+"/"+$scope.rrrent+"/"+$scope.placeid;           
    }


}]);