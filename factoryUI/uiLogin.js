var uiLogin = (function() {
  	
	var API = { }; 
  	
  	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  	//Build the activity indicator stuff
  	// create indicator window
	API.indicatorView = Titanium.UI.createView({
		height:150,
		width:150
	});
	
	// indicator container
	API.indicatorContainer = Titanium.UI.createView({
		height:150,
		width:150,
		backgroundColor:'#000',
		borderRadius:10,
		opacity:0.8
	});
	API.indicatorView.add(API.indicatorContainer);
	
	// loading indicator
	API.activityIndicator = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:30,
		width:30
	});
	API.indicatorView.add(API.activityIndicator);
	
	// indicator message 
	API.message = Titanium.UI.createLabel({
		text:'Loading...',
		color:'#fff',
		width:'auto',
		height:'auto',
		font:{fontSize:16,fontWeight:'bold'},
		bottom:20
	});
	API.indicatorView.add(API.message);
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	API.updateIndicatorMessage = function(msg)
	{
		API.message.text = msg;
	};
	// show indicator
	API.showIndicator = function(view,message)
	{
		if (view)
		{
			uiLogin.message.text = message;
			//view.add(uiLogin.indicatorWindow);
			uiLogin.activityIndicator.show();
		}//end if
	};//end showIndicator
	
	// hide indicator
	API.hideIndicator = function(view)
	{
		if (view)
		{
			//view.remove(uiLogin.indicatorWindow);
			uiLogin.activityIndicator.hide();
		}//end if
	};//end hideIndicator
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	
	
  	API.factoryView = function(opts){
  		
	    var loginView = Ti.UI.createView({
			//backgroundImage:'images/common/login_background.png',
			width:320,
			height:350,
			bottom:0
		});
		
		var logo = Ti.UI.createView({
			image:'http://www.appcelerator.com/wp-content/uploads/2009/06/titanium_desk.png',
			//backgroundColor:'blue',
			width:261,
			height:178,
			top:140
		});
		loginView.add(logo);
		
		var credentialsView = Ti.UI.createView({
			layout:'vertical'
		});
		loginView.add(credentialsView);
	
		var usernameField = Titanium.UI.createTextField({
			hintText:'enter your network username',
			left:20,
			top:20,
			height:40,
			width:280,
			autocorrect:false,
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType:Titanium.UI.RETURNKEY_SEARCH,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
		}); 
		credentialsView.add(usernameField);
		usernameField.addEventListener('return', function()
		{
			passwordField.focus();
		});
		var passwordField = Titanium.UI.createTextField({
			hintText:'password',
			passwordMask:true,
			left:20,
			top:20,
			height:40,
			width:280,	
			autocorrect:false,
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType:Titanium.UI.RETURNKEY_GO,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
		}); 
		credentialsView.add(passwordField);
		passwordField.addEventListener('return', function()
		{
			
			API.showIndicator(loginView,'Validating...');
			setTimeout(function()
			{
				API.hideIndicator(loginView);
				//Main.show();
				//w.close();
			},2000);
			
		});
	    return loginView; 
	};//end factoryView
  
  API.factoryWindow = function(opts){
     win = Ti.UI.createWindow({title:'Login'});
     win.add( API.factoryView( {parentWin:win} ) );
     return win;
  };
  
  return API;
})(); //end uiLogin
Ti.UI.currentWindow.add( uiLogin.factoryView({parentWin:Ti.UI.currentWindow}) ); 
//uiLogin.factoryWindow({}).open({modal:true});
//uiLogin.factoryWindow({}).open({fullscreen:true});
//exports = uiTemplate