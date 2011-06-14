//https://gist.github.com/764474

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Ti.Geolocation.purpose = "FUN";

var win = Ti.UI.createWindow({
    exitOnClose: true,
 	backgroundColor:'#336699',
    title: 'Main Window',
    navBarHidden: false
});

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var myLocationButton = Titanium.UI.createButton({
	title:'Me',
	width:40,
	height:40,
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var toolbar = Titanium.UI.createToolbar({
	items:[flexSpace,myLocationButton, flexSpace],
	top:0,
	borderTop:false,
	borderBottom:true
});
win.add(toolbar);

// CREATE MAP VIEW
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region: {latitude:33.74511, longitude:-84.38993, latitudeDelta:0.2, longitudeDelta:0.2},
	animate:true,
	height:500,
	top:40,
	regionFit:true,
	userLocation:true
});
win.add(mapview);

myLocationButton.addEventListener('click', function(e){
	Ti.Geolocation.getCurrentPosition(function(e){
		mapview.setLocation({ latitude: e.coords.latitude, longitude:e.coords.longitude, animate: true, latitudeDetla:0.04, longitudeDelta:0.04 });	
	});	
});

win.open();
