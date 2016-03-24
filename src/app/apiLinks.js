angular.module('livefeed.api_links', [])

.service('apiLinks', function(_, $window){

  return {

    link: {
      api: "https://staginglivefeedapi.arbisoft.com/api/:endpoint/",
      analytics: function(){
        return $window.ga('create', 'UA-75485796-1', 'none');
      },
      socket: "wss://staginglivefeed.arbisoft.com:5679/"
    }
    // link: {
    //  api: "https://livefeed.arbisoft.com/api/:endpoint",
    //  analytics: function(){
    //    return $window.ga('create', 'UA-75485796-1', 'auto');
    //  },
    //  socket: "ws://livefeed.arbisoft.com:5679/"
    // }
  };
});
