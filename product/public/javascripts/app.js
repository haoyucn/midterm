angular.module('candidate',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http){
    $scope.candidates = [];
 
    $scope.create = function(candidate) {
      return $http.post('/candidates', candidate).success(function(data){
        $scope.candidates.push(data);
      });
    };

    $scope.addCandidate = function(){
      if($scope.formContent ==='') { return; }
      console.log("In addCandidate with "+$scope.formContent);
      $scope.create({
        Name: $scope.formContent,
        Price: $scope.priceContent,
        upvotes: 0,
        imgURL: $scope.imgContent,
      });
      $scope.formContent = '';
      $scope.priceContent = '';
      $scope.imgContent = '';
    };

    $scope.getAll = function() {
      return $http.get('/candidates').success(function(data){
        angular.copy(data, $scope.candidates);
     });
    };
    $scope.getAll();

    $scope.delete = function(candidate) {
      $http.delete('/candidates/' + candidate._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };

    $scope.incrementUpvotes = function() {
      $scope.temp = [];
      console.log("ready to upvote");
      angular.forEach($scope.candidates, function(key){
        console.log("this is the key: "+key);
        if(key.selected==true){
          console.log("this key is ready");
          $scope.temp.push(key);
          return $http.put('/candidates/' + key._id + '/upvote')
            .success(function(data){
              console.log("upvote worked");
              key.upvotes += 1;
            });
        }

      });
    };

    $scope.upvote = function(candidate) {
      return $http.put('/candidates/' + candidate._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          candidate.upvotes += 1;
        });
    };

  }
]);


