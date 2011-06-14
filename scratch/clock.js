//https://gist.github.com/926911
//Clock

var clock = (function() {
  	
  	var API = { }; 


API.factoryWindow = function( options )
	{

var win = Ti.UI.createWindow({
	orientationModes: [3, 4]
});
var clock_bg = Ti.UI.createView({
	backgroundColor: '#444444',
	top: 20,
	left: 20,
	right: 20,
	height: 160,
	borderRadius: 12,
	backgroundGradient: {
		type: 'linear',
		colors: ['#ffffff', '#aaaaaa'],
		startPoint: {
			x: '100%',
			y: 0
		},
		endPoint: {
			x: '100%',
			y: '100%'
		}
	},
	opacity: 0.4,
	shadowOffset: {
		x: 0,
		y: 10
	}

});
win.add(clock_bg);
var time = Ti.UI.createLabel({
	text: '',
	top: 30,
	height: 75,
	font: {
		fontSize: '70'
	},
	textAlign: 'center',
	color: 'white',
});
var color = Ti.UI.createLabel({
	text: '',
	top: 100,
	height: 55,
	font: {
		fontSize: '50'
	},
	textAlign: 'center',
	color: 'white',
});
win.add(time);
win.add(color);

var red_display = Ti.UI.createLabel({
	width: 20,
	height: 20,
	backgroundColor: 'red',
	bottom: 60,
	left: 0,
	font: {
		fontSize: 13
	},
	color: 'white',
	text: ''
});
var green_display = Ti.UI.createLabel({
	width: 20,
	height: 20,
	backgroundColor: 'green',
	bottom: 35,
	left: 0,
	font: {
		fontSize: 13
	},
	color: 'white',
	text: ''
});
var blue_display = Ti.UI.createLabel({
	width: 20,
	height: 20,
	backgroundColor: 'blue',
	bottom: 10,
	left: 0,
	font: {
		fontSize: 15
	},
	color: 'white',
	text: ''
});

win.add(red_display);
win.add(green_display);
win.add(blue_display);

win.open();

/*
// JS Hex/Number: Copyright 2007, John Resig
// http://www.opensource.org/licenses/mit-license.php
function toHex(){
  var ret = "";
  for ( var i = 0; i < arguments.length; i++ )
    ret += (arguments[i] < 16 ? "0" : "") + arguments[i].toString(16);
  return ret.toUpperCase();
}


setInterval(function(){
	var x = new Date();
	var hour = x.getHours();
	var minute = x.getMinutes();
	var second = x.getSeconds();
	color.text = '#'+toHex(hour, minute, second);
	win.backgroundColor = color.text;
	if(hour<10){hour='0'+hour;}
	if(minute<10){minute='0'+minute;}
	if(second<10){second='0'+second;}
},1000);
*/

var maxnumhours = 23;
var maxnummins = 59;
var maxnumsecs = 60;
var maxmilisecs = 999;



function hexifyWithZeroLead(tohex) {
	var rtn = tohex.toString(16);
	return (rtn.length == 1 ? "0" : "") + rtn;
}



function updateClock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds();
	var currentMiliSeconds = currentTime.getMilliseconds();
	var rounded = currentSeconds + (currentMiliSeconds / maxmilisecs);

	var rednum = (Math.round(255 * ((currentHours) / maxnumhours)));
	var rednum100 = (Math.round(100 * ((currentHours) / maxnumhours)));
	var greennum = (Math.round(255 * ((currentMinutes) / maxnummins)));
	var greennum100 = (Math.round(100 * ((currentMinutes) / maxnummins)));
	var bluenum = (Math.round(255 * ((rounded) / maxnumsecs)));
	var bluenum100 = (Math.round(100 * ((rounded) / maxnumsecs)));

	var redhex = hexifyWithZeroLead(rednum);
	var greenhex = hexifyWithZeroLead(greennum);
	var bluehex = hexifyWithZeroLead(bluenum);

	var hex = "#" + redhex + greenhex + bluehex;
	var fullredhex = "#" + redhex + "0000";
	var fullgreenhex = "#00" + greenhex + "00";
	var fullbluehex = "#0000" + bluehex;

	red_display.text = redhex;
	red_display.backgroundColor = fullredhex;
	leftpos = (rednum100 * 0.01 * 400) + 25;
	red_display.animate({
		left: leftpos
	});

	green_display.text = greenhex;
	green_display.backgroundColor = fullgreenhex;
	leftpos = (greennum100 * 0.01 * 400) + 25;
	green_display.animate({
		left: leftpos
	});

	blue_display.text = bluehex;
	blue_display.backgroundColor = fullbluehex;
	leftpos = (bluenum100 * 0.01 * 400) + 25;
	blue_display.animate({
		left: leftpos
	});

	// Leading Zeros
	currentHours = (currentHours < 10 ? "0" : "") + currentHours;
	currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
	currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
	color.text = hex;
	time.text = currentHours + ':' + currentMinutes + ':' + currentSeconds;
	win.backgroundColor = color.text;

}

setInterval(updateClock, 250);
}; //end factoryWindow

  return API;
})(); //end clock
Ti.UI.currentWindow.add( clock.factoryView({}) );
//clock.factoryWindow({}).addChild( clock.factoryView({}) ).open({modal:true});

// inspired on http://www.joelpeterson.com/clock/
// and most of the code taken from there as well

