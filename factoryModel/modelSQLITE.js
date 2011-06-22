
var modelSQLITE = (function() {
  
  var API = { }; 
  
  
  var API = { };
	
	var db = null;
	var data = null;
	
	API.initDB = function( options ) {
		Ti.API.info('init the database once ');
		db = Ti.Database.install(APP.AssetPath('assets/mapPins.sqlite'),'pins');
	};//end initDB
	
	
	API.getDataList = function( iOrderBy ) {
		
		//var db = Ti.Database.install('mapPins.sqlite','pins');
		var rows;
		
		switch(iOrderBy)
		{
			case 0:
				rows = db.execute('SELECT * FROM pins');
			break;
			case 1:
				rows = db.execute('SELECT * FROM pins ORDER BY neighborhood');
			break;
			case 2:
				rows = db.execute('SELECT * FROM pins ORDER BY category');
			break;
		}//end switch
	
	
		// create the data array
		var pDataArray = [];
		var pSearchIndex = [];
		var	sNameShort;
		var iPinId;
		var sHeader = '';
		var sPreviousHeader = 'X';
		var iIndex = 0;
		
		while (rows.isValidRow())
		{
			sNameShort = rows.fieldByName('nameShort');
			iPinId = rows.fieldByName('id');
			
			if(sNameShort != null)
			{	
				switch(iOrderBy)
				{
					case 0:
						if(sNameShort.charAt(0) != sPreviousHeader)
						{
							sHeader = sNameShort.charAt(0);
							pSearchIndex.push({title:'' + sHeader + '',index:iIndex});
						}
					break;
					case 1:
						if(rows.fieldByName('neighborhood') != sPreviousHeader)
						{
							sHeader = rows.fieldByName('neighborhood');
							if(sHeader.charAt(0) != '' && sHeader.charAt(0) != sPreviousHeader.charAt(0))
							{
								pSearchIndex.push({title:'' + sHeader.charAt(0) + '',index:iIndex});
							}
						}
					break;
					case 2:
						if(rows.fieldByName('category') != sPreviousHeader)
						{
							sHeader = rows.fieldByName('category');
							if(sHeader.charAt(0) != '' && sHeader.charAt(0) != sPreviousHeader.charAt(0))
							{
								pSearchIndex.push({title:'' + sHeader.charAt(0) + '',index:iIndex});
							}
						}
					break;
				}
			}
				
		    pDataArray.push({title:'' + sNameShort + '', pinId:'' + iPinId + '' , hasChild:true, path:'pin_details.js', header:'' + sHeader + ''});
		    if(sHeader != '')
			{
				sPreviousHeader = sHeader;
			}
			sHeader = '';
			rows.next();
			iIndex++;	
		};
		
		return pDataArray;
	}//end API.getDataList
	
	API.getSearchList = function( iOrderBy ) {
		
		//var db = Ti.Database.install('mapPins.sqlite','pins');
		var rows;
		
		switch(iOrderBy)
		{
			case 0:
				rows = db.execute('SELECT * FROM pins');
			break;
			case 1:
				rows = db.execute('SELECT * FROM pins ORDER BY neighborhood');
			break;
			case 2:
				rows = db.execute('SELECT * FROM pins ORDER BY category');
			break;
		}//end switch
	
	
		// create the data array
		var pDataArray = [];
		var pSearchIndex = [];
		var	sNameShort;
		var iPinId;
		var sHeader = '';
		var sPreviousHeader = 'X';
		var iIndex = 0;
		
		while (rows.isValidRow())
		{
			sNameShort = rows.fieldByName('nameShort');
			iPinId = rows.fieldByName('id');
			
			if(sNameShort != null)
			{	
				switch(iOrderBy)
				{
					case 0:
						if(sNameShort.charAt(0) != sPreviousHeader)
						{
							sHeader = sNameShort.charAt(0);
							pSearchIndex.push({title:'' + sHeader + '',index:iIndex});
						}
					break;
					case 1:
						if(rows.fieldByName('neighborhood') != sPreviousHeader)
						{
							sHeader = rows.fieldByName('neighborhood');
							if(sHeader.charAt(0) != '' && sHeader.charAt(0) != sPreviousHeader.charAt(0))
							{
								pSearchIndex.push({title:'' + sHeader.charAt(0) + '',index:iIndex});
							}
						}
					break;
					case 2:
						if(rows.fieldByName('category') != sPreviousHeader)
						{
							sHeader = rows.fieldByName('category');
							if(sHeader.charAt(0) != '' && sHeader.charAt(0) != sPreviousHeader.charAt(0))
							{
								pSearchIndex.push({title:'' + sHeader.charAt(0) + '',index:iIndex});
							}
						}
					break;
				}
			}
				
		    pDataArray.push({title:'' + sNameShort + '', pinId:'' + iPinId + '' , hasChild:true, path:'pin_details.js', header:'' + sHeader + ''});
		    if(sHeader != '')
			{
				sPreviousHeader = sHeader;
			}
			sHeader = '';
			rows.next();
			iIndex++;	
		};
		
		return pSearchIndex;
	}//end API.getSearchList
	
	API.getDataMap = function( options ) {
		
		var annotationsArray = [];
		var rows = db.execute('SELECT * FROM pins');
		
		var pinParams = {
				latitude:40.76139,
				longitude:-73.97761,
				title:"shortName",
				subtitle:'address',
				animate:true,
				rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
				myid:0
			};
		
		var iUniqueId = 0;	
		while (rows.isValidRow())
		{
			pinParams.latitude = rows.fieldByName('lat');
			pinParams.longitude = rows.fieldByName('long');
			pinParams.title = rows.fieldByName('nameShort');
			pinParams.subtitle = rows.fieldByName('address');
			pinParams.myid = iUniqueId;
			pinParams.pinId = rows.fieldByName('id');
			
			//if (!isAndroid) {
				var bInFavoriteList = false;
				for (var i = 0; i < APP.pFavoritesList.length; i++) 
				{
					if(APP.pFavoritesList[i] == rows.fieldByName('id'))
					{
						bInFavoriteList = true;
						break;
					}
				}
				if(bInFavoriteList == true)
				{
					pinParams.pincolor = Titanium.Map.ANNOTATION_PURPLE;
				} else
				{
					pinParams.pincolor = Titanium.Map.ANNOTATION_RED;
				}
			//} else {
			//	pinParams.pinImage = "../images/map-pin.png";
			//}
			
			if(pinParams.latitude != null && pinParams.longitude != null)
			{
		    	annotationsArray.push(Titanium.Map.createAnnotation(pinParams));
				iUniqueId++;
			}
			
		    rows.next();	
		};
		
		return annotationsArray;
	}; //end getDataMap
	
	API.getSinglePin = function( pinID ) {
		
		//var db = Ti.Database.install('mapPins.sqlite','pins');
		var annotationsArray = [];
		
		var rows = db.execute('SELECT * FROM pins WHERE id="' + pinID + '"');
	
		var pinParams = {
				latitude:40.76139,
				longitude:-73.97761,
				title:"shortName",
				subtitle:'address',
				animate:true,
				//rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
				myid:0
			};
	
		var iUniqueId = 0;	
		while (rows.isValidRow())
		{
			pinParams.latitude = rows.fieldByName('lat');
			pinParams.longitude = rows.fieldByName('long');
			pinParams.title = rows.fieldByName('nameShort');
			pinParams.subtitle = rows.fieldByName('address');
			pinParams.myid = iUniqueId;
			pinParams.pinId = rows.fieldByName('id');
			
			//if (!isAndroid) {
				var bInFavoriteList = false;
				for (var i = 0; i < Ti.App.pFavoritesList.length; i++) 
				{
					if(Ti.App.pFavoritesList[i] == rows.fieldByName('id'))
					{
						bInFavoriteList = true;
						break;
					}
				}
				if(bInFavoriteList == true)
				{
					pinParams.pincolor = Titanium.Map.ANNOTATION_PURPLE;
				} else
				{
					pinParams.pincolor = Titanium.Map.ANNOTATION_RED;
				}
			//} else {
			//	pinParams.pinImage = "../images/map-pin.png";
			//}
			
			if(pinParams.latitude != null && pinParams.longitude != null)
			{
		    	annotationsArray.push(Titanium.Map.createAnnotation(pinParams));
				iUniqueId++;
			}
			
		    rows.next();
		};
		
		return annotationsArray;
	}; //end API.getSinglePin
	
	API.getDetail = function( nameShort ) {
		
		//var db = Ti.Database.install('mapPins.sqlite','pins');
		var rows = db.execute('SELECT * FROM pins WHERE nameShort="' + nameShort + '"');
		
		pDetailsData = [];
		pDetailsData.push(rows.fieldByName('nameShort'));
		pDetailsData.push(rows.fieldByName('address'));
		pDetailsData.push(rows.fieldByName('telephone'));
		pDetailsData.push(rows.fieldByName('neighborhood'));
		pDetailsData.push(rows.fieldByName('homeUrl'));
		pDetailsData.push(rows.fieldByName('exhibitionsUrl'));
		pDetailsData.push(rows.fieldByName('calendarUrl'));
		pDetailsData.push(rows.fieldByName('lat'));
		pDetailsData.push(rows.fieldByName('long'));
		pDetailsData.push(rows.fieldByName('description'));
		pDetailsData.push(rows.fieldByName('category'));
		
		return pDetailsData;
		
	};//end API.getDetail
	
	API.saveFav = function( pinID ) {
		var bInList = false;
		var pTempArray = APP.pFavoritesList;
		
		for (var i = 0; i < pTempArray.length; i++) 
		{
			if(pTempArray[i] == pinID)
			{
				bInList = true;
				break;
			}
		}
		
		var favoriteAlertDialog = Titanium.UI.createAlertDialog({
			title:"Display in Favorties List"
		});
		
		if(bInList == false)
		{
			pTempArray.push(pinID);
			APP.pFavoritesList = pTempArray;
			Titanium.App.Properties.setList('favoritesList', APP.pFavoritesList);
			favoriteAlertDialog.message = "Added to Favorites.";
			favoriteAlertDialog.buttonNames = ["OK"];
			favoriteAlertDialog.cancel = 0;
			favoriteAlertDialog.show(); 
		} else 
		{
			favoriteAlertDialog.message = "Already in Favorites.";
			favoriteAlertDialog.buttonNames = ["OK"];
			favoriteAlertDialog.cancel = 0;
			favoriteAlertDialog.show();
		}		
	};//end saveFav
	
	API.getDataFav = function( pinId ) {
		
		var dataArray = [];
		//var db = Ti.Database.install('mapPins.sqlite','pins');
		var rows;
		var dataArray = [];
	
		var bInList = false;
		for (var i = 0; i < APP.pFavoritesList.length; i++) 
		{
			rows = db.execute('SELECT * FROM pins WHERE id="' + APP.pFavoritesList[i] + '"');
			dataArray.push({title:'' + rows.fieldByName('nameShort') + '', pinId:'' + rows.fieldByName('id') + '' , hasChild:true, path:'pin_details.js'});
		}
		
		return dataArray;
	};


  
  API.factoryView = function(opts){
    var topView = Ti.UI.createView({});
	
	topView.add( imageView );
    return topView; 
  };
  
  API.factoryWindow = function(options){
     var win = Ti.UI.createWindow({title:'uiTemplate'});
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end modelSQLITE
//Ti.UI.currentWindow.add( modelSQLITE.factoryView({}) ); 
//modelSQLITE.factoryWindow({}).addChild( modelSQLITE.factoryView({}) ).open({modal:true}); 
  
