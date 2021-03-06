/***
 Robert Deloatch
 February 20, 2014
 content.js
 rtdeloatch@gmail.com
 *****/

//Constant values of selections in question page
WASTE = 1;
NEW = 2;
HALF = 3;
NONE = 4;

TIME_CODE = "time_code";
VIDEO_TIME = "video_time";
ACTUAL_TIME = "actual_time";
ACTUAL_INTERVAL = 12; //number of seconds in between app launches


//Get elements from DOM for location of appendage
newDiv = document.getElementById("watch7-container");
myTimer = null;
myPlayer = document.getElementById("movie_player");

//Website that contains layout for question app
appLayout = 'http://www.robertdeloatch.com/wp-content/uploads/2013/10/changedAppLayout5.html';

//create object for page
var data = {call: callback, url: appLayout, flag: "insert", 
        mode:ACTUAL_TIME, interval:ACTUAL_INTERVAL};

videoSetFinishListener(myPlayer);

appMainLoop(data);

function appMainLoop(data){
  count = 0;
  //console.log("Hello: " + count);
  function step(){
    //console.log("Step: " + count);
    count += 1;
 

    //todo: Consider refactoring
    try{
      if(myPlayer.getPlayerState() === 0){
        clearInterval(myTimer);
      }
    }catch(err){
      if(document.getElementsByClassName("video-stream")[0].ended){
        clearInterval(myTimer);
      }
    }

    
    if(count >= data.interval){
      if(data.inLoop){
        data.flag = "update";
        data.url = appLayout;
      }
      getSource(data);
      count = 0;
      data.inLoop = true;
    }
  }
  myTimer = setInterval(step, 1000) //milliseconds, so every second
}

//obtains the HTML for creation of app within webpage
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

//Insert HTML of app into the DOM
function callback(ldata){
  if(ldata.flag === "insert"){
    $(ldata.text).insertBefore(newDiv);
    checkSelection();
  }else if(ldata.flag === "submitted"){
    $("div.appClass").replaceWith(ldata.text);
  }else if(ldata.flag === "update"){
    $(".appClass").empty();
    $("div.appClass").replaceWith(ldata.text);
    checkSelection();
  }else{

  }
}

//Log the information once a selection is submitted
function checkSelection(){
  document.getElementById("submit").onclick = function (){
    var choice = 0;
    if(document.getElementById('r1').checked){
      choice = WASTE;
    }else if(document.getElementById('r2').checked){
      choice = NEW;
    }else if(document.getElementById('r3').checked){
      choice = HALF;
    }else if(document.getElementById('r4').checked){
      choice = NONE;
    }
    //TODO: Log the selection somewhere other than console.
    //console.log(getTime(myPlayer));
    console.log(choice);
    changeScreen();
  };
}

//Update the screen to show waiting for next question
function changeScreen(){
  //page for next question
  var nextQuestionLayout = 'http://www.robertdeloatch.com/wp-content/uploads/2013/10/nextQuestion.html';
  var newData = {call: callback, url:nextQuestionLayout, flag:"submitted"};
  $(".appClass").empty();
  getSource(newData);
}

//Get the time regardless of if player is HTML5 or Flash.
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

function videoSetFinishListener(player){
  console.log("videoSetFinishListener");
  player.addEventListener("onStateChange", "onPlayerStateChanged");
}
  /*catch(err){
    document.getElementsByClassName("video-stream")[0].onend = function() { clearInterval(myTimer);};
  }*/

function onPlayerStateChanged(state){
  console.log("state changed");
  if(state === 0){
    console.log("Video ended");
    clearInterval(myTimer);
  }
}