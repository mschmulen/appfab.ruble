

var uiTable = (function() {
  
  var API = { }; 
  
  API.data = [
	{title:'ROW 1 ', hasDetail:true, color:'blue', selectedColor:'#fff'},
	{title:'ROW 2', hasDetail:true, color:'blue', selectedColor:'#fff'},
	{title:'ROW 3', hasDetail:true, color:'blue', selectedColor:'#fff'},
	{title:'ROW 4', hasDetail:true, color:'blue', selectedColor:'#fff'},
	{title:'ROW 5', hasDetail:true, color:'blue', selectedColor:'#fff'},
	{title:'ROW 6', hasDetail:true, color:'blue', selectedColor:'#fff'},
	{title:'ROW 7', hasDetail:true, color:'blue', selectedColor:'#fff'}
	];
  
  var myPrivateVar ='private';
  function myPrvateFunction(){  };
  
  API.myPublicVar = 'hello' 
  
  API.factoryView = function(opts){ 
    var topView = Ti.UI.createView({});
    
    var tv = Titanium.UI.createTableView({
		data:API.data
	});
	
	// create table view event listener
	tv.addEventListener('click', function(e)
	{
		// event data
		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowData;
		Ti.API.info('detail ' + e.detail);
		Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
	});

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
//Ti.UI.currentWindow.add( uiTable.factoryView({}) ); 
//uiTable.factoryWindow({}).addChild( uiTable.factoryView({}) ).open({modal:true}); 
  

