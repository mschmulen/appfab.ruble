
//gist reference https://gist.github.com/980774
var uiAccelerometer = (function() {
  
  var API = { }; 
   
  API.factoryView = function(opts){
  	
    var topView = Ti.UI.createView({});
	
	var isRecording = false, // Are we sampling data?
    recordings = []; // Holds all the recordings.
	
	//=== Start/Stop Button ===//
	var control = Ti.UI.createButton({
	  title: "Start",
	  top: 20,
	  right: 40,
	  left: 40,
	  height: 34
	});
	topView.add(control);
	
	var email = Ti.UI.createButton({
	  title: "Send Email",
	  bottom: 20,
	  right: 40,
	  left: 40,
	  height: 34
	});
	topView.add(email);
	
	//=== Now the X/Y/Z/Timestamp labels ===//
	var x = Titanium.UI.createLabel({
	  text: 'x:',
	  top: 74,
	  left: 10,
	  font: {fontSize:14},
	  color: '#555',
	  width: 300,
	  height: 'auto'
	});
	topView.add(x);
	
	var y = Titanium.UI.createLabel({
	  text: 'y:',
	  top: 94,
	  left: 10,
	  font: {fontSize:14},
	  color: '#555',
	  width: 300,
	  height: 'auto'
	});
	topView.add(y);
	
	var z = Titanium.UI.createLabel({
	  text: 'z:',
	  top: 104,
	  left: 10,
	  font: {fontSize:14},
	  color: '#555',
	  width: 300,
	  height: 'auto'
	});
	topView.add(z);
	
	var ts = Titanium.UI.createLabel({
	  text: 'timestamp:',
	  top: 124,
	  left: 10,
	  font: {fontSize:14},
	  color: '#555',
	  width: 300,
	  height: 'auto'
	});
	topView.add(ts);
	
	// Handle a sample.
	var didSample = function (e) {
	
	  // Update the UI.
	  ts.text = e.timestamp;
	  x.text = 'x: ' + e.x;
	  y.text = 'y:' + e.y;
	  z.text = 'z:' + e.z;
		
	  // Push the details onto the sample stack.
	  recordings.push({
	    timestamp: e.timestamp,
	    x: e.x,
	    y: e.y,
	    z: e.z
	  });
	};
	
	// Now take the current data and send an email.
	var sendEmail = function () {
	  // Need to do some stuff to make the array of objects in recordings to a CSV.
	  // Or do JSON.stringify(recordings); attach to email and send. In php do json_decode($that_json_string); and it will be a associative array.
	  // http://developer.appcelerator.com/question/18401/is-it-possible-to-send-email-from-appcelerator
	};
	
	control.addEventListener("click", function (e) {
	  if (isRecording) {
	    recordings = [];
	    Ti.Accelerometer.removeEventListener("update", didSample);
	    control.title = "Start";
	  } else {
	    // Kick of the accelerometer with a callback when it updates.
	    Ti.Accelerometer.addEventListener("update", didSample);
	    control.title = "Stop";
	  }
	
	  isRecording != isRecording; // Flip the state.
	});
	
	email.addEventListener("click", function (e) {
	  if (recording.length > 0) {
	    sendEmail();
	  } else {
	    alert("You've not done a recording yet!");
	  }
	});
	
    return topView; 
  };
  
  API.factoryWindow = function(options){
     var win = Ti.UI.createWindow({title:'uiAccelerometer'});
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end uiAccelerometer

Ti.UI.currentWindow.add( uiAccelerometer.factoryView({}) );
//uiAccelerometer.factoryWindow({}).open({modal:true});
//uiAccelerometer.factoryWindow({}).open({fullscreen:true});



/*
// Create tab group
var tabGroup = Titanium.UI.createTabGroup({
  barColor: "black"
});

// Create home tab.
var win = Ti.UI.createWindow({
  title: "Record"
});
// Tab for the recording pane.
var recTab = Titanium.UI.createTab({  
  window: win,
  title: "Record"
});

// Now add the main (and only) windows ui.
var isRecording = false, // Are we sampling data?
    recordings = []; // Holds all the recordings.

//=== Start/Stop Button ===//
var control = Ti.UI.createButton({
  title: "Start",
  top: 20,
  right: 40,
  left: 40,
  height: 34
});

win.add(control);

var email = Ti.UI.createButton({
  title: "Send Email",
  bottom: 20,
  right: 40,
  left: 40,
  height: 34
});

win.add(email);

//=== Now the X/Y/Z/Timestamp labels ===//
var x = Titanium.UI.createLabel({
  text: 'x:',
  top: 74,
  left: 10,
  font: {fontSize:14},
  color: '#555',
  width: 300,
  height: 'auto'
});
win.add(x);

var y = Titanium.UI.createLabel({
  text: 'y:',
  top: 94,
  left: 10,
  font: {fontSize:14},
  color: '#555',
  width: 300,
  height: 'auto'
});
win.add(y);

var z = Titanium.UI.createLabel({
  text: 'z:',
  top: 104,
  left: 10,
  font: {fontSize:14},
  color: '#555',
  width: 300,
  height: 'auto'
});
win.add(z);

var ts = Titanium.UI.createLabel({
  text: 'timestamp:',
  top: 124,
  left: 10,
  font: {fontSize:14},
  color: '#555',
  width: 300,
  height: 'auto'
});
win.add(ts);

// Handle a sample.
var didSample = function (e) {
  // Update the UI.
  ts.text = e.timestamp;
  x.text = 'x: ' + e.x;
  y.text = 'y:' + e.y;
  z.text = 'z:' + e.z;

  // Push the details onto the sample stack.
  recordings.push({
    timestamp: e.timestamp,
    x: e.x,
    y: e.y,
    z: e.z
  });
});

// Now take the current data and send an email.
var sendEmail = function () {
  // Need to do some stuff to make the array of objects in recordings to a CSV.
  // Or do JSON.stringify(recordings); attach to email and send. In php do json_decode($that_json_string); and it will be a associative array.
  // http://developer.appcelerator.com/question/18401/is-it-possible-to-send-email-from-appcelerator
};

control.addEventListener("click", function (e) {
  if (isRecording) {
    recordings = [];
    Ti.Accelerometer.removeEventListener("update", didSample);
    control.title = "Start";
  } else {
    // Kick of the accelerometer with a callback when it updates.
    Ti.Accelerometer.addEventListener("update", didSample);
    control.title = "Stop";
  }

  isRecording != isRecording; // Flip the state.
});

email.addEventListener("click", function (e) {
  if (recording.length > 0) {
    sendEmail();
  } else {
    alert("You've not done a recording yet!");
  }
});

// Now open the tab controller, which renders the windows.
tabGroup.addTab(recTab);

tabGroup.open();
*/