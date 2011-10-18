var uiMapFacebook = (function() {
  	
	var API = { };
	
	API.faceBookAppID = "161605913888734";
	
	//Geo data
	API.latitude = 41.248611;
	API.longitude = -70.11527;		
	API.region = {latitude:API.latitude,longitude:API.longitude,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
	
	//facebook services
	API.mData = [];
	API.FB_GET_BY_LOCATION_DATA_EVENT = "API.FB_GET_BY_LOCATION_DATA_EVENT";
	API.getFBByLocation = function(searchTerm, searchLbl, lat, lon  )
	{
		if (Titanium.Facebook.loggedIn == false ) 
		{
			//viewActInd.visible = false;
			//Ti.API.info("Not Logged In");
			
			var alertDialog = Titanium.UI.createAlertDialog({
	    		message: 'You must be logged into Facebook to use this application'
			});
			alertDialog.addEventListener("click", function(e) {
				EnableDisable(true);
			});
			alertDialog.show();
			return;
		}//end if
		
		//{title: '1 mi.', distance:1609}, {title: '2 mi.', distance:3218}, {title: '5 mi.', distance: 8045}
		Titanium.Facebook.requestWithGraphPath("search",{q:searchTerm,type:"place",center:lat+","+lon,distance: '8045'},"GET",function(res){
			
			API.mData = JSON.parse( res.result );
			/*
			     API.mData[c].detailWin = Ti.UI.createWindow({
					title: fBGetNearbyLocationsData.data[c].name,
					fbID: fBGetNearbyLocationsData.data[c].id,
					barColor: "#000",
					navBarHidden: false
					});
			*/
			
			//EnableDisable(true);
			//viewActInd.visible = false;
			
			Ti.App.fireEvent(API.FB_GET_BY_LOCATION_DATA_EVENT);
		});//end getFBByLocation
		
	};//end twitterGetNearbyLocations
	
	API.factoryTopBar = function()
	{
		//create a viral bar for email, twitter, facebook, email etc.
		var returnView = Ti.UI.createView({ backgroundColor:'#EBEBEB', top:5, left:0, height:30, width:320 });

		var fbLoginButton = Titanium.Facebook.createLoginButton({ width:80, height:20, top:0});
		returnView.add( fbLoginButton);
		
		return returnView;
	};//end factoryTopBar
	
	API.factoryView = function(opts){
		
		Titanium.Facebook.appid = API.faceBookAppID;
    	var topView = Ti.UI.createView({ });
    	
    	topView.add( API.factoryTopBar({}) );
		
		var annotationsArray = [];
		var tvData = [];
		
		//tableView
		var tv = Titanium.UI.createTableView({ top: 40, data:tvData, minRowHeight:58});
		tv.visible = true;
		topView.add(tv);
		
		//mapview
		var mapview = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: API.region,
			animate:true,
			regionFit:true,
			userLocation:true
		});
		mapview.visible = false;
		topView.add(mapview);
		
		/*
		if(win.fromDetailsView == undefined || win.fromDetailsView == false)
		{
			annotationsArray = APP.DATABASE.getDataMap(); //setDataFromDB();
		} else
		{
			//annotationsArray = setSinglePin();
			annotationsArray = APP.DATABASE.getSinglePin(  win.pinId );
			mapview.region = {latitude:annotationsArray[0].latitude,longitude:annotationsArray[0].longitude,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
		}
		*/
		mapview.annotations = annotationsArray;
		
		//Switch view ....
		var currentViewButton = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.CAMERA
		});//end currentViewButton
		
		opts.win.setLeftNavButton(currentViewButton);
		
		currentViewButton.addEventListener('click', function()
		{
			if ( mapview.visible == true ){
				mapview.visible = false;
				tv.visible = true;
			}//end if
			else
			{
				mapview.visible = true;
				tv.visible = false;
			}//end else
		});//end currentViewButton('click')
		
		var currentLocationButton = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
		});
		var navActInd = Titanium.UI.createActivityIndicator();
		
		currentLocationButton.addEventListener('click', function()
		{
			opts.win.setRightNavButton(navActInd);
			navActInd.show();
			
			// GET CURRENT POSITION - THIS FIRES ONCE
			Titanium.Geolocation.getCurrentPosition(function(e)
			{
				if (!e.success || e.error)
				{
					//currentLocation.text = 'error: ' + JSON.stringify(e.error);
					//Ti.API.info("Code translation: "+translateErrorCode(e.code));
					alert('error ' + JSON.stringify(e.error));
					return;
				}//end if
				
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
				opts.win.setRightNavButton(currentLocationButton);
			});
		});//end currentlocationButton.addEventListener('click')
		
		opts.win.setRightNavButton(currentLocationButton);
		
		// region change event listener
		mapview.addEventListener('regionChanged',function(evt)
		{
			Titanium.API.info('maps region has updated to '+evt.longitude+','+evt.latitude);
		}); //end addEventListener('regionChanged')
		
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
				}//end if annotation
			}//end if
		}); //end addEventListener 'click'
		
		
		Ti.App.addEventListener(API.FB_GET_BY_LOCATION_DATA_EVENT, function()
		{
			Ti.API.info( " RECIEVED EVENT FB_GET_BY_LOCATION_DATA_EVENT");
			var annotationsArray = [];
			
			for ( var c = 0; c< API.mData.data.length; c++ )
			{
				Ti.API.info( 'mData [' + c + ']' );

			    var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
					
				var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto',backgroundColor:bgcolor});

				var post_view = Ti.UI.createView({ height:'auto',	layout:'vertical',left:5,top:5,bottom:5,right:5 });
					
				var av = Ti.UI.createImageView({left:0,top:0,height:48,width:48 });
				post_view.add(av);
				
				var name_label = Ti.UI.createLabel({ text:API.mData.data[c].name,left:54,width:120,top:-48,bottom:2,height:16,textAlign:'left',color:'#444444',font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'} });
				post_view.add(name_label);
				
				//var tweet_text = Ti.UI.createLabel({ text:tweet,left:54,top:0,bottom:2,height:'auto',width:236,textAlign:'left',font:{fontSize:14} });
				//post_view.add(tweet_text);
				
				row.add(post_view);
				row.className = 'item'+c;
				tvData[c] = row;
				
				//Build the annotations array for the mapView
				annotationsArray[c] =  Titanium.Map.createAnnotation({
					latitude: API.mData.data[c].location.latitude,
					longitude:API.mData.data[c].location.longitude,
					title: API.mData.data[c].name,
					subtitle:API.mData.data[c].name,
					animate:true
					//leftButton:'../images/atlanta.jpg',
					//image:"../images/boston_college.png"
				});
				
			}//end for
			
			tv.setData( tvData );
			mapview.annotations = annotationsArray;
		});//end addEventListener
		
		opts.win.addEventListener('focus',function(e)
		{
			API.getFBByLocation("*","What's Near Me",API.latitude, API.longitude);
		});//end win.addEventListener('focus');
    	
    return topView;
  };
	
  API.factoryWindow = function(opts){
	var win = Titanium.UI.createWindow({ title:'Social',   backgroundColor:'#fff' });
	win.add( uiMapFacebook.factoryView({win:win}) );
	return win;
  };//end factoryWindow
  
  return API;
})(); //end uiFaceGeo
Ti.UI.currentWindow.add( uiMapFacebook.factoryView({ win:Ti.UI.currentWindow}) );
//uiMapFacebook.factoryWindow({}).addChild( uiMapFacebook.factoryView({}) ).open({modal:true});
//exports = uiTemplate