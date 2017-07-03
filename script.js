window.fbAsyncInit = function () {
  FB.init({
    appId: '312624395863613',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v2.9'
  });
  FB.AppEvents.logPageView();
  // test
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      console.log('Logged in.');
    } else {
      console.log("log me in!");
      // FB.login();
    }
  });
};

// Load FB 
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "http://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Only works after `FB.init` is called
function myFacebookLogin() {
  console.log("hey")
  FB.login(function () {
    FB.api('/me/feed',
      'post', {
        message: 'Hello, world!'
      }
    );
  }, {
    scope: 'user_likes,email'
  });
}
