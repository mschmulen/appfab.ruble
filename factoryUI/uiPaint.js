
var uiPaint = (function() {
  	
	var API = { };
  	
  	API.factoryView = function(opts){
  		
  		Titanium.Painter = require('ti.paint');
  		
    	var topView = Ti.UI.createView({ backgroundColor: 'green', width:320, height:480});
    
	    var painter = Titanium.Painter.createView({
	    	top:10,
			left:10,
			right:10,
			height:350 });
		
		topView.add(painter);
		
	    return topView;
	};
  	
  	API.factoryWindow = function(opts){ 
     	var win = Ti.UI.createWindow({title:'uiPaint'}); 
     	win.addChild( factoryView( options ) ); 
     	return win; 
  	};
  	
  	return API;
})(); //end uiPaint
Ti.UI.currentWindow.add( uiPaint.factoryView({}) );
//uiPaint.factoryWindow({}).addChild( uiPaint.factoryView({}) ).open({modal:true});
//exports = uiTemplate  
