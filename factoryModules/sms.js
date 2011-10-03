/*
<modules>
	<module platform="iphone" version="1.0">ti.sms</module>
</modules>
*/
var uiSMS = (function() {
  	
  	var API = { }; 
    
  	API.factoryView = function( options )
	{
		var topView = Ti.UI.createView({ backgroundColor:'#B1B1B1' });
		
		Titanium.SMS = Ti.SMS = require('ti.sms');
		
		var sms = Ti.SMS.createSMSDialog({
		    animated: true
		});
		sms.barColor = 'black';
		sms.toRecipients = [
		    '5678309' // who should receive the text? put their numbers here!
		];
		sms.messageBody = 'This is a text message.';
		sms.addEventListener('complete', function(evt) {
		    if (evt.success) {
		        alert('SMS sent!');
		    }
		    else {
		        switch (evt.result) {
		            case Ti.SMS.CANCELLED:
		                alert('User cancelled SMS!');
		                break;
		            case Ti.SMS.FAILED:
		            default:
		                alert(evt.error);
		                break;
		        }
		    }
		});
		sms.open();
		
		return topView;
	}//end factoryView
	
	API.factoryWindow = function( options )
	{
		var win = Ti.UI.createWindow({title:'SMS'});
		win.add( API.factoryView( options ) );
		return win;
	}//end factoryWindow
	
	return API;
})(); //end uiSMS
Ti.UI.currentWindow.add( uiSMS.factoryView({}) );
//uiSMS.factoryWindow({}).open({});
//uiSMS.factoryWindow({}).open({fullscreen:true});

