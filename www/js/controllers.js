angular.module('starter.controllers', [])

.controller('ShouyeCtrl', function($scope,News) {
            
  $scope.doRefresh = function() {
    console.log("刷新了...")
      // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     };

  $scope.news = News.all();
  })
    .controller('NewDetailCtrl', function($scope, $stateParams,News) {

        $scope.new = News.get($stateParams.newId);
    })


    .controller('ZhuanquCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

      $scope.slideHasChanged = function($index){

          $scope.slideIndex = $index;

      }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
