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
  FB.login(function () {
    FB.api('/me/feed',
      'post', {
        message: 'Hello, world!'
      }
    );
  }, {
    scope: 'user_likes,email'
  });

  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      queryLikedPages();
    }
  })
}

const user = {
  "pages": []
}

let score = 50;

const queryLikedPages = function () {
  FB.api(
    "/me/likes",
    {"offset": p},
    function (response) {
      console.log(response)
      if (response && !response.error) {
        console.log(response)
        likedPage = new Set();
        for (var id in response.data) {
          user.pages.add(response.data[id].id);
        }
      }
    }
  );
}

const calculate = function (liked, po, ne) {
  negativeIds = new Set()
  for (var id in JSON.parse(negativePages)) {
    negativeIds.add(id);
  }
  console.log(negativeIds);

  positiveIds = new Set()
  for (var id in JSON.parse(positivePages)) {
    positiveIds.add(id);
  }
  console.log(positiveIds);

  let intersecPo = new Set([...po].filter(x => liked.has(x)));
  let intersecNe = new Set([...ne].filter(x => liked.has(x)));
  console.log(intersecPo)
  console.log(intersecNe)
  
  console.log(123)

}
