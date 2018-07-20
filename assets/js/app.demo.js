app.run(['$rootScope', '$analytics', function ($rootScope, $analytics) {
  $rootScope.$on('theme:change', function(event, msg) {
    $analytics.eventTrack(msg, {  category: 'Themepicker' });
  });
  // lockPasswordless.interceptHash();

  //  lockPasswordless.on('authenticated', function(authResult) {
  //   localStorage.setItem('id_token', authResult.idToken);

  //   lockPasswordless.getProfile(result.idToken, function(error, profile) {
  //     if (error) {
  //       ////console.log(error);
  //     }
  //     localStorage.setItem('profile', JSON.stringify(profile));
  //   });
  // });
}]);
