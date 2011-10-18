

var uiNavGroup = (function() {
  
  var API = { }; 
  
  API.data = [
		{title:'ROW 1', url:'chess.js', hasChild:true },
		{title:'ROW 2', url:'chess.js', hasChild:true },
		{title:'ROW 3', url:'chess.js', hasChild:true },
		{title:'ROW 4', url:'chess.js', hasChild:true },
		{title:'ROW 5', url:'chess.js', hasChild:true },
		{title:'ROW 6', url:'chess.js', hasChild:true },
		{title:'ROW 7', url:'chess.js', hasChild:true }
	];
  
  API.factoryView = function(opts){
  	var modalWin = Ti.UI.createWindow({
			backgroundColor:"red",
			//			navBarHidden:true
		});
		
	var nav = Ti.UI.iPhone.createNavigationGroup({
			window:modalWin
	});
	
    var topView = Ti.UI.createView({});
    
    var tv = Titanium.UI.createTableView({
		data:API.data
	});
	
	// create table view event listener
	tv.addEventListener('click', function(e)
	{	
		var w = Ti.UI.createWindow({
				title:e.rowData.title,
				url:e.rowData.url
			});//end w
			
			nav.open(w);
			
		/*
		var newWindow = Ti.UI.createWindow({ backgroundColor: '#ccc'});
		var closeButton = Ti.UI.createButton({ title:'close', width:100, height: 30, top: 30});
		newWindow.add( closeButton );
		closeButton.addEventListener('click', function(e){
			newWindow.close();
		});
		newWindow.open({  transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
		*/
		
	});//end click
	
	topView.add( tv );
	
	modalWin.add ( topView );
    //return topView; 
    return nav;
  };
  
  API.factoryWindow = function(options){ 
     var win = Ti.UI.createWindow({title:'uiNavGroup', navBarHidden:true}); 
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end uiTable
Ti.UI.currentWindow.navBarHidden = true;
Ti.UI.currentWindow.add( uiNavGroup.factoryView({}) );
//uiNavGroup.factoryWindow({}).open({modal:true});
//uiNavGroup.factoryWindow({}).open({fullscreen:true});
  



