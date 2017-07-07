
function fetch_result () {
  var score = readCookie("score");
  document.getElementById("score").innerHTML = score + "分";
}

function share(score) {
  FB.ui({
    method: 'share_open_graph',
    action_type: 'og.likes',
    action_properties: JSON.stringify({
        // change it to production link later
        object:'http://localhost:8080',
    })
  }, function(response){
    // Debug response (optional)
    console.log(response);
  });
}
