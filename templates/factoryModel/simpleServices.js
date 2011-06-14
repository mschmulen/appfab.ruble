SERVICES = (function() {
	
	var API = {};
	
	API.mTweetData =[];
	API.TWITTER_TWEET_DATA_EVENT = "SERVICES.TWITTER_TWEET_DATA_EVENT";
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
	
	return API;
})(); //end SERVICES