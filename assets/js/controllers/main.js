app.controller('MainController', ['$scope','$window', 'localStorageService', 'todoService', '$alert', '$timeout', '$rootScope', 'loginServ', 'serv', 'mover_serv', 'main_serv','$location','$http',
    function($scope, $window, localStorageService, todoService, $alert, $timeout, $rootScope, loginServ, serv, mover_serv, main_serv,$location,$http) {
        console.log($location.path());
        if($location.path().indexOf("vst")>-1){
               $location.url("/?utm_source=flytta_sms&utm_medium=sms");
       }
       if($location.path().indexOf("fl-prop")>-1){
            var url = $location.path();
            url = url.split("/");
            var ser_id = url[2];
            main_serv.getPropSid(ser_id).success(function(data){       

            $location.url("/search/available-for-"+data['item']['rent_to']+"-"+data['item']['configuration']+"-"+data['item']['area']+"-"+data['item']['city']+"-"+data['item']['service_id']);
        });
       }

        var url_data = $location.search();
        console.log(url_data);
        var utm_status = false;
        if(url_data["utm_source"]){
           var url_data1 =  url_data["utm_source"].split("_");
            if(url_data1.indexOf("flytta")>-1){
                amplify.store("utm_status",true);
                amplify.store("main_dimmer", 1);
            }
            else{
                amplify.store("utm_status",false);
            }
        }
        var url_status;
        var json;
        $scope.errorMessage = false;
        // amplify.store( "storeExample2", "baz" );
        // var amplify_storage_data = amplify.store( "storeExample2");
        // console.log(amplify_storage_data);
        $scope.theme_colors = [
            'pink', 'red', 'purple', 'indigo', 'blue',
            'light-blue', 'cyan', 'teal', 'green', 'light-green',
            'lime', 'yellow', 'amber', 'orange', 'deep-orange'
        ];
        
        $scope.areas = [];
        $scope.errorfields = false;
        $scope.userId;
        $scope.model = {};
        $rootScope.login_text;
        $rootScope.login_text = true;
        if (amplify.store("email") && amplify.store("uid")) {
            $rootScope.login_text = false;
        } else {
            $rootScope.login_text = true;
        }
        var user_id_global = {};
        // Add todoService to scope
        service = new todoService($scope);
        $scope.todosCount = service.count();
        $scope.$on('todos:count', function(event, count) {
            $scope.todosCount = count;
            element = angular.element('#todosCount');

            if (!element.hasClass('animated')) {
                $animate.addClass(element, 'animated bounce', function() {
                    $animate.removeClass(element, 'animated bounce');
                });
            }
        });

var cacheObjOptions = {
        disableCache : false,       
        maxAge : 24*60*60*1000,     // 24 Hours
        removeOnExpire : true,
        deleteOnExpire : false,
        storageMode : "memory",     
        onExpireCallback : null,    // will be available in upcoming version
        recycleFrequency : null,    // will be available in upcoming version
        capacity : null             // will be available in upcoming version
    };
var cacheKeyOptions = {
            disableCache : false,
            maxAge : 24*60*60*1000,
            removeOnExpire : true,
            onExpireCallback : null,  // will be available in upcoming version
            recycleFrequency : null   // will be available in upcoming version
        };
//var cacheObj = jsCache.create("cacheObjName", cacheObjOptions);
var httpCacheObj = jsCache.createHttpCache("cacheObjName", cacheObjOptions);
var url1 = $location.path();
$http({
        method: 'GET',
        url: url1,
        cache : httpCacheObj(cacheKeyOptions)
})

        $scope.fillinContent = function() {
            $scope.htmlContent = 'content content';
        };

        // theme changing
        $scope.changeColorTheme = function(cls) {
            $rootScope.$broadcast('theme:change', 'Choose template'); //@grep dev
            $scope.theme.color = cls;
        };

        $scope.changeTemplateTheme = function(cls) {
            $rootScope.$broadcast('theme:change', 'Choose color'); //@grep dev
            $scope.theme.template = cls;
        };

        if (!localStorageService.get('theme')) {
            theme = {
                color: 'theme-pink',
                template: 'theme-template-dark'
            };
            localStorageService.set('theme', theme);
        }
        localStorageService.bind($scope, 'theme');

        // var introductionalert = $alert({
        //     title: 'Welcome to Materialism',
        //     content: 'Stay a while and listen',
        //     placement: 'top-right',
        //     type: 'theme',
        //     container: '.alert-container-top-right',
        //     show: false,
        //     templateUrl: 'assets/tpl/partials/alert-introduction.html',
        //     animation: 'mat-grow-top-right'
        // });
            var introductionalert = $alert({
            content: 'To check your status please login',
            placement: 'top-right',
            type: 'theme',
            container: '.alert-container-top-right-one',
            show: false,
            animation: 'mat-grow-top-right'
        });
        var introductionalert1 = $alert({
            content: 'Select your desired date and time for property visit.',
            placement: 'top-right',
            type: 'theme',
            container: '.alert-container-top-right-two',
            show: false,
            animation: 'mat-grow-top-right'
        });
          var introductionalert2 = $alert({
            content: 'Select your desired property & pay the service charge to confirm the property.',
            placement: 'top-right',
            type: 'theme',
            container: '.alert-container-top-right-three',
            show: false,
            animation: 'mat-grow-top-right'
        });
        if ($location.path() == "/"){
        if (!localStorageService.get('alert-introduction')) {
            $timeout(function() {
                $scope.showIntroduction();
                localStorageService.set('alert-introduction', 1);
            }, 2500);
        }
        }
        if ($location.path() == "/property/schedule-visit"){
        if (!localStorageService.get('alert-introduction1')) {
            $timeout(function() {
                $scope.showIntroduction1();
                localStorageService.set('alert-introduction1', 1);
            }, 2500);
        }
        }
        if ($location.path() == "/property/confirm-property"){
        if (!localStorageService.get('alert-introduction2')) {
            $timeout(function() {
                $scope.showIntroduction2();
                localStorageService.set('alert-introduction2', 1);
            }, 2500);
        }
        }        
        $scope.showIntroduction = function() {
                introductionalert.show();
        };
        $scope.showIntroduction1 = function() {
                introductionalert1.show();  
        };
        $scope.showIntroduction2 = function() {
                introductionalert2.show();
        };


  

        var refererNotThemeforest = $alert({
            title: 'Hi there!',
            content: 'You like what you see and interested in using our theme? You can find it at <a href="http://themeforest.net/item/materialism-angular-bootstrap-admin-template/11322821" target="_blank"><img style="height:20px;" src="assets/img/icons/themeforest-icon.png" /> Themeforest</a>.',
            placement: 'top-right',
            type: 'theme',
            container: '.alert-container-top-right',
            show: false,
            animation: 'mat-grow-top-right'
        });

        if (document.referrer === '' || document.referrer.indexOf('themeforest.net') !== 0) {
            $timeout(function() {
                refererNotThemeforest.show();
            }, 1750);
        }
        $scope.mainOriginCity = false;
        main_serv.getCities().success(function(data3) {
            $scope.cities = data3;
        });
        $scope.area123 = ["Choose Your Locality", "A C Guards", "A S Roa Nagar", "A.Gs Staff Quarters", "AG Office", "APHB Colony Moulali", "Abids", "Abids Road", "Adarsh Nagar", "Adikmet", "Afzalgunj", "Ag College", "Agapura", "Ahmed Nagar", "Akbar Road", "Alexander Road", "Aliabad", "Alwal", "Amber Nagar", "Amberpet", "Amberpet", "Ameerpet", "Ameerpet X Road", "Anand Bagh", "Anand Nagar", "Anand Nagar Colony", "Ananthagiri", "Andhra Mahila Sabha", "Ankireddypalli", "Ankushapur", "Annojiguda", "Aperl", "Ashok Nagar", "Asif Nagar", "Attapur", "Attapur Ring Road", "Atvelli", "Auto Nagar", "Azamabad", "Azampura Masjid", "Baber Bagh", "Bachpally", "Badangpet", "Badichowdi", "Bagh Amberpet", "Bagh Lingampally", "Bahadurpura", "Bahadurpurpally", "Bairamalguda", "Bakaram", "Bala Nagar", "Balapur", "Balkampet", "Bandimet", "Bandlaguda", "Banjara Hills", "Bank Street", "Bansilal Pet", "Bansilalpet", "Bapuji Nagar", "Barkas", "Barkatpura", "Basheerbagh", "Bazarghat", "Begum Bazar", "Begumpet", "Begumpet Police Lines", "Bhagya Nagar Colony", "Bharat Nagar", "Bharath Nagar Colony", "Bhel", "Bholakpur", "Bk Guda", "Bod Uppal", "Boduppal", "Bogaram", "Boggulakunta", "Bolaram", "Borabanda", "Boudha Nagar", "Bowenpally", "Boyiguda", "CRP Camp", "Central Police Lines", "Chaderghat", "Chaitanyapuri", "Champapet", "Champapet X Road", "Chanchalguda", "Chanchalguda Colony", "Chanda Nagar", "Chandrayanagutta", "Chandrayangutta", "Chandulal Baradari", "Chappel Bazar", "Chappel Road", "Char Kaman", "Charkaman", "Charlapally", "Charminar", "Chatta Bazar", "Cherial", "Cherlapally", "Chikkadpally", "Chilkalguda", "Chintal", "Chintal Basti", "Chintalkunta", "Chirag Ali Lane", "Chudi Bazar", "Cyberabad", "D D Colony", "DK Road", "Dabeerpura", "Dabeerpura North", "Dar-UI- Salam", "Dargah Hussain Shah Wali", "Darulshifa", "Darushifa", "Dattatreya Colony", "Defence Colony", "Devan Devdi", "Dharam Karan Road", "Dhoolpet", "Diamond Point", "Dilshad Nagar", "Dilsukhnagar", "Distillery Road", "Domalguda", "Doodh Bowli", "Dr. A.S Rao Nagar", "Dwarkapuri Colony", "ECIL", "East Anand Bagh", "East Marredpally", "ECIL X Roads", "Edi Bazar North", "Erragadda", "Erramanzil", "Erramanzil Colony", "Esamia Bazar", "Falaknuma", "Fateh Darwaza", "Fateh Maidan", "Fateh Nagar", "Feelkhana", "Feroz Guda", "Film Nagar", "GSI (SR) Bandlaguda", "Gachibowli", "Gaddi Annaram", "Gaddi Annaram X Roads", "Gagan Mahal", "Gagan Pahad", "Gajularamaram", "Gandhi Bhavan", "Gandhi Nagar", "Gandhipet", "Gandhipet Road", "General Bazar", "Ghansi Bazar", "Ghasmandi", "Ghatkesar", "Girmapur", "Golconda", "Golconda Chowrastha", "Golconda X Roads", "Gosha Mahal", "Gowdavalli", "Gowliguda", "Gowliguda Chaman", "Green Lands", "Green Park Extension", "Gudimalkapur", "Gudimalkapur New Po", "Gulzar House", "Gun Foundry", "Gun Rock", "Gunfoundry", "HUDA Residential Complex", "Habsiguda", "Hafiz Pet", "Hakimpet", "Hanuman Tekdi", "Hanumanpet", "Haribowli", "Hasmatpet", "Hassan Nagar", "Hastinapuram", "Hayat Nagar", "Hi Tech City", "High Court SO", "Hill Fort", "Hill Fort Road", "Hill Street", "Himayat Nagar", "Himayat Nagar X Roads", "Himayat Sagar", "Hindi Bhawan", "Hindustan Cables Ltd", "Hmt Nagar", "Hmt Road", "Humayun Nagar", "Hussaini Alam", "Hyder Basti", "Hyder Nagar", "Hyder Shah Kote", "Hyderabad Central", "Hyderabad GPO", "Hyderguda", "I.E.Nacharam", "I.M.Colony", "IICT", "Ibrahim Bagh", "Ibrahim Bagh Lines", "Ibrahimpatnam", "Ie Moulali", "Inderbagh", "Indira Park", "Jagadgirigutta", "Jagdish Market", "Jaggamguda", "Jahanuma", "Jama I Osmania", "Jambagh", "Jamia Osmania", "Jawahar Nagar", "Jawaharlal Nehru Road", "Jeedimetla", "Jillellaguda", "Jubilee Hills", "Kachi", "Kachiguda", "Kachiguda Station", "Kachiguda X Road", "Kachivani Singaram", "Kakaguda", "Kakatiya Nagar", "Kalasiguda", "Kali Kabar", "Kali Kaman", "Kalyan Nagar", "Kamala Nagar", "Kamala Puri Colony", "Kamla Nagar", "Kanchanbagh", "Kandoji Bazar", "Kapra", "Karimnagar", "Karkhana", "Karman Ghat", "Karmanghat", "Karmanghat X Roads", "Karvan", "Karwan", "Karwan Sahu", "Kattedan", "Kattedan Ie So", "Kavadi Guda", "Kavadiguda", "Keesara", "Keesaragutta", "Keshavagiri", "Keshogiri SO", "Khairatabad", "Khairatabad HO", "khajaguda", "Kharkhana Main Road", "King Koti", "King Koti X Road", "Kingsway", "Kishan Bagh", "Kishangunj", "Kismatpur", "Kolthur", "Kompally", "Kondapur", "Korremal", "Kothaguda", "Kothapet", "Koti", "Kphb", "Kphb Colony", "Krishna Nagar", "Kukatpally", "Kukatpally Colony", "Kulsumpura", "Kummarguda", "Kundan Bagh", "Kushaiguda", "Kyasaram", "L B Nagar", "L B Stadium", "LIC Division", "Lad Bazar", "Lakdi Ka Pul", "Lal Bazar", "Lal Darwaza", "Lalapet", "Lalgadi Malakpet", "Lallaguda", "Langer House", "Langer House", "Liberty", "Lingampalli", "Lingampally", "Lothukunta", "Lower Tank Bund Road", "M G Road", "Machili Kaman", "Madannapet", "Madhapur", "Madhura Nagar", "Madina", "Madina Guda", "Mahankali Street", "Maharaj Gunj", "Mahatma Gandhi Road", "Mahendra Hills", "Malakpet", "Malakpet Colony", "Malakpet Extension", "Malkajgiri", "Mallapur", "Mallapur", "Mallapuram", "Mallepally", "Mallepally North", "Mamidipalli", "Mangal Hat", "Mangalhat", "Manikonda", "Mansoorabad", "Mansurabad X Road", "Market Street", "Marredpally", "Maruthi Colony", "Maruthi Nagar", "Masab Tank", "Medchal", "Meerpet", "Mehboob Gunj", "Mehboob Nagar", "Mehdipatnam", "Mehdipatnam X Road", "Mettu Guda", "Minister Road", "Miralam Mandi", "Miyapur", "Moghalpura", "Mogulpura", "Moinabad", "Monda Market", "Moosabowli", "Moosapet", "Moosaram Bagh", "Moosaram Bagh X Road", "Moti Nagar", "Moula Ali", "Mozamjahi Market", "Mughalpura", "Muktargunj", "Murad Nagar", "Musheerabad", "Mylargadda", "NGRI", "Nacharam", "Nagarjuna Hills", "Nagarjuna Nagar", "Nagarjuna Sagar Road", "Nagole", "Nagole X Road", "Nallagutta", "Nallakunta", "Namala Gundu", "Nampally", "Nampally Station Road", "Nanakramguda", "Napier Lines", "Narayanaguda", "Narayanguda", "Nayapul", "Necklace Road", "Nehru Nagar", "Neredmet", "Neredmet Cross Road", "New Bowenpally", "New Boyiguda", "New MLA Quarters", "New Malakpet", "New Nagole", "New Nallakunta", "New Nallakunta X Road", "New Osmangunj", "Nimboliadda", "Nizam Shahi Road", "Nizamabad", "Nizampet", "Nizampet Road", "Noor Khan Bazar", "Nuthankal", "Old Alwal", "Old Bowenpally", "Old Boyiguda", "Old City", "Old Ghasmandi", "Old Jail Street", "Old MLA Quarters", "Old Malakpet", "Old Topkhana", "Osman Nagar", "Osman Shahi", "Osmangunj", "Osmania General Hospital", "Osmania University", "P AND T Colony S O", "P And T Colony", "Padma Rao Nagar", "Padmarao Nagar", "Padmavathi Nagar", "Pahadi Shareef", "Palika Bazar", "Pan Bazar", "Panjagutta", "Paradise", "Parishram Bhavan", "Parklane", "Parsigutta", "Patancheru", "Patel Market", "Pathargatti", "Patny", "Peddalaxmapur", "Penderghast Road", "Picket", "Pirzadi Guda", "Pot Market", "Pragathi Nagar", "Prakash Nagar", "Prasanth Nagar", "Pratap Singaram", "Purana Pul", "Purani Haveli", "Putli Bowli", "Qazipura", "Quthbullapur", "R R District", "RC Imarat So", "RTC X Road", "Rahmath Nagar", "Rail Nilayam", "Raj Bhavan", "Raj Bhavan Road", "Rajbolaram", "Rajendra Nagar", "Ram Koti", "Ram Nagar", "Ram Nagar X Road", "Ramachandra Puram", "Ramakrishna Math", "Ramakrishna Puram", "Ramakrishna Puram Road", "Ramanthapur", "Ramgopalpet", "Ramkote", "Ramnagar Gundu", "Rampallidiara", "Rampally", "Ranga Reddy Nagar", "Rangareddy District Court", "Ranigunj", "Rashtrapathi Road", "Rasoolpura", "Ravalkole", "Red Hills", "Regimental Bazar", "Rein Bazar", "Rethi Bowli", "Rikabgunj", "Risala Bazar", "Rtc Colony", "S D Road", "S P Road", "S R Colony", "S R Nagar", "Safilguda", "Sagar Road", "Sahifa S O", "Sai Nagar", "Saidabad", "Saidabad Colony", "Saifabad", "Sainikpuri", "Sakkubai Nagar", "Saleem Nagar", "Sanath Nagar", "Sanath Nagar Colony", "Sanath Nagar IE", "Sanjeeva Reddy Nagar", "Santosh Nagar", "Santosh Nagar ,olony", "Sardar Vallabhbhai Patel National Police Academy", "Saroor Nagar", "Sebastian Road", "Secretariat", "Secunderabad", "Seetharambagh", "Seetharampet", "Serilingampally", "Shah Ali Banda", "Shahpur Nagar", "Shahpur Nagar", "Shaikpet", "Shamirpet", "Shamshabad", "Shamshergunj", "Shanker Bagh", "Shanker Mutt", "Shanti Nagar", "Shapur Nagar", "Shivaji Nagar", "Shivam Road", "Shivarampally", "Shyam Nagar", "Siddarth Nagar", "Siddiamber Bazar", "Sikh Road", "Sikh Village", "Sikh Village Road", "Sindhi Colony", "Sitaphal Mandi", "Sitaphalmandi", "Snehapuri Colony", "Somajiguda", "Somajiguda Circle", "South Banjara Hills", "Sri Krishna Nagar", "Sri Srinivas Colony", "Srinagar", "Srinagar Colony", "Srinagar Colony Main Road", "Srinivasa Colony", "Srinivasa Nagar", "Srinivasa Nagar Colony", "Srinivasapuram", "Sripuram Colony", "St. Johns Road", "St. Marys Road", "State Bank Of Hyderabad", "Subash Road", "Sultan Bazar", "Sultan Shahi", "Suraram", "Survey Of India", "Surya Nagar Colony", "Swaraj Nagar", "Tad Bund", "Tad Bund X Road", "Tagarikanaka", "Talab Katta", "Talabkatta", "Tank Bund", "Tank Bund Road", "Tar Bund", "Tar Bund X Road", "Taranagar", "Tarnaka", "Thimmaipally", "Thumkunta", "Tilak Nagar", "Tilak Road", "Tirumalgherry", "Tobacco Bazar", "Toli Chowki", "Topkhana", "Trimulgherry", "Trimulgherry X Road", "Troop Bazar", "Turkapalliyadaram", "Uppal", "Uppal Kalan", "Uppuguda", "Vaidehi Nagar", "Vanasthalipuram", "Vasavi Nagar", "Vengal Rao Nagar", "Venkatapuram", "Vidhan Sabha", "Vidyanagar", "Vijay Nagar Colony", "Vikarabad", "Vikas Nagar", "Vikrampuri", "Vikrampuri Colony", "Vinayak Rao Nagar", "Vishali Nagar", "Vithalwadi", "Warasiguda", "West Marredpally", "Yadgarpally", "Yakutpura", "Yapral", "Yellareddy Guda", "Yellareddyguda", "Yousuf Bazar", "Yousufguda", "Zamistanpur"]
        for (var i in $scope.area123) {
            $scope.areas[i] = { "id": i, "value": $scope.area123[i] };
        }

        if (!amplify.store("main_dimmer") && amplify.store("utm_status") == false) {
            $("#modal-fullscreen").modal({ backdrop: 'static', keyboard: false }).modal("show");
        }

        $scope.setselect = function(data, val) {
            $scope.mainOriginCity = data;
            amplify.store('o_city', data, { path: '/' });
            amplify.store('o_city_val', val, { path: '/' });
            console.log(val);
        }

        $scope.setdest = function() {
            console.log($scope.mainOriginCity);
            if ($scope.mainOriginCity) {
                var now = new Date();
                var time = now.getTime();
                var expireTime = time + ((1000 * 36000) / 10) * 48;
                now.setTime(expireTime);
                amplify.store('d_city', "Hyderabad");
                amplify.store('d_city_val', "hyd");
                amplify.store("main_dimmer", 1, {'expires': now.toGMTString()});
                $("#modal-fullscreen").modal("hide");
            } else {
                alert("select origin city")
            }
        }

        if (amplify.store("email")) {
            $scope.settle = { "name": amplify.store("name"), "email": amplify.store("email"), "phone": parseInt(amplify.store("phone")) }
        };

        var selected_area1;
        $scope.previous_Search1 = function(){
            var c_value = "hyd";
            console.log(selected_area1);
            //main_serv.getArea(c_value).success(function(data2){
                // for (var i in data2) {
                //    // $scope.city_areas3[i] = {"id": i, "value": data2[i]};
                //    // if(selected_area1 ==  data2[i]){
                //         amplify.store("selected_area", $scope.city_areas3[i]);
                //    // }
                // }
                
            //});
            amplify.store("selected_area", selected_area1);
            location.href = "/property/schedule-visit";
        }
        $scope.sendPreselectData  = function(){
            $("#return_user").modal("hide");
            var total_properties = amplify.store("total_properties");
            var s_area=amplify.store("selected_area");
            var s_area_value = [];
            s_area_value.push(s_area);
            var wish = [];
            var visit = [];
            //if(amplify.store("wish_property")){
                var w_data = amplify.store("wish_property");
                for(var i in w_data){
                    wish.push(w_data[i]["service_id"]);
                }
            //}
            //console.log(amplify.store("wish_property"));
            //if(amplify.store("visit_property")){
                var v_data = amplify.store("visit_property");
                for(var i in v_data){
                    visit.push(v_data[i]["service_id"]);
                }
            //}
           // console.log(amplify.store("visit_property"));
            var jdata = {
                "filter": total_properties["filter"],
                "area": s_area_value,
                "wish":wish,
                "visit":visit
            }
            console.log(jdata);
            serv.deleteProp().success(function(info){
                if(info["data"] == "1" || info["data"] == "2"){                       
                    serv.preselect(jdata).success(function(data){
                        if (data.data == "0") {

                        } else if (data.data == "1") {
                            if(url_status == "login"){
                                $window.location.reload();
                            }
                            else{
                                //alert("success");
                                location.href = ""+url_status;
                            }                  
                        }
                    }); 
                }
            });
        }

        var display_new = function(auth) {
            amplify.store("main_dimmer", 1);
            console.log(url_status);
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + ((1000 * 36000) / 10) * 48;
            now.setTime(expireTime);
            amplify.store('uid', auth["user_id"]);
            amplify.store('email', auth["uname"]);
            amplify.store('status', auth["status"]);
            amplify.store('name', auth["name"]);
            amplify.store('phone', auth["phone_number"]);
            if (auth["service"]) {
                amplify.store('service', auth['service']);
            }
            if (auth["intern"]) {
                amplify.store('intern', auth["intern"]);
            }
            if (amplify.store("email")) {
                console.log(amplify.store("email"));
                amplify.store("request_stat",null);
                $rootScope.login_text = false;
                $rootScope.email = amplify.store("email");
                $rootScope.phone = parseInt(amplify.store("phone"));
                $rootScope.name = amplify.store("name");
                $scope.userId = amplify.store("email");
                if(url_status == "login"){
                    console.log(url_status);
                    if($location.path().indexOf("/property/search/")>-1){
                        serv.show().success(function(items){
                            if (items["data"] == "1") {
                                if(items["status"] > 3){
                                    selected_area1 = items["item"]['area'][ items["item"]['area'].length -1];
                                    $("#notification1").html("You have already shortlisted few properties. <br/>Click <b>OK</b> to view those properties.<br/>Click <b>Cancel</b> to start a new search");
                                    $("#return_user").modal("show");
                                }
                                else{
                                    $scope.sendPreselectData();
                                }
                            }
                        });
                    }
                    else{
                        $window.location.reload();                        
                    }  
                }
                else if (url_status == "mover"){
                    mover_serv.getValue().success(function(data) {
                        if (data["data"] == "1") {
                            if (data["status"] > 1) {
                                amplify.store('mover_item', data["value"]);
                                if(data["status"] == 4){
                                    location.href = '/mover/completed';
                                }
                                else if(data["status"] == 3 || data["status"] == 2) {
                                    location.href = '/mover/confirm';
                                } 
                            }
                            else{
                                var json = amplify.store('mover_item');
                                var j_data = { "user": $rootScope.email, "value": json, "status": 2};
                                var j_data = JSON.stringify(j_data);
                                mover_serv.sendValue(j_data).success(function(data2) {
                                    if (data2["data"] == "0") {
                                        console.log("Error");
                                    } else if (data2["data"] == "1") {
                                        console.log("Value added successfully");
                                        location.href = '/mover/confirm';
                                    }
                                });
                            }
                        }
                        else{
                            var json = amplify.store('mover_item');
                            var j_data = { "user": $rootScope.email, "value": json, "status": 2};
                            var j_data = JSON.stringify(j_data);
                            mover_serv.sendValue(j_data).success(function(data2) {
                                if (data2["data"] == "0") {
                                    console.log("Error");
                                } else if (data2["data"] == "1") {
                                    console.log("Value added successfully");
                                    location.href = '/mover/confirm';
                                }
                            });
                        }
                        
                    });
                } 
                else{
                    serv.show().success(function(items){
                        if (items["data"] == "1"){
                            if(items["status"] > 3){
                                $("#notification1").html("You have already shortlisted few properties. <br/>Click <b>OK</b> to view those properties.<br/>Click <b>Cancel</b> to start a new search");
                                $("#return_user").modal("show");
                            }
                            else{
                                $scope.sendPreselectData();
                            }
                        }
                        else{
                            $scope.sendPreselectData();
                        }
                    });                     
                }      
            }
        }

        $scope.reg = function() {
            if (!$scope.model.logincheck) {
                $scope.errorMessage = true;
            }
            if ($scope.model.name && $scope.model.email && $scope.model.phone && $scope.model.logincheck) {
                var reg_id = user_id_global["identities"][0]["user_id"];
                var string_phone = $scope.model.phone.toString();
                var jdata = {
                    "user_id": user_id_global["identities"][0]["user_id"],
                    "identities": user_id_global["identities"][0],
                    "uname": $scope.model.email,
                    "status": "0",
                    "name": $scope.model.name,
                    "phone_number": string_phone
                }
                if(amplify.store("utm_status") == true){
                    jdata["source"] = ["dm",url_data["utm_source"]];                    
                }
                if(amplify.store("request_stat") == 1 || $location.path()=="/request"){
                    jdata["source"] = "service-request-form";
                }
                loginServ.getRegister(reg_id, jdata).success(function(data) {
                    $("#loginModal").modal("hide");
                    if (data["data"] == '1') {
                        goog_report_conversion();
			display_new(data["item"]);
                    } else if (data["data"] == '2') {
                        console.log(data["item"]);
                        $("#mainError").html("Your phone number is already registered, please try with another phone number.");
                        $("#errorModal").modal("show");
                    } else {
			goog_report_conversion();
                        display_new(data["result"]);
                    }
                });
            } else {
                $scope.errorfields = true;
            }
        }

        var reg2 = function() {
            var number = profile["phone_number"].slice(3);
            var reg_id = user_id_global["identities"][0]["user_id"];
            var jdata = {
                "user_id": user_id_global["identities"][0]["user_id"],
                "identities": user_id_global["identities"][0],
                "uname": amplify.store("email"),
                "status": "0",
                "name": amplify.store("name"),
                "phone_number": number,
                "source" : "service-request-form"
            }
            console.log(jdata);
            loginServ.getRegister(reg_id, jdata).success(function(data) {
                $('#digitModal').modal('hide');
                if (data["data"] == '1') {
		    goog_report_conversion();
                    display_new(data["item"]);
                } else if (data["data"] == '2') {
                    console.log(data["item"]);
                    $("#mainError").html("Your phone number is already registered, please try with another phone number.");
                    $("#errorModal").modal("show");
                } else {
		    goog_report_conversion();
                    display_new(data["result"]);
                }
            });
           
        }

        $scope.auth0_login = function(get_url1) {
            url_status = get_url1;
            var options = {
                "defaultLocation": "IN",
                "icon": "http://web.goflytta.com/img/flytta_logo.png",
                "primaryColor": "#f39c12",
                "responseType": "token",
                "autoclose": true,
                "focusInput": false,
                "popup": true,
                "socialBigButtons": true,
                "dict": {
                    "title": "Login/Signup"
                },
                "connections": ["google-oauth2", "facebook"]
            };
            var pwdless = new Auth0LockPasswordless('lmfPrLVC7LJFBwFKvAz0F49eDyrbItZK', 'flytta.auth0.com');
            if(amplify.store("request_stat") == 1){
                $scope.request_stat = true;
                pwdless.sms(options, function(err, profile, id_token) {
                    console.log(profile);
                    $("#preloader").modal("show");
                    if (!err) {
                        user_id_global = profile;
                        var log_id = profile["identities"][0]["user_id"];
                        loginServ.getLogin(log_id).success(function(data) {
                            if (data["data"] == "0") {
                                if (profile["identities"][0]["connection"] == "sms") {
                                    var number = profile["phone_number"].slice(3);
                                    $scope.model.phone = parseInt(number);
                                    $scope.model.name = amplify.store("name");
                                    $scope.model.email = amplify.store("email");
                                } 
                                $("#loginModal").modal({ backdrop: 'static', keyboard: false }).modal("show");;
                            } else {
                                display_new(data["item"]);
                            }
                            $("#preloader").modal("hide");
                        });
                    }

                });
            }
            else{
                $scope.request_stat = false;
                pwdless.socialOrSms(options, function(err, profile, id_token) {
                    $("#preloader").modal("show");
                    if (!err) {
                        //$(".login_dimmer").dimmer("show");
                        user_id_global = profile;
                        var log_id = profile["identities"][0]["user_id"];
                        loginServ.getLogin(log_id).success(function(data) {
                            if (data["data"] == "0") {
                                if (profile["identities"][0]["connection"] == "sms") {
                                    $scope.model.phone = profile["phone_number"];
                                } else if (profile["identities"][0]["connection"] == "facebook" || profile["identities"][0]["connection"] == "google-oauth2") {
                                    $scope.model.name = profile["name"];
                                    $scope.model.email = profile["email"];
                                }
                                $("#loginModal").modal({ backdrop: 'static', keyboard: false }).modal("show");
                            } else {
                                display_new(data["item"]);
                            }
                            $("#preloader").modal("hide");
                        });
                    }                    
                });
            }
        }

        amplify.clearStore = function() {
            $.each(amplify.store(), function (storeKey) {
                // Delete the current key from Amplify storage
                amplify.store(storeKey, null);
            });
            amplify.store("main_dimmer", 1);
            location.href = "/";
        };

        $scope.logout = function() {
          //localStorage.clear();
          amplify.clearStore();
          $("#logoutCon").modal("hide");
            $scope.login_text = true;
          //   $scope.userId = amplify.store("email");
          //   location.href = "/";
        }

    }


]);

// var modalInstance;

app.factory('loginServ', ['$http', function($http) {
    var loginServ = {};
    var items = ['item1', 'item2', 'item3'];
    loginServ.getLogin = function(id) {
        return $http.post(fldb + '/flytta_api/v0.1/profile/' + id)
            .success(function(data2) {
                return data2;
            });
    };
    loginServ.getRegister = function(id, jdata) {
        return $http.post(fldb + '/flytta_api/v0.1/profile/register/' + id, jdata)
            .success(function(data2) {
                return data2;
            });
    };
    return loginServ;
}]);
