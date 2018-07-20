//service using factory
app.factory('itemsFactory', ['$http', function ($http) {
    var itemsFactory = {};

    itemsFactory.getItems = function () {
        return $http.get(fldb + '/flytta_api/v0.1/portal/property/data');
    };
    itemsFactory.sms_modal = function (postData, smsPhone) {
        return $http.post(fldb + '/flytta_api/v0.1/portal/property/prop_notification/' + smsPhone, postData);
    };
    itemsFactory.occupiedProp = function (occupied_id, postData) {
        return $http.post(fldb + '/flytta_api/v0.1/portal/property/add_occupied/' + occupied_id, postData);
    }
    itemsFactory.deleteProperty = function (postData) {
        return $http.post(fldb + '/flytta_api/v0.1/portal/property/delete_verified', postData);
    }
    itemsFactory.addChanelId = function (id, channel) {
        return $http.post(fldb + '/flytta_api/v0.1/portal/property/update_channel/' + id + '/' + channel);
    }
    itemsFactory.removeChanelId = function (propId, chId) {
        return $http.post(fldb + '/flytta})_api/v0.1/portal/property/remove_channel/' + propId + '/' + chId)
    }
    itemsFactory.getUsers = function () {
        return $http.get(fldb + '/flytta_api/v0.1/user/get_new/new')
    }
    itemsFactory.getUnverified = function () {
        return $http.get(fldb + '/flytta_api/v0.1/portal/verified_p/data')
    }
    itemsFactory.selectCity = function () {
        return $http.get("assets/json/city_india.json");
    }
    itemsFactory.getArea = function (cityData) {
        return $http.get('assets/json/' + cityData + '.json');
    }
    itemsFactory.map = function () {
        return $http.get(fldb + '/flytta_api/v0.1/portal/verified_p/data/59dddb9e11a4de6e5c630b02');
    }
    itemsFactory.edit = function (editData) {
        return $http.post(fldb + '/flytta_api/v0.1/portal/property/edit_service/59dca40711a4de6e5c630b00', editData);
    }
    itemsFactory.feedback = function () {
        return $http.get(fldb + '/flytta_api/v0.1/feed/show');
    }
    itemsFactory.query = function () {
        return $http.get(fldb + '/flytta_api/v0.1/contact');
    }
    itemsFactory.submitForm = function (fieldData) {
        return $http.post(fldb + '/flytta_api/v0.1/corporate/data', fieldData);
    }
    itemsFactory.getSchedule = function () {
        return $http.get('/assets/json/data.json');
    }
    itemsFactory.getCustomerSchedule = function (request_id) {
        return $http.get(fldb + '/flytta_api/v0.1/customer_schedule/schedule/'+request_id);
    }
    itemsFactory.getCustProperty = function (prop_id) {
        return $http.get(fldb+'/flytta_api/v0.1/portal/property/findserviceid/'+prop_id);
    }
    itemsFactory.getPhone = function (phone) {
        return $http.get(fldb + '/flytta_api/v0.1/customer_schedule/find_phone/'+phone);
    }
    itemsFactory.getEmail = function (email) {
        return $http.get(fldb + '/flytta_api/v0.1/customer_schedule/find_id/'+email);
    }
    itemsFactory.getVerified = function (prop_id) {
        return $http.get(fldb +'/flytta_api/v0.1/portal/property/verifyserviceid/'+prop_id);
    }
    return itemsFactory;
}]);

// controller
app.controller('myCtrl', ['$scope', 'itemsFactory', '$window', '$filter', function ($scope, itemsFactory, $window, $filter) {
    $scope.pqr = {};
    itemsFactory.getItems().success(function (data) {
        $scope.items = data;

    });
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

    /*property start*/
    $scope.propty = ["Residential", "Commercial", "Office Space", "Paying Guest"];
    $scope.proptyType = ["Residential Apartment", "Independent Villa", "Residential Land", "Others"];
    $scope.vendors = ["Owner", "builder"];
    $scope.willingToRent = [" Family", "Single(man)", "Single(woman)"];
    $scope.preferedAgreementType = ["Agreement (11 Months)", "Notice Period"];
    $scope.configrations = ["1 BHK", "2 BHK", "3 BHK", "4 BHK"];
    $scope.builtInArea = ["Sq Feet", "Sq Meter"];
    $scope.availability = ["Ready to Move", "Under Construction"];
    $scope.age = ["0-1 Year Old", "1-5 Year Old", "5-10 Year Old", "10+ Years Old"];
    $scope.facing = ["East", "West", "North", "South"];
    $scope.ownership = ["freehold", "leasehold", "Co-Operative Society", "Power of attorney"];
    $scope.gated = ["Gated", "Semi-gated", "Semi-Gated"];
    $scope.reservedParkings = ["none", 'covered', 'Open'];
    $scope.powerBackup = ["none", "partial", 'Full'];
    $scope.totalArea = [2400, 2500];
    $scope.getProperty = {
        placeholder: 'Select Properties',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getProptyType = {
        placeholder: 'Select some Properties',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getWillings = {
        placeholder: 'Select',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getPrefered = {
        placeholder: 'Select',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getCity = {
        placeholder: 'select city',
        allowSearch: true,
        onChange: function (val) {
            itemsFactory.getArea(val).then(function (areaRes) {
                $scope.areaData = areaRes.data;
            })

        }
    }
    $scope.getConfigurations = {
        placeholder: 'Select ',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getBuiltIn = {
        placeholder: 'Select',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getReadyToMove = {
        placeholder: 'Select ',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getAge = {
        placeholder: 'Select ',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getFacing = {
        placeholder: 'Select ',
        allowSearch: true, "agreement": "Notice Period",
        onChange: function (val) {
        }
    }
    $scope.getOwnership = {
        placeholder: 'Select ',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getGated = {
        placeholder: 'Select ',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getReserveParking = {
        placeholder: 'Select',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getPowerBackup = {
        placeholder: 'Select',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getFloor = {
        placeholder: 'Eg., 1,2,3',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.getTotalArea = {
        placeholder: 'Select',
        allowSearch: true,
        onChange: function (val) {
        }
    }

    $scope.getVendors = {
        placeholder: 'select vendors'
    }

    $scope.confirumVerification = function () {
        if (($scope.myName && $scope.myNumber && $scope.myEmail && $scope.myAddress && $scope.inputDate && $scope.addEmail && $scope.dateModel && $scope.vendorsModel && $scope.propertyModel && $scope.propertyTypeModel && $scope.willingsModel && $scope.preferedModel && $scope.projectModel && $scope.configurationModel && $scope.biiltinModel && $scope.availabilityModel && $scope.ageModel && $scope.facingModel && $scope.ownershipModel && $scope.gatedModel && $scope.resevervedParkingModel && $scope.backupModel && $scope.totalAreaModel && $scope.bedroomsModel && $scope.bathRoomsgModel && $scope.balconyModel && $scope.securityModel && $scope.maintancenceModel && $scope.acModel && $scope.gyserModel && $scope.tvModel && $scope.stoveModel && $scope.washingModel && $scope.purifierModel && $scope.microwaveModel && $scope.curtainsModel && $scope.chimneyModel && $scope.sofaModel && $scope.dineModel && $scope.otherInfoModel && $scope.addressModel && $scope.addAproxModel && $scope.cityModel && $scope.areaModel && (!$scope.fur_kitchen || !$scope.fur_ward || !$scope.fur_others)) === (undefined)) {
            alert("Please fil the required field...");
        } else {
            alert("ColocalitiesDatampleted Successfully...");
        }
    }
    var exampleArray = [];
    var postData = {};
    $scope.test = function (id, prop) {
        if (prop["checked" + id] == true) {
            var unique_id = exampleArray.indexOf(id);
            if (unique_id < 0) {
                exampleArray.push(id);
            }
        }
        else if (prop["checked" + id] == false) {
            var unique_id = exampleArray.indexOf(id);
            if (unique_id >= 0) {
                exampleArray.splice(unique_id, 1);
            }
        }
    }
    $scope.send_sms = function () {
        postData = {"value": exampleArray};
        if (exampleArray.length < 1) {
            alert("please select atlest one property...");

        } else if (exampleArray.length > 3) {
            alert("you can't select more than 3 propeties...");
        } else {
            var smsPhone = prompt("Please Enter your phone number");
            if (smsPhone === null || smsPhone === undefined) {
                alert("please provide a valid number");
            }
            itemsFactory.sms_modal(postData, smsPhone).success(function (resData) {
                if (resData.data == "1") {
                    alert("you made your selection succcessfully")
                } else {
                    alert("something went worng");
                }
            })
            alert(smsPhone);
        }
    }
    $scope.occupied = function (occupy) {
        postData = {"value": exampleArray};
        if (exampleArray.length < 1) {
            alert("please select atleat one property");
        } else {
            itemsFactory.occupiedProp(occupy, postData).success(function (resData) {
                if (resData.data == "1") {
                    alert("you made your selection succcessfully")
                } else {
                    alert("something went worng");
                }
            })
        }
    }
    $scope.sendId = function (id) {
        var new_chanel = $scope.pqr['xyz' + id];
        itemsFactory.addChanelId(id, new_chanel).success(function (response) {
            $window.location.reload();
        })
    };
    $scope.removeId = function (propId, chId) {
        itemsFactory.removeChanelId(propId, chId).success(function (response) {
        })

        $window.location.reload();
    }
    /*for user table*/
    itemsFactory.getUsers().then(function (data) {
        $scope.userData = data.data.item;

    })
    /*unverified user*/
    itemsFactory.getUnverified().then(function (data) {
        $scope.getUnverifiedData = data.data;
    })


    /*select city*/
    itemsFactory.selectCity().then(function (cityData) {
        $scope.cityData = cityData.data;
    })
    /*select area*/
    $scope.getAreaOptions = {
        placeholder: 'Select area',
        allowSearch: true,
        onChange: function (val) {
        }
    }
    $scope.editInfo = function () {
        var inputData = {
            "youarethe": $scope.vendorsModel,
            "datetime": $scope.dateModel,
            "what": $scope.propertyModel,
            "rent_to": $scope.willingToRent,
            "project": $scope.projectModel,
            "city": $scope.cityModel,
            "configuration": $scope.configurationModel,
            "size1": $scope.biiltinModel,
            "availability": $scope.availabilityModel,
            "age": $scope.ageModel,
            "facing": $scope.facingModel,
            "ownership": $scope.ownershipModel,
            "parking": $scope.resevervedParkingModel,
            "power_backup": $scope.backupModel,
            "totalArea": $scope.totalAreaModel,
            "fur_kitchen": $scope.fur_kitchen,
            "fur_ward": $scope.fur_ward,
            "fur_others": $scope.fur_others,
            "bedrooms": $scope.bedroomsMoel,
            "bathrooms": $scope.bathRoomsgModel,
            "balconies": $scope.balconyModel,
            "floor": $scope.securityModel,
            "ac": $scope.acModel,
            "geyser": $scope.gyserModel,
            "tv": $scope.tvModel,
            "washing": $scope.washingModel,
            "purifier": $scope.purifierModel,
            "a_from": $scope.dateModel,
            "pooja": $scope.poojaModel,
            "studyroom": $scope.studyModel,
            "servant": $scope.serventModel,
            "parking": $scope.parkModel,
            "atm": $scope.atmModel,
            "other_a": $scope.otherModel,
            "internet": $scope.interModel,
            "security": $scope.securityModel,
            "maintain": $scope.maintainModel,
            "backup": $scope.powerModel,
            "play": $scope.playModel,
            "elevator": $scope.eleModel,
            "intercom": $scope.interComModel,
            "gym": $scope.gimModel,
            "swim": $scope.SumModel,
            "maintenance": $scope.maintancenceModel,
            "a_ac": $scope.acModel1,
            "prop_addr": $scope.addressModel,
            "user": $scope.myEmail,
            "phone": $scope.myPhone
        };

        itemsFactory.edit(inputData).then(function (response) {
            if (response.data.data == "1")
                alert("Edited successfully...");
            else ("Something went worng...");
        })
    }

    /*map*/

    $scope.map = {center: {latitude: 40.399516, longitude: -22.703348}, zoom: 12};

    itemsFactory.map().then(function (mapRes) {
        $scope.map = {center: {latitude: mapRes.data.item.lat, longitude: mapRes.data.item.lon,}, zoom: 12};
        $scope.dateModel = mapRes.data.item.datetime;
        $scope.vendorsModel = mapRes.data.item.youarethe;
        $scope.propertyModel = mapRes.data.item.what;
        $scope.propertyTypeModel = mapRes.data.item.proptype
        $scope.willingsModel = mapRes.data.item.rent_to;
        $scope.preferedModel = mapRes.data.item.agreement;
        $scope.cityModel = mapRes.data.item.city;
        $scope.areaModel = mapRes.data.item.area;
        $scope.projectModel = mapRes.data.item.project;
        $scope.configurationModel = mapRes.data.item.configuration;
        $scope.biiltinModel = mapRes.data.item.size1;
        $scope.availabilityModel = mapRes.data.item.availability;
        $scope.ageModel = mapRes.data.item.age;
        $scope.facingModel = mapRes.data.item.facing;
        $scope.ownershipModel = mapRes.data.item.ownership;
        //$scope.gatedModel= mapRes.data.item.facing;
        $scope.resevervedParkingModel = mapRes.data.item.parking;
        $scope.backupModel = mapRes.data.item.power_backup;
        $scope.totalAreaModel = mapRes.data.item.totalArea;
        var markers = [];
        markers.push({
            id: 0,
            latitude: mapRes.data.item.lat,
            longitude: mapRes.data.item.lon
        })
        $scope.markers = markers;
    })

    /*Pagination start*/
    /*feedback start*/
    itemsFactory.feedback().then(function (feedbackRes) {
        $scope.getFeedback = feedbackRes.data.result;
    })
    /*feedback end*/
    /*Query start*/
    itemsFactory.query().then(function (queryRes) {
        $scope.queries = queryRes.data;
    });
    /*Query end*/
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.q = '';

    $scope.getData = function () {
        return $filter('filter')($scope.items, $scope.q)
    }

    $scope.numberOfPages = function () {
        return Math.ceil($scope.getData().length / $scope.pageSize);
    }

}]);

app.filter('startFrom', function () {
    return function (input, start) {
        if (!input || !input.length) {
            return;
        }
        start = +start;
        return input.slice(start);
    }
})

/*pagination end*/




