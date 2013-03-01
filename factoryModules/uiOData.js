
var uiOData = (function() {
  	
	var API = {};
	
    API.DataJS = require('ti.sap.odata');
  	API.collectionCache = null;

	API.useXMLNotJSON = true;
	API.dataType = API.useXMLNotJSON ? 'application/atom+xml' : 'application/json';
	API.queryString = '$format=xml';
	
	API.baseURL = 'http://gw.esworkplace.sap.com/sap/opu/odata/IWBEP/RMTSAMPLEFLIGHT_2';
	API.collectionURL = API.baseURL + '/FlightCollection/';
	API.pageSize = 20;
	
	API.credentials = {
		user: 'GW@ESW',
		password: 'ESW4GW'
	};//end credentials
	
	API.init = function(opts){
		
		API.collectionCache = API.DataJS.datajs.createDataCache({
			name: 'odataCollectionCache',
			source: API.collectionURL,
			pageSize: API.pageSize,
			headers: { Accept: API.dataType },
			formatQueryString: API.queryString,
			user: API.credentials.user,
			password: API.credentials.password
		});//end odataCollectionCache
		
	};//end init
	
		API.clearCollectionCache = function () {
		API.collectionCache.clear();
	};//end clearCollectionCache
	
	API.getCollectionRows = function (row, success, error) {
		collectionCache.readRange(row, pageSize).then(
        	function (data, response) { if (typeof success === "function") { success(data); } },
        	function (err) { if (typeof error === "function") { error(err); } }
    	);//end readRange
	};//end API.getCollectionRows
	
	API.getCollection = function (success, error) {
	    API.DataJS.OData.read({
    	        requestUri: API.collectionURL,
        	    headers: { Accept: API.dataType },
				formatQueryString: API.queryString,
     	       	user: API.credentials.user,
      	    	password: API.credentials.password
       		},
        	function (data, response) { if (typeof success === "function") { success(data.results); } },
        	function (err) { if (typeof error === "function") { error(err); } }
    	);
	};//end getCollection

	API.factoryTableViewCell = function( data )
	{
			var row = Ti.UI.createTableViewRow({
				hasChild: true,
				className: 'FlightItem',
				flight: data
			});
			
			var title = Ti.UI.createLabel({
				text: data.AirLineID + " " + data.connectionID,
				font: { fontWeight: 'bold', fontSize:14 },
				top: 4, left: 4, width: 'auto', height: 'auto'
			});
			
			
			var fromTo = Ti.UI.createLabel({
				text: data.FlightDetails.DepartureAirPort + " to " + data.FlightDetails.DestinationAirPort,
				color: 'gray',
				font: { fontSize: 12 },
				top: 22, left: 4, width: 'auto', height: 'auto'
			});
			
			var fare = Ti.UI.createLabel({
				text: "fare: " + data.AirFare,
				color: 'gray',
				font: { fontSize: 12 },
				top: 4, right: 4, width: 'auto', height: 'auto'
			});
			
			row.add(title);
			row.add(fromTo);
			row.add(fare);
			
			return row;
	};//end factoryTableViewCell

API.factoryView = function(opts){
    	var topView = Ti.UI.createView({});
		
    	var tableView = Titanium.UI.createTableView({});
		
		function stopLoading () {
    		table.deleteRow(0);
    	}
    	
		function handleSuccess (flightCollection) {
			var tableCells = [];
			var numFlights = flightCollection.length;
			
			for (var i = 0; i < numFlights; i++) {
				tableCells.push(API.factoryTableViewCell(flightCollection[i]));
			}//end for
			
			tableView.setData(tableCells);
		}//end handleSuccess
		
		function handleError (error) { alert(error.message); }
		
		API.getCollection(handleSuccess, handleError);
		//API.getCollection(0, handleSuccess, handleError);
    	
		// create table view event listener
		tableView.addEventListener('click', function(e)
		{
			API.showDetailWindow({flight:e.rowData.flight});
		});//end click
		
		topView.add( tableView );
    	return topView;
  	};//end factoryView	
	
	API.showDetailWindow = function(args){

  		var t = Titanium.UI.create2DMatrix(); t = t.scale(0);
		
  		var win = Titanium.UI.createWindow({
			backgroundColor:"#781717",//'#336699',
			borderWidth:2,
			borderColor:'#777',
			//height:500,
			//width:400,
			borderRadius:10,
			opacity:0.92,
			transform:t
		});
		
		// create first transform to go beyond normal size
		var t1 = Titanium.UI.create2DMatrix(); t1 = t1.scale(1.1);
		var a = Titanium.UI.createAnimation(); a.transform = t1; a.duration = 200;
		
		// when this animation completes, scale to normal size
		a.addEventListener('complete', function()
		{
			Titanium.API.info('here in complete');
			var t2 = Titanium.UI.create2DMatrix();
			t2 = t2.scale(1.0);
			win.animate({transform:t2, duration:200});
		});//end addEventListener
		
		var sectionTitles = [
			'Flight Information',
			'Flight Details',
			'Flight Bookings',
			'Operations'
		];
		
		var items = [
			{ section: 0, text: 'Flight:', 		label: 'flight' },
			{ section: 0, text: 'From/To:', 	label: 'fromTo' },
			//{ section: 0, text: 'Date:', 		label: 'dateTime' },
			{ section: 0, text: 'Fare:', 		label: 'fare' },
			{ section: 1, text: 'Departure:', 	label: 'departureCity' },
			{ section: 1, text: 'Destination:', label: 'destinationCity' },
			//{ section: 1, text: 'Flying Time:', label: 'flightTime' },
			//{ section: 1, text: 'Distance:', 	label: 'distance' },
			{ section: 1, text: 'Departs:', 	label: 'departureTime' },
			{ section: 1, text: 'Arrives:', 	label: 'arrivalTime' },
			//{ section: 2, text: 'Booking', 		clickUri: 'flightBooking' },
			//{ section: 2, text: 'Bookings', 	clickUri: 'flightBookings' },
			//{ section: 2, text: 'Carrier', 		clickUri: 'carrier' },
			{ section: 3, text: 'Close',  operation: 'close' }
		];
		
			var sections = [];
		var cnt = items.length;
		var currentSection = -1;
		
		var topView = Ti.UI.createView();
		
		
		for (var i = 0; i < cnt; i++) {
		
			if (items[i].section != currentSection) {
				currentSection = items[i].section;
				sections[currentSection] = Ti.UI.createTableViewSection({
					headerTitle: sectionTitles[currentSection]
				});
			}
			
			var row = Ti.UI.createTableViewRow({
				backgroundColor: 'white'
			});
			
			// If a 'label' is specified then create 2 label controls: title of the field and the property
            // Otherwise, if a 'clickUri' is specified then create a single label
			if (items[i].label) {
				row.add(Ti.UI.createLabel({
					text: items[i].text,
					textAlign: 'left',
					font: { fontWeight: 'bold' },
					left: 8, width: 120, height: 40
				}));
				
				topView[items[i].label] = Ti.UI.createLabel({
					text: "",
					textAlign: 'right',
					font: { fontWeight: 'normal' },
					right: 8, width: 160, height: 40
				});
				row.add(topView[items[i].label]);
				
				sections[currentSection].add(row);
			}
			else if (items[i].clickUri) {
				row.hasDetail = true;
				row.title = items[i].text;
				var clickUri = items[i].clickUri;
				row.addEventListener('click', function(e) {
					alert("Clicked on link")
					Ti.API.info("Need to make oData request: " +  uri);
				});
				sections[currentSection].add(row);
			}//end else if
			else if (items[i].operation) {
				row.hasDetail = true;
				row.title = items[i].text;
				row.addEventListener('click', function(e) {
					var t3 = Titanium.UI.create2DMatrix(); t3 = t3.scale(0);
					win.close({transform:t3,duration:300});
				});
				sections[currentSection].add(row);
			}//end else if Operation
				
			
		}///end for
		
			var tableView = Ti.UI.createTableView({ data: sections });
		win.add(tableView);
		
		
			//update the fields
		topView.flight.text = args.flight.AirLineID + " " + args.flight.FlightConnectionID;
		topView.fromTo.text = args.flight.FlightDetails.DepartureAirPort + " to " + args.flight.FlightDetails.DestinationAirPort;
		//topView.dateTime.text = Utils.formatDate(args.flight.FlightDate);
		topView.fare.text = "fare: " + args.flight.AirFare;
		topView.departureCity.text = args.flight.FlightDetails.DepartureCity.toUpperCase();
		topView.destinationCity.text = args.flight.FlightDetails.DestinationCity.toUpperCase();
		//topView.flightTime.text = Utils.formatMinutes(args.flight.FlightDetails.FlightTime);
		//self.distance.text = Math.floor(args.flight.FlightDetails.Distance) + " " + Utils.formatDistanceUnit(args.flight.FlightDetails.DistanceUnit);
		topView.departureTime.text = args.flight.FlightDetails.DepartureTime;
		topView.arrivalTime.text = args.flight.FlightDetails.ArrivalTime;
		
		topView.flightBooking = args.flight.FlightBooking.__deferred.uri;
		topView.flightBookings = args.flight.FlightBookings.__deferred.uri;
		topView.carrier = args.flight.FlightBookings.__deferred.uri;
		
		
		

		win.open(a);
  	};//end showDetailWindow
  	
  	API.factoryWindow = function(options){
    	var win = Ti.UI.createWindow({title:'OData'});
    	win.add( API.factoryView( options ) );
    	return win;
  	};//end factoryWindow
  	
  	return API;
})(); //end uiOData

uiOData.init();
Ti.UI.currentWindow.add( uiOData.factoryView({}) );
//uiOData.factoryWindow({}).open({modal:true});
//uiOData.factoryWindow({}).open({fullscreen:true});
//exports = uiOData
