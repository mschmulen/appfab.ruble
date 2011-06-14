//https://gist.github.com/764020


// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var win = Ti.UI.createWindow({
    title: "Window Title",
    exitOnClose: true
});
win.open();

// CREATE MAP VIEW
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region: {latitude:33.74511, longitude:-84.38993, latitudeDelta:0.2, longitudeDelta:0.2},
	animate:true,
	regionFit:true,
	userLocation:true
});

win.add(mapview);

var myLocation = Titanium.Map.createAnnotation({
	latitude:33.74511,
	longitude:-84.38993,
	title:"title: myLocation",
	subtitle:'subtitle: myLocation',
	pincolor:Titanium.Map.ANNOTATION_RED,
	animate:false
});

mapview.addAnnotation(myLocation);

var updateCount = 0;
function timedUpdate()
{
	Ti.API.info("timedUpdate()" + updateCount);

	try
	{
		mapview.removeAnnotation( myLocation );
		//update the annotattion
		myLocation.latitude = myLocation.latitude + 0.01;
		myLocation.longitude = myLocation.longitude + 0.01;
		myLocation.subtitle = new Date();
		mapview.addAnnotation(myLocation);
	}//end try
	catch(E)
	{
		alert(E);
	}//end catch

	setTimeout(function() { timedUpdate(); },1000);	
	updateCount = updateCount + 1;	
}//end timedUpdate

timedUpdate();
