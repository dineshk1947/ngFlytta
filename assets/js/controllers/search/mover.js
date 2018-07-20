app.filter('strReplace', function () {
  return function (input) {
        var re = new RegExp(' ', 'g');
        var re1 = '(';
        var re2 = ')';
        return input.replace(re, "_").replace(re2, "_").replace(re1, "_");

  };
});

app.controller('moverController',['$scope', '$rootScope','$location','mover_serv','main_serv','localStorageService','$window','$datepicker'
  ,function($scope,$rootScope,$location,mover_serv,main_serv, localStorageService, $window, $datepicker){
  console.log($location.path());
  $scope.selectedIndex=0;
  $scope.count = 1;
  $scope.countarray={};
  $rootScope.json={};
  $scope.values=[];    
  $scope.values1=[];
  $scope.s_items={};
  $scope.conftext=false;
  $scope.confsch=true;
  $scope.cancsch=false;
  $scope.vwitems=true;
  $scope.MoverData=[];
  $scope.mover_areas = {};
  $scope.mover_items = {};
  if(amplify.store("totalcount")){
    $scope.countitem=amplify.store("totalcount");
  }
  else{
    $scope.countitem = 0;
  } 

  $scope.userId = amplify.store("email");
  $scope.name = amplify.store("name");
  $scope.phone = amplify.store("phone");
  $scope.tomorrow = new Date();
  //$scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  var date =  $scope.tomorrow.getDate() + "/" + ( $scope.tomorrow.getMonth() + 1) + "/" +  $scope.tomorrow.getFullYear();
  var time =  $scope.tomorrow.getHours() + ":" +  $scope.tomorrow.getMinutes() + ":" +  $scope.tomorrow.getSeconds();
  var datetime = date + " at " + time;
  if(amplify.store('mover_item') == null){
    amplify.store('mover_item', {});
  }
  $scope.selected = 1;
   $scope.selectbtn= function(item) {
  $scope.selected = item; 
  }
  $scope.isActive = function(item) {
        return $scope.selected === item;
  };

//$scope.selectbtnmover1 = 0;
    $scope.selectbtnmover = function(item) {
        $scope.selectbtnmover1 = item;
    }
    $scope.isActivem = function(item) {
        return $scope.selectbtnmover1 === item;
    };
    $scope.selectbtnmover(0);

  $scope.lisi=false;
  $scope.schv=false;
  $scope.listtab=function(){
    //alert('hi');
  $scope.lisi=true;
  $scope.schv=false;
  }
  $scope.schtab=function(){
  $scope.lisi=false;
  $scope.schv=true;
  }

  $scope.cities1=[{'cname':'Hyderabad', 'cvalue':'hyd'}];

  $scope.bhks=['1 BHK', '2 BHK', '3 BHK', '4 BHK+'];

  $scope.Liftstatus=['Yes', 'No'];

var filter=function (input) {
    var re = new RegExp(' ', 'g');
        var re1 = '(';
        var re2 = ')';
        return input.replace(re, "_").replace(re2, "_").replace(re1, "_");
  };

  $scope.listuritems=function(){
    $scope.select_status = 1;
  $('#myModal').modal({backdrop: "static", keyboard: false }).modal('show');
}
 $scope.listuritemsme=function(){
  $scope.select_status = 2;
  $('#my1Modal').modal({backdrop: "static", keyboard: false }).modal('show');
}
$scope.city_areas1=[];
$scope.mover=[];
$scope.city_areas1=[];
  $scope.getareas=function(item2, item){   
    console.log(item2);
    city1 = item2;
    $scope.city_areas1=[];
    main_serv.getArea(item).success(function(data2){
          for(var i in data2){
            $scope.city_areas1.push({"id":i,"value":data2[i]});
          }
          $scope.mover['area1']=$scope.city_areas1;   
    });

  } 
  $scope.city_areas2=[];
  $scope.getareas1=function(item2, item){
    city2=item2;
    $scope.city_areas2=[];
    main_serv.getArea(item).success(function(data2){
          for(var i in data2){
            $scope.city_areas2[i] = {"id":i,"value":data2[i]};
          }
          $scope.mover['area2']=$scope.city_areas2;      
      });
  }
  $scope.getar1=function(item){
    area1 = item;
  }
  $scope.getar2=function(item){
    area2 = item;
  }
  $scope.getbhk1=function(item){
    bhk1 = item;
  }
  $scope.getbhk2=function(item){
    bhk2 = item;
  }

$scope.changetab = {
        placeholder: 'Select the category',
        allowSearch: false,
        allowMultipleSelection: false,
        onChange: function(val) {
            console.log('New value of dropdown is ' + val);
             var category = val;
             $scope.giveMoverData(category);
             console.log(category)
    }
};

  //$scope.categories = [{'id':0,value:'Bedroom'}, {'id':1, value:'Living Room'},{'id':2, value:'Dinning Room'},{'id':3,value:'Storage'},{'id':4,value:'Kitchen'},{'id':5, value:'Others'}];
  $scope.categories = ['Bedroom', 'Living Room', 'Dinning Room','Storage','Kitchen','Others'];
   $scope.onTabChanges = function(currentTabIndex){
      console.log(currentTabIndex);
        'Current tab ' + currentTabIndex;
        $scope.selectedIndex=currentTabIndex;
        $scope.giveMoverData(currentTabIndex);
    };    
    $scope.giveMoverData = function(category){
        console.log($scope.selectedIndex);
        if (category == 'Bedroom' || category == 0){
            $scope.otherdata=false;
            $scope.MoverData= $scope.mover_items['Bedroom'];
        }
        else if (category == 'Living Room' || category == 1){
            $scope.otherdata=false;
            $scope.MoverData=  $scope.mover_items['Living Room'];
            $scope.countarray;
        }
        else if (category == 'Dinning Room' || category == 2){
            $scope.otherdata=false;
            $scope.MoverData=  $scope.mover_items['Dinning Room'];
        }
        else if (category == 'Storage' || category == 3){
            $scope.otherdata=false;
            $scope.MoverData=  $scope.mover_items['Storage'];
        }
        else if (category == 'Kitchen' || category == 4){
            $scope.otherdata=false;
            $scope.MoverData=  $scope.mover_items['Kitchen'];
        }
        else if (category == 'Others' || category == 5){            
            $scope.MoverData=  $scope.mover_items['Others'];
            $scope.otherdata=true;
        }
        $scope.token=[];
        if($scope.MoverData){
          if($scope.MoverData.length>0){
            for(var k = 0; k < $scope.MoverData.length; k++){
              $scope.fil=filter($scope.MoverData[k]);
              $scope.token.push($scope.fil);
            }
          }   
        }      
    };
    // $scope.giveMoverData = function(category){
    //     console.log($scope.selectedIndex);
    //     if ($scope.selectedIndex == 0){
    //         $scope.otherdata=false;
    //         $scope.MoverData= $scope.mover_items['Bedroom'];
    //     }
    //     else if ($scope.selectedIndex == 1){
    //         $scope.otherdata=false;
    //         $scope.MoverData=  $scope.mover_items['Living Room'];
    //         $scope.countarray;
    //     }
    //     else if ($scope.selectedIndex == 2){
    //         $scope.otherdata=false;
    //         $scope.MoverData=  $scope.mover_items['Dinning Room'];
    //     }
    //     else if ($scope.selectedIndex == 3){
    //         $scope.otherdata=false;
    //         $scope.MoverData=  $scope.mover_items['Storage'];
    //     }
    //     else if($scope.selectedIndex == 4){
    //         $scope.otherdata=false;
    //         $scope.MoverData=  $scope.mover_items['Kitchen'];
    //     }
    //     else if($scope.selectedIndex == 5){            
    //         $scope.MoverData=  $scope.mover_items['Others'];
    //         $scope.otherdata=true;
    //     }
    //     $scope.token=[];
    //     if($scope.MoverData){
    //       if($scope.MoverData.length>0){
    //         for(var k = 0; k < $scope.MoverData.length; k++){
    //           $scope.fil=filter($scope.MoverData[k]);
    //           $scope.token.push($scope.fil);
    //         }
    //       }   
    //     }      
    // };
    
    $scope.updateData = function()
    {
      $scope.$apply();
    }
    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  var init=function(){
    // if(!amplify.store("email") || !amplify.store("uid")){
    //   location.href = "/";
    // }
 //   else{
      $rootScope.json = amplify.store('mover_item');
      if(amplify.store("email") && amplify.store("uid")){  
        mover_serv.getValue().success(function(data){
          console.log(data);
          if(data["data"] == "1"){
            amplify.store('mover_item',data["value"]);
             $rootScope.json = amplify.store('mover_item');
            $scope.m_status = data['status'];
           // alert($scope.m_status);
            var item_flag = false;
            $scope.s_it=[];
            for(var i in $rootScope.json){
               if(i == "date"){
                if($rootScope.json[i]["s_date"]){
                  $scope.item_status = 0;
                }
                else{
                  $scope.item_status = 1;
                }
               }
               if(i != "Current_place" && i != "Destination_place" && i != "Estimated_charge" &&  i != "payment" && i != "date" && i!= "Original_charge"){
                  $scope.s_it.push(i);
                  //$scope.item_status = 1;
                  item_flag =true;
                  $scope.s_items[i] = $rootScope.json[i];
                  if($rootScope.json[i]['Quantity'] != 0){
                      $scope.countarray[i]=$rootScope.json[i]['Quantity']; 
                  }
                  if($rootScope.json[i]['Dismantlable'] == "Yes"){
                      $scope.values['mov'+i]=true;
                  }
                  else if($rootScope.json[i]['Dismantlable'] == "No"){
                      $scope.values['mov'+i]=false;
                  } 
                }   
            }
            if($scope.s_it.length == 0){
                $scope.vwitems=false;
            }
            $scope.countitem =$scope.s_it.length;
            console.log($scope.s_items);
            // if(!item_flag){
            //   $scope.item_status = 0;
            // }
            console.log($rootScope.json);
            if(data['status'] == 4){
               if($location.path() != "/mover/completed"){
                location.href = "/mover/completed";
              }
            }
            if(data['status'] == 3 || data["status"] == 2){
               if($location.path() != "/mover/confirm"){
                location.href = "/mover/confirm";
              }
            }
            else if(data["status"] == 1){
              // $scope.conftext=true;
              // $scope.cancsch=false;
              // $scope.confsch = false;         
              if($location.path() != "/mover/add-details"){
                location.href = "/mover/add-details"
              }
            }
          }
        });
      }    
   // }
     mover_serv.getItems().success(function(data2){
        $scope.mover_items = data2;
        for(var m in $scope.mover_items){
            for(var k in $scope.mover_items[m]){
            var inifiltered = filter($scope.mover_items[m][k]);
            $scope.countarray[inifiltered]=0;
          }
        }
        $scope.giveMoverData('Bedroom');
      //$scope.onTabChanges(0); 
      });
  }
  init();
  $scope.viewitems=function(){    
      $scope.itm=$scope.s_items;
       $('#Modal_list').modal('show');       
  };
        $scope.giveMoverData('Bedroom');
  //$scope.onTabChanges(0); 
  $scope.increment = function(countnum) { 
    var filtered = filter(countnum);
     if($scope.countarray[filtered] == undefined || $scope.countarray[filtered] == 0){
        $scope.countarray[filtered]=1;
        $scope.countitem++;
        amplify.store("totalcount", $scope.countitem);
        console.log($scope.countarray);     
        if($scope.otherinputs){
          for(var i in $scope.otherinputs){
              var item_id=filter($scope.otherinputs[i]['otheritems']);
              if(item_id == filtered){
                  $scope.otherinputs[i].countitem++;
              }
          }
        }
    }
    else{
      $scope.count=$scope.countarray[filtered];
      $scope.count++;
      $scope.countarray[filtered]=$scope.count;
       console.log($scope.countarray);  
       if($scope.otherinputs){
          for(var i in $scope.otherinputs){
              var item_id=filter($scope.otherinputs[i]['otheritems']);
              if(item_id == filtered){
                  $scope.otherinputs[i].countitem++;
              }
          }
        }
    }
    var some = $scope.values['mov'+filtered];
    if(some == undefined || some == false){
          var discheck="No";
    }
    if(some == true){
          var discheck="Yes";
    }
    $scope.s_items[filtered]={"Item":countnum, "Quantity":$scope.countarray[filtered], "Dismantlable":discheck,"datetime":datetime};
    $rootScope.json[filtered]={"Item":countnum, "Quantity":$scope.countarray[filtered], "Dismantlable":discheck,"datetime":datetime};
    amplify.store('mover_item', $rootScope.json);
    if(amplify.store("email") && amplify.store("uid")){
      var final_mover={"user":$scope.userId,"value":$rootScope.json,"status":1};
      final_mover=JSON.stringify(final_mover);
      if(final_mover){
        mover_serv.sendValue(final_mover).success(function(data){
          if(data.data == 1){
            console.log("Data sent successfully");
          } 
          else{
            //alert("Data sending failed");
          }
        });
      }
    }
    $scope.s_items[filtered]=$rootScope.json[filtered];    
  };

  $scope.decrement = function(countnum) {
    var filtered = filter(countnum);
    if ($scope.countarray[filtered] == 1) { 
      delete $rootScope.json[filtered];
      delete $scope.s_items[filtered];
      $scope.countarray[filtered]=0;      
      $scope.values['mov'+filtered]=false;
      amplify.store('mover_item', $rootScope.json);
      var final_mover={"user":$scope.userId,"value":$rootScope.json,"status":1};
      final_mover=JSON.stringify(final_mover);
      if(final_mover){
        mover_serv.sendValue(final_mover).success(function(data){
          if(data.data == 1){
            console.log("Data sent successfully");
          } 
          else{
            //alert("Data sending failed");
          }
        });
      }
      $scope.countitem--; 
      amplify.store("totalcount", $scope.countitem);    
      if($scope.otherinputs){
      for(var i in $scope.otherinputs){
          var item_id=filter($scope.otherinputs[i]['otheritems']);
          if(item_id == filtered){
              $scope.otherinputs[i].countitem--;
              $scope.otherinputs[i].discheck=false;
              $scope.otherinputs[i].otheritems='';
          }
      }
    }
    }
    else if ($scope.countarray[filtered] == 0) { 
      return; 
    } 
    else if($scope.countarray[filtered] == undefined){
        //$scope.countarray[filtered]=1;
        //console.log($scope.countarray);
    }
    else{
        if($scope.otherinputs){
            for(var i in $scope.otherinputs){
                var item_id=filter($scope.otherinputs[i]['otheritems']);
                if(item_id == filtered){
                    $scope.otherinputs[i].countitem--;
                }
            }
          }      
      $scope.count=$scope.countarray[filtered];
      $scope.count--;
      $scope.countarray[filtered]=$scope.count;
      var some = $scope.values['mov'+filtered]
      if(some == undefined || some == false){
            var discheck="No";
      }
      if(some == true){
            var discheck="Yes";
      }
      $scope.s_items[filtered]={"Item":countnum, "Quantity":$scope.countarray[filtered], "Dismantlable":discheck,"datetime":datetime};
      $rootScope.json[filtered]={"Item":countnum, "Quantity":$scope.countarray[filtered], "Dismantlable":discheck,"datetime":datetime};
      amplify.store('mover_item', $rootScope.json);
      if(amplify.store("email") && amplify.store("uid")){
        var final_mover={"user":$scope.userId,"value":$rootScope.json,"status":1};
        final_mover=JSON.stringify(final_mover);
        if(final_mover){
          mover_serv.sendValue(final_mover).success(function(data){
              if(data.data == 1){
                console.log("Data sent successfully");
              } 
              else{
                //alert("Data sending failed");
              }
          });
        }
      }
      $scope.s_items[filtered]=$rootScope.json[filtered];
    }   
  };

$scope.movecheck=function(items){
  var movecheck1 = filter(items);
  var mcheck = $scope.values['mov'+movecheck1];
  if(mcheck == undefined || mcheck == false){
        var discheck="No";
  }
  if(mcheck == true){
        var discheck="Yes";
  }
  if($rootScope.json[movecheck1]){
    $rootScope.json[movecheck1]["Dismantlable"] = discheck;
    $rootScope.json[movecheck1]["datetime"] = datetime;
    amplify.store('mover_item', $rootScope.json);
    if(amplify.store("email") && amplify.store("uid")){
      var final_mover={"user":$scope.userId,"value":$rootScope.json,"status":1};
      final_mover=JSON.stringify(final_mover);
      if(final_mover){
        mover_serv.sendValue(final_mover).success(function(data){
         if(data.data == 1){
            console.log("Data sent successfully");
          } 
          else{
            //alert("Data sending failed");
          }
        });
      }
    }
    $scope.s_items[movecheck1]=$rootScope.json[movecheck1];
  }
}


$scope.removedmitem=function(rmitem){ 
  var rmitem = filter(rmitem);
  delete $rootScope.json[rmitem];
  //console.log($scope.json);
  $scope.countarray[rmitem]=0;      
  $scope.values['mov'+rmitem]=false;
  amplify.store('mover_item', $rootScope.json);
    if(amplify.store("email") && amplify.store("uid")){
      var final_mover = {"user":$scope.userId,"value":$rootScope.json,"status":1};
      final_mover=JSON.stringify(final_mover);
       if(final_mover){
        mover_serv.sendValue(final_mover).success(function(data){
          if(data.data == 1){
            console.log("Data sent successfully");
          } 
          else{
            //alert("Data sending failed");
          }
        });
      }
    }
      delete $scope.s_items[rmitem];
      $scope.countitem--;
        amplify.store("totalcount", $scope.countitem);
      if($scope.otherinputs){
      for(var i in $scope.otherinputs){
          var item_id=filter($scope.otherinputs[i]['otheritems']);
          if(item_id == rmitem){
              $scope.otherinputs[i].countitem=0;
              $scope.otherinputs[i].discheck=false;
              $scope.otherinputs[i].otheritems='';
          }
      }
    }
}


$scope.otherinputs=[
    {
      otheritems: '',
      discheck: false,
      countitem :'0'
    }];
  console.log($scope.otherinputs[0].discheck);

var addinput = function(itemnum) {
      var item_num=itemnum++;
      var dataObj = {
      otheritems: '',
      discheck: false,
      countitem:'0'};
      $scope.otherinputs.push(dataObj);
      console.log($scope.otherinputs);
    }

$scope.increment1 = function(itmindx) { 
  //alert('hi');
      var otheritem1=$scope.otherinputs[itmindx].otheritems;
      if(otheritem1){
      var otheritem=filter(otheritem1);
     // console.log(otheritem);
     if($scope.countarray[otheritem] == undefined || $scope.countarray[otheritem] == 0){
        addinput(itmindx);
        $scope.countarray[otheritem]=1;
        $scope.otherinputs[itmindx].countitem++;
       // console.log($scope.countarray);
    }
    else{
      $scope.count=$scope.countarray[otheritem];
      $scope.count++;
      $scope.otherinputs[itmindx].countitem++;
      $scope.countarray[otheritem]=$scope.count;
    }
    var some = $scope.otherinputs[itmindx]['discheck'];
  //  console.log(some);
    if(some == undefined || some == false){
          var discheck="No";
    }
    if(some == true){
          var discheck="Yes";
    }
     //console.log($scope.countarray['']);
    $scope.s_items[otheritem]={"Item":otheritem1, "Quantity":$scope.countarray[otheritem], "Dismantlable":discheck,"datetime":datetime};
    $rootScope.json[otheritem]={"Item":otheritem1, "Quantity":$scope.countarray[otheritem], "Dismantlable":discheck,"datetime":datetime};
    //console.log($rootScope.json[otheritem]);
    amplify.store('mover_item', $rootScope.json);
    if(amplify.store("email") && amplify.store("uid")){
      var final_mover={"user":$scope.userId,"value":$rootScope.json,"status":"1"};
      final_mover=JSON.stringify(final_mover);
      if(final_mover){
        mover_serv.sendValue(final_mover).success(function(data){
          if(data.data == 1){
            console.log("Data sent successfully");
          } 
          else{
            //alert("Data sending failed");
          }
        });
      }
    }
    $scope.s_items[otheritem]=$rootScope.json[otheritem];  
    }
    else{    
    //alert('hi');  
     $("#otheritemsnull").modal('show');
    }  
  };

  $scope.decrement1 = function(itmindx) {
    var otheritem1=$scope.otherinputs[itmindx].otheritems;
    if(otheritem1){
      var otheritem=filter(otheritem1);
    if ($scope.countarray[otheritem] == 1) { 
      delete $rootScope.json[otheritem];
      delete $scope.s_items[otheritem];
      $scope.countarray[otheritem]=0;      
      $scope.otherinputs[itmindx].discheck=false;
      $scope.otherinputs[itmindx].otheritems='';
     // removeinput(itmindx);
     // $scope.values['mov'+filtered]=false;
      amplify.store('mover_item', $rootScope.json);
      if(amplify.store("email") && amplify.store("uid")){
        var final_mover={"user":$scope.userId,"value":$rootScope.json,"status":1};
        final_mover=JSON.stringify(final_mover);
        if(final_mover){
          mover_serv.sendValue(final_mover).success(function(data){
            if(data.data == 1){
              console.log("Data sent successfully");
            } 
            else{
              //alert("Data sending failed");
            }
          });
        }
      }
      $scope.otherinputs[itmindx].countitem--;
    }
    else if ($scope.countarray[otheritem] == 0) { 
      return; 
    } 
    else if($scope.countarray[otheritem] == undefined){
        //$scope.countarray[filtered]=1;
        //console.log($scope.countarray);
    }
    else{
      $scope.count=$scope.countarray[otheritem];      
      $scope.otherinputs[itmindx].countitem--;
      $scope.count--;
      $scope.countarray[otheritem]=$scope.count;
      var some = $scope.otherinputs[itmindx]['discheck'];
     console.log(some);
      if(some == undefined || some == false){
            var discheck="No";
      }
      if(some == true){
            var discheck="Yes";
      }
      $scope.s_items[otheritem]={"Item":otheritem1, "Quantity":$scope.countarray[otheritem], "Dismantlable":discheck,"datetime":datetime};
      $rootScope.json[otheritem]={"Item":otheritem1, "Quantity":$scope.countarray[otheritem], "Dismantlable":discheck, "datetime":datetime};
      amplify.store('mover_item', $rootScope.json);
      if(amplify.store("email") && amplify.store("uid")){
        var final_mover={"user":$scope.userId,"value":$rootScope.json};
        final_mover=JSON.stringify(final_mover);
        if(final_mover){
          mover_serv.sendValue(final_mover).success(function(data){
              if(data.data == 1){
                console.log("Data sent successfully");
              } 
              else{
                //alert("Data sending failed");
              }
          });
        }
      }
      $scope.s_items[otheritem]=$rootScope.json[otheritem];
      }
    } 
    else{      
     $("#otheritemsnull").modal('show');
    } 
  };

$scope.movecheck1=function(itemnumb){
  var otheritem1=$scope.otherinputs[itemnumb].otheritems;
  if(otheritem1){
  var otheritem=filter(otheritem1);
  var mcheck = $scope.otherinputs[itemnumb].discheck;
  console.log(mcheck);
  if(mcheck == undefined || mcheck == false){
        var discheck="No";
  }
  if(mcheck == true){
        var discheck="Yes";
  }
  if($rootScope.json[otheritem]){
    $rootScope.json[otheritem]["Dismantlable"] = discheck;
    $rootScope.json[otheritem]["datetime"] = datetime;
    amplify.store('mover_item', $rootScope.json);
    if(amplify.store("email") && amplify.store("uid")){
      var final_mover={"user":$scope.userId,"value":$rootScope.json,"status":1};
      final_mover=JSON.stringify(final_mover);
      if(final_mover){
        mover_serv.sendValue(final_mover).success(function(data){
         if(data.data == 1){
            console.log("Data sent successfully");
          } 
          else{
            //alert("Data sending failed");
          }
        });
      }
    }
    $scope.s_items[otheritem]=$rootScope.json[otheritem];
  }
}
else{
  $scope.otherinputs[itemnumb].discheck=false;
  //alert('Please enter item name');
}
}

$scope.gottonext=function(){
    $scope.values=[];
    console.log($rootScope.json);
    if(angular.equals({}, $scope.s_items)){
      //alert('Please add items');
    }
    else{
      if(amplify.store("email") && amplify.store("uid")){
        var final_mover={"user":$scope.userId,"value":$rootScope.json,"status":2};
        final_mover=JSON.stringify(final_mover);
        mover_serv.sendValue(final_mover).success(function(data){
          if(data.data == 1){
            console.log("Data sent successfully");
              location.href = "/mover/review";
          } 
          else{
            //alert("Data sending failed");
          }
        });
      }  
    }
}

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
$scope.move_date;
$scope.get_date_ = function(){
  //alert($scope.move_date);
}
$scope.cancelme=function(){
  location.href="/mover/add-details";
}
$scope.getcuraddr = function(){
    var c_addr=$scope.mover_areas['Current_place']['addr'];
    $rootScope.json["Current_place"]["addr"] = c_addr;
    $rootScope.json["Current_place"]["datetime"] = datetime;
    amplify.store('mover_item', $rootScope.json);
    if(amplify.store("email") && amplify.store("uid")){
      var com_mover_data={"user":$scope.userId,"value":$rootScope.json,"status":1};
      mover_serv.sendValue(com_mover_data).success(function(data){
              if(data.data == 1){
                localStorageService.set('mover_item', $rootScope.json);
                // console.log(localStorageService.get("mover_item"));
              } 
              else{
               
              }
      });
    }
}
$scope.nextfill = function(){
   if($scope.mover_areas['Current_place']['addr'] && $scope.mover_areas['Destination_place']['addr'] && $scope.move_date && $scope.move_time && ($scope.move_date != undefined) && ($scope.move_time != undefined)){
     $("#myModal").modal('show');
  }

  else {
    $("#mainError").html("Please fill all the details");
    $("#errorModal").modal("show");
  }
}
$scope.getdestaddr = function(){
  var d_addr=$scope.mover_areas['Destination_place']['addr'];
  $rootScope.json["Destination_place"]["addr"] = d_addr;
  $rootScope.json["Destination_place"]["datetime"] = datetime;
  amplify.store('mover_item', $rootScope.json);
  if(amplify.store("email") && amplify.store("uid")){
    var com_mover_data={"user":$scope.userId,"value":$rootScope.json,"status":1};
    mover_serv.sendValue(com_mover_data).success(function(data){
            if(data.data == 1){
              localStorageService.set('mover_item', $rootScope.json);
              // console.log(localStorageService.get("mover_item"));
            } 
            else{
            }
    });
  }
}

  $scope.mover_areas['Current_place']={};
  $scope.mover_areas['Destination_place']={};
  $scope.submit_basic_1=function(){  
  if( Object.keys($scope.s_items).length>0){
   var mv_time=$scope.move_time;
  var m_time1=gettime(mv_time);
   var mv_date=$scope.move_date;
   var m_date1=getdate(mv_date);
  var m_date=m_date1+" at "+m_time1;
    $rootScope.json["date"] ={"m_date":m_date,"datetime":datetime};
    amplify.store('mover_item', $rootScope.json);
    if(amplify.store("email") && amplify.store("uid")){
      var com_mover_data={"user":$scope.userId,"value":$rootScope.json,"status":2};
      mover_serv.sendValue(com_mover_data).success(function(data){
              if(data.data == 1){
                  location.href = "/mover/confirm";
              } 
              else{
                //alert("Data sending failed");
              }
      });
    }
    else{
      var url_status1 = 'mover';
      $scope.auth0_login(url_status1);
    }
 }
  else{
    $("#mainError").html("Please select the items");
    $("#errorModal").modal("show");
  }
 }

$scope.submit_basic_2 = function(){
  console.log($scope.mover_areas['Current_place']['addr']);
if($scope.mover_areas['Current_place']['addr'] && $scope.mover_areas['Destination_place']['addr'] && $scope.move_date && $scope.move_time && $scope.sch_date && $scope.sch_time){
    // var c_addr=$scope.mover_areas['Current_place']['addr'];
    // var d_addr=$scope.mover_areas['Destination_place']['addr'];
    // $rootScope.json["Destination_place"]["addr"] = d_addr;
    // $rootScope.json["Current_place"]["addr"] = c_addr;
    var mv_date=$scope.move_date;
    var mv_time=$scope.move_time;
    console.log(mv_date);
    console.log(mv_time);
    var m_date1=getdate(mv_date);
    var m_time1=gettime(mv_time);
    var m_date=m_date1+" at "+m_time1;
    var sc_date=$scope.sch_date;
    var sc_time=$scope.sch_time;
    var sc_date1=getdate(sc_date);
    var sc_time1=gettime(sc_time);
    var s_date=sc_date1+" at "+sc_time1;
    $rootScope.json["date"] ={'m_date':m_date, 's_date':s_date,"datetime":datetime};
    amplify.store('mover_item', $rootScope.json);
    if(amplify.store("email") && amplify.store("uid")){
      var com_mover_data={"user":$scope.userId,"value":$rootScope.json,"status":2};
      mover_serv.sendValue(com_mover_data).success(function(data){
              if(data.data == 1){
                // localStorageService.set('mover_item', $rootScope.json);
                // console.log(localStorageService.get("mover_item"));
               location.href = "/mover/confirm";
                $("#my1Modal").modal('hide');
              } 
              else{
                //alert("Data sending failed");
              }
      });
    }
    else{
      var url_status1 = 'mover';
      $scope.auth0_login(url_status1);
    }
   }
  else{
    $("#mainError").html("Please fill all the details");
    $("#errorModal").modal("show");
  }
}
$scope.gottonext1=function(){
  var c_addr=$scope.mover_areas['Current_place']['addr'];
  var d_addr=$scope.mover_areas['Destination_place']['addr'];
  $rootScope.json["Destination_place"]["addr"] = d_addr;
  $rootScope.json["Current_place"]["addr"] = c_addr;
    var curr_city=$scope.mover.city1['cname'];
    var curr_area=$scope.mover_areas['Current_place']['curr_area']["value"];
    
    var c_BHK=$scope.mover_areas['Current_place']['BHK'];
    var c_Floor=$scope.mover_areas['Current_place']['Floor'];
    var c_Lift=$scope.mover_areas['Current_place']['Lift'];
    var dest_city=$scope.mover.city2['cname'];
    var dest_area=$scope.mover_areas['Destination_place']['dest_area']["value"];
    var d_addr=$scope.mover_areas['Destination_place']['addr'];
    var d_BHK=$scope.mover_areas['Destination_place']['BHK'];
    var d_Floor=$scope.mover_areas['Destination_place']['Floor'];
    var d_Lift=$scope.mover_areas['Destination_place']['Lift'];
    var mv_date=$scope.move_date;
    var mv_time=$scope.move_time;
    if(curr_city && curr_area && c_addr && c_BHK && c_Floor && c_Lift && dest_city && dest_area && d_addr && d_BHK && d_Floor && d_Lift && mv_time && mv_date){
        $rootScope.json["Destination_place"] ={
          "dest_city":dest_city,"dest_area":dest_area, "addr":d_addr, "BHK":d_BHK, "Floor":d_Floor, "Lift":d_Lift
        }
        $rootScope.json["Current_place"] ={
          "curr_city":curr_city,"curr_area":curr_area, "addr":c_addr, "BHK":c_BHK, "Floor":c_Floor, "Lift":c_Lift
        }
      
      var m_date1=getdate(mv_date);
      var m_time1=gettime(mv_time);
      console.log($scope.move_date);
      console.log($scope.move_time);
      var m_date=m_date1+" at "+m_time1;
      $rootScope.json["date"] ={"m_date":m_date };
      var com_mover_data={"user":$scope.userId,"value":$rootScope.json,"status":"3"};
      mover_serv.sendValue(com_mover_data).success(function(data){
              if(data.data == 1){
                amplify.store('mover_item', $rootScope.json);
                console.log(amplify.store("mover_item"));
               //location.href = "/mover/schedule-vendor-visit";
              } 
              else{
                //alert("Data sending failed");
              }
      });
    }
    else{
      $("#mainError").html("Please fill all the details");
      $("#errorModal").modal("show");
    }
}

$scope.gottoprev=function(){

      location.href = "/mover/add-items";

}
$scope.gotoprevious=function(){
      location.href = "/";
}
$scope.gottoprev1=function(){

      location.href = "/mover/schedule-vendor-visit";

}

// $scope.rvamount=200;
    $scope.couponapplied=false;
    $scope.couponnotvalid=false;
    $scope.couapld=true;
    $scope.couponapplyMv=function(mvamount, couponcode){ 
        console.log(couponcode);
        var couponid=couponcode;  
        mvamount=Math.round(mvamount) 
      //  alert(mvamount);    
        $scope.mvamount = mvamount;
        mover_serv.couponApply(couponid, $scope.mvamount).success(function(data) {
          console.log(data);
            if (data["data"] == "1") {
                $scope.couapld = false;
                $scope.couponnotvalid=false;
                $scope.couponapplied=true;
                $scope.mvamount=data["item"];
                $scope.Mvdescription=data["description"];
            }
            else{
                $scope.couponnotvalid=true;
                $scope.couponapplied=false;
            }
        });
    }

var movers_payment = function(res){
  console.log(res);
    $rootScope.json["payment"] = {"amount":res["amount"]};
    var s_date_details={"user":$scope.userId,"payment":$rootScope.json["payment"],"status":"6"};
    mover_serv.sendPayment(s_date_details).success(function(data){
        if(data.data == 1){
          amplify.store('mover_item', $rootScope.json);
          location.href = "/mover/completed";
        } 
        else{
          //alert("Data sending failed");
        }
    });
}

$scope.gottonext2=function(amount){
  amount = Math.round(amount);
  //alert(amount);
  if($scope.couponapplied==true){
      var amount = $scope.mvamount * 100;
  }
  else{
      var amount = amount * 100;
  }
  //amount = parseInt(amount)*100;
   var options = {
    "key": "rzp_live_S86zhLgjeRbDVe",
    "amount": amount, // 2000 paise = INR 20
    "name": "Flytta",
    "description": "House Visit Charges",
    "image": "/assets/img/logo_flytta.ico",
    "handler": movers_payment,
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

$scope.mconfirmsch=function(){
    var sc_date=$scope.sch_date;
    var sc_time=$scope.sch_time;
    if(sc_time && sc_date){
      $scope.conftext=true;
      $scope.confsch=false;
      var sc_date1=getdate(sc_date);
      var sc_time1=gettime(sc_time);
      var s_date=sc_date1+" at "+sc_time1;
      console.log(s_date);
      $rootScope.json['date']['s_date'] =s_date;
      console.log($rootScope.json);
      var s_date_details={"user":$scope.userId,"value":$rootScope.json,"status":"4"};
      mover_serv.sendValue(s_date_details).success(function(data){
          if(data.data == 1){
            amplify.store('mover_item', $rootScope.json);
            console.log(amplify.store("mover_item"));
          } 
          else{
            console.log("Data sending failed");
          }
      });
    }
    else{
      //alert("Please fill the required filled");
    }
    

}
$scope.proceednext=function(){
    location.href = "/mover/confirm";
}

$scope.viewprice_details = function(){
  $("#pricemodal").modal('show');
}


}]);
