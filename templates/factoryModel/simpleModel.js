MODEL = (function() {

	var mTableViewData = [
	{ title:'row 1', hasChild:true, urlRef:'http://www.appcelerator.com/wp-content/uploads/2009/05/PROD_tit_platform2.png'},
	{ title:'row 2', hasChild:true, urlRef:'http://www.appcelerator.com/wp-content/uploads/2009/05/PROD_tit_platform2.png'},
	{ title:'row 3', hasChild:true, urlRef:'http://www.appcelerator.com/wp-content/uploads/2009/05/PROD_tit_platform2.png'},
	{ title:'row 4', hasChild:true, urlRef:'http://www.appcelerator.com/wp-content/uploads/2009/05/PROD_tit_platform2.png'}
	];//end mTableViewData
	
	var mDataTerms = [ 'nantucket', 'capecod' ];


var yack = (function() {
  
  var API = { }; 
  
  var myPrivateVar ='private'; 
  function myPrivateFunction(){  };
   
  API.myPublicVar = 'hello' 
  
  API.factoryViewyack = function(opts){ 
    var topView = Ti.UI.createView({});
    
    return topView; 
  };
  
  API.factoryWindowyack = function(opts){ 
     var win = Ti.UI.createWindow({title:'yack'}); 
     win.addChild( factoryViewyack( options ) ); 
     return win; 
  };
  
  return API;
})(); //end yack  
//Ti.UI.currentWindow.add( yack.factoryViewyack({}) ); 
//yack.factoryWindowyack({}).addChild( yack.factoryViewyack({}) ).open({modal:true}); 
  


	var API = {
		tableViewData : mTableViewData,
		dataTerms : mDataTerms
	};	
	return API;
})();//end MODEL