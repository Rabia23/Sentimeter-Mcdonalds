(function() {
  angular.module( 'livefeed.questionnaire')

  .config(function config( $stateProvider ) {
    $stateProvider
    .state( 'questionnaire', {
      url: '/questionnaire',
      views: {
        "": {
          controller: 'QuestionnaireCtrl',
          templateUrl: 'questionnaire/questionnaire.tpl.html'
        },
        "sidebar@questionnaire":{
          templateUrl: 'common/sidebar.tpl.html'
        },

        "header@questionnaire":{
          templateUrl: 'common/header.tpl.html'
        },

        "footer@questionnaire":{
          templateUrl: 'common/footer.tpl.html'
        }

      },
      authenticate: true
    });

  });

})();
