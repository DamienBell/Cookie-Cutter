/*
	content script should have access to dom

*/

var port = chrome.extension.connect({name: "storage"});

port.onMessage.addListener(function(msg) {
	
	switch(msg.method){
	
		case "storageCount":
			
			port.postMessage({method: "returnStorageCount",
							  count: localStorage.length,
							  url : location
							  });
		break;	
		case "killStorage":
			localStorage.clear();
			port.postMessage({method: "resetStorage"});
		break;
	}
});

