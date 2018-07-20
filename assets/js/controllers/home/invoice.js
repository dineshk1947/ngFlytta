app.controller('invoiceController',['$scope', '$location', 'main_serv','$window',function($scope, $location, main_serv,$window){
$scope.inv_data = {};
$scope.invoice_data = {};
$scope.propdata=false;
$scope.movedata=false;
$scope.predata=false;
$scope.invdiv=false;
$scope.subbtn=false;
$scope.totalamount = 0.0;

$scope.url=$location.path();
var fields = $scope.url.split('/');
console.log(fields[2]);
var inv_no = fields[2];
var s_no = fields[3];
$scope.s_no = s_no;
$scope.c_name=amplify.store('name');
$scope.c_email=amplify.store('email');
console.log(s_no);
$scope.inno=inv_no;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = dd + '/' + mm + '/' + yyyy;
$scope.todaydate=today;

main_serv.invdetails(inv_no).success(function(info2) {
            console.log(info2);
    if(info2['data'] == '1'){

        $scope.invdatapres=true;
        $scope.inv_data=info2;
        console.log($scope.inv_data);
     
        if($scope.inv_data['item'][s_no]['type'] == 'property'){
            $scope.propdata=true;
            $scope.invoice_data['prop']=$scope.inv_data['item'][s_no];
            $scope.totalamount+=parseFloat($scope.invoice_data['prop']['amount']);
            $scope.totalamount=$scope.totalamount.toFixed(2);
            console.log($scope.invoice_data);
            $scope.invoice_data['prop']['amount1']=$scope.invoice_data['prop']['amount'];
            $scope.invoice_data['prop']['amount2']=$scope.invoice_data['prop']['amount'];
            $scope.invoice_data['prop']['qty']=1;
        }
        if($scope.inv_data['item'][s_no]['type'] == 'mover'){
            $scope.movedata=true;
            $scope.invoice_data['move']=$scope.inv_data['item'][s_no];
            console.log($scope.invoice_data['move']);
            $scope.totalamount=parseFloat($scope.totalamount);
            $scope.totalamount+=parseFloat($scope.invoice_data['move']['amount']);
            if($scope.invoice_data['move']['taxes']){
                $scope.cgstammount=((parseFloat($scope.invoice_data['move']['taxes']['CGST'])/100)*parseFloat($scope.invoice_data['move']['amount'])).toFixed(2);
                $scope.totalamount+=parseFloat($scope.cgstammount);
                $scope.sgstammount=((parseFloat($scope.invoice_data['move']['taxes']['SGST'])/100)*parseFloat($scope.invoice_data['move']['amount'])).toFixed(2);
                $scope.totalamount+=parseFloat($scope.sgstammount);
                $scope.totalamount=$scope.totalamount.toFixed(2);
                console.log($scope.totalamount);
            }    
            $scope.invoice_data['move']['amount1']=$scope.invoice_data['move']['amount'];
            $scope.invoice_data['move']['amount2']=$scope.invoice_data['move']['amount'];
            $scope.invoice_data['move']['qty']=1;
        }
        if($scope.inv_data['item'][s_no]['type'] == 'pre-pay'){
            $scope.predata=true;
            $scope.invoice_data['prepay']=$scope.inv_data['item'][s_no];    
            $scope.totalamount=parseFloat($scope.totalamount);
            $scope.totalamount+=parseFloat($scope.invoice_data['prepay']['amount']);
            $scope.totalamount=$scope.totalamount.toFixed(2);
            console.log($scope.totalamount);
            console.log($scope.invoice_data);
            $scope.invoice_data['prepay']['amount1']=$scope.invoice_data['prepay']['amount'];
            $scope.invoice_data['prepay']['amount2']=$scope.invoice_data['prepay']['amount'];
            $scope.invoice_data['prepay']['qty']=1;
        }
    }
    else{    
        $scope.invdatapres=false;
    }
});

$scope.invinputs=[];
$scope.invincount=$scope.invinputs.length;
$scope.inputsinv = function() {
      $scope.subbtn=true;
      //var item_num=itemnum++;
      $scope.invincount++;
      var dataObj = {
      paidfor: '',
      enterdetails: '',
      qunty: '',
      inputrate: '',
      inputamount:''};
      $scope.invinputs.push(dataObj);
      console.log($scope.invinputs);
}
$scope.inputdataarray = [];
$scope.invoice_data1 = {};
$scope.invoice=function(indexnum){
    console.log($scope.invinputs);
    if($scope.invinputs[0].paidfor != ''){    
    $scope.invdiv=true;
    for(var i in $scope.invinputs){    
    $scope.invoice_data1 = {};
    $scope.totalamount=parseFloat($scope.totalamount);
    $scope.invoice_data1['name']=$scope.invinputs[i].paidfor;
    $scope.invoice_data1['loca']=$scope.invinputs[i].enterdetails;
    $scope.invoice_data1['qty']=$scope.invinputs[i].qunty;
    $scope.invoice_data1['amount1']=$scope.invinputs[i].inputrate
    $scope.invoice_data1['amount2']=$scope.invinputs[i].inputamount;
    $scope.totalamount+=parseFloat($scope.invoice_data1['amount2']);
    $scope.inputdataarray.push($scope.invoice_data1);
    }
    console.log($scope.inputdataarray);
    }
    else{
        alert('please enter details');
    }
}

$scope.gotopage=function(){
    if($scope.inv_data['item'][s_no]['type'] == 'property'){
        location.href = "/property/confirm-property";
    }
    if($scope.inv_data['item'][s_no]['type'] == 'mover'){
        location.href = "/mover/completed";
    }
    if($scope.inv_data['item'][s_no]['type'] == 'pre-pay'){
        location.href = "/property/confirm-property";
    }
}
}]);