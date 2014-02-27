var port = chrome.runtime.connect();
console.log("We  *********");
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  console.log("We only recieve *******deiwajofdj********");
  console.log(event.target);
  console.log(event.type);
  console.log(event.data);
  if (event.source != window)
  	console.log("We only rec*****************");
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
    console.log("e *********");
  }else{
  	console.log("We only recieve *********");
  }
}, false);


var btn = document.createElement("BUTTON");
var t = document.createTextNode("CLICK ME");
choice = 0;
btn.appendChild(t);

//For interaction with background and content page
  chrome.runtime.sendMessage({message: "getUrl"}, function(response){
    //once the tab url is received
    console.log(response.tabUrl);
    
  });


//onclick='alert(&quot;Hello World!&quot;)
//<div id='watch7-headline' class='clearfix  yt-uix-expander yt-uix-expander-collapsed'
//clearfix yt-uix-expander yt-uix-expander-collapsed
"
<style>
#app
{
background-color:#d0e4fe;
color: black;
padding: 20px 20px 20px 20px;
}
</style>
<div id='app'>
<body>
<title>Please enter indicate which is applicable to you.</title>
<form>
<input type='radio' name='understand' value='gotit'>I already get it so it's a waste of my time to hear it again.<br>
<input type='radio' name='understand' value='newtome'>This is new to me and I completely get it.<br>
<input type='radio' name='understand' value='mid'>I half get it and need to do more work to get it all.<br>
<input type='radio' name='understand' value='failit'>I don\'t get it at all.<br>
</form>
<body>
</div>
"
