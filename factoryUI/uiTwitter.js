
var uiTwitter = (function() {
  
  var API = { }; 
  
  API.factoryView = function(opts){
    var topView = Ti.UI.createView({});
	
	topView.add( imageView );
    return topView; 
  };
  
  API.factoryWindow = function(options){
     var win = Ti.UI.createWindow({title:'uiTwitter'});
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end uiTwitter
//Ti.UI.currentWindow.add( uiTwitter.factoryView({}) ); 
//uiTwitter.factoryWindow({}).addChild( uiTwitter.factoryView({}) ).open({modal:true}); 
  

