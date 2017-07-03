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
      // FB.login();
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
  js.src = "http://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Only works after`FB.init` is called
// TODO(vanson): figure out the e04 login flow.
function myFacebookLogin() {
  console.log("myFacebookLogin")
  FB.login(function (response) {
    console.log(response);
  }, {
    scope: "user_likes,user_friends",
    return_scopes: true
  });
  //  FB.getLoginStatus(function (response) {
  //    if (response.status === "connected") {
  //      verifyToken();
  //    } else {
  //      FB.login(myFacebookLogin, {
  //        scope: 'user_likes,user_friends'
  //      });
  //    }
  //  })
}

function verifyToken() {
  FB.api(
    "/me/permissions",
    function (response) {
      console.log(response.data);
      hasPermission = false;
      permissions = response.data;
      for (let i = 0; i < permissions.length; i++) {
        console.log(permissions[i])
        console.log(permissions[i].permission)
        if (permissions[i].permission === "user_likes" && permissions[i].status === "granted") {
          hasPermission = true;
        }
      }

      if (hasPermission) {
        console.log("hasPermission")
        queryLikedPages()
      } else {
        console.log("no Permission")
        FB.login(myFacebookLogin, {
          scope: 'user_likes',
          auth_type: "reauthenticate"
        });
      }
    }
  )
}

const user = {
  "pages": new Set()
}

let count = 0

function queryLikedPages(next) {
  //  console.log(count++);
  FB.api(
    next, {
      "limit": 100
    },
    function (response) {
      // console.log(response.data)
      if (response && !response.error) {
        // console.log("len: %s", response.data.length)
        for (var id in response.data) {
          user.pages.add(response.data[id].id);
        }
        if (response.paging && response.paging.next) {
          queryLikedPages(response.paging.next)
        } else {
          // console.log("number of page: %s", user.pages.size);
          calculate(user.pages)
        }
      }
    }
  );
}

function calculate(liked) {
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

  score = Math.round(score);
  alert("你只有！！！ " + score + " 分！！！");
  console.log("score: %s", score);
}
