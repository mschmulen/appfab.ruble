
var splashView = (function() {
  
  var API = { }; 
  
  API.factoryView = function(opts){ 
    var topView = Ti.UI.createView({});
    
    var imageView = Titanium.UI.createImageView({
		image:'http://www.appcelerator.com/wp-content/uploads/2009/06/titanium_desk.png',
		width:261,
		height:178,
		top:20
	});
	
	topView.add( imageView );
    return topView; 
  };
  
  API.factoryWindow = function(options){ 
     var win = Ti.UI.createWindow({title:'Splash'}); 
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end tableView
Ti.UI.currentWindow.add( splashView.factoryView({}) ); 
//tableView.factoryWindow({}).addChild( splashView.factoryView({}) ).open({modal:true}); 
  

