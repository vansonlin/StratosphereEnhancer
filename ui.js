
function fetch_result () {
  
  var score = readCookie("score");
  document.getElementById("score").innerHTML = score + "分";
  /*
  var data = JSON.stringify({
    user_id: user.id
  });

  var url = "";
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader("Content-Type", "application/json"); 
  xhr.send(data);
  */
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
