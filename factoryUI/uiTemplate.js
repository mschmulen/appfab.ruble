
var uiTemplate = (function() {
  
  var API = { }; 
  
  API.factoryView = function(opts){
    var topView = Ti.UI.createView({});
	
	topView.add( imageView );
    return topView; 
  };
  
  API.factoryWindow = function(options){
     var win = Ti.UI.createWindow({title:'uiTemplate'});
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end uiTemplate
//Ti.UI.currentWindow.add( uiTemplate.factoryView({}) ); 
//uiTemplate.factoryWindow({}).open({modal:true}); 
  
