var  starter.controllers = angular.module('starter.controllers', []);

starter.controllers.controller('ShouyeCtrl', function($scope) {
            
  $scope.doRefresh = function() {
    console.log("刷新了...")
      // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     }
     $scope.newsDetal = function() {
    console.log("进入了新闻详情...")
      
     }
  });
 
 starter.controllers.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});

starter.controllers.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$ionicTabsDelegate) {
  //$ionicTabsDelegate.showTabBar(false);
  $scope.chat = Chats.get($stateParams.chatId);
});

starter.controllers.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
