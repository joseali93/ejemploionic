(function (){
  var app =  angular.module('starter', ['ionic','angularMoment'])

  app.controller('RedditCtrl',function($scope, $http){
    $scope.posts = [];
    $http.get('https://www.reddit.com/r/gaming/new/.json')
    .success(function(posts){
      //console.log(posts);
      angular.forEach(posts.data.children, function(post){
        $scope.posts.push(post.data);
      });
    });
    $scope.cargarNuevos = function(){
      var params2= {};
      if($scope.posts.lenght>0){
        params2['after']= $scope.posts[$scope.posts.lenght-1].name;
      }
      $http.get('https://www.reddit.com/r/gaming/new/.json',{params: params2})
      .success(function(posts){
        //console.log(posts);
        angular.forEach(posts.data.children, function(post){
          $scope.posts.push(post.data);
        });
        $scope.$broadcast('scroll.infiniteScrollComplete')
      });
    };
    $scope.refrescarPost = function(){
      if($scope.posts.lenght>0){
        var params2= {'before':$scope.posts[0].name};
      }else{
        return;
      }
      $http.get('https://www.reddit.com/r/gaming/new/.json',{params: params2})
      .success(function(posts){
        var newPost =[];

        angular.forEach(posts.data.children, function(post){
          newPost.push(post.data);
        });
        $scope.posts = newPost.concat($scope.posts)
        $scope.$broadcast('scroll.refreshComplete')
      });    
    };
    $scope.openLink = function(url){
      window.open(url,'_blank');
    };
  });
//jaspodjaposjdopasjdpoasdo
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.cordova && window.cordova.InAppBrowser){
      window.open = window.cordova.InAppBrowser.open;      
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());