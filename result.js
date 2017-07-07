
function fetch_result () {
  var score = readCookie("score");
  document.getElementById("score").innerHTML = score + "分";
}

function share(score) {
  FB.ui({
    method: 'share_open_graph',
    action_type: 'og.likes',
    action_properties: JSON.stringify({
        // TODO: change it to production link later
        object:'https://vansonlin.github.io/StratosphereEnhancer',
    })
  }, function(response){
    // Debug response (optional)
    console.log(response);
  });
}
