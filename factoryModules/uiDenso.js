

var uiSplash = (function() {
  	
  	var API = { }; 
  	
  	API.name = "Splash";
	API.icon = "/KS_nav_ui.png";
	API.parentNav = null;
	API.win = null;
  	
 	API.factoryView = function(opts){ 
    	topView = Ti.UI.createView({});
    	
    	var imageView = Titanium.UI.createImageView({
			image:'http://codedog.net/wp-content/uploads/2011/09/appcelerator.png',
			width:261,
			height:178,
			top:20
		});
		
		topView.add( imageView );
    	return topView;
  	};//end factoryView
  	
  	API.factoryWindow = function(opts){
 		API.win = Ti.UI.createWindow(UTILS.combine(STYLE.Win, {
			title : API.name
		}));
		API.win.add(API.factoryView(opts));
		return API.win;
  	};//end factoryWindow
  	
  	return API;
})(); //end uiSplash
Ti.UI.currentWindow.add( uiSplash.factoryView({}) ); 
//uiSplash.factoryWindow({}).open({modal:true});
//uiSplash.factoryWindow({}).open({fullscreen:true});
//module.exports = uiSplash

