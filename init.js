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
      queryLikedPages("/me/likes");
    }
  });
}

const user = {
  "pages": new Set()
}

const queryLikedPages = function (next) {
  FB.api(
    next,
    function (response) {
      if (response && !response.error) {
        for (var id in response.data) {
          user.pages.add(response.data[id].id);
        }
        if (response.paging && response.paging.next) {
          queryLikedPages(response.paging.next)
        } else {
          console.log("number of page: %s", user.pages.size);
          calculate(user.pages)
        }
      }
    }
  );
}

const calculate = function (liked) {
  ne = new Set()
  for (var id in JSON.parse(negativePages)) {
    ne.add(id);
  }

  po = new Set()
  for (var id in JSON.parse(positivePages)) {
    po.add(id);
  }

  let intersecPo = new Set([...liked].filter(x => po.has(x)));
  let intersecNe = new Set([...liked].filter(x => ne.has(x)));

  let x = intersecPo.size - intersecNe.size;
  let score = (x + 15) * 100 / 35

  console.log("score: %s", score);
}
