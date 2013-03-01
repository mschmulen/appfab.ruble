

var uiSplash = (function() {
  	
  	var API = {};
  	
  	API.name = "Splash";
	API.icon = "/KS_nav_ui.png";
	API.parentNav = null;
	API.win = null;
	API.currentUser = null;
	
 	API.factoryView = function(opts){
    	topView = Ti.UI.createView({});
    	
    	var imageView = Titanium.UI.createImageView({
			image:'http://codedog.net/wp-content/uploads/2011/09/appcelerator.png',
			width:261,
			height:178,
			top:20
		});
		topView.add( imageView );
		
		
		var Cloud = require('ti.cloud');
		Cloud.debug = true;
		
		var userLabel = Ti.UI.createLabel({
			text:'-',
			textAlign: 'center',
			bottom:120,
			left:30,
			right:30
		});
		topView.add( userLabel);
		
		var registerButton = Ti.UI.createButton({
        	title: "Register!",
        	enabled: true, left: 10, bottom: 50
      	});
		topView.add( registerButton);
		
		var loginButton = Ti.UI.createButton({
        	title: "Login!",
        	enabled: true, bottom: 50
      	});
		topView.add( loginButton);
		
		var logoutButton = Ti.UI.createButton({
        	title: "Logout!",
        	enabled: false, right: 10, bottom: 50
      	});
      	topView.add( logoutButton);
      	
      	logoutButton.addEventListener('click', function() {
			Cloud.Users.logout(function (e) {
		        if (e.success) {
		            userLabel.text = 'Logged out!';
		            registerButton.enabled = true;
	                logoutButton.enabled = false;
	                loginButton.enabled = true;
		        }
		        else {
		            userLabel.text = (e.error && e.message) || e;
		        }
		    });
		});
		
		loginButton.addEventListener('click', function() {
			Cloud.Users.login({
	            login: 'mschmulen@appcelerator.com',
	            password: 'appcelerator'
	        }, function (e) {
	            if (e.success) {
	                API.currentUser = e.users[0];
	                //alert('Logged in! You are now logged in as ' + API.currentUser.id);
	                userLabel.text = API.currentUser.username;
	                registerButton.enabled = false;
	                logoutButton.enabled = true;
	                loginButton.enabsled = false;
	            }
	            else {
	                //error(e);
	            }
	            //button.show();
	        });
		});//end Login Button
		
		registerButton.addEventListener('click', function() {
			
		    var registerData = {
				username: 'mschmulen@appcelerator.com',
				email: 'mschmulen@appcelerator.com',
				password: 'appcelerator',
				password_confirmation: 'appcelerator'
			};//end registerData
      		
	      	Cloud.Users.create(registerData, function (e) {
	        	if (e.success) {
	            		API.currentUser = e.users[0];
	                	//alert('Logged in! You are now logged in as ' + API.currentUser.username);
	                	userLabel.text = API.currentUser.username;
	                	registerButton.enabled = false;
	                	logoutButton.enabled = true;
	                	loginButton.enabled = false;
	            	}//end if
	            	else {
	            		alert('There was an error with registration: ' + (e.error && e.message) || e );
	                	//error(e);
	            	}//end else
	        	});//end Users.create
	     	});
		
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
})(); //end uiSplash
Ti.UI.currentWindow.add( uiSplash.factoryView({}) ); 
//uiSplash.factoryWindow({}).open({modal:true});
//uiSplash.factoryWindow({}).open({fullscreen:true});
//module.exports = uiSplash


