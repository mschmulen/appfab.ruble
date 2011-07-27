
//<module platform="iphone" version="1.0">ti.quicklook</module>
var uiQuickLook = (function() {
  	
  	var API = { }; 
    
  	API.factoryView = function( options )
	{
		var topView = Ti.UI.createView({ backgroundColor:'#B1B1B1' });
		
		Titanium.Quicklook = Ti.Quicklook = require('ti.quicklook');
		
		var docs = [
		    'http://appc.me/Content/appceleratorHat.jpg',
		    'http://assets.appcelerator.com.s3.amazonaws.com/docs/Appcelerator-IDC-Q1-2011-Mobile-Developer-Report.pdf',
		    'http://appc.me/Content/appceleratorHat.jpg' // that's right, we use the same image twice in this example
		];
		
		if (!Ti.Quicklook.isSupported()) {
		    topView.add(Ti.UI.createLabel({ text: 'iOS 4.0 or greater is required for Quicklook.' }));
		}
		// IMPORTANT! Always check if items can be previewed, or a generic error will be displayed to your users!
		else if (!Ti.Quicklook.canPreviewItem(docs[0]) || !Ti.Quicklook.canPreviewItem(docs[1])) {
		    topView.add(Ti.UI.createLabel({ text: 'The document specified cannot be previewed with Quicklook!' }));
		}//end else if 
		else {
		    var quickView = Ti.Quicklook.createView({
		        data: docs,
		        top: 50, bottom: 50
		    });
		    topView.add(quickView);
		
		    // Whenever the index changes, the following event fires...
		    quickView.addEventListener('indexChanged', function(evt) {
		        // Note: if we wanted, we could use the evt.url property to see what the current preview's URL is
		        next.opacity = back.opacity = 1;
		        back.enabled = next.enabled = true;
		        if (evt.index == 0) {
		            back.opacity = 0.5;
		            back.enabled = false;
		        }
		        else {
		            back.title = quickView.index;
		        }
		        if (evt.index == docs.length - 1) {
		            next.opacity = 0.5;
		            next.enabled = false;
		        }
		        else {
		            next.title = quickView.index + 2;
		        }
		    });
		
		    // Add refresh and reload buttons
		    var refresh = Ti.UI.createButton({
		        title: 'Refresh Current', textAlign: 'center',
		        top: 0, left: 0, width: '50%', height: 50
		    });
		    var reload = Ti.UI.createButton({
		        title: 'Reload Previewer', textAlign: 'center',
		        top: 0, right: 0, width: '50%', height: 50
		    });
		    refresh.addEventListener('click', function() {
		        quickView.refresh();
		    });
		    reload.addEventListener('click', function() {
		        quickView.data = docs;
		    });
		    topView.add(refresh);
		    topView.add(reload);
		
		    // Add navigation buttons to let the user view different documents
		    var back = Ti.UI.createButton({
		        textAlign: 'center',
		        bottom: 0, left: 0, width: '50%', height: 50
		    });
		    var next = Ti.UI.createButton({
		        textAlign: 'center',
		        bottom: 0, right: 0, width: '50%', height: 50
		    });
		    back.addEventListener('click', function() {
		        if (quickView.index > 0) {
		            quickView.index -= 1;
		        }
		    });
		    next.addEventListener('click', function() {
		        if (quickView.index < docs.length - 1) {
		            quickView.index += 1;
		        }
		    });
		    topView.add(back);
		    topView.add(next);
		}//end else 
		
		return topView;
	}//end factoryView
	
	API.factoryWindow = function( options )
	{
		var win = Ti.UI.createWindow({title:'Quick Look'});
		win.add( API.factoryView( options ) );
		return win;
	}//end factoryWindow
	
  return API;
})(); //end uiQuickLook
//Ti.UI.currentWindow.add( uiQuickLook.factoryView({}) );
uiQuickLook.factoryWindow({}).open({});
//uiQuickLook.factoryWindow({}).open({fullscreen:true});
