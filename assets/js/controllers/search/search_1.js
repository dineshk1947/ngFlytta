app.controller('SearchProperty_1', ['$scope','localStorageService', 'sure', 'PlaceholderTextService', function($scope, localStorageService, sure, PlaceholderTextService){
$scope.w_data;
$scope.sharedDate={};
$scope.sharedTime={};
$scope.sharedVisit={};
$scope.visit_list_1;

sure.getProp().success(function(info2){
     $scope.p_data=info2;
     ////console.log($scope.p_data);
     if(amplify.store("visit_property")){
      $scope.visit_list_1 = amplify.store("visit_property");
     }
});

var getdate = function(datetime){
  var date = "";
      var re1='((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Tues|Thur|Thurs|Sun|Mon|Tue|Wed|Thu|Fri|Sat))'; // Day Of Week 1
      var re2='(\\s+)'; // White Space 1
      var re3='((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Sept|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?))';  // Month 1
      var re4='(\\s+)'; // White Space 2
      var re5='(\\d+)'; // Integer Number 1
      var re6='(\\s+)'; // White Space 3
      var re7='((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3})))(?![\\d])'; // Year 1
      var re8='(\\s+)'; // White Space 4
      var re9='((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)'; // HourMinuteSec 1
      var re10='(\\s+)';  // White Space 5
      var re11='(GMT)'; // Word 1
      var re12='([-+]\\d+)';  // Integer Number 1
      var re13='(\\s+)';  // White Space 6
      var re14='(\\(.*\\))';  // Round Braces 1
      var p = new RegExp(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14,["i"]);
      var m = p.exec(datetime);
      if (m != null)
      {
          var dayofweek1=m[1];
          var ws1=m[2];
          var month1=m[3];
          var ws2=m[4];
          var int1=m[5];
          var ws3=m[6];
          var year1=m[7];
          var ws4=m[8];
          var time1=m[9];
          var ws5=m[10];
          var word1=m[11];
          var signed_int1=m[12];
          var ws6=m[13];
          var rbraces1=m[14];
          //document.write("("+dayofweek1.replace(/</,"&lt;")+")"+"("+ws1.replace(/</,"&lt;")+")"+"("+month1.replace(/</,"&lt;")+")"+"("+ws2.replace(/</,"&lt;")+")"+"("+int1.replace(/</,"&lt;")+")"+"("+ws3.replace(/</,"&lt;")+")"+"("+year1.replace(/</,"&lt;")+")"+"("+ws4.replace(/</,"&lt;")+")"+"("+time1.replace(/</,"&lt;")+")"+"("+ws5.replace(/</,"&lt;")+")"+"("+word1.replace(/</,"&lt;")+")"+"("+signed_int1.replace(/</,"&lt;")+")"+"("+ws6.replace(/</,"&lt;")+")"+"("+rbraces1.replace(/</,"&lt;")+")"+"\n");
          date = month1.replace(/</,"&lt;")+"-"+int1.replace(/</,"&lt;")+"-"+year1.replace(/</,"&lt;");
      }
      return date;
}
var gettime = function(datetime){
  var time = "";
      var re1='((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Tues|Thur|Thurs|Sun|Mon|Tue|Wed|Thu|Fri|Sat))'; // Day Of Week 1
      var re2='(\\s+)'; // White Space 1
      var re3='((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Sept|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?))';  // Month 1
      var re4='(\\s+)'; // White Space 2
      var re5='(\\d+)'; // Integer Number 1
      var re6='(\\s+)'; // White Space 3
      var re7='((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3})))(?![\\d])'; // Year 1
      var re8='(\\s+)'; // White Space 4
      var re9='((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)'; // HourMinuteSec 1
      var re10='(\\s+)';  // White Space 5
      var re11='(GMT)'; // Word 1
      var re12='([-+]\\d+)';  // Integer Number 1
      var re13='(\\s+)';  // White Space 6
      var re14='(\\(.*\\))';  // Round Braces 1
      var p = new RegExp(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14,["i"]);
      var m = p.exec(datetime);
      if (m != null)
      {
          var dayofweek1=m[1];
          var ws1=m[2];
          var month1=m[3];
          var ws2=m[4];
          var int1=m[5];
          var ws3=m[6];
          var year1=m[7];
          var ws4=m[8];
          var time1=m[9];
          var ws5=m[10];
          var word1=m[11];
          var signed_int1=m[12];
          var ws6=m[13];
          var rbraces1=m[14];
          //document.write("("+dayofweek1.replace(/</,"&lt;")+")"+"("+ws1.replace(/</,"&lt;")+")"+"("+month1.replace(/</,"&lt;")+")"+"("+ws2.replace(/</,"&lt;")+")"+"("+int1.replace(/</,"&lt;")+")"+"("+ws3.replace(/</,"&lt;")+")"+"("+year1.replace(/</,"&lt;")+")"+"("+ws4.replace(/</,"&lt;")+")"+"("+time1.replace(/</,"&lt;")+")"+"("+ws5.replace(/</,"&lt;")+")"+"("+word1.replace(/</,"&lt;")+")"+"("+signed_int1.replace(/</,"&lt;")+")"+"("+ws6.replace(/</,"&lt;")+")"+"("+rbraces1.replace(/</,"&lt;")+")"+"\n");
          time = time1.replace(/</,"&lt;");
      }
      return time;
}


$scope.confirmvisit=function(){
   $scope.visit_list_1=amplify.store('visit_property');
   ////console.log($scope.visit_list_1);
   for(var i in $scope.visit_list_1){
    $scope.visit_list_1[i]["visit_date"]=getdate($scope.sharedDate["date_"+i]);
    $scope.visit_list_1[i]["visit_time"]=gettime($scope.sharedTime["time_"+i]);
    //count++;
   }
   ////console.log($scope.visit_list_1);
   var j_data={ "type":"Property", "value":$scope.visit_list_1};
   ////console.log(j_data);
    sure.sendProp3(j_data).success(function(data){
     ////console.log(data)
     if (data="1"){
      //alert('data sent');
      $scope.visit_list_1=amplify.store('visit_property');
     }
     else
     {
      //alert('error');
     }
     });
    ////console.log($scope.visit_list_1);
    location.href='/search/four'; 
}
  $scope.name = 'World';
        $scope.slides = [
        'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg',
      ];

$scope.shortlist=function(property){
   ////console.log(property);
   amplify.store("wish_property",property);
   $scope.w_data=amplify.store("wish_property");
   ////console.log($scope.w_data);
};


// var short="false"              
$scope.changeText = function() {
  // if($scope.short){
  //   short="true"
  // }

    // $scope.btnText = 'shortlisted';
  }

$scope.visitctrl=function(property,index){
  ////console.log(property);
  var temp = [];
  var chk_value=$scope.sharedVisit['visit_'+index];
  //alert(chk_value);
  ////console.log(amplify.store("visit_property"));
  if(chk_value){
    if(amplify.store("visit_property")){
      var t_data = amplify.store("visit_property");
      ////console.log(t_data);
      for(var i in t_data){
          temp.push(t_data[i]);
      }
    }
    temp.push(property); 
    amplify.store("visit_property",temp);
  }
  else{
    if(amplify.store("visit_property")){
      var t_data = amplify.store("visit_property");
      ////console.log(t_data);
      for(var i in t_data){
        if(t_data[i]["_id"]!=property["_id"]){
          ////console.log(t_data[i]);
          temp.push(t_data[i]);
        } 
      }
      amplify.store("visit_property",temp);
    }
  }
  ////console.log(temp);
  //amplify.store("visit_property",temp);
  $scope.w_data=amplify.store("visit_property");
   ////console.log($scope.w_data);

}

$scope.requestvisit=function(){
  window.location = "/search_mover/two_3";
   // ////console.log(property);
   // amplify.store("visit_property",property);
   $scope.w_data=amplify.store("visit_property");
   ////console.log($scope.w_data);
   if(!(angular.equals({}, $scope.w_data))){
    var j_data={ "type":"Property", "value":$scope.w_data};
    
    sure.sendProp3(j_data).success(function(data){
     ////console.log(data)
     if (data="1"){
      //alert('data sent');
     }
     else
     {
      //alert('error');
     }
     });
   }
   
// $scope.wishlist=function(){
  
//   ////console.log(property);
// }
   
   
}
// $scope.requestvisit = function(){
//   amplify.store("visit_property",property);
//    $scope.w_data=amplify.store("visit_property");
//    ////console.log($scope.w_data);
// }


$scope.pdetails=function(id){
  
  for (i in $scope.p_data) {
    if (id == $scope.p_data[i]["_id"]) {      
      $scope.s_prop=$scope.p_data[i];
    };
  };
  ////console.log($scope.s_prop);
  $scope.amn=[];
  for(var i in ammenities){
    if($scope.s_prop[ammenities[i]['id']] == "check"){
      $scope.amn.push(ammenities[i]['name']); 
    }
  };
}


    
    //Sample image list
  $scope.images = [{
      src: 'http://imgsv.imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-140mmf_35-56g_ed_vr/img/sample/sample1_l.jpg',
      title: 'Sample Image 1'
    }, {
      src: 'http://imgsv.imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-300mmf_35-56g_ed_vr/img/sample/sample4_l.jpg',
      title: 'Sample Image 2'
    }, {
        src: 'http://images.fonearena.com/blog/wp-content/uploads/2013/11/Lenovo-p780-camera-sample-10.jpg',
        title: 'Sample Image 3'
  }, {
        src: 'http://www.ricoh-imaging.co.jp/english/r_dc/caplio/r7/img/sample_04.jpg',
        title: 'Sample Image 4'
  }];
    
    //Set current image visible
    $scope.currentImage = 0; 
    $scope.images[0].visible = true;

    //Next image function
    $scope.next = function() {
        $scope.images[$scope.currentImage].visible = false;

        if($scope.currentImage < Object.keys($scope.images).length-1){  
      $scope.currentImage ++;   
        }else{
            $scope.currentImage = 0; 
        }
        
        $scope.images[$scope.currentImage].visible = true;
    };

    //Previous image function
    $scope.prev = function() {
        $scope.images[$scope.currentImage].visible = false;
        
         if($scope.currentImage >0){  
      $scope.currentImage --;   
        }else{
            $scope.currentImage = Object.keys($scope.images).length-1; 
        }
    $scope.images[$scope.currentImage].visible = true;
    };



}]);

app.controller('contactController', ['$scope', 'localStorageService', '$aside', 'sure', 'PlaceholderTextService', function($scope,localStorageService, $aside, sure, PlaceholderTextService){
 $scope.name = "";
 $scope.mail = "";
 $scope.phone = "";
 $scope.message = "";
 $scope.onSubmit = function(){
  var currentdate = new Date();
  var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
  var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
  var datetime = date + " at " + time;
  
  var flag="false"
  if ($scope.name){
    flag="true";
  }
   if ($scope.mail){
    flag="true";
  }
   if ($scope.phone){
    flag="true";
  }
   if ($scope.message){
    flag="true";
  }
  if(flag){
    var jdata={"name":$scope.name, "email":$scope.mail,"phone":$scope.phone,"m_info":$scope.message, "datetime": datetime, "destination": "Hyderabad","origin": amplify.store("o_city")};
    sure.sendProp1(jdata).success(function(info2){
     ////console.log(info2)
  })
 }
 else{
  alert("please fill all the details");
 }
}
            
 }]); 


app.controller('profilectrl', ['$scope', 'localStorageService', 'sure', 'PlaceholderTextService', function($scope,localStorageService, sure, PlaceholderTextService){
$scope.selectctrl ="";
$scope.queryctrl ="";
$scope.onSubmit = function(){
  var flag="false";
  if ($scope.selectctrl){
    flag="true";
  }
  if ($scope.queryctrl){
    flag="true";
  }
  if(flag){
    var jdata={"select":$scope.selectctrl, "query":$scope.queryctrl};
     sure.sendProp2(jdata).success(function(info2){
     ////console.log(info2)
  })
  }
  else{
  //alert("please fill all the details");
 }
}

}]); 