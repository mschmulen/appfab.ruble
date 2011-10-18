
var uiTwitterMap = (function() {
  	
	var API = { };
  	
  	API.latitude = 41.248611;
	API.longitude = -70.11527;
	API.region = {latitude:API.latitude,longitude:API.longitude,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};


  	/*
  	API.mTweetData =[];
	API.TWITTER_TWEET_DATA_EVENT = "API.TWITTER_TWEET_DATA_EVENT";
	API.getTweetsFromUser = function( screenName  )
	{
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000000;
		xhr.open("GET","http://api.twitter.com/1/statuses/user_timeline.json?screen_name="+screenName);
		
		xhr.onload = function()
		{
			try
			{
				API.mTweetData = eval('('+this.responseText+')');
				Ti.App.fireEvent(API.TWITTER_TWEET_DATA_EVENT);
			}//end try
			catch(E){
				alert(E);
			}//end catch
		};//end xhr.onload
		
		// Get the data
		xhr.send();
	};//end getTweetsFromUser
	
	API.mTwitterSearchData = [];
	TWITTER_GET_SEARCH_DATA_EVENT = "API.TWITTER_GET_SEARCH_DATA_EVENT";
	API.getTtwitterSearch = function( searchTerm )
	{
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000000;
		xhr.open("GET","http://search.twitter.com/search.json?lang=en&q="+searchTerm);
		
		xhr.onload = function()
		{
			try
			{
				var mTwitterSearchData = eval('('+this.responseText+')');
				//for (var c=0;c<mTwitterSearchData.results.length;c++){
				//	Ti.API.info( 'mTwitterSearchData[' +  c );
				//}//end for twitterResponse
			}
			catch(E){
				alert(E);
			}
		};
		// Get the data
		xhr.send();
	};//end searchTweets
	*/
	
	API.mTwitterGetNearbyLocationsData = [];
	TWITTER_GET_BY_LOCATION_DATA_EVENT = "API.TWITTER_GET_BY_LOCATION_DATA_EVENT";
	API.getTwitterByLocation = function( lat, lon  )
	{
		// create table view data object
		var data = [];
		var radiusKM = 25;
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000000;
		//xhr.open("GET","http://api.twitter.com/1/geo/reverse_geocode.json?" + "lat=" +lat + "&long=" + lon );
		xhr.open("GET","http://search.twitter.com/search.json?" + "geocode=" +lat + "%2C" + lon+ "%2C" + radiusKM + "km" );
		Ti.API.info( "http://search.twitter.com/search.json?" + "geocode=" +lat + "%2C" + lon+ "%2C" + radiusKM + "km" );
		
		xhr.onload = function()
		{
			try
			{
				API.mTwitterGetNearbyLocationsData = eval('('+this.responseText+')');
				/*
				for (var c=0;c<API.mTwitterGetNearbyLocationsData.results.length;c++){
					Ti.API.info( 'mTwitterGetNearbyLocationsData[' +  c );
				}//end for twitterResponse
				*/
				Ti.App.fireEvent(API.TWITTER_GET_BY_LOCATION_DATA_EVENT);
			}//end try
			catch(E){
				alert(E);
			}//end catch
		};
		
		// Get the data
		xhr.send();
	};//end twitterGetNearbyLocations
	
	
	API.factoryView = function(opts){
		
		//var regionNewYork = {latitude:40.76139,longitude:-73.97761,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
		
    	var topView = Ti.UI.createView({});
		
		var annotationsArray = [];
		var tvData = [];
		
		//tableView
		var tv = Ti.UI.createTableView({data:tvData, minRowHeight:58});
		tv.visible = true;
		topView.add(tv);
		
		//mapview
		var mapview = Ti.Map.createView({
			mapType: Ti.Map.STANDARD_TYPE,
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
		var currentViewButton = Ti.UI.createButton({
			systemButton:Ti.UI.iPhone.SystemButton.CAMERA
		});
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
		
		var currentLocationButton = Ti.UI.createButton({
			systemButton:Ti.UI.iPhone.SystemButton.REFRESH
		});
		var navActInd = Ti.UI.createActivityIndicator();
		
		currentLocationButton.addEventListener('click', function()
		{
			opts.win.setRightNavButton(navActInd);
			navActInd.show();
			
			// GET CURRENT POSITION - THIS FIRES ONCE
			Ti.Geolocation.getCurrentPosition(function(e)
			{
				if (!e.success || e.error)
				{
					//currentLocation.text = 'error: ' + JSON.stringify(e.error);
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
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
				
				Ti.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
				
				mapview.region = {latitude:latitude,longitude:longitude,animate:true,latitudeDelta:0.01, longitudeDelta:0.01};
				navActInd.hide();
				opts.win.setRightNavButton(currentLocationButton);
			});
		});//end currentlocationButton.addEventListener('click')
		
		opts.win.setRightNavButton(currentLocationButton);
		
		// region change event listener
		mapview.addEventListener('regionChanged',function(evt)
		{
			//Ti.API.info('maps region has updated to '+evt.longitude+','+evt.latitude);
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
		
		/*
		//add event listener
		Ti.App.addEventListener(API.TWITTER_TWEET_DATA_EVENT, function()
		{
			Ti.API.info(API.TWITTER_TWEET_DATA_EVENT);
			tvData = [];
			
			for (var c=0;c<API.mTweetData.length;c++){

				var tweet = API.mTweetData[c].text;
				var user = API.mTweetData[c].user.screen_name;
				var avatar = API.mTweetData[c].user.profile_image_url;
				var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
				
				var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto',backgroundColor:bgcolor});

				var post_view = Ti.UI.createView({ height:'auto',	layout:'vertical',left:5,top:5,bottom:5,right:5 });

				var av = Ti.UI.createImageView({image:avatar,left:0,top:0,height:48,width:48 });
				post_view.add(av);

				var user_label = Ti.UI.createLabel({ text:user,left:54,width:120,top:-48,bottom:2,height:16,textAlign:'left',color:'#444444',font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'} });
				post_view.add(user_label);

				var tweet_text = Ti.UI.createLabel({ text:tweet,left:54,top:0,bottom:2,height:'auto',width:236,textAlign:'left',font:{fontSize:14} });
				post_view.add(tweet_text);
				
				row.add(post_view);
				row.className = 'item'+c;
				tvData[c] = row;
			}//end for
			
			tv.setData( tvData );
		});
		*/
		
		Ti.App.addEventListener(API.TWITTER_GET_BY_LOCATION_DATA_EVENT, function()
		{
			for (var c=0;c<API.mTwitterGetNearbyLocationsData.results.length;c++){
				Ti.API.info( 'mTwitterGetNearbyLocationsData [' + c + ']' );
				Ti.API.info( 'location :' + API.mTwitterGetNearbyLocationsData.results[c].location );
				Ti.API.info( 'text :' + API.mTwitterGetNearbyLocationsData.results[c].text );
				Ti.API.info( 'profile_image_url :' + API.mTwitterGetNearbyLocationsData.results[c].profile_image_url );
				Ti.API.info( 'from_user :' + API.mTwitterGetNearbyLocationsData.results[c].from_user );
					Ti.API.info( 'from_user_id :' + API.mTwitterGetNearbyLocationsData.results[c].from_user_id );

					var tweet = API.mTwitterGetNearbyLocationsData.results[c].text;
					var user = API.mTwitterGetNearbyLocationsData.results[c].from_user;
					var avatar = API.mTwitterGetNearbyLocationsData.results[c].profile_image_url;
					var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';

					var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto',backgroundColor:bgcolor});

					var post_view = Ti.UI.createView({ height:'auto',	layout:'vertical',left:5,top:5,bottom:5,right:5 });

					var av = Ti.UI.createImageView({image:avatar,left:0,top:0,height:48,width:48 });
					post_view.add(av);

					var user_label = Ti.UI.createLabel({ text:user,left:54,width:120,top:-48,bottom:2,height:16,textAlign:'left',color:'#444444',font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'} });
					post_view.add(user_label);
				
				var tweet_text = Ti.UI.createLabel({ text:tweet,left:54,top:0,bottom:2,height:'auto',width:236,textAlign:'left',font:{fontSize:14} });
				post_view.add(tweet_text);
				
				row.add(post_view);
				row.className = 'item'+c;
				tvData[c] = row;
			}//end for
			
			tv.setData( tvData );
		});
	
	opts.win.addEventListener('focus',function(e)
	{
		//APP.SERVICES.getTweetsFromUser( 'appcelerator' );
		API.getTwitterByLocation( API.latitude, API.longitude );
	});//end win.addEventListener('focus');
    
    return topView;
  };
  
  API.factoryWindow = function(opts){
	var win = Ti.UI.createWindow({ title:'Social',   backgroundColor:'#fff' });
	win.add( uiTwitterMap.factoryView({win:win}) );
	return win;
  };
  
  return API;
})(); //end uiTwitterGeo
Ti.UI.currentWindow.add( uiTwitterMap.factoryView({ win:Ti.UI.currentWindow}) );
//uiTwitterMap.factoryWindow({}).addChild( uiTwitterGeo.factoryView({}) ).open({modal:true});
//exports = uiTemplate 