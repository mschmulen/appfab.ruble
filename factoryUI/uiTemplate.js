
var uiTemplate = (function() {
  
  var API = { }; 
  
  API.factoryView = function(opts){
    topView = Ti.UI.createView({});
	
    return topView; 
  };
  
  API.factoryWindow = function(options){
     win = Ti.UI.createWindow({title:'uiTemplate'});
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end uiTemplate
Ti.UI.currentWindow.add( uiTemplate.factoryView({}) ); 
//uiTemplate.factoryWindow({}).open({modal:true});
//uiTemplate.factoryWindow({}).open({fullscreen:true});  
