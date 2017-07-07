function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Save score to datastore.
function sendData(answer) {
  var user_data = JSON.stringify({
    user_id: readCookie("user_id"),
    name: readCookie("real_name"),
    score: parseInt(readCookie("score")),
    answer: answer,
    version: 2
  });

  console.log(user_data);
  var url = "https://us-central1-stratosphere-172603.cloudfunctions.net/save_to_datastore";
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function (response) {
    console.log(response);
    window.location = "./result.html";
  }
  xhr.send(user_data);
}
