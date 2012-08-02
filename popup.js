/*
	get current window.location
	get hostname
	get related cookies, localStorage
	append the total count of both as a badge
	
	on open
	  crunch all option
	  crunch cookies
	  	- crunch individual cookies
	  crunck localStorage
	  	- crunch individual local storage

*/

var cookies;
var storage;
var background;

function setCookies(){
	chrome.tabs.getSelected(null, function(tab) {
		chrome.cookies.getAll({"url" : tab.url}, function(results){ 
			cookies= results;
			$('#cookie-counter').text(cookies.length);	
		});
	});			
}

function setStorage(){
	background= chrome.extension.getBackgroundPage();	
	storage   = background.storageInfo;
	$('#storage-counter').text(storage.count);
}

function init(){
	
	setCookies();
	setStorage();
	
	$('#cookie-crunch').on('click',function(){
		for(var i= 0; i <  cookies.length; i++){
			deleteCookie(cookies[i]);
		}
		setCookies();
	});
	$('#storage-crunch').on('click', function(){
		background.killStorage();
		
		//hack for now
		$('#storage-counter').text("0");
	});
}

function deleteCookie(cookie){
	 var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
	  chrome.cookies.remove({"name": cookie.name, "url": url});
}

Zepto(function($){
	init();
});
