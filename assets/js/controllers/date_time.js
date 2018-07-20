app.factory('getDateTime',['$scope',function($scope){
  var getDateTime = {};
  getDateTime.getdate = function(datetime){
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
  getDateTime.gettime = function(datetime){
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
  return getDateTime;
}]);

