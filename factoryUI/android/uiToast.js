
/*
var uiToast = (function() {
  
  var API = { }; 
  
  API.factoryView = function(opts){ 
    topView = Ti.UI.createView({});
	
	var button = Ti.UI.createButton({ title: ' TOAST ', width: 100, height: 30 });
		
		button.addEventListener('click', function(e) {
			Ti.API.info( 'CLICK');
			API.fireToast();
		});//end button
		
		topView.add( button );
		
    return topView; 
  };
  
  API.fireToast = function(){
	//Ti.UI.createNotification({ message : "TOAST" }).show();
	var hour = 1;
	var min = 15;
	var now = new Date().getTime();
	
	//Ti.API.info( "now:" + now );
    //var alarmTime = new Date( now.getFullYear() , now.getMonth(), now.getDay(), hour, min, 0, 0 );
 	//var alarmTimeMS = alarmTime.getTime();
	//Ti.API.info( "alarmTime:" + alarmTime );

    var deltaMS = alarmTime - now;
 	
 	//var alarmTime = new Date( )
    alert(deltaMS);
 	
  };//end fireToast
  
  API.factoryWindow = function(options){
     win = Ti.UI.createWindow({title:'Toast'}); 
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end uiToast
Ti.UI.currentWindow.add( uiToast.factoryView({}) ); 
//uiToast.factoryWindow({}).open({modal:true});
//uiToast.factoryWindow({}).open({fullscreen:true});
*/

