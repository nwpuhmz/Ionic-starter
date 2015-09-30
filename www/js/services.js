angular.module('starter.services',[])


    .factory('Product', ['$resource', function($resource,ENV){
        console.log("in product service");
    var APIUrl = 'http://localhost:7000/'+'product/:id',
     //存储从服务器拉取的数据
        products =[];
        var resource =  $resource(APIUrl, {
            id: '@id'
        },{
                creatNew: {
                    method: 'post'
                } ,

                query:{
                  method: 'get',
                  isArray: true,
                  timeout:20000
                }

            }
        );
        return{

            fetchTopProducts: function() {
                console.log('enter fetchTopProducts ');
              return resource.query({},function(response){
                console.log(response);
                 products = response;
              })
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
