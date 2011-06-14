
//https://gist.github.com/fabbc95c8367a327539c

var bouncingBall = (function() {
  	
  	var API = { };

  	API.factoryView= function(opts)
  	{
  		var topView = Ti.UI.createView({ backgroundColor:'blue'} );
  		
  		var button = Ti.UI.createButton({ text:'hello', bottom:30, height:30, width:300 });
		topView.add(button );
		
		var label = Ti.UI.createLabel({ text:' ', top:30, height:30, width:300 });
		//topView.add( label );
		
		button.addEventListener('click', function(e){ label.text = 'yack'; });
		
		var arena = Ti.UI.createView({ top:10, width:320, height:320, backgroundColor: 'red' });
		topView.add( arena );
		
		var balls = [];
		var timer;
		
		function buildBalls( ballCount )
		{
			for (var i=0;i< ballCount ;i++)
			{
				var b = Ti.UI.createView({ width:5, height:5, backgroundColor: 'green', top:Math.random() * 50, left:Math.random() * 50 });
				b.vx = 2 ; b.vy = 2;
				arena.add(b);
				balls.push(b);
			}//end for
		}//end buildBalls
		
		function update(){
			Ti.API.info('update');
		
			for( var i = 0; i< balls.length; i ++ ) { 
				//wall collision
				if ( balls[i].left < 4 || balls[i].left  > 200){ balls[i].vx = balls[i].vx * -1;  }
				if ( balls[i].top < 4 || balls[i].top  > 200){ balls[i].vy = balls[i].vy * -1;  }
		
				//update
				balls[i].top += balls[i].vx;
				balls[i].left += balls[i].vy;
			}//end for
			setTimeout( update ,50);
		};
		
		buildBalls(20); 
  		update();
  		
  		return topView;
  	};//end factoryView
  	
  	API.factoryWindow = function(opts)
  	{
  		var win = Ti.UI.createWindow({ exitOnClose: true, backgroundColor:'#336699', title: 'Main Window', navBarHidden: false });
		
		wi.addChild( API.factoryViewBouncingBall({}) );
		
		return win;
  	};///end factoryWindow
  
  return API;
})(); //end bouncingBall

Ti.UI.currentWindow.add( bouncingBall.factoryView({}) );
//bouncingBall.factoryWindow({}).addChild( bouncingBall.factoryViewl({}) ).open({modal:true});

