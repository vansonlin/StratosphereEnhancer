const requiredScope = ["user_likes", "user_friends"];

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
  js.src = "http://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Only works after`FB.init` is called
// TODO(vanson): figure out the e04 login flow.
function myFacebookLogin() {
  console.log("myFacebookLogin")
  FB.login(function (response) {
    console.log(response);
    if (hasAllScopes(response.authResponse.grantedScopes)) {
      console.log("has all");
      queryUserId();
      queryLikedPages("/me/likes");
      queryFriends("/me/friends");
    } else {
      alert("要同意授權阿大撒幣！");
      console.log("don't have all");
    }
  }, {
    scope: requiredScope.join(","),
    return_scopes: true
  });
}

function hasAllScopes(grantedScopes) {
  grantedScopes = grantedScopes.split(",");
  let hasAll = true;
  for (let i in requiredScope) {
    if (!grantedScopes.includes(requiredScope[i])) {
      hasAll = false;
    }
  }
  return hasAll;
}

const user = {
  "id": 0,
  "pages": new Set(),
  "friends": new Set()
}

let count = 0;

function queryUserId() {
  FB.api(
    "/me",
    function (response) {
      console.log(response);
      if (response && !response.error) {
        user.id = response.id;
      }
    }
  );
}

function queryLikedPages(next) {
  console.log(count++);
  FB.api(
    next, {
      "limit": 100
    },
    function (response) {
      if (response && !response.error) {
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

function queryFriends(next) {
  console.log(next);
  FB.api(
    next, {
      "limit": 100
    },
    function (response) {
      if (response && !response.error) {
        // console.log("len: %s", response.data.length)
        for (var id in response.data) {
          console.log(response.data[id].id);
          user.friends.add(response.data[id].id);
        }
        console.log(user.friends);
      }
    }
  );
}

function calculate(liked) {
  ne = new Set()
  for (var id in negativePages) {
    ne.add(id);
  }

  po = new Set()
  for (var id in positivePages) {
    po.add(id);
  }

  let intersecPo = new Set([...liked].filter(x => po.has(x)));
  let intersecNe = new Set([...liked].filter(x => ne.has(x)));

  let x = intersecPo.size - intersecNe.size;
  let score = 10 * Math.sqrt((x + 15) * 100 / 70);

  score = Math.round(score);
  alert("你只有！！！ " + score + " 分！！！");
  console.log("score: %s", score);

  // save score to datastore
  var data = JSON.stringify({
    user_id: 12345,
    name: "vanson",
    score: score
  });

  send_data("test");
  window.location = "./question.html";
}

const send_data = function (user_data) {
  var data = JSON.stringify({
    name: "vanson",
    score: 90
  });

  console.log(data);
  var url = "https://us-central1-stratosphere-172603.cloudfunctions.net/save_to_datastore";
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function (response) {
    console.log(response);
  }
  xhr.send(data);
}

const send_data1 = function (user_data) {
  var url = "https://us-central1-stratosphere-172603.cloudfunctions.net/save_to_datastore";
  $.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify({
      name: "vanson",
      score: 90
    }),
    xhrFields: {
      // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
      // This can be used to set the 'withCredentials' property.
      // Set the value to 'true' if you'd like to pass cookies to the server.
      // If this is enabled, your server must respond with the header
      // 'Access-Control-Allow-Credentials: true'.
      withCredentials: false
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function () {
      console.log("Pure jQuery Pure JS object");
    }
  });

}
