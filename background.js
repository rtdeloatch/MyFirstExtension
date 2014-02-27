/* Maybe adjust this so that executeScript calls some other .js
file that has what content.js has right now. This way it might always work on youtube
hyperlinks
chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab){
		console.log(tab.url);
  //chrome.tabs.executeScript({"file": "updateConent.js"});
	});
*/

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if(request.message == "getUrl"){
			sendResponse({tabUrl: sender.tab.url});
		}
	});