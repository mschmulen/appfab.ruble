

var uiSplash = (function() {
  	
  	var API = { }; 
  	
  	API.name = "Splash";
	API.icon = "/KS_nav_ui.png";
	API.parentNav = null;
	API.win = null;
  	
 	API.factoryView = function(opts){ 	
    	topView = Ti.UI.createView({});
    	
    	var tvLeftData = [
			{title:'Sally Rockstar', hasChild:false },
			{title:'Mountain View', hasChild:false },
			{title:'CA', hasChild:false },
			{title:'B7645691', hasChild:false },
			{title:'588-62-4534', hasChild:false },
			{title:'40000', hasChild:false }
		];
		
		var tvLeft = Ti.UI.createTableView({
			data: tvLeftData,
			backgroundColor:'#f1f1f1',
			left: 2,
			width: ( Ti.Platform.displayCaps.platformWidth / 2 ) - 4 , //145,
			top:5,
			height:250
		});
		topView.add( tvLeft );
		
		var tvRightData = [];
		var tvRight = Ti.UI.createTableView({
			data: tvRightData,
			backgroundColor:'#f1f1f1',
			right: 2,
			width:( Ti.Platform.displayCaps.platformWidth / 2 ) - 4, //145,
			top:5,
			height:250
		});
		topView.add( tvRight );
		
    	var postButton = Ti.UI.createButton({ 
    		title:"POST",
    		width:261,
			height:60,
			bottom:15
		});
		
		postButton.addEventListener('click', function()
		{
			var xhr = Ti.Network.createHTTPClient();
			xhr.timeout = 1000000;
			xhr.open("POST","http://23.21.138.200:8081");
			//xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('content-Type','application/json');
			//xhr.setRequestHeader("content-Type","application/json; charset=utf-8");
			//xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
			
			xhr.onerror = function(e)
			{
				alert("Error");
				
				//Ti.API.info("ERROR " + e.error);
				//alert(e.error);
			};
			xhr.onload = function()
			{
				Ti.API.info('RAW ='+this.responseText);
				var jresp =  eval( this.responseText);
				
				//update the tvRightData
				tvRightData =[
					{title:'Sally Rockstar', hasChild:false },
					{title:'Mountain View', hasChild:false },
					{title:'CA', hasChild:false },
					{title:'B7645691', hasChild:false },
					{title:';?yv;T?Xp2x', hasChild:false },
					{title:'40000', hasChild:false }
				];
				
				tvRight.setData( tvRightData );
				
				Ti.API.info( jresp );
				
				if(this.status == '200'){
	    			Ti.API.info('got my response, http status code ' + this.status);
	    			if(this.readyState == 4){
				    	var response=JSON.parse(this.responseText);
				      	Ti.API.info('Response = '+response);
				    }else{
				      alert('HTTP Ready State != 4');
				    }           
				 }else{
				    alert('HTTp Error Response Status Code = '+this.status);
				    Ti.API.error("Error =>"+this.response);
				 }             
	 
	 	
		 		/*
					var response = Ti.API.info( this.responseText );
					//var response = eval('('+this.responseText+')');
					//var storeList = eval(this.responseText);
					Ti.API.info( "response:"  + response );
					//try { }
					//alert( "boom");
					Ti.API.info( response );
					alert( "boom" +  repsonse );
					*/
			};//end onload
				
			// Get the data
			var jsonstring =  '[{"NewHireInfo":[{"Name":"Sally Rockstar"},{"City":"Mountain View"},{"State":"CA"},{"DriversLic":"B7645691"},{"SSN":"588-62-4534"},{"CurrentSalary":"40000"}]}]'
			xhr.send( jsonstring );
			//xhr.send({"NewHireInfo":[{"Name":"Sally Rockstar"},{"City":"Mountain View"},{"State":"CA"},{"DriversLic":"B7645691"},{"SSN":"588-62-4534"},{"CurrentSalary":"40000"}]});
		});
		


		
		topView.add( postButton );
    	return topView;
  	};//end factoryView
  	
  	API.postFunction = function(){
  		
  		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000000;
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.open("GET","http://23.21.138.200:8080");
		
		xhr.onload = function()
		{
			var response = Ti.API.info( this.responseText );
			//try { }
			
			alert( "boom" +  repsonse );
		};//end onload
		
		// Get the data
		xhr.send({"NewHireInfo":[{"Name":"Sally Rockstar"},{"City":"Mountain View"},{"State":"CA"},{"DriversLic":"B7645691"},{"SSN":"588-62-4534"},{"CurrentSalary":"40000"}]});
		 
  		//"http://23.21.138.200:8080/hireinfo"
  		//[{"NewHireInfo":[{"Name":"Sally Rockstar"},{"City":"Mountain View"},{"State":"CA"},{"DriversLic":"B7645691"},{"SSN":"588-62-4534"},{"CurrentSalary":"40000"}]}]
  		
  	};//end postFunction
  	
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

