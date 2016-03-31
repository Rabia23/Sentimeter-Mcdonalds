angular.module('livefeed.api_links', [])

.service('apiLinks', function(_, $window){

  return {

    link: {
      api: "https://stagingapimcdonalds.sentimeter.io/api/:endpoint/",
      analytics: function(){
        return $window.ga('create', 'UA-75485796-1', 'none');
      },
      socket: "wss://stagingmcdonalds.sentimeter.io:5679/"
    }
    // link: {
    //   api: "https://apimcdonalds.sentimeter.io/api/:endpoint",
    //   analytics: function(){
    //     return $window.ga('create', 'UA-75485796-1', 'auto');
    //   },
    //   socket: "wss://mcdonalds.sentimeter.io:5679/"
    // }
  };
});
