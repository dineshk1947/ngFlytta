
app.controller('corporateCtrl', ['$scope', 'itemsFactory', function ($scope, itemsFactory) {
    var fieldData ={};
    var required_for;
    var commercialData =[];
    var localitiesData;
    var confData;
    $scope.independentChek = function(indepeCheck){
        commercialData.push("independent");
    }
    $scope.check1 = function(propchek1){
        commercialData.push("1BHK");
    }
    $scope.check2 = function(propchek2){
        commercialData.push("2BHK");
    }
    $scope.check3 = function(propchek3){
        commercialData.push("3BHK");

    }
    $scope.check4 = function(propchek4){
        commercialData.push("4BHK");

    }
    $scope.confirumVerification = function () {
        if (($scope.myName && $scope.myNumber && $scope.myEmail && $scope.myAddress && $scope.inputDate && $scope.addEmail && $scope.dateModel && $scope.vendorsModel && $scope.propertyModel && $scope.propertyTypeModel && $scope.willingsModel && $scope.preferedModel && $scope.projectModel && $scope.configurationModel && $scope.biiltinModel && $scope.availabilityModel && $scope.ageModel && $scope.facingModel && $scope.ownershipModel && $scope.gatedModel && $scope.resevervedParkingModel && $scope.backupModel && $scope.totalAreaModel && $scope.bedroomsModel && $scope.bathRoomsgModel && $scope.balconyModel && $scope.securityModel && $scope.maintancenceModel && $scope.acModel && $scope.gyserModel && $scope.tvModel && $scope.stoveModel && $scope.washingModel && $scope.purifierModel && $scope.microwaveModel && $scope.curtainsModel && $scope.chimneyModel && $scope.sofaModel && $scope.dineModel && $scope.otherInfoModel && $scope.addressModel && $scope.addAproxModel && $scope.cityModel && $scope.areaModel && (!$scope.fur_kitchen || !$scope.fur_ward || !$scope.fur_others)) === (undefined)) {
            alert("Please fil the required field...");
        } else {
            alert("ColocalitiesDatampleted Successfully...");
        }
    }

    $scope.plugAndPlayFun = function(){
        required_for = "plug_and_play";
        $scope.plugDataShow =true;
    }
    $scope.resFun = function () {
        required_for = "residential_prop";
    }
    $scope.bareShellFun = function(){
        required_for = "bare_shell";
    }
    $scope.othersFun = function(){
        required_for = "other_things";
    }
    $scope.madCheck = function (madRes) {
        if(madRes == "1") {
            localitiesData ="Madhapur";
        }
    }
    $scope.kondCheck = function (kondRes) {
        if(kondRes == "2"){
            localitiesData = "Kondapur";
        }
    }
    $scope.gachCheck = function (gachRes) {
        if(gachRes =="3"){
            localitiesData="Gachhibowli";

        }
    }
    $scope.kphbCheck = function (kphbRes) {
        if(kphbRes == "4"){
            localitiesData ="Kphb";
        }
    }
    $scope.confYes = function (yes) {
        if(yes == "1"){
            confData = "Yes";
        }
    }
    $scope.confNo = function (no) {
        if(no == "2"){
            confData = "No";
        }
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

    $scope.req_relocation=function(){
        $scope.error_request_data = "";
        var count = 0;
        var error_flag = true;
        if($scope.rr_name == undefined){
            count++;
            $scope.error_request_data += count+". Name<br/>";
            error_flag = false;
        }else {
            fieldData["name"]=$scope.rr_name;
        }
        if($scope.rr_mail == undefined){
            count++;
            $scope.error_request_data += count+". Email<br/>";
            error_flag = false;
        }else {
            fieldData["email"]=$scope.rr_mail;
        }
        if($scope.rr_contact == undefined){
            count++;
            $scope.error_request_data += count+". Phone Number<br/>";
            error_flag = false;
        }else {
            fieldData["contact"]=$scope.rr_contact.toString();
        }
        if($scope.rr_cname == undefined){
            count++;
            $scope.error_request_data += count+". Company Name<br/>";
            error_flag = false;
        }else {
            fieldData["cname"]=$scope.rr_cname;
        }
        if($scope.budgetModel == undefined){
            count++;
            $scope.error_request_data += count+". Budget<br/>";
            error_flag = false;
        }else {
            fieldData["budget"]=$scope.budgetModel.toString();
        }

        if($scope.rrdate1 == undefined){
            count++;
            $scope.error_request_data += count+".Date of Occupancy<br/>";
            error_flag = false;
        }else {
            fieldData["mov_date"]= $scope.rrdate['req_date'];
        }

        if(required_for === "plug_and_play") {
            fieldData["service_for"] = required_for;
            if($scope.noofSheetsModel == undefined){
                count++;
                $scope.error_request_data += count+".No.of Seats<br/>";
                error_flag = false;
            } else {
                fieldData["seats"]= $scope.noofSheetsModel.toString();
            }
            if($scope.chekOption == undefined){
                count++;
                $scope.error_request_data += count+".Conference Room<br/>";
                error_flag = false;
            }else {
                fieldData["conf"] = confData;
            }
            if ($scope.pugAndPlayOtherModel) {
                fieldData["type1_other"]= $scope.pugAndPlayOtherModel;
            }
        }
        else if(required_for === "residential_prop"){
            fieldData["service_for"] = required_for;
            if(commercialData == undefined || commercialData.length<1){
                count++;
                $scope.error_request_data += count+".BHK<br/>";
                error_flag = false;

            }else {
                fieldData["bhk"]=commercialData;
            }
            if($scope.resOtherModele){
                fieldData["type2_other"]=$scope.resOtherModele;
            }
        }
        else if(required_for === "bare_shell") {
            fieldData["service_for"] = required_for;
            if ($scope.areaModel1 == undefined) {
                count++;
                $scope.error_request_data += count + ".Area in Sq.Feet<br/>";
                error_flag = false;

            }else {
                fieldData["totalArea"] = $scope.areaModel1.toString();
            }
            if ($scope.barShellModel) {
                fieldData["type3_other"] = $scope.barShellModel;
            }
        }
        else if(required_for === "other_things"){
            fieldData["service_for"] = required_for;
            if($scope.othModel ==undefined){
                count++;
                $scope.error_request_data += count+".Other<br/>";
                error_flag = false;
            }else {
                fieldData["type4_other"] = $scope.othModel;
            }
        }
        else {
            count++;
            $scope.error_request_data += count+".Property required for<br/>";
            error_flag = false;
        }

        if(localitiesData == undefined || localitiesData.length<1){
            count++;
            $scope.error_request_data += count+". Localities<br/>";
            error_flag = false;

        }
        else {
            fieldData["loca"] = localitiesData;
        }
        if($scope.subLocal== undefined){
            count++;
            $scope.error_request_data += count+". Sub localities<br/>";
            error_flag = false;
        }else {
            fieldData["sub_loca"] = $scope.subLocal;
        }

        if($scope.Wheel4 == undefined){
            count++;
            $scope.error_request_data += count+".4 Wheeler<br/>";
            error_flag = false;
        }else {
            fieldData["parking4"] = $scope.Wheel4.toString();
        }
        if($scope.Wheel2 == undefined){
            count++;
            $scope.error_request_data += count+". 2 Wheeler<br/>";
            error_flag = false;
        }else {
            fieldData["parking2"]= $scope.Wheel2.toString();
        }
        if($scope.request_query){
            fieldData["m_info"] = $scope.request_query;
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
        console.log(fieldData);
        itemsFactory.submitForm(fieldData).then(function (fieldDataRes) {
            console.log("fieldDataRes",fieldDataRes);
        });
    }

}]);






