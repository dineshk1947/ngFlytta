 angular.module('Property',[])
 .component('property', {
    templateUrl: 'assets/tpl/home/home_property.html',
    $routeConfig: [
      {path:'/search/map',  name: 'Map',   component: 'propertyMap', useAsDefault: true},
      {path:'/search/list', name: 'List', component: 'propertyList'}
    ]
  })
  .component('propertyMap', {
    template:'assets/tpl/search/one.html',
    bindings: { $router: '<' }
    // controller: CrisisListComponent,
    // $canActivate: function($nextInstruction, $prevInstruction) {
    //   console.log('$canActivate', arguments);
    // }
  })
  .component('propertyList', {
    template:'assets/tpl/search_mover/two_1.html',
    bindings: { $router: '<' }
    // controller: CrisisListComponent,
    // $canActivate: function($nextInstruction, $prevInstruction) {
    //   console.log('$canActivate', arguments);
    // }
  })