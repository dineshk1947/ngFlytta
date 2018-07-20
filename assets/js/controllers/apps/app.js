function MainCtrl() { 

  var vm = this;
  
  // Declare the array for the selected items
  vm.selected = []; 
  
  // Function to get data for all selected items
  vm.selectAll = function (collection) {
    
    // if there are no items in the 'selected' array, 
    // push all elements to 'selected'
    if (vm.selected.length === 0) {
      
      angular.forEach(collection, function(val) {
        
        vm.selected.push(val.id); 
        
      });
      
    // if there are items in the 'selected' array, 
    // add only those that ar not
    } else if (vm.selected.length > 0 && vm.selected.length != vm.data.length) {
      
      angular.forEach(collection, function(val) {
        
        var found = vm.selected.indexOf(val.id);
        
        if(found == -1) vm.selected.push(val.id);
        
      });
      
    // Otherwise, remove all items
    } else  {
      
      vm.selected = [];
      
    }
    
  };
  
  // Function to get data by selecting a single row
  vm.select = function(id) {
    
    var found = vm.selected.indexOf(id);
    
    if(found == -1) vm.selected.push(id);
    
    else vm.selected.splice(found, 1);
    
  }
  
    // Generating Smart Table Data Below
    var firstnames = ['Laurent', 'Blandine', 'Olivier', 'Max'];
    var lastnames = ['Renard', 'Faivre', 'Frere', 'Eponge'];
    var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
    var id = 1;

    function generateRandomItem(id) {

      var firstname = firstnames[Math.floor(Math.random() * 3)];
      var lastname = lastnames[Math.floor(Math.random() * 3)];
      var birthdate = dates[Math.floor(Math.random() * 3)];
      var balance = Math.floor(Math.random() * 2000);

      return {
          id: id,
          firstName: firstname,
          lastName: lastname,
          birthDate: new Date(birthdate),
          balance: balance
      }
    }

    vm.rowCollection = [];

    for (id; id < 11; id++) {
        vm.rowCollection.push(generateRandomItem(id));
    }

    vm.data = [].concat(vm.rowCollection);
}

angular
  .module('app', ['smart-table'])
  .controller('MainCtrl', MainCtrl)