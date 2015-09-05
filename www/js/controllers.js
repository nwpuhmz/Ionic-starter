angular.module('starter.controllers', [])

.controller('ShouyeCtrl', function($scope,News) {
            
  $scope.doRefresh = function() {
    console.log("刷新了...")
      // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     };

  $scope.news = News.all();

        $scope.auc_state = 'aucting';
        $scope.setAucState = function(state) {

            $scope.auc_state = state;
        }

  })
    .controller('NewDetailCtrl', function($scope, $stateParams,News) {

        $scope.new = News.get($stateParams.newId);
    })


    .controller('ZhuanquCtrl', function($scope,$cordovaImagePicker,$ionicActionSheet) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
        $scope.images_list = [];



        // "添加附件"Event
        $scope.addAttachment = function() {

            $ionicActionSheet.show({
                buttons: [
                    { text: '相机' },
                    { text: '图库' }
                ],
                cancelText: '关闭',
                cancel: function() {
                    return true;
                },
                buttonClicked: function(index) {

                    switch (index){

                        case 0:appendByCamera();
                            break;
                        case 1:

                       pickImage();
                            break;
                        default:
                            break;
                    }
                    return true;
                }
            });
        }


        //image picker
        var pickImage = function () {



            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {

                    $scope.images_list.push(results[0]);

                }, function (error) {
                    // error getting photos
                });

        }

        $scope.deleAttachment =function(image,$ionicLoading){

            $scope.images_list.splice($scope.images_list.indexOf(image),1);

        }

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('FenLeiDetailCtrl',function($scope,$ionicPopover) {


        console.log("ddfdfasdf");
    $ionicPopover.fromTemplateUrl('templates/selectPopover.html',{
        scope:$scope
    }).then(function(popover){
        $scope.popover = popover;
    });
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });



    }
);
