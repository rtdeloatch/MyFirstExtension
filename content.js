//Example of code being run in the window when cotent script is loaded and matches
//a particular site
/*
window.open();
var greeting = "hola, ";
window.addEventListener("click", function() {
  alert(greeting);
}, false);
*/
WASTE = 1;
NEW = 2;
HALF = 3;
NONE = 4;

function trim(string){
  string.replace('\n', '\\');
  return string;
}

function getTime(player){
  currentTime = 0;
  try{
    time = player.getCurrentTime();
  }catch(err){
    time = document.getElementsByClassName("video-stream")[0].currentTime;
  //  player.getDuration() Keep not sure what this does
  }
  return time;
}

var btn = document.createElement("BUTTON");
var t = document.createTextNode("CLICK ME");
choice = 0;
btn.appendChild(t);
//Appending to DOM
newDiv = document.getElementById("watch7-container");
myPlayer = document.getElementById("movie_player");


btmPlayer = document.getElementById("playlist-tray");
//alert(newDiv.id);
var data = "<div style='color:#0000FF' id='btn'><button id='clickMe'>STOP</button></div>";
//jQuery.get('');
var appLayout = 'http://www.robertdeloatch.com/wp-content/uploads/2013/10/changedAppLayout5.html';

console.log(myPlayer);
data = {call: callback, url: appLayout, flag: 1};
getSource(data);

function getSource(data){ 
  var client = new XMLHttpRequest();
  client.onreadystatechange = function(){
    if(client.readyState === 4 && client.status === 200 && data.call){
      data.text = client.responseText;
      data.call(data);
    }
  };
  client.open('GET', data.url);
  client.send();
}

function callback(data){
  console.log("Inside callback flag is: " + data.flag);
  if(data.flag === 1){
    $(data.text).insertBefore(newDiv);
    checkSelection();
  }else{
    console.log("Inside else of callback");
    $("div.appClass").replaceWith(data.text);
  }
}

function checkSelection(){
  document.getElementById("submit").onclick = function (){
    if(document.getElementById('r1').checked){
      choice = WASTE;
    }else if(document.getElementById('r2').checked){
      choice = NEW;
    }else if(document.getElementById('r3').checked){
      choice = HALF;
    }else if(document.getElementById('r4').checked){
      choice = NONE;
    }
    console.log(choice);
    console.log(getTime(myPlayer));
    changeScreen();
  };
}

function changeScreen(){
  var nextQuestionLayout = 'http://www.robertdeloatch.com/wp-content/uploads/2013/10/nextQuestion.html';
  chrome.runtime.sendMessage({message: "getUrl"}, function(response){
    //once the tab url is received
    console.log(response.tabUrl);
    $(".appClass").empty();
    var newData = {call: callback, url:nextQuestionLayout, flag:2};
    getSource(newData);
  });
}



//onclick='alert(&quot;Hello World!&quot;)
//<div id='watch7-headline' class='clearfix  yt-uix-expander yt-uix-expander-collapsed'
//clearfix yt-uix-expander yt-uix-expander-collapsed