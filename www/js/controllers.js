angular.module('starter.controllers', [])

.controller('AppCtrl',function($rootScope){
        //error handler
        var errorMsg = {
            0: '网络出错啦，请再试一下',
            'wrong accessToken': '授权失败'
        };
        $rootScope.requestErrorHandler = function(options, callback) {
            return function(response) {
                var error;
                if (response.data && response.data.message) {
                    error = errorMsg[response.data.message];
                } else {
                    error = errorMsg[response.status] || 'Error: ' + response.status + ' ' + response.statusText;
                }
                var o = options || {};
                angular.extend(o, {
                    template: error,
                    duration: 1000
                });
                $ionicLoading.show(o);
                return callback && callback();
            };
        };
    })

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


    .controller('ZhuanquCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('FenLeiDetailCtrl',function($scope,$ionicPopover) {


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
)
    .controller('aucProDetailCtrl', function($scope,$ionicModal) {

        console.log("aucProDetailCtrl");

       $ionicModal.fromTemplateUrl('templates/Modal/showAucBids.html', {
            scope: $scope
       }).then(function(modal) {
            $scope.modal = modal;
       });
    })

    .controller('UploadProCtrl', function($scope,$cordovaImagePicker,$ionicActionSheet, $ionicLoading,$cordovaFileTransfer,$cordovaCamera,$rootScope,Product){

        console.log("UploadProCtrlCtrl");
        $scope.images_list = [];
        $scope.categories =[{'value':0,'label':'手机'},
            {'value':1,'label':'数码'},
            {'value':2,'label':'美妆饰品'},];

        $scope.newProduct = {
            title: '',
            content: '',
            category:0,
            current_price:0,
            old_price:0
        };


        var server = "http://7xmw6h.com1.z0.glb.clouddn.com";
        var url = "http://7xmw6h.com1.z0.glb.clouddn.com/55752cfd6ad11.jpeg";
        var targetPath = cordova.file.documentsDirectory + "testImage.png";
        console.log(cordova.file.documentsDirectory);
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
                   // for (var i = 0; i < results.length; i++) {
                   //     console.log('Image URI: ' + results[i]);
                   //     $scope.images_list.push(results[i]);
                   // }

                }, function (error) {
                    // error getting photos
                });

        }

        $scope.deleAttachment =function(image,$ionicLoading){

            $scope.images_list.splice($scope.images_list.indexOf(image),1);

        }


        $scope.publish = function(){

            //var options = new FileUploadOptions();
            //options.fileKey = "file";
            //options.fileName=$scope.images_list[0].substr($scope.images_list[0].lastIndexOf('/')+1);
            //options.mimeType="image/jpeg";
            //options.chunkedMode = true;
            //
            //
            //for(var i =0;i<$scope.images_list.length;i++){
            //    console.log($scope.images_list[i]);
            //
            //}
            //$cordovaFileTransfer.upload("http://10.13.35.25:8080/upload", $scope.images_list[0], options)
            //    .then(function(result) {
            //        // Success!
            //        console.log("Success!");
            //    }, function(err) {
            //        // Error
            //        console.log("Error!");
            //    }, function (progress) {
            //        // constant progress updates
            //        console.log("progress!");
            //    });
            $ionicLoading.show();
            console.log($scope.newProduct);
            Product.addNewProduct($scope.newProduct).$promise.then(function(response){
                $ionicLoading.hide();
                console.log(response['_id']);
            },$rootScope.requestErrorHandler);

        }
    });
