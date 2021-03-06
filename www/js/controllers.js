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
                if (response && responsemessage) {
                    error = errorMsg[response.message];
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

.controller('ShouyeCtrl', function($scope,Products,$timeout,$rootScope) {
    Products.fetchTopProducts();

    $scope.$on('$ionicView.afterEnter' , function () {
      $timeout(function(){
        $scope.products = Products.getProducts();
      },100)

    });



  $scope.doRefresh = function() {
    console.log("刷新了...");
    Products.refresh().then(function(response){
      console.log(response);
      $scope.products = response;
      $scope.hasNextPage = true;
      $scope.loadError = false;
    }).catch(function(err){
      $rootScope.requestErrorHandler({
        noBackdrop: true
      }, function() {
        $scope.loadError = true;
      })
    }).finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

   $scope.loadMore = function() {
        console.log('load more...');
     Products.pagination().then(function(response){
        console.log('load more complete');
       $scope.hasNextPage = false;
       $scope.loadError = false;
       $timeout(function(){
         $scope.hasNextPage = Products.hasNextPage();
       },100);
       $scope.products = $scope.products.concat(response);

     }).catch(function(err){
       $rootScope.requestErrorHandler({
         noBackdrop: true
       }, function() {
         $scope.loadError = true;
       })
     }).finally(function(){
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.infiniteScrollComplete');
     });


   };
        $scope.auc_state = 'aucting';
        $scope.setAucState = function(state) {

            $scope.auc_state = state;
        }

  })
    .controller('productDetailCtrl', function($scope,$rootScope, $stateParams,$ionicLoading,Products,Product) {
      var id = $stateParams.id;
    //先用 Products service 调用缓存数组里面的数据
      $scope.product = Products.getById(id);

    //load product
    $scope.loadProduct = function(reload){
     var productResource;
      if(reload === true)
        productResource = Product.get(id);
      else
        productResource = Product.getById(id);

      return productResource.$promise.then(function(response){
        $scope.product = response;
      }).catch(function(err){
        $rootScope.requestErrorHandler({
          noBackdrop: true
        }, function() {
          $scope.loadError = true;
        });
      });
    };

    //暂且先注释掉
    //$scope.loadProduct();

    $scope.doRefresh = function() {
      var promises = [];
      var promise_product = $scope.loadProduct(true).then();
      var promise_replies = Product.getReplies(id).$promise.then(function (response) {
        $scope.replies = response;
      });
      promises.push(promise_product);
      promises.push(promise_replies);

      return Promise.all(promises).then(function(response) {
        console.log('do refresh complete');
        $scope.$broadcast('scroll.refreshComplete');
      },function(err){
        console.log(err);
        $rootScope.requestErrorHandler();
        $scope.$broadcast('scroll.refreshComplete');
      });
      //return  $scope.loadProduct(true).then(function(response) {
      //  console.log('do refresh complete');
      //}, function() {
      //}).finally(function() {
      //  $scope.$broadcast('scroll.refreshComplete');
      //});
    };

    //load replies
    Product.getReplies(id).$promise.then(function (response) {
      $scope.replies = response;
    });


    //save reply
    $scope.replyData = {
      content: '',
      product_id:id
    };

    $scope.saveReply = function () {
      $ionicLoading.show();
      Product.saveReply(id,$scope.replyData).$promise.then(function (response) {
      $ionicLoading.hide();
        $scope.replyData.content = '';
        $scope.loadProduct(true).then(function () {
          Product.getReplies(id).$promise.then(function (response) {
            $scope.replies = response;
          });
        }).catch(function () {
          $rootScope.requestErrorHandler;
        });
      });
     }

    $scope.showActions = function (reply) {
      var replyContent = '@'+'hmz';
      $scope.replyData.content = replyContent+' ';

    }
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

    .controller('UploadProCtrl', function($scope, $state,$timeout, $ionicModal,$cordovaImagePicker,$ionicActionSheet, $ionicLoading,$cordovaCamera,$rootScope,Products){

      $scope.isLogin=false;
      $ionicModal.fromTemplateUrl('templates/Modal/showLogin.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

     //// before enter view event
     //   $scope.$on('$ionicView.enter', function() {
     //     // track view
     //     if (!$scope.isLogin) {
     //       $scope.modal.show();
     //     }
     //   });

      $scope.doLogin = function(){
        $scope.modal.hide();
        $scope.isLogin = true;
      }



       /*初始化*/
        $scope.images_list = [];
        $scope.categories =[{'value':0,'label':'手机'},
            {'value':1,'label':'数码'},
            {'value':2,'label':'美妆饰品'},];

        $scope.newProduct = {
            title: '',
            content: '',
            category:0,
          product_img_url:''
        };

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
                maximumImagesCount: 5,
                width: 800,
                height: 800,
                quality: 80
            };



            $cordovaImagePicker.getPictures(options)
                .then(function (results) {

                    //$scope.images_list.push(results[0]);
                   for (var i = 0; i < results.length; i++) {
                        console.log('Image URI: ' + results[i]);
                        $scope.images_list.push(results[i]);
                   }

                }, function (error) {
                    // error getting photos
                });

        }

        $scope.deleAttachment =function(image,$ionicLoading){

            $scope.images_list.splice($scope.images_list.indexOf(image),1);

        }


        $scope.publish = function(){


        var promises = [];
          for(var i = 0;i<$scope.images_list.length;i++){

           var promise= blobUtil.imgSrcToDataURL($scope.images_list[i]).then(function (dataURL) {
              // success
              var path = $scope.images_list[0].split('/'),
                name = path[path.length - 1],
                base64 = dataURL.replace(/^[^,]+,/, ''),
                file = new AV.File(name, {
                  base64: base64
                });
              return file.save();

            });
            promises.push(promise);
          }
          Promise.all(promises).then(function(response){
            console.log(response);
            for(var i =0;i<response.length;i++){
             // $scope.newProduct.product_img_url+=(response[i].toJSON().url+',');
              $scope.newProduct.product_img_url.push(response[i].toJSON().url);
            }
            $ionicLoading.show();
            console.log($scope.newProduct);
            Products.addNewProduct($scope.newProduct).$promise.then(function(response){
                $ionicLoading.hide();
                console.log(response);
              $timeout(function() {
                $state.go('tab.shouye', {
                 // id: $scope.newTopicId
                });
                $timeout(function() {
                 // $scope.doRefresh();
                }, 300);
              }, 300);
            });

          }).catch(function (err) {
            console.log(err);
            $rootScope.requestErrorHandler();
          });


        }
    });
