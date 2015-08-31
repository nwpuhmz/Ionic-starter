angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('News', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var news = [{
    id: 0,
    title: 'Ben Sparrow',
    avatar: 'http://www.qq2013.org/uploads/allimg/140223/1641195108-7.jpg',
    content:'你看我叼不?你看我叼不？你看我叼不？你看我叼不？你看我叼不？你看我叼不？',
      firstImg:'http://img0.imgtn.bdimg.com/it/u=2778341655,3303525043&fm=21&gp=0.jpg',
    createTime:'2015-8-8'
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
});
