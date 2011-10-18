
var uiMap = (function() {
	
  	var API = { };
  	
	// Some Predefined Regions
	var regionNewYork = {latitude:40.76139,longitude:-73.97761,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
	var regionNantucket = {latitude:40.76139,longitude:-73.97761,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
	var regionPuertoRico = {latitude:40.76139,longitude:-73.97761,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
	var regionMiami = {latitude:40.76139,longitude:-73.97761,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
	var regionDC = {latitude:40.76139,longitude:-73.97761,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
	var regionBoston = {latitude:40.76139,longitude:-73.97761,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
	var regionSF = {latitude:40.76139,longitude:-73.97761,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
	var regionDallas = {latitude:40.76139,longitude:-73.97761,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
	var regionSeattle = {latitude:40.76139,longitude:-73.97761,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
  	
  	var annotationsArray = [];
	
  	
  	API.configGPS = function(opts) {
  		
  		//Geolocation
		Ti.Geolocation.preferredProvider = "gps";
		
		Ti.Geolocation.purpose = "GPS demo";
		
				function translateErrorCode(code) {
			if (code == null) {
				return null;
			}
			switch (code) {
				case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
					return "Location unknown";
				case Ti.Geolocation.ERROR_DENIED:
					return "Access denied";
				case Ti.Geolocation.ERROR_NETWORK:
					return "Network error";
				case Ti.Geolocation.ERROR_HEADING_FAILURE:
					return "Failure to detect heading";
				case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
					return "Region monitoring access denied";
				case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
					return "Region monitoring access failure";
				case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
					return "Region monitoring setup delayed";
			}
		}
		
		//
		//  SHOW CUSTOM ALERT IF DEVICE HAS GEO TURNED OFF
		//
		if (Titanium.Geolocation.locationServicesEnabled==false)
		{
			Titanium.UI.createAlertDialog({title:'Alert', message:'Your device has geolocation services turned off.'}).show();
		}
		else
		{
			if (Titanium.Platform.name != 'android') {
				var authorization = Titanium.Geolocation.locationServicesAuthorization;
				Ti.API.info('Authorization: '+authorization);
				if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
					Ti.UI.createAlertDialog({
						title:'Alert',
						message:'You have disallowed this app from running geolocation services.'
					}).show();
				}
				else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
					Ti.UI.createAlertDialog({
						title:'Alert',
						message:'Your system has disallowed this app from running geolocation services.'
					}).show();
				}
			}
		
			//
			//  SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
			//
			// Titanium.Geolocation.ACCURACY_BEST
			// Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS
			// Titanium.Geolocation.ACCURACY_HUNDRED_METERS
			// Titanium.Geolocation.ACCURACY_KILOMETER
			// Titanium.Geolocation.ACCURACY_THREE_KILOMETERS
			//
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
		
			//
			//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
			//  THIS VALUE IS IN METERS
			//
			Titanium.Geolocation.distanceFilter = 10;
		}//end else
		
		
  	}; //end configGPS
  
  	API.factoryView = function(opts){ 
		
   		var topView = Ti.UI.createView({});
    	
    	return topView;
  	}; //end factoryView
   	
	API.factoryWindow = function( options ) {
		Ti.API.info( 'options:' +  options );
		
		var win = Titanium.UI.createWindow({ backgroundColor:'#fff' });
		
		API.configGPS();
		
		//Titanium.UI.setBackgroundColor('#fff');
		
		var isAndroid = false;
		if (Titanium.Platform.name == 'android') {
			isAndroid = true;
		}
		
		
		//
		// CREATE MAP VIEW
		//
		var mapview = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: regionNewYork,
			animate:true,
			regionFit:true,
			userLocation:true
		});
		
		if(win.fromDetailsView == undefined || win.fromDetailsView == false)
		{
			annotationsArray = APP.DATABASE.getDataMap(); //setDataFromDB();
		} else
		{
			//annotationsArray = setSinglePin();
			annotationsArray = APP.DATABASE.getSinglePin(  win.pinId );
			mapview.region = {latitude:annotationsArray[0].latitude,longitude:annotationsArray[0].longitude,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
		}
		
		mapview.annotations = annotationsArray;
		
		var currentLocationButton = Titanium.UI.createButton({
			 image: APP.AssetPath('assets/images/TrackingLocation~iphone.png')
			//systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
		});
		var navActInd = Titanium.UI.createActivityIndicator();
		
		currentLocationButton.addEventListener('click', function()
		{
			win.setRightNavButton(navActInd);
			navActInd.show();
			
			//
			// GET CURRENT POSITION - THIS FIRES ONCE
			//
			Titanium.Geolocation.getCurrentPosition(function(e)
			{
				if (!e.success || e.error)
				{
					//currentLocation.text = 'error: ' + JSON.stringify(e.error);
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
					alert('error ' + JSON.stringify(e.error));
					return;
				}
		
				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;
		
				Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
			
				mapview.region = {latitude:latitude,longitude:longitude,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
				navActInd.hide();
				win.setRightNavButton(currentLocationButton);
			});
			
		});
		
		win.setRightNavButton(currentLocationButton);
		//win.rightNavButton = addPinButton;
		
		win.add(mapview);
		
		//
		// EVENT LISTENERS
		//
		
		// region change event listener
		mapview.addEventListener('regionChanged',function(evt)
		{
			Titanium.API.info('maps region has updated to '+evt.longitude+','+evt.latitude);
		});
		
		
		// map view click event listener
		mapview.addEventListener('click',function(evt)
		{
		
			// map event properties
			var annotation = evt.annotation;
			var title = evt.title;
			var clickSource = evt.clicksource;
		
			// custom annotation attribute
			var myid = (evt.annotation)?evt.annotation.myid:-1;
		
			Ti.API.info('mapview click clicksource = ' + clickSource);
			// use custom event attribute to determine if atlanta annotation was clicked
			if (evt.clicksource == 'rightButton')
			{	
				if (annotation)
				{
					//var win = Ti.UI.createWindow({
					//	url:APP.AssetPath('pin_details.js'),
					//	title:APP.kStringsTable.VIEW_DETAILS_TITLE
					//});
					
					var win = APP.PIN_DETAIL.factoryWindow({ parentTab:options.parentTab, nameShort: annotation.title, pinId: evt.annotation.pinId, fromSaveView:false });
					
					options.parentTab.open(win);
				}
		
			}
		});
		
		//check for focus and update color of pins
		win.addEventListener('focus', function() 
		{
			for (var i = 0; i < annotationsArray.length; i++) 
			{
				var bInFavoriteList = false;
				for (var j = 0; j < APP.pFavoritesList.length; j++) 
				{
					if(APP.pFavoritesList[j] == annotationsArray[i].pinId)
					{
						bInFavoriteList = true;
						break;
					}
				}
			
				if(bInFavoriteList == true)
				{
					if(annotationsArray[i].pincolor == Titanium.Map.ANNOTATION_RED)
					{
						annotationsArray[i].pincolor = Titanium.Map.ANNOTATION_PURPLE;
					}
				} else
				{
					if(annotationsArray[i].pincolor == Titanium.Map.ANNOTATION_PURPLE)
					{
						annotationsArray[i].pincolor = Titanium.Map.ANNOTATION_RED;
					}
				}
			}
		});
		
		return win;
	};//end factoryWindow
  
  return API;
})(); //end uiMap
//Ti.UI.currentWindow.add( uiMap.factoryView({}) ); 
//uiMap.factoryWindow({}).addChild( uiMap.factoryView({}) ).open({modal:true}); 
//exports = uiTemplate
 

