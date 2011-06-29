
var uiCheckers = (function() {
  	
  	var API = { }; 
    
  	API.factoryView = function( options )
	{
		var topView = Ti.UI.createView({layout:'horizontal', width: 320, height:480 });
		
		return topView;
	}//end factoryView
	
	API.factoryWindow = function( options )
	{
		var win = Ti.UI.createWindow({title:'uiCheckers'});
		win.addChild( API.factoryView( options ) );
		return win;
	}//end factoryWindow
	
  return API;
})(); //end uiCheckers
//Ti.UI.currentWindow.add( uiCheckers.factoryView({}) );
//uiCheckers.factoryWindow({}).addChild( uiCheckers.factoryView({}) ).open({modal:true});

