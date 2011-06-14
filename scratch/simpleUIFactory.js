UIFACTORY = (function() {
	
	var API = {
		//button stuff
		buttonStartLoc : 59,
		buttonStep : 42
	};
	
	API.factoryButtonMain = function( options )
	{
		var newButton = Titanium.UI.createButton({
			color:'#53caef',
			top:options.top,
			width:290,
			height:35,
			font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
			title:options.title
		});
		return newButton
	};
	
	API.createWindowDetail = function( options )
	{
		//Ti.API.info( 'options:' +  options );
		
		var win = Titanium.UI.createWindow({ title:'Detail',   backgroundColor:'#fff' });
		
		var label1 = Titanium.UI.createLabel({ color:'#999', text: 'HOME', font:{fontSize:20,fontFamily:'Helvetica Neue'}, top:90, textAlign:'center', width:'auto' });
		win.add(label1);
		
		return win;
	};//end createWindowDetail
	
	API.createWindowButtons = function( options )
	{
		Ti.API.info( 'options:' +  options );
		
		var buttonStep = API.buttonStep;
		var buttonLoc = API.buttonStartLoc;
		
		var win = Titanium.UI.createWindow({backgroundColor:'#fff', barImage:API.winBarImage, backgroundImage:API.winBackgroundImage });
		
		win.add( API.factoryButtonMain({top: buttonLoc, title:'BUTTON A', parentTab:options.parentTab, childWindow: API.createWindowDetail({}) }));
		buttonLoc = buttonLoc + buttonStep;
		
		win.add( API.factoryButtonMain({top: buttonLoc, title:'BUTTON B', parentTab:options.parentTab, childWindow: API.createWindowDetail({}) }));
		buttonLoc = buttonLoc + buttonStep;
		
		win.add( API.factoryButtonMain({top: buttonLoc, title:'BUTTON C', parentTab:options.parentTab, childWindow: API.createWindowDetail({}) }));
		buttonLoc = buttonLoc + buttonStep;
		
		win.add( API.factoryButtonMain({top: buttonLoc, title:'BUTTON D', parentTab:options.parentTab, childWindow: API.createWindowDetail({}) }));
		buttonLoc = buttonLoc + buttonStep;
		
		win.add( API.factoryButtonMain({top: buttonLoc, title:'BUTTON E', parentTab:options.parentTab, childWindow: API.createWindowDetail({}) }));
		
		return win;
	};//end createWindowButtons
	
	API.createWindowHome = function( options )
	{
		//Ti.API.info( 'options:' +  options );
		var win = Titanium.UI.createWindow({ title:'Home',   backgroundColor:'#fff' });
		
		var label1 = Titanium.UI.createLabel({ color:'#999', text: 'HOME', font:{fontSize:20,fontFamily:'Helvetica Neue'}, top:90, textAlign:'center', width:'auto' });
		win.add(label1);
		
		return win;
	};//end createWindowHome
	
	return API;
})();// end UIFACTORY