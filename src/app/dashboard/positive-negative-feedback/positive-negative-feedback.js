angular.module( 'livefeed.dashboard.positive_negative_feedback', [
  'factories',
  'helper_factories',
  'ui.bootstrap',
  'flash'
])

.controller( 'PositiveNegativeFeedbackCtrl', function DashboardController( $scope, _, Global, Graphs,$uibModal, $log, commentService, Flash ) {

  $scope.show_error_message = false;

  Graphs.comments(1).$promise.then(function(data){
    if(data.success) {
      $scope.show_error_message = false;
      $scope.feedback_count = data.response.feedback_count;
      $scope.comments = _.map(data.response.feedbacks, function (data) {
        return commentService.getComment(data);
      });
    }
    else{
      $scope.show_error_message = true;
      $scope.error_message = data.message;
      Flash.create('danger', $scope.error_message, 'custom-class');
    }
  });

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      templateUrl: 'dashboard/positive-negative-feedback/comments-modal.tpl.html',
      controller: 'ModalInstanceCtrl',
      size: 1200,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      //$scope.selected = selectedItem;
    });
  };

})

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, Graphs, commentService, Flash) {

  $scope.comments = [];
  $scope.page = 1;

  $scope.lock = false;

  $scope.show_error_message = false;

  $scope.selectedValue = function(value, comment){
    comment.show_dropdown = false;
    comment.action_string = value == "Process" ? "Processed" : "Deferred";
    var action_id = value == "Process" ? 2 : 3;
    Graphs.action_taken(comment.data.id,action_id).$promise.then(function(data){
      if(data.success) {
        $scope.show_error_message = false;
        comment.data.action_taken = data.response.action_taken;
      }
      else {
       $scope.show_error_message = true;
       $scope.error_message = data.message;
       Flash.create('danger', $scope.error_message, 'custom-class');
      }
    });
  };

  Graphs.comments($scope.page).$promise.then(function(data){
    if(data.success) {
      $scope.show_error_message = false;
      $scope.comments = _.map(data.response.feedbacks, function (data) {
        return commentService.getComment(data);
      });
    }
    else {
     $scope.show_error_message = true;
     $scope.error_message = data.message;
     Flash.create('danger', $scope.error_message, 'custom-class');
    }
  });

  $scope.getMoreComments = function(){
    var show_dropdown, action_string;
    $scope.page = $scope.page + 1;
    $scope.lock = true;
    Graphs.comments($scope.page).$promise.then(function(data){
      if(data.success) {
        $scope.show_error_message = false;
        $scope.lock = false;
        angular.forEach(data.response.feedbacks, function (value, key) {
          var comment_data = commentService.getComment(value);
          $scope.comments.push(comment_data);
        });
      }
      else {
       $scope.show_error_message = true;
       $scope.error_message = data.message;
       Flash.create('danger', $scope.error_message, 'custom-class');
      }
    });
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})


.directive('mobileNav', function(){
  return {
    restrict: 'A',
    link: function(scope, ele, attrs){
      window.initMobileNav();
      window.initPositionFixed();
      ele.bind("click", function(event){
        assignHeight();
      });

      $(document).on("scroll", function() {
        assignHeight();
      });

      function assignHeight(){
        var height;
        var window_height = document.body.offsetHeight;
        var content_top = $(".wrapper-content").offset().top;
        var header_height = $(".heading-holder").height();
        var button_holder = $(".btn-holder").height();
        if($(window).scrollTop() === 0){
          height = window_height - content_top - header_height - button_holder;
        }
        else if($(window).scrollTop() > 0 && $(window).scrollTop() <= content_top){
          height = window_height - content_top - header_height - button_holder + $(window).scrollTop();
        }
        else if($(window).scrollTop() > content_top){
          height = window_height - header_height - button_holder;
        }
        $(".comments-holder").css("height", height);
		window.initCustomForms();
      }
    }
  };
})


.directive('customForm', function(){
  return {
    restrict: 'A',
    scope: {
      comments: '='
    },
    link: function(scope, ele, attrs){
      scope.$watch('comments', function(watchedComments) {
        if(watchedComments !== undefined){
          window.initCustomForms();
        }
      });

    }
  };
})

.directive('whenScrolled', function() {
  return {
    link: function(scope, elm, attr) {
      var raw = elm[0];
      elm.bind('scroll', function() {
        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
          if(scope.lock === false){
            scope.$apply(attr.whenScrolled);
          }
        }
      });
    }
  };
})

.service('commentService', function(_){
  return {
      getComment: function(comment_data){
        var data = comment_data;
        var phone_no = comment_data.user_phone == "N/A" ? ( comment_data.email == "N/A" ? "N/A" : "" ) : comment_data.user_phone;
        var email = comment_data.email == "N/A" ? "" : comment_data.email;
        var show_dropdown = comment_data.action_taken === 1 ?  true : false;
        var action_string = comment_data.action_taken === 2 ? "Processed" : comment_data.action_taken === 3 ? "Deferred" : "";
        var date_time = new Date(comment_data.created_at).toString().split("GMT")[0];

        return {data: data, email: email, phone_no: phone_no, show_dropdown: show_dropdown, action_string: action_string, date_time: date_time};
      }
  };

});
