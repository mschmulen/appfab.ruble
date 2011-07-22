//https://gist.github.com/1040334 https://gist.github.com/pec1985

//iphone, android
var uiNav = (function() {
  
  var API = { };
  
  API.factoryNav = function(opts){ 
	
	// Flags, is this for Android or iPhone?
	var iPhone = false;
	var Android = false;
	if(Ti.Platform.osname == 'iphone'){
		iPhone = true
	};
	if(Ti.Platform.osname == 'android'){
		Android = true
	};
	
	// our navigation function, to be compatible with both platforms
	function NavigationController(a){
		// this is to avoid errors
		a = a || {};
		a.window = a.window || Ti.UI.createWindow();
		// this is to handle the iPhone Nav functionality
		if(iPhone){
			var win = Ti.UI.createWindow();
			var nav = Ti.UI.iPhone.createNavigationGroup({
			   window: a.window
			});
			win.add(nav);
			win.push = function(b){
				nav.open(b);
			};
			return win;
		}
		// there is no Nav in Android, so let's return the window
		if(Android){
			a.window.push = function(b){
				b.open({
					fullscreen:false
				});
			}
			return a.window;
		}
	}//end function NavigationController
	
	// start the app right here
	var win = Ti.UI.createWindow({
		backgroundColor:'green'
	});
	
	var btn = Ti.UI.createButton({
		title:'push next window to the stack',
		width:300,
		height:50
	});
	
	win.add(btn);
	
	// let's call our custom navigation function
	var nav = NavigationController({
		window:win
	});
	
	// example of how to push (or open) the next window
	btn.addEventListener('click', function(){
		var win2 = Ti.UI.createWindow({
			backgroundColor:'red'
		});
		nav.push(win2);
	});

    return nav;
  };//end factoryNav
  
  return API;
})(); //end uiNav
uiNav.factoryNav({}).open();

