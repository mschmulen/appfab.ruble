// 1. create main view
var mainView = Ti.UI.createView({
	backgroundImage:'images/feed-cover-background.png'
});

// 2. create a navbar 
var navbar = Ti.UI.createView({
	backgroundImage:'images/nav-bar.png',
	height:44,
	width:320,
	top:0
});
mainView.add(navbar);

// 3. create a label for the navbar
var label = Ti.UI.createLabel({
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	text:'Demo',
	color:'#fff',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1}
});
navbar.add(label);

// 4. create a navbar button
var navbarButton = Ti.UI.createButton({
	backgroundImage:'images/nav-bar-button.png',
	backgroundSelectedImage:'images/nav-bar-button-pressed.png',
	left:10,
	width:40,
	height:30,
	image:'images/nav-menu-icon.png'
});
navbar.add(navbarButton);

// 1. set global variables for location data
var locationTitle;
var locationSubtitle;


// 2. create a map view
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	animate:true,
	regionFit:true,
	userLocation:false,
	top:50,
	height:130,
	width:300,
	borderWidth:5,
	borderColor:'#fff',
});


// 3. get current location
Titanium.Geolocation.getCurrentPosition( function(e) {
	if (!e.success) {
		if (!e.success) {
		    // android simulator doesn't always give a valid location
		    e.coords = { latitude: 37.530786, longitude: -122.263714};
		}
	}

	// zoom into region
	var longitude = e.coords.longitude;
	var latitude = e.coords.latitude;
	mapview.region = {
		latitude:latitude,
		longitude:longitude,
		latitudeDelta:0.1,
		longitudeDelta:0.1
	};

	// get address
	Titanium.Geolocation.reverseGeocoder(latitude,longitude, function(evt) {
		var street;
		var city;
		var country;
		if (evt.success) {
			var places = evt.places;
			if (places && places.length) {
				street = places[0].street;
				city = places[0].city;
				country = places[0].country_code;
			} else {
				address = "No address found";
			}
		}
		else {alert(evt)}

		var time = getTime();
		locationTitle = street;
		locationSubtitle = city + ', ' + country + ' @ ' + time;
	 
		// drop a pin
		var pin = Titanium.Map.createAnnotation({
			latitude:latitude,
			longitude:longitude,
			locationTitle:locationTitle,
			locationSubtitle:locationSubtitle,
			animate:true,
			rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		});
		mapview.addAnnotation(pin);

		// show location
		var locationBox = Ti.UI.createView({
			borderWidth:5,
			borderColor:'#fff',
			top:190,
			width:300,
			backgroundImage:'images/nux-linen-pattern.png',
			height:50,
		})
		mainView.add(locationBox);
		var locationLabel = Ti.UI.createLabel ({
			color:'#eee',
			font:{fontSize:10,fontWeight:'bold'},
			text: locationTitle + '\n' + locationSubtitle,
			textAlign:'center'
		});
		locationBox.add(locationLabel);
	});
});

mainView.add(mapview);

// 5. help function to format current JS time
function getTime() {
	var d = new Date();
	var dateString = (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear();
	var hour = d.getHours();
	var ampm;
	var min = d.getMinutes();

	if (hour < 12) {
		ampm = "AM";
	} else {
		ampm = "PM";
	}
	if (hour == 0) {
		hour = 12;
	}
	if (hour > 12) {
		hour = hour - 12;
	}
	if (min < 10) {
		min = '0' + min;
	}
	return dateString + ' ' + hour + ':' + min + ampm;

};

// 1. create secondary view
var leftView = Ti.UI.createView({
	backgroundImage:'images/nux-linen-pattern.png'

});

// 2. create a scroll view for holding updates
var scrollView = Ti.UI.createScrollView({
	top:10,
	width:250,
	layout:'vertical',
	height:'auto',
	contentWidth: 'auto',
	contentHeight: 'auto',
	showVerticalScrollIndicator: true,
 	height: '90%',
});
leftView.add(scrollView);


// 3. create slide menu using MODULE
var slideMenu = require('/modules/slidemenu');
slideMenu.create(navbarButton,leftView,mainView,280);


// 1. use animated menu MODULE
var menu = require('/modules/path').createMenu({
	iconList: [
		{ image: '/images/sm/facebook.png', id: 'facebook' },
		{ image: '/images/sm/twitter.png', id: 'twitter' },
		{ image: '/images/sm/appcelerator.png', id: 'appcelerator' },
		{ image: '/images/sm/sf.png', id: 'salesforce' }
	]
});

// 2. add event listener for click
menu.addEventListener('iconClick', function(e) {

	// reset menu 
	setTimeout(function(){
		menu.initMenu();
	},1000);

	// handle click event
 	if (e.index==2){
		// ADD
		saveLocation();
	} else if (e.index==3) {
		// ADD
		updateChatterStatus();
	}
});

mainView.add(menu);

var Cloud = require('ti.cloud');

var activityIndicator = Ti.UI.createActivityIndicator({
  font: {fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
  height:'auto',
  width:'auto',
  message:'Updating...',
  bottom:120,
  color:'#fff'
});
mainView.add(activityIndicator);

// 1. login
Cloud.Users.login(
{
    login: 'nwright@appcelerator.com',
    password: 'appcelerator'

}, function(e){
	
	if (!e.success){
		alert('login failed ' + e);
	}
});

// 2. save location
function saveLocation(){
	activityIndicator.show();
	Cloud.Objects.create({
	    classname: 'locations',
	    fields: {
	        street: locationTitle,
	        detail: locationSubtitle,
	    }
	}, function (e) {
	    if (e.success) {
			refreshList()
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

// 3. retrieve all locations
function refreshList(){

	Cloud.Objects.query(
	{
	    classname: 'locations',
	}, function (e) {
		activityIndicator.hide()
	    if (e.success) {
			for (var i=0;i<e.locations.length;i++) {
				var locationBox = Ti.UI.createView({
					borderWidth:5,
					borderColor:'#fff',
					top:10,
					backgroundColor:'#333',
					height:50,
				})
				scrollView.add(locationBox);
				var locationLabel = Ti.UI.createLabel ({
					color:'#fff',
					font:{fontSize:10,fontWeight:'bold'},
					text: e.locations[i].street+'\n'+e.locations[i].detail,
					textAlign:'center'
				});
				locationBox.add(locationLabel);
				//Cloud.Objects.remove({classname:'locations',id:e.locations[i].id})				
			}
			alert('Location saved to ACS!');

	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }

	});
};

// 1. load salesforce MODULE
var Salesforce = (function() {
    var SalesforceModule = require('modules/salesforce'); 
  
    return new SalesforceModule({
        loginUrl: 'https://login.eventforceapp.com/', 
        clientId: '3MVG9rFJvQRVOvk6oEj8U0oZwu8oVbuSln.9AMA5p312ADeg2sd1dopwM.6iFyWrtj_O5elMXnh7knXDCTPwF',
        redirectUri: 'https://login.salesforce.com/services/oauth2/success',
        apiVersion: 'v24.0',
        serverApiVersion: 'v24.0',
        portalId: '060U0000000Pjzy',
        orgId: '00DU0000000Y6Pa'
    });
})();

// 2. function for updating and retrieving updated Chatter Status
function updateChatterStatus() {
	activityIndicator.show()

	// login to salesforce 
	Salesforce.login('mattkhoury@gmail.com', 'eventley1', function(results) {

		if(results.success) {

			// update status
			Salesforce.updateStatus(locationTitle + '\n' + locationSubtitle, function(request){
				if(request.error){
					alert('An error has ocurred: ' + request.error);
					return;
				}
				// retrieve updated status
				Salesforce.getChatterProfile(null, function(request) {

					// hide activity indicator
					activityIndicator.hide()

					// current status
					var data = request.data.currentStatus.body.text;

					// add record to table
					var statusBox = Ti.UI.createView({
						borderWidth:5,
						borderColor:'#fff',
						top:10,
						backgroundColor:'#ac2316',
						height:50,
					})
					var statusLabel = Ti.UI.createLabel ({
						color:'#fff',
						font:{fontSize:10,fontWeight:'bold'},
						text: data,
						textAlign:'center'
					});
					statusBox.add(statusLabel);
					scrollView.add(statusBox)
					alert('Salesforce Chatter Status Updated!');

				});
				
			});

		}
	});
	
};


//mainView.open();