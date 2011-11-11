
var uiWebView = (function() {
  
  var API = { }; 
  
  API.factoryView = function(opts){ 
    topView = Ti.UI.createView({});
    
	var webView = Ti.UI.createWebView({
		url:'http://www.woot.com',
		top:20,
		bottom:20,
		left:20,
		right:20
	});//end webView
	topView.add( webView );
	
    return topView;
  };
  
  API.factoryWindow = function(options){
     win = Ti.UI.createWindow({title:'webView'}); 
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end uiSplash
Ti.UI.currentWindow.add( uiWebView.factoryView({}) ); 
//uiWebView.factoryWindow({}).open({modal:true});
//uiWebView.factoryWindow({}).open({fullscreen:true});
//exports = uiTemplate
