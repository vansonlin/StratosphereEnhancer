const requiredScope = ["user_likes", "user_friends"];

const user = {
  "id": 0,
  "real_name": "",
  "pages": new Set(),
  "friends": new Set()
}

function myFacebookLogin() {
  console.log("myFacebookLogin")
  document.getElementById("loading").style.visibility = "visible";
  FB.login(function (response) {
    console.log(response);
    if (hasAllScopes(response.authResponse.grantedScopes)) {
      console.log("has all");
      queryUserId();
      queryFriends("/me/friends");
      queryLikedPages("/me/likes");
    } else {
      alert("要同意授權阿大撒幣！");
      alert("或你可能不是 tester ，找同溫組搏感情啊！");
      console.log("don't have all permissions");
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

function queryUserId() {
  FB.api(
    "/me",
    function (response) {
      console.log(response);
      if (response && !response.error) {
        user.id = response.id;
        user.real_name = response.name;
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

function queryLikedPages(next) {
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
          score = calculate(user.pages)

          createCookie("score", score, 1);
          createCookie("user_id", user.id, 1);
          createCookie("real_name", user.real_name, 1);
          window.location = "./question.html";
        }
      }
    }
  );
}
