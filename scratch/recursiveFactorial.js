
//https://gist.github.com/bb2d8e7edc6daeb55a81


var factorial = (function() {
  
  var API = { }; 
  
  var myPrivateVar ='private'; 
  function myPrvateFunction(){  };
   
  
  API.myPublicVar = 'hello' 
  
  API.factoryViewfactorial = function(opts){ 
    var topView = Ti.UI.createView({});
    
    var button = Ti.UI.createButton({ text:'hello', bottom:30, height:30, width:300 });
	topView.add( button );
	
	var label = Ti.UI.createLabel({ text:' ', top:30, height:30, width:300 });
	topView.add( label );
	
	function factorial( N )
	{
		return N <= 1 ? 1 : N * factorial ( N - 1);
	}//end factorial
	
	button.addEventListener('click', function(e){ label.text = factorial ( 12 ); });


    return topView; 
  };
  
  API.factoryWindowfactorial = function(opts){ 
     var win = Ti.UI.createWindow({title:'factorial'}); 
     win.addChild( factoryViewfactorial( options ) ); 
     return win; 
  };
  
  return API;
})(); //end factorial
Ti.UI.currentWindow.add( factorial.factoryViewfactorial({}) ); 
//factorial.factoryWindowfactorial({}).addChild( factorial.factoryViewfactorial({}) ).open({modal:true}); 
 