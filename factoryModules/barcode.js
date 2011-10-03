/*
<modules>
	<module platform="iphone" version="1.3">ti.barcode</module>
</modules>
 */
var uiBarcode = (function() {
  	
  	var API = { };
    
  	API.factoryView = function( options )
	{
		var topView = Ti.UI.createView({ backgroundColor:'#B1B1B1' });
		
		var button = Ti.UI.createButton({
		    title: 'Scan Code',
		    width: 150, height: 40,
		    top: 20
		});
		topView.add( button );
		
		var label = Ti.UI.createLabel({
    		text: 'You may need to rotate the device',
    		top: 70,
    		height: 'auto', width: 'auto',
    		font: { fontSize: 12 }
		});
		topView.add( label );
		
		Titanium.Barcode = Ti.Barcode = require('ti.barcode');
		Ti.Barcode.allowRotation = true;
		Ti.Barcode.displayedMessage = 'Place a barcode inside the viewfinder rectangle; hold your device steady!';
		
		button.addEventListener('click', function() {
		    Ti.Barcode.capture({
		        success: function(event) {
		            var msg = '';
		            switch (event.contentType) {
		                case Ti.Barcode.URL:
		                    msg = 'URL = ' + event.result;
		                    break;
		                case Ti.Barcode.SMS:
		                    msg = 'SMS = ' + event.data.phonenumber;
		                    break;
		                case Ti.Barcode.TELEPHONE:
		                    msg = 'Telephone = ' + event.data.phonenumber;
		                    break;
		                case Ti.Barcode.TEXT:
		                    msg = 'Text = ' + event.result;
		                    break;
		                case Ti.Barcode.CALENDAR:
		                    msg = 'Calendar = ' + JSON.stringify(event.data);
		                    break;
		                case Ti.Barcode.GEOLOCATION:
		                    msg = 'Latitude = ' + event.data.latitude + '\nLongitude = ' + event.data.longitude;
		                    break;
		                case Ti.Barcode.EMAIL:
		                    msg = 'EMail = ' + event.data.email + '\nSubject = ' + event.data.subject + '\nMessage = ' + event.data.message;
		                    break;
		                case Ti.Barcode.CONTACT:
		                    msg = 'Contact = ' + JSON.stringify(event.data);
		                    break;
		                case Ti.Barcode.BOOKMARK:
		                    msg = 'Bookmark = ' + JSON.stringify(event.data);
		                    break;
		                default:
		                    msg = 'unknown content type';
		                    break;
		            }
		            alert(msg + '\n' + event.result);
		        },
		        cancel: function(event) {
		            alert('cancel');
		        },
		        error: function(event) {
		            alert('Error. ' + event.message);
		        }
		    });
		});
				
		
		return topView;
	}//end factoryView
	
	API.factoryWindow = function( options )
	{
		var win = Ti.UI.createWindow({title:'Barcode'});
		win.add( API.factoryView( options ) );
		return win;
	}//end factoryWindow
	
  	return API;
})(); //end uiBarcode
Ti.UI.currentWindow.add( uiBarcode.factoryView({}) );
//uiBarcode.factoryWindow({}).open({});
//uiBarcode.factoryWindow({}).open({fullscreen:true});

