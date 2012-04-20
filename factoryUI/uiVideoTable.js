
var uiVideo = (function() {
  	
  	var API = { }; 
  	
  	API.name = "Video";
	API.icon = "/KS_nav_ui.png";
	API.parentNav = null;
	API.win = null;
  	
 	API.factoryView = function(opts){ 
    	topView = Ti.UI.createView({});
    	
    	var tableview; //and the data array for the table
		var data = []; //the window and webview for displaying youtube player (iOS only)
		var webModal;
		var webModalView; //stores the current link being displayed in the web view
		var currentLink; //this is the network request object
		var xhr = Ti.Network.createHTTPClient();
		
		function showHTMLContent(wTitle, wUrl, wHTMLContent)
		{
			//store the link for later use
			currentLink = wUrl;
			
			//create the window to hold the web view
			webModal = Ti.UI.createWindow({});
			
			//set the orientation modes for basically any which way
			webModal.orientationModes = [
				Titanium.UI.PORTRAIT,
				Titanium.UI.LANDSCAPE_LEFT,
				Titanium.UI.LANDSCAPE_RIGHT
				];
			
			//create the webview aka the embedded web browser (webkit/safari)
			webModalView = Ti.UI.createWebView();
			webModalView.scalesPageToFit = true;
		
			//add the web video to the modal window
			webModal.add(webModalView);
			
			//set the title of the window
			webModal.title = wTitle;
			
			//if you are using a tab UI in the app, this will open the window
			Titanium.UI.currentTab.open(webModal,{animated:true});
			
			//set the HTML to display to the markup passed into the function
			webModalView.html = wHTMLContent;
			
		}; //end showHTMLContent
		
		
		function playYouTube (vtitle, vguid)
		{
			Ti.API.info( "Youtube vGUID " + vguid + " vTitle " + vtitle );
			if (Titanium.Platform.name == 'iPhone OS')
			{
				
				var ytVideoSrc = 'http://www.youtube.com/v/' + vguid;
				var thumbPlayer = '<html><head><style type="text/css"> body { background-color: black;color: white;} </style></head><body style="margin:0"><br/><br/><center><embed id="yt" src="' + ytVideoSrc + '" type="application/x-shockwave-flash" width="100%" height="75%"></embed></center></body></html>';
				showHTMLContent(vtitle,'http://www.youtube.com/watch?v=' + vguid,thumbPlayer);
			}
			else //on android
			{
				//this call to openURL hands off the link to the operating
				//system, and starts any player that supports youtube.com
				Titanium.Platform.openURL('http://www.youtube.com/watch?v=' + vguid);
			}//end on android
			
		}//end playYouTube
		
		function doYouTubeSearch (channel, searchTerm)
		{
	
			//first show a “loading” spinning indicator to the user
			//toolActInd.message = 'Loading videos…';
			
			//win.setToolbar([toolActInd],{animated:true});
			
			//toolActInd.show();
			//create the YouTube API search URL from the function parameters
			var searchUrl = 'http://gdata.youtube.com/feeds/api/videos?alt=rss&author=' + escape(channel) + '&q=' + escape(searchTerm) + "&orderby=published&max-results=25&v=2";
			
			//use the xhr http client object to do an HTTP GET request to the URL
			xhr.open("GET",searchUrl);
			xhr.send();
			
		}//end doYouTubeSearch
		
		
	xhr.onload = function()
	{
	try
	{
		//the doc object holds the response structure
		
		var doc;

		//check whether the data coming back is in XML format or not

		if (!this.responseXML)
		{
			//if not XML you have to convert it to XML
			doc = Titanium.XML.parseString(this.responseText).documentElement;
		}
		else
		{
			//if it is XML, then just set the doc variable
			doc = this.responseXML.documentElement;
		}//end else
		
		//now we can easily get a list of items from teh results
		var items = doc.getElementsByTagName('item');
		
		//some simple variables for tracking the loop
		var x = 0;
		var c;
		
		//now just loop through the response array to see what videos we have
		
		for (c=0;c<items.length;c++)
		{
			//get the current item
			var item = items.item(c);

			//get the text for the video title tag using standard DOM XML calls
			var title = item.getElementsByTagName('title').item(0).text;

			//build up a summary string to display below the title
			var summary = "";
			if (item.getElementsByTagName('pubDate'))
			{
				summary = item.getElementsByTagName("pubDate").item(0).text;
			}//end if

			//get the link to the youtube video
			var link = "";

			if (item.getElementsByTagName("link"))
			{
				link = item.getElementsByTagName("link").item(0).text;
			}

			//now here is where we perform a trick
			//we find the GUID code from within the link b/c we know the link format
			var guid = link.substring(link.indexOf("?v=")+3);
			guid = guid.substring(0,guid.indexOf("&"));
			
			//now we can use that guid to load up a thumbnail image
			var thumbnail = 'http://i.ytimg.com/vi/' + guid + '/2.jpg';
			
			//okay we have all the data we need for that item
			//now we need to create a row to add to the table in order to display it
			
			//create the row item and set the height to 80 pixels
			var row = Ti.UI.createTableViewRow({height:80});
			
			//set parameters for the row so we can get the youtube data out later
			row.url = link;			
			row.guid = guid;
			row.videotitle = title;
			
			//create a label for displaying the title and add it to the row
			var labelTitle = Ti.UI.createLabel({
				text:title,
				left:105,
				top:10,
				height:40,
				font:{fontSize:16}
			});
			row.add(labelTitle);

			//create a label for the summary and add it to the row
			var labelSummary = Ti.UI.createLabel({
				text:summary,
				left:105,
				top:45,
				font:{fontSize:12}
			});
			row.add(labelSummary);
			
			//create an image from the thumbnail, and add it to the row
			var img = Ti.UI.createImageView({
				image:thumbnail,
				left:0,
				height:80,
				width:100
			});
			row.add(img);

			//add the row to the data array
			data[x++] = row;
		}//end for
		
		//if tableview has been created, reset the data on the table
		//you can update data on the table multiple times
		if (tableview)
		{
			tableview.setData(data);
		}//end if
		else
		{
			//if table has not been created, build it up with the data array
			tableview = Titanium.UI.createTableView({
				data:data
			});
			
			//add the table to the current window for display
			topView.add(tableview);
			
			//add a ‘click’ listener so that when someone taps on a row
			//the video will be played using the function we defined earlier
			tableview.addEventListener('click',function(e)
			{
				playYouTube(e.row.videotitle,e.row.guid);
			});
		}//end else
	}//end try
	catch(E)
	{
		//if anything bad happens, show the error to the user and log it
		Titanium.API.debug(E);
		Titanium.UI.createAlertDialog({title:win.YoutubeSearchChannel + "," + win.YoutubeSearch, message:'No videos were found for this search.'}).show();
	}//end catch
	
	//hide the spinning ‘loading’ widget
	toolActInd.hide();
	//win.setToolbar(null,{animated:true});
};//end


if (!Titanium.Network.online) {
  var a = Titanium.UI.createAlertDialog({ 
    title:'Network Connection Required',
    message: global_AppName + ' requires an internet connection Check your network connection and try again.'
  });
	a.show();
}//end Online Check
else
{
	//Ti.API.info("doYouTUbeSearch(" + win.YoutubeSearchChannel + "," + win.YoutubeSearch+")" );
	//doYouTubeSearch(win.YoutubeSearchChannel,win.YoutubeSearch);	
	doYouTubeSearch("appcelerator","");
}//else connected so do the search


    	
    	return topView;
  	};//end factoryView
  	
  	API.factoryWindow = function(opts){
 		API.win = Ti.UI.createWindow(UTILS.combine(STYLE.Win, {
			title : API.name
		}));
		API.win.add(API.factoryView(opts));
		return API.win;
  	};//end factoryWindow
  	
  	return API;
})(); //end uiVideo
Ti.UI.currentWindow.add( uiVideo.factoryView({}) ); 
//uiVideo.factoryWindow({}).open({modal:true});
//uiVideo.factoryWindow({}).open({fullscreen:true});
//module.exports = uiVideo

