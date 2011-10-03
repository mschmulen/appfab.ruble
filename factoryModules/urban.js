//<module platform="iphone" version="1.1">ti.urbanairship</module>
var uiUrban = (function() {
  	
  	var API = { }; 
    
  	API.factoryView = function( options )
	{
		var topView = Ti.UI.createView({ backgroundColor:'#B1B1B1' });
		
	
		
		
		return topView;
	}//end factoryView
	
	API.factoryWindow = function( options )
	{
		var win = Ti.UI.createWindow({title:'Urban'});
		win.add( API.factoryView( options ) );
		return win;
	}//end factoryWindow
	
  return API;
})(); //end uiQuickLook
Ti.UI.currentWindow.add( uiUrban.factoryView({}) );
//uiUrban.factoryWindow({}).open({});
//uiUrban.factoryWindow({}).open({fullscreen:true});

