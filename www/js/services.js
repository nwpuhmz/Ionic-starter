angular.module('starter.services',[])


    .factory('Product', ['$resource', function($resource,ENV){
        console.log("in product service");
    var APIUrl = 'http://localhost:7000/'+'product/:id';
     //存储从服务器拉取的数据
    var products =[];
    var nextPage = 0;
    var hasNextPage = true;

        var resource =  $resource(APIUrl, {
            id: '@id'
        },{
                creatNew: {
                    method: 'post'
                } ,

                query:{
                  method: 'get',
                  params:{
                    page:1,
                    per_page:10
                  },
                  isArray: true,
                  timeout:20000
                }

            }
        );
        return{

            fetchTopProducts: function(page ) {
                console.log('enter fetchTopProducts ');
              return resource.query({page: page},function(response){
                 products = response;
              })
            },

            refresh: function() {
              return this.fetchTopProducts(0).$promise.then(function(response){
                console.log("enter then");
                nextPage = 1;
                hasNextPage = true;
                //return promise chain --- 'response'
                return products =response;
              });
            },
             pagination: function () {
                return this.fetchTopProducts(nextPage).$promise.then(function(response){
                  if(response.length < 10){
                    hasNextPage = false;
                  }
                  nextPage++;
                  products = products.concat(response);
                  return response;
                });
             },
            hasNextPage: function (has){
              if(typeof has !== 'undefined'){
                hasNextPage = has;
              }
              return hasNextPage;
            },

            addNewProduct: function(newProduct) {
                console.log("in product service"+newProduct);
                return resource.creatNew(newProduct,function(response) {
                    console.log(response);
                });
            },
          //不用每次都从服务器拉取数据
            getProducts: function(){
              return products;
            },
            getById: function(id) {
              //return resource.get({
              //  id: id
              //}, function(response) {
              //
              //});
              console.log(products[0]._id);

              if(!!products){
                  for(var i =0;i<products.length;i++){
                    if(products[i]._id === id)
                      return products[i];
                  }
              }else
              return null;
            }

        }

    }]);
