app.controller("scheduleCtrl",['$scope', 'itemsFactory',function ($scope,itemsFactory) {
    itemsFactory.getSchedule().then(function (resSchedule) {
        $scope.scheduleData = resSchedule.data.item;

    });
    $scope.timeData = 'Time';
    $scope.view_link=function(getResquestId){
        $scope.appendData= getResquestId;
        $("#error_data").html("https://www.goflytta.com/confirm-schedule/"+$scope.appendData);
        $("#error_request").modal("show");

    }
    $scope.view_details=function(custResId){
        itemsFactory.getCustomerSchedule(custResId).then(function (resCusData) {
           var poductData = resCusData.data.item.schedule;
             var product =[];
            for (var i = 0; i < poductData.length; i++) {
                itemsFactory.getCustProperty(poductData[i].prop_id).then(function (resCustProp) {
                    product.push(resCustProp);
                    $("#data").html($scope.properties);
                });
            }
            $scope.properties = product
            $("#error").modal("show");
        });
    }
    
    $scope.newAppointment = function () {
        $("#appointment_data").html();
        $("#appointment").modal("show");
    }
    var getdate = function (datetime) {
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
            var ws1 = m[2];phoneDetails
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
            date = month1.replace(/</, "&lt;") + "-" + int1.replace(/</, "&lt;") + "-" + year1.replace(/</, "&lt;");
        }
        return date;
    }
    $scope.tomorrow = new Date();
    $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
    $scope.reqdate = function () {
        $scope.rrdate1 = $scope.rrdate['req_date'];
        $scope.tem_rdate = getdate($scope.rrdate1);
    }

    $scope.timeSelect = function (timeVal) {
        console.log("timeVal",timeVal);
            $scope.timeData =timeVal;
    }
    $scope.phoneDetails = function (phoneData) {
        console.log("checking for phone data",phoneData);
        if(phoneData == undefined){
            $scope.dataZero = false;
            $scope.dataOne=false;

        }else {
            itemsFactory.getPhone(phoneData).then(function (resPhone) {
                console.log("checking for the phone responce", resPhone);
                if(resPhone.data.data == '1'){
                    $scope.dataOne = true
                    $scope.dataZero = false;
                    $scope.getDetails = resPhone.data.item;
                }else if(resPhone.data.data == '0'){
                    $scope.dataZero = true;
                    $scope.dataOne = false
                }

            });
        }
    }
    $scope.emailDetails = function (emailData) {
        console.log("checking for email data",emailData);
        if(emailData == undefined){
            $scope.dataZero = false;
            $scope.dataOne=false;

        }else {
            itemsFactory.getEmail(emailData).then(function (resEmail) {
                if(resEmail.data.data == '1'){
                    $scope.dataOne = true
                    $scope.dataZero = false;
                    $scope.getDetails = resEmail.data.item;
                }else if(resEmail.data.data == '0'){
                    $scope.dataZero = true;
                    $scope.dataOne = false
                }
            });
        }
    }


    $scope.changeValue = function (verifyData) {
        if (verifyData == undefined) {
            $scope.notVerified = false;
            $scope.verified = false;
        }

        else {
            $scope.verifyFun = function (PropertyId) {
                itemsFactory.getVerified(PropertyId).then(function (resVerify) {
                    if (resVerify.data.data == '1') {
                        $scope.verified = false;
                        $scope.notVerified = true;
                        $scope.notVerified = " Incorrect Property-Id";
                    } else {
                        $scope.verified = true;
                        $scope.notVerified = false;
                        $scope.verified = "Successfully Verified";
                    }
                });
            }
        }
    }
    $scope.done = function () {

    }
}]);