angular.module('app').controller('mvCourseListCtrl', function($scope, mvCachedCourses) {
    $scope.courses = mvCachedCourses.query();

    $scope.sortOptions = [
        {value: "title", text: "Sort by title"},
        {value: "published", text: "Sort by date"}
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;

})