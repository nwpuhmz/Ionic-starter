angular.module('starter.services',[])

.factory('News', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var news = [{
    id: 0,
    title: '海南博物馆专场',
    avatar: 'http://www.qq2013.org/uploads/allimg/140223/1641195108-7.jpg',
    content:'你看我叼不?你看我叼不？你看我叼不？你看我叼不？你看我叼不？你看我叼不？',
      firstImg:'http://img0.imgtn.bdimg.com/it/u=2778341655,3303525043&fm=21&gp=0.jpg',
    createTime:'1天12小时'
  }, {
    id: 1,
    title: 'Ben Sparrow',
    avatar: 'http://www.qq2013.org/uploads/allimg/140223/1641195108-7.jpg',
    content:'你看我叼不?你看我叼不？你看我叼不？你看我叼不？你看我叼不？你看我叼不？',
      firstImg:'http://img0.imgtn.bdimg.com/it/u=2362603271,162769969&fm=21&gp=0.jpg',
    createTime:'2015-8-8'
  }, {
    id: 2,
    title: 'Ben Sparrow',
    avatar: 'http://www.qq2013.org/uploads/allimg/140223/1641195108-7.jpg',
    content:'你看我叼不?你看我叼不？你看我叼不？你看我叼不？你看我叼不？你看我叼不？',
      firstImg:'http://img3.imgtn.bdimg.com/it/u=6275814,1412560407&fm=21&gp=0.jpg',
    createTime:'2015-8-8'
  },{
    id: 3,
    title: 'Ben Sparrow',
    avatar: 'http://www.qq2013.org/uploads/allimg/140223/1641195108-7.jpg',
      firstImg:'http://img0.imgtn.bdimg.com/it/u=1555336599,2310611283&fm=21&gp=0.jpg',
    content:'你看我叼不?你看我叼不？你看我叼不？你看我叼不？你看我叼不？你看我叼不？',
    createTime:'2015-8-8'
  }];

  return {
    all: function() {
      return news;
    },
    get: function(newsId) {
      for (var i = 0; i < news.length; i++) {
        if (news[i].id === parseInt(newsId)) {
          return news[i];
        }
      }
      return null;
    }
  };
})

    .factory('Product', ['$resource', function($resource){
        console.log("in product service");
        var resource =  $resource('http://localhost:7000/product', {
        },{
                creatNew: {
                    method: 'post',
                    url: 'http://localhost:7000/product'
                }

            }
        );
        return{
            addNewProduct: function(newProduct) {
                console.log("in product service"+newProduct);
                return resource.creatNew(newProduct,function(response) {
                    console.log(response);
                });
            }
        }

    }]);
