angular.module('livefeed.authService', [])

.service('TokenHandler', function (){
  
  return {
    
    store_token: function(token, id, username){
      window.sessionStorage.setItem('token', token);
      window.sessionStorage.setItem('loggedin', 'true');
      window.sessionStorage.setItem('uid', id);
      window.sessionStorage.setItem('username', username);
    },

    remove_token: function(){
      window.sessionStorage.setItem('token',"");
      window.sessionStorage.setItem('loggedin', "false");
      window.sessionStorage.setItem('uid', null);
      window.sessionStorage.setItem('username', "");
    },

    get_token: function(){
      return window.sessionStorage.getItem("token");
    },

    get_uid: function(){
      return window.sessionStorage.getItem("id");
    },

    get_username: function(){
      return window.sessionStorage.getItem("username");
    }
  };
})

.service('Auth', function (TokenHandler){
  
  return {
    is_logged_in: function(){
      var value = window.sessionStorage.getItem("loggedin");
      if(value === 'true'){
        return true;
      }
      else{
        return false;
      }
    },
    is_logged_out: function(){
      TokenHandler.remove_token();
    }
  };
});