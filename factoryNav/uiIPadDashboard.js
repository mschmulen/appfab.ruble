
var win = Ti.UI.createWindow({ backgroundColor:'#000' });

//Ti.API.info (" width : "+ Ti.Platform.displayCaps.platformWidth +" height:" + Ti.Platform.displayCaps.platformHeight);
//[INFO]  width : 1024 height:768

var platformWidth = 1024;
	var platformHeight = 768;
var backcolor = "#AABFC9"; //#8AD7FC #FCD78A #FCD78A

var approach1 = {
    visible: true,
   	parent: Ti.UI.createView({ left:0, top:0, width:platformWidth, height:platformHeight }),
    button: Ti.UI.createButton({ width:5, height:5, bottom:5, left:5 }),
    topView: Ti.UI.createView({ width:5, height:5, top:5, left:5, backgroundColor:backcolor, visible: false }),
    
    //left column
   	block11: {
   		blockdata: {url:'block_presoStandard.js', test:'yack'},
        parent: Ti.UI.createView({ top:20, left:20, width:368, height:259, trasparancy:0.5, backgroundColor:backcolor }),
        front: Ti.UI.createView({ top:0, left:0, width:368, height:259, trasparancy:0.5, backgroundColor:backcolor }),
        back: Ti.UI.createView({ top:0, left:0, width:368, height:259, trasparancy:0.5, backgroundColor:backcolor }),
        image: Ti.UI.createImageView({ width:568, height:259, image:'images/block1.png' }),
        line1: Ti.UI.createLabel({ backgroundColor:'#000', width:323, height:48, top:10, right:10 - 50, text:'Titanium', font:{fontFamily:'Helvetica Neue', fontSize:44, fontWeight:'bold'}, color:'#fff', opacity:0.0, textAlign:'right' }),
        line2: Ti.UI.createLabel({ backgroundColor:'#000', width:213, height:24, top:68, right:10 - 50, text:'Welcome to Titanium', font:{fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'}, color:'#f0f', opacity:0.0, textAlign:'right' }),
        mask: Ti.UI.createView({ width:368, height:259, backgroundColor:backcolor })
    },
    
    block12: {
   		blockdata: {url:'block_demoChess.js'},
        parent: Ti.UI.createView({ top:300, left:20, width:178, height:260, backgroundColor:backcolor }),
        front: Ti.UI.createView({ top:0, left:0, width:178, height:260, backgroundColor:backcolor }),
        back: Ti.UI.createView({ top:0, left:0, width:178, height:260, backgroundColor:backcolor }),
        image: Ti.UI.createImageView({ width:178, height:260, image:'images/block2.png' }),
        line1: Ti.UI.createLabel({ backgroundColor:'#000', width:109, height:24, top:20, right:10, text:'Chess', font:{fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'}, color:'#ff0', opacity:0.0, textAlign:'right' }),
        mask: Ti.UI.createView({ width:368, height:260, backgroundColor:backcolor })
    },
	
    block13: {
   		blockdata: {url:'block_demoAppList.js'},
        parent: Ti.UI.createView({ top:300, left:210, width:178, height:260, backgroundColor:backcolor }),
        front: Ti.UI.createView({ top:0, left:0, width:178, height:260, backgroundColor:backcolor }),
        back: Ti.UI.createView({ top:0, left:0, width:178, height:260, backgroundColor:backcolor }),
        image: Ti.UI.createImageView({ width:178, height:260, image:'images/block3.png' }),
        line1: Ti.UI.createLabel({ backgroundColor:'#000', width:109, height:24, top:20, right:10, text:'Apps', font:{fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'}, color:'#ff0', opacity:0.0, textAlign:'right' }),
        mask: Ti.UI.createView({ width:368, height:260, backgroundColor:backcolor })
    },
	
   	block14: {
   		blockdata: {url:'block_settings.js'},
        parent: Ti.UI.createView({ top:571, left:20, width:368, height:157, backgroundColor:backcolor }),
        front: Ti.UI.createView({ top:0, left:0, width:368, height:157, backgroundColor:backcolor }),
        back: Ti.UI.createView({ top:0, left:0, width:368, height:157, backgroundColor:backcolor }),
        image: Ti.UI.createImageView({ width:368, height:157, image:'images/block4.png' }),
        line1: Ti.UI.createLabel({ backgroundColor:'#000', width:343, height:48, top:10, right:10 - 50, text:'Application', font:{fontFamily:'Helvetica Neue', fontSize:44, fontWeight:'bold'}, color:'#fff', opacity:0.0, textAlign:'right' }),
        line2: Ti.UI.createLabel({ backgroundColor:'#000', width:203, height:24, top:68, right:10 - 50, text:'Settings & Utilities', font:{fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'}, color:'#f0f', opacity:0.0, textAlign:'right' }),
        mask: Ti.UI.createView({ width:368, height:157, backgroundColor:backcolor })
    },
	
	//right quadrant
    block1: { //5
   		blockdata: {url:'block_presoStart.js'},
        parent: Ti.UI.createView({ top:20, left:641, width:363, height:437, backgroundColor:backcolor }),
        front: Ti.UI.createView({ top:0, left:0, width:363, height:437, backgroundColor:backcolor }),
        back: Ti.UI.createView({ top:0, left:0, width:363, height:437, backgroundColor:backcolor }),
        image: Ti.UI.createImageView({ width:363, height:437, image:'images/block5.png' }),
        line1: Ti.UI.createLabel({ backgroundColor:'#000', width:343, height:48, top:10, right:10 - 50, text:'Appcelerator', font:{fontFamily:'Helvetica Neue', fontSize:44, fontWeight:'bold'}, color:'#fff', opacity:0.0, textAlign:'right' }),
        line2: Ti.UI.createLabel({ backgroundColor:'#000', width:203, height:24, top:68, right:10 - 50, text:'Titamium', font:{fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'}, color:'#f0f', opacity:0.0, textAlign:'right' }),
        mask: Ti.UI.createView({ width:363, height:437, backgroundColor:backcolor })
    },
    block2: { //6
   		blockdata: {url:'moduleWindows/block_ModuleBox2d.js'},
        parent: Ti.UI.createView({ top:20, left:408, width:223, height:258, backgroundColor:backcolor }),
        front: Ti.UI.createView({ top:0, left:0, width:223, height:258, backgroundColor:backcolor }),
        back: Ti.UI.createView({ top:0, left:0, width:223, height:258, backgroundColor:backcolor }),
        image: Ti.UI.createImageView({ width:223, height:258, image:'images/block6.png' }),
        line1: Ti.UI.createLabel({ backgroundColor:'#000', width:109, height:24, bottom:10 - 50, right:10, text:'Box2D', font:{fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'}, color:'#ff0', opacity:0.0, textAlign:'right' }),
        mask: Ti.UI.createView({ width:223, height:258, backgroundColor:backcolor })
    },
    block3: { //7
   		blockdata: {url:'moduleWindows/block_ModuleOGL.js'},
        parent: Ti.UI.createView({ top:300, left:408, width:223, height:157, backgroundColor:backcolor }),
        front: Ti.UI.createView({ top:0, left:0, width:223, height:157, backgroundColor:backcolor }),
        back: Ti.UI.createView({ top:0, left:0, width:223, height:157, backgroundColor:backcolor }),
        image: Ti.UI.createImageView({ width:223, height:157, image:'images/block7.png' }),
        line1: Ti.UI.createLabel({ backgroundColor:'#000', width:109, height:24, bottom:10 - 50, right:10, text:'OpenGL', font:{fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'}, color:'#0ff', opacity:0.0, textAlign:'right' }),
        mask: Ti.UI.createView({ width:223, height:157, backgroundColor:backcolor })
    },
   	block4: { //8
   		blockdata: {url:'block_salesDocs.js'},
        parent: Ti.UI.createView({ top:465, left:408, width:357, height:262, backgroundColor:backcolor }),
        front: Ti.UI.createView({ top:0, left:0, width:357, height:262, backgroundColor:backcolor }),
        back: Ti.UI.createView({ top:0, left:0, width:357, height:262, backgroundColor:backcolor }),
        image: Ti.UI.createImageView({ width:357, height:262, image:'images/block8.png' }),
        line1: Ti.UI.createLabel({ backgroundColor:'#000', width:343, height:48, top:10, right:10 - 50, text:'Appcelerator', font:{fontFamily:'Helvetica Neue', fontSize:44, fontWeight:'bold'}, color:'#fff', opacity:0.0, textAlign:'right' }),
        line2: Ti.UI.createLabel({ backgroundColor:'#000', width:203, height:24, top:68, right:10 - 50, text:'Docs', font:{fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'}, color:'#f0f', opacity:0.0, textAlign:'right' }),
        mask: Ti.UI.createView({ width:357, height:262, backgroundColor:backcolor })
    },
    block5: { //9
   		blockdata: {url:'block_video.js'},
        parent: Ti.UI.createView({ top:465, left:778, width:226, height:262, backgroundColor:backcolor }),
        front: Ti.UI.createView({ top:0, left:0, width:226, height:262, backgroundColor:backcolor }),
        back: Ti.UI.createView({ top:0, left:0, width:226, height:262, backgroundColor:backcolor }),
        image: Ti.UI.createImageView({ width:226, height:262, image:'images/block9.png' }),
        line1: Ti.UI.createLabel({ backgroundColor:'#000', width:109, height:24, bottom:10 - 50, right:10, text:'Video', font:{fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'}, color:'#ff0', opacity:0.0, textAlign:'right' }),
        mask: Ti.UI.createView({ width:226, height:262, backgroundColor:backcolor })
    }
    
}; //end approach1

function BitchenOutAnimation( block ){
	
	Ti.API.info( " BitchenOutAnimation ");
	
	block.parent.animate({view:block.back, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT}, function() {
		
		Titanium.Analytics.userEvent('block.blockdata.url');
		
		var win = Titanium.UI.createWindow({
			url:block.blockdata.url,
			//url:'block_apps.js',
			backgroundColor: backcolor,//"#781717",//'#336699',
			opacity:1.0
		});
		
		var closeButton = Ti.UI.createButton({ title:'CLOSE', width:100, height: 30, top:0, left:0 });
		win.add( closeButton );
		closeButton.addEventListener('click', function(e){
			win.visible = false;
			approach1.topView.animate({ duration:350, left:block.parent.left, top:block.parent.top, width:block.parent.width, height:block.parent.height }, function() {
				approach1.topView.visible = false;
				block.parent.animate({view:block.front, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT}, function() {
					win.close();
				});//end animate
		 	});//end animate
		});
		
		/*
		win.addEventListener('click', function(e) {
			
			win.visible = false;
			approach1.topView.animate({ duration:350, left:block.parent.left, top:block.parent.top, width:block.parent.width, height:block.parent.height }, function() {
				approach1.topView.visible = false;
				block.parent.animate({view:block.front, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT}, function() {
					win.close();
				});//end animate
		 	});//end animate
		});//end win.addEventListener( click )
		*/
		
		approach1.topView.left = block.parent.left;
		approach1.topView.top = block.parent.top;
		approach1.topView.width = block.parent.width;
		approach1.topView.height = block.parent.height;
		approach1.topView.visible = true;
		
		approach1.topView.animate({ duration:350, top:0, left:0, width:1300, height:1300 }, function() {
			win.open();
		});
	});
	
}; //end BitchenOutAnimation

function BitchenIntroAnimation() {
	
	Ti.API.info( " BitchenIntroAnimation ");
	
    approach1.visible = true;
    win.add(approach1.parent);
    
    setTimeout(function() {
    	
    	var animationDuration = 250;
    	
    	//animate Col 1
    	approach1.block11.mask.animate({ duration:animationDuration, top:0, height:0 }, function() {
        	approach1.block11.line1.animate({ duration:animationDuration, right:0, opacity:1.0 });
            approach1.block11.line2.animate({ duration:animationDuration, right:0, opacity:1.0 }, function() {
                approach1.block12.mask.animate({ duration:animationDuration, top:0, height:0 }, function() {
                    approach1.block12.line1.animate({ duration:animationDuration, bottom:10, opacity:1.0 }, function() {
                        approach1.block13.mask.animate({ duration:animationDuration, top:0, height:0 }, function() {
                           	 approach1.block13.line1.animate({ duration:animationDuration, bottom:10, opacity:1.0 });
                           	 approach1.block14.mask.animate({ duration:animationDuration, top:0, height:0 }, function() {
                           	 	approach1.block14.line1.animate({ duration:animationDuration, right:0, opacity:1.0 });
            					approach1.block14.line2.animate({ duration:animationDuration, right:0, opacity:1.0 }, function() {
                           	 		
		                           	//animate Col2
							  		approach1.block1.mask.animate({ duration:animationDuration, top:0, height:0 }, function() {
							        	approach1.block1.line1.animate({ duration:animationDuration, right:0, opacity:1.0 });
							            approach1.block1.line2.animate({ duration:animationDuration, right:0, opacity:1.0 }, function() {
							                approach1.block2.mask.animate({ duration:animationDuration, top:0, height:0 }, function() {
							                    approach1.block2.line1.animate({ duration:animationDuration, bottom:10, opacity:1.0 }, function() {
							                        approach1.block3.mask.animate({ duration:animationDuration, top:0, height:0 }, function() {
							                           	 approach1.block3.line1.animate({ duration:animationDuration, bottom:10, opacity:1.0 });
							                           	 
							                           	 approach1.block4.mask.animate({ duration:animationDuration, top:0, height:0 }, function() {
							                           	 	approach1.block4.line1.animate({ duration:animationDuration, right:0, opacity:1.0 });
							                           	 	approach1.block4.line2.animate({ duration:animationDuration, right:0, opacity:1.0 }, function() {
							                           	 		
							                           	 		approach1.block5.mask.animate({ duration:animationDuration, top:0, height:0 }, function() {
							                           	 			approach1.block5.line1.animate({ duration:animationDuration, bottom:10, opacity:1.0 });
							                        			});//end block5.mask.animate
							                        			
							                           	 	});//end block4.line2.animate
							                        	});//end block4.mask.animate
   	 													
							                    	});//end block3.mask.animate
							                    });// end block2.line1.animat
							                });//end block2.mask.animate
							            });//end block1.line2.animate
							    	});//end block1.mask.animate
    								
    								
    							});//end block1.line2.animate
                    		});//end block14.mask.animate
                    	});//end block3.mask.animate
                    });// end block2.line1.animat
                });//end block2.mask.animate
            });//end block1.line2.animate
    	});//end block1.mask.animate
   		
    }, 1000);//end setTimeout
    
}//end BitchenIntroAnimation


function initBlockToParent ( block ) {
	//end add bock to parent
	
	approach1.parent.add( block.parent);
	block.parent.add( block.front );
	block.front.add( block.image );
	
	block.front.add( block.line1 );
	
	//test line 2 for null
	if ( block.line2 || false )
		block.front.add(block.line2);
	
	block.front.add(block.mask);
	/*
	var imageView = Titanium.UI.createImageView({
		image:'images/appcelerator.png',
		width:261,
		height:207,
		top:20
	});//end imageView
	block.back.add( imageView );
	*/
	
	block.parent.addEventListener('click', function(e) { Ti.API.info("click block"); BitchenOutAnimation( block ); } );
	
}; //end addBlockToParent

//left
initBlockToParent( approach1.block11 );
initBlockToParent( approach1.block12 );
initBlockToParent( approach1.block13 );
initBlockToParent( approach1.block14 );

//right
initBlockToParent( approach1.block1 );
initBlockToParent( approach1.block2 );
initBlockToParent( approach1.block3 );
initBlockToParent( approach1.block4 );
initBlockToParent( approach1.block5 );

win.add(approach1.parent);
win.add(approach1.topView);

win.addEventListener('open', function()
{
	//var date = formatTime();
	//Titanium.App.Properties.setString('window_open_event', date);
	Ti.API.info('OPEN fired in window');
});
win.addEventListener('close', function()
{
	//var date = formatTime();
	//Titanium.App.Properties.setString('window_close_event', date);
	Ti.API.info('CLOSE fired in window');
});

win.addEventListener('focus', function()
{
	//var date = formatTime();
	//Titanium.App.Properties.setString('window_focus_event', date);
	Ti.API.info('FOCUS fired in window');
	BitchenIntroAnimation();
  	Titanium.Analytics.userEvent('dashboard FOCUS');
});
win.addEventListener('blur', function()
{
	//var date = formatTime();
	//Titanium.App.Properties.setString('window_blur_event',  date);
	Ti.API.info('BLUR fired in window');
});

win.open();


 


