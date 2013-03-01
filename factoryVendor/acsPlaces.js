


var uiTable = (function() {
  	
 	var API = { };
  	
  	API.data = [
		{title:' - ', hasChild:true },
		{title:' - ', hasChild:true }
	];
	
  	API.factoryView = function(opts){ 
    	var topView = Ti.UI.createView({});
   		
		var Cloud = require('ti.cloud');
		Cloud.debug = true;
		
	    var tv = Titanium.UI.createTableView({ top:120 });
		
	   	//create a location pin
	   	var button = Ti.UI.createButton({ title: 'Create', top:2, right: 20, left: 20  });
	   	
	    topView.add(button);
	    button.addEventListener('click', function() {
	    	
	   		Cloud.Places.create({
			    name: 'Appcelerator HQ',
			    state: 'California',
			    website: 'http://www.appcelerator.com'
			}, function (e) {
			    if (e.success) {
			        var place = e.places[0];
			        alert('Success:\n' +
			            'id: ' + place.id + '\n' +
			            'name: ' + place.name + '\n' +
			            'updated_at: ' + place.updated_at);
			    } else {
			        alert('Error:\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			    }
			}); //end places
	    });//end addEventListener
    
    
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    currentLoc = {};
    currentLoc.longitude = '';
    currentLoc.latitude = '';
    
   	var buttonRefresh = Ti.UI.createButton({
        title: 'Refresh',
        right: 20, left: 20,
        top:50,
    });
    topView.add(buttonRefresh);
	    
   	buttonRefresh.addEventListener('click', function() {
   			
        Cloud.Places.query({
            page: 1,
            per_page: 40,
		}, function (e) {
		    if (e.success) {
		        //alert('Success:\n' + 'Count: ' + e.places.length);
		        API.data = [];
		        for (var i = 0; i < e.places.length; i++) {
		            var place = e.places[i];
		       		//alert('id: ' + place.id + '\n' + 'name: ' + place.name + '\n' + 'longitude: ' + place.longitude + '\n' +  'latitude: ' + place.latitude + '\n' +'updated_at: ' + place.updated_at);
		           	API.data.push({title: place.name, hasChild:true, place:place }) ;
		        }
		        tv.setData( API.data );
		    } else {
		        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		    }//end else
		});
    });//end addEventListener
	
	// create table view event listener
	tv.addEventListener('click', function(e)
	{
		var newWindow = Ti.UI.createWindow({ backgroundColor: '#ccc'});
		var closeButton = Ti.UI.createButton({ title:'close', width:100, height: 30, top: 10});
		newWindow.add( closeButton );
		closeButton.addEventListener('click', function(e){ newWindow.close(); });
		
		var mapview = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region:{latitude:33.74511, longitude:-84.38993, latitudeDelta:0.5, longitudeDelta:0.5},
			animate:true,
			regionFit:true,
			top: 50,
			userLocation:true
		});//end mapview
		newWindow.add( mapview );
		
		var pin = Titanium.Map.createAnnotation({
			latitude: e.rowData.place.latitude,
			longitude: e.rowData.place.longitude,
			title: e.rowData.place.name,
			subtitle: e.rowData.place.created_at,
			pincolor:Titanium.Map.ANNOTATION_GREEN,
			animate:true
		});
		
		mapview.addAnnotation(pin);
		newWindow.open({ });//transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
		
	});//end click
	
	topView.add( tv );
    return topView;
  };
  
  API.factoryWindow = function(options){
     var win = Ti.UI.createWindow({title:'acs', layout:'vertical'}); 
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end uiTable
Ti.UI.currentWindow.add( uiTable.factoryView({}) );
//uiTable.factoryWindow({}).open({});
//exports = uiSplash

