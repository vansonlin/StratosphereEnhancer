// Load FB sdk
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
    }
  });
};

// Load FB sdk
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
