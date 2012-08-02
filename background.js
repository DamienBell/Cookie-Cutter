//fires whenever a connection is made
chrome.extension.onConnect.addListener(function(port) {
	
	//set up a listener to be ready for storageCount
	port.onMessage.addListener(function(info){
		window.storageInfo= info;
	})
	//called storageCount in content.js
	port.postMessage({method: "storageCount"});
	
	window.killStorage= function(){
		port.postMessage({method: "killStorage"});
	}
});





