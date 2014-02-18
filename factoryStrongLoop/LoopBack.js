(function (loopback) {
	
	loopback.dataCache = [{ id: '11', name: 'yack' }];
	
	var baseURL = 'http://127.0.0.1:3000/api';
	//var baseURL = 'http://50.56.187.151:3000/api';
	var defaultModelName = "products";
	
	loopback.getBaseURL = function () { return baseURL; };//end getBaseURL
	
	// Public method for updating the dataCache
    //   success: callback function to be notified when data has been retrieved
    //   error: callback function to be notified if an error occurs during retrieval
	loopback.getData = function ( modelName , success, error) {
		
		Ti.API.info( "getData ! for "  + modelName );
		// create table view data object
		var data = [];
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000000;
		Ti.API.info( baseURL+"/" + modelName );
		xhr.open("GET", baseURL+"/" + modelName );
		
		xhr.onload = function()
		{
			Ti.API.info( "onload ! ");
			try
			{
				var response = eval('('+this.responseText+')');
				Ti.API.info( response.toString() );
				
				for (var c=0; c<response.length; c++){
					var responseObject = response[c];
					Ti.API.info( responseObject["id"].toString() );
					Ti.API.info( responseObject.name.toString() );
				}//end for response
				success(response);
			}//end try
			catch(e){
				//alert(e);
				error(e);
			}//end catch
		};//end onload
		
		// Get the data
		xhr.send();
	};//end loopback.getData
	
	
	// Public method for clearing the data cache
	loopback.clearDataCache = function () {
		flightCollectionCache.clear();
		flightCollection = null;
	};
	
	loopback.trackEngagement = function(durationInMs) {
		Ti.API.info( "trackEngagement ! " + durationInMs);
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000000;
		xhr.open("POST", "http://localhost:1080/1.0/event/put" );
		var currentDateTime = new Date();
		
		//process.env.TZ = 'UTC';
		var start = Date.now();
	    //stop = start + durationInMs;
		//start,

		var nMS = parseInt(durationInMs);
		if( isNaN(nMS))
		{
			nMS = 300;
		}  // Do something
		

		Ti.API.info( "currentDateTime -" + currentDateTime.toUTCString() );
		var postData = [
		  {
		    "type": "testAppc",
		    "time": start,//"2011-09-12T21:33:12Z", //start, 
		    "data": {
		      "host": "web14",
		      "path": "/search",
		      "query": {
		        "q": "flowers"
		      },
		      "duration_ms": nMS,// parseInt(durationInMs),//241,
		      "status": 200,
		      "user_agent": "Chrome/13.0.782.112"
		    }
		  }
		]; //end postData
		
		xhr.setRequestHeader("Content-Type","application/json");
		xhr.send(JSON.stringify(postData));
		
	};//end trackEngagement
	
	// Public method for updating the dataCache
    //   success: callback function to be notified when data has been retrieved
    //   error: callback function to be notified if an error occurs during retrieval
	loopback.updateDataCache = function (success, error) {
		
		Ti.API.info( "updateDataCache ! ");
		// create table view data object
		var data = [];
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000000;
		xhr.open("GET",baseURL+"/json/"+ defaultModelName );
		
		xhr.onload = function()
		{
			Ti.API.info( "onload ! ");
			try
			{
				//Ti.API.info( "this.responseText " + this.responseText );
				var response = eval('('+this.responseText+')');
				Ti.API.info( response.toString() );
				
				for (var c=0; c<response.length; c++){
					var responseObject = response[c];
					//Ti.API.info( responseObject.appName.toString() );
				}//end for response
				
				success(response);
				
			}//end try
			catch(e){
				//alert(e);
				error(e);
			}//end catch
		};//end onload
		
		// Get the data
		xhr.send();
	};//end updateDataCache
})(exports);