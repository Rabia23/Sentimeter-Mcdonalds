describe('QuestionnaireCtrl', function(){

  var $state, $rootScope;

  beforeEach(module('livefeed.questionnaire'));
  beforeEach(module('livefeed'));

  beforeEach(inject(function(_$state_, _$rootScope_, _$controller_) {
    $state = _$state_;
    $rootScope = _$rootScope_;

    createController = function() {
      return _$controller_("QuestionnaireCtrl", {$scope: $rootScope});
    };

  }));

  it('should change page heading', function(){
    var controller =  createController();
    expect($rootScope.page_heading).toBe("Questionnaires List");
  });


  describe('$scope.detail', function(){
    it('should move app to questionnaire_detail page', function() {
      var controller =  createController();
      spyOn($state, 'go');
      $rootScope.detail(1);
      expect($state.go).toHaveBeenCalledWith('questionnaire_detail', {questionnaireId: 1});
    });
  });

});
