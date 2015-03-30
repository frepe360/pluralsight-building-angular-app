angular.module('app').controller('mvMainCtrl', function($scope) {
  $scope.courses = [
    {name: 'C# for Sociopaths', featured: true, published: new Date('October 13, 2014 11:13:00')},
    {name: 'C# for Non-Sociopaths', featured: true, published: new Date('February 25, 2015 11:13:00')},
    {name: 'Super Duper Expert C#', featured: false, published: new Date('March 25, 2015 11:13:00')}
  ]
});
