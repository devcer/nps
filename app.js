var app = angular.module('appModule', []);
app.controller('appController', function($scope, $http) {
  $scope.hello= "Hello World!!!";
  $scope.detractors=0;
  $scope.detractorsPercentage=0;
  $scope.passives=0;
  $scope.passivesPercentage=0;
  $scope.promoters=0;
  $scope.promotersPercentage=0;
  $scope.showScoreSelect=true;
  $scope.comments=[];
  $scope.totalResponses=0;
  $scope.selectedCategory="";

  $http.get("data.json")
  .then(function(response){
    $scope.phoneData=response.data;
    console.log(response);
  },function(error){
    console.log("Error:"+error);
  });

  $scope.scoreClicked=function(clickedScore){
    $scope.clickedScore=clickedScore;
    $scope.showScoreSelect=false;
    $scope.totalResponses+=1;
    if(clickedScore>=0&&clickedScore<=6){
      $scope.detractors+=1;
      $scope.detractorsPercentage=($scope.detractors/$scope.totalResponses)*100;
    }
    else if(clickedScore==7||clickedScore==8){
      $scope.passives+=1;
      $scope.passivesPercentage=($scope.passives/$scope.totalResponses)*100;
    }
    else{
      $scope.promoters+=1;
      $scope.promotersPercentage=($scope.promoters/$scope.totalResponses)*100;
    }
    console.log("detractors:"+$scope.detractors+" passives:"+$scope.passives+"promoters:"+$scope.promoters);
    $scope.npsScore=(($scope.promoters-$scope.detractors)/($scope.detractors+$scope.promoters+$scope.passives))*100;
  }

  $scope.submitComment=function(){
    $scope.comments.push({'comment':$scope.givenComment});
    $scope.showScoreSelect=true;
  }
});