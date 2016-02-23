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
    })

    .state( 'questionnaire_detail', {
      url: '/questionnaire_detail/:questionnaireId',
      views: {
        "": {
          controller: 'QuestionnaireDetailCtrl',
          templateUrl: 'questionnaire/questionnaire-detail.tpl.html'
        },
        "sidebar@questionnaire_detail":{
          templateUrl: 'common/sidebar.tpl.html'
        },

        "header@questionnaire_detail":{
          templateUrl: 'common/header.tpl.html'
        },

        "footer@questionnaire_detail":{
          templateUrl: 'common/footer.tpl.html'
        }

      },
      authenticate: true
    });

  });

})();
