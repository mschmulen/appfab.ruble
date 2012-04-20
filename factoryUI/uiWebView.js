var uiWebView = (function() {
  
  	var API = { }; 
  	
  	API.name = "Web";
	API.icon = "/KS_nav_ui.png";
	API.parentNav = null;
	API.win = null;
	
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
  	
  	API.factoryWindow = function(opts){
 		API.win = Ti.UI.createWindow(UTILS.combine(STYLE.Win, {
			title : API.name
		}));
		API.win.add(API.factoryView(opts));
		return API.win;
  	};//end factoryWindow
  	
  	return API;
})(); //end uiWebView
Ti.UI.currentWindow.add( uiWebView.factoryView({}) ); 
//uiWebView.factoryWindow({}).open({modal:true});
//uiWebView.factoryWindow({}).open({fullscreen:true});
//module.exports = uiWebView

