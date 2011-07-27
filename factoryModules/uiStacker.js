
//<module version="0.1">ti.box2d</module>

var uiStacker = (function() {
  	
  	var API = { };
    
  	API.factoryView = function( options )
	{
		var topView = Ti.UI.createView({ backgroundColor:'#B1B1B1' });
		
		var box2d = require("ti.box2d");
		var	world = box2d.createWorld(topView);
		
		function generateRandomColor()
		{
			return '#' + (function co(lor){   return (lor +=  [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])   && (lor.length == 6) ?  lor : co(lor); })('');
		}//end generateRandomColor
		
		function generateNewBox() 
		{
			var left = Math.random() * Ti.Platform.displayCaps.platformWidth - 50;
			var top = Math.random() * 10;	
			var color = generateRandomColor();
			
			var box = Ti.UI.createView({
				width:50,
				height:50,
				top:top,
				left:left,
				backgroundColor:color
			});		
			world.addBody(box,{
				density:4,
				restitution:Math.random()
			});
		}//end generateNewBox
		
		//setInterval(generateNewBox,2000);
		
		Ti.Accelerometer.addEventListener("update",function(e)
		{
			world.setGravity(e.x * 9.81, e.y * 9.81);
		});//end addEventListener
		
		world.addEventListener("collision",function(e)
		{
			Ti.API.info("collision between "+e.a+" -> "+e.b+" => "+e.phase);	
		});//end addEventListener
		
		topView.addEventListener("click",function(e)
		{
			var color = generateRandomColor();
			
			var box = Ti.UI.createView({
				width:50,
				height:50,
				center:{x:e.x,y:e.y},
				backgroundColor:color
			});		
			world.addBody(box,{
				density:4,
				restitution:Math.random()
			});
			
		});//end addEventListener
		
		world.start();
		
		return topView;
	}//end factoryView
	
	API.factoryWindow = function( options )
	{
		var win = Ti.UI.createWindow({title:'stacker game'});
		win.add( API.factoryView( options ) );
		return win;
	}//end factoryWindow
	
  return API;
})(); //end uiStacker
Ti.UI.currentWindow.add( uiStacker.factoryView({}) );
//uiStacker.factoryWindow({}).open({modal:true});
//uiStacker.factoryWindow({}).open({fullscreen:true});


