
var uiTable = (function() {
  
  var API = { }; 
  
  API.data = [
	{title:'ROW 1', hasChild:true },
	{title:'ROW 2', hasChild:true },
	{title:'ROW 3', hasChild:true },
	{title:'ROW 4', hasChild:true },
	{title:'ROW 5', hasChild:true },
	{title:'ROW 6', hasChild:true },
	{title:'ROW 7', hasChild:true }
	];
  
  API.factoryView = function(opts){ 
    var topView = Ti.UI.createView({});
    
    var tv = Titanium.UI.createTableView({
		data:API.data
	});
	
	// create table view event listener
	tv.addEventListener('click', function(e)
	{
		var newWindow = Ti.UI.createWindow({ backgroundColor: '#ccc'});
		var closeButton = Ti.UI.createButton({ title:'close', width:100, height: 30, top: 30});
		newWindow.add( closeButton );
		closeButton.addEventListener('click', function(e){
			newWindow.close();
		});
		newWindow.open({  transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
		
	});//end click

	topView.add( tv );
    return topView; 
  };
  
  API.factoryWindow = function(options){ 
     var win = Ti.UI.createWindow({title:'tableView'}); 
     win.add( API.factoryView( options ) ); 
     return win; 
  };
  
  return API;
})(); //end uiTable
Ti.UI.currentWindow.add( uiTable.factoryView({}) );
//uiTable.factoryWindow({}).open({modal:true});
//uiTable.factoryWindow({}).open({fullscreen:true});
  


