
var uiMatchThree = (function() {
  	
  	var API = { };
  	
  	API.currentScore = 0;
  	
  	API.backgroundImage = 'assets/images/background/background1.png';
	
	API.badgeDataSocial = {
		"maxIndex":5,
		"badge": [
				{ image:'assets/images/socialIcons/social1.png', name:'badge1'},
				{ image:'assets/images/socialIcons/social2.png', name:'badge2'},
				{ image:'assets/images/socialIcons/social3.png', name:'badge3'},
				{ image:'assets/images/socialIcons/social4.png', name:'badge4'},
				{ image:'assets/images/socialIcons/social5.png', name:'badge5'},
				{ image:'assets/images/socialIcons/social6.png', name:'badge6'}
			]
	};//end badgeData
	
	//http://thekruser.com/media/4sq/badges/mtv_vmas_big.png
	
	API.messageWin = Titanium.UI.createWindow({
		height:30,
		width:250,
		bottom:70,
		borderRadius:10,
		touchEnabled:false,
	
		orientationModes : [
		Titanium.UI.PORTRAIT,
		Titanium.UI.UPSIDE_PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT,
		]
	});
	API.messageView = Titanium.UI.createView({
		id:'messageview',
		height:30,
		width:250,
		borderRadius:10,
		backgroundColor:'#000',
		opacity:0.7,
		touchEnabled:false
	});
	
	API.messageLabel = Titanium.UI.createLabel({
		id:'messagelabel',
		text:'',
		color:'#fff',
		width:250,
		height:'auto',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:13
		},
		textAlign:'center'
	});
	API.messageWin.add(API.messageView);
	API.messageWin.add(API.messageLabel);
	
	
	API.showMessage = function ( message )
	{
		API.messageLabel.text = message;
		API.messageWin.open();
		setTimeout(function()
		{
			API.messageWin.close({opacity:0,duration:500});
		},1000);
	};//end showMessage
	
	API.scorePoints = function( points)
	{
		API.currentScore += points;
		Ti.API.info( API.currentScore );
		API.showMessage(' SCORE ' + points);
	}; //end ScorePoints
	
  	API.factoryView = function( options )
	{
		Ti.API.info( 'options:' +  options );
		var badgeData = API.badgeDataSocial;
		
		var selectedColor = 'red';
		var unSelectedColor = 'white';
		var viewBackgroundColor = 'white';
		
		var cellWidth = 62;
		var alphaFadeDuration = 300;
		
		var dimX = 12;
		var dimY = 12;
		
		var selectedCell = null;
		var spriteList = [];
				
		var arenaView = Ti.UI.createView({ backgroundColor:viewBackgroundColor, visible: true, width:dimY*cellWidth, height:dimX*cellWidth });
		
		
		function ReplaceDeletedItems()
		{
			Ti.API.info('function ReplaceDeletedItems() ');
			var was = false;
			for (var i=0;i<dimX;i++) {
				for (var j=0;j<dimY;j++) {
					if (GetItem(i,j).deleted == true)
					{
						var badgeIndex = Math.round(Math.random() * badgeData.maxIndex);
						GetItem(i, j).badgeIndex = badgeIndex;
						GetItem(i, j).backgroundImage = badgeData.badge[badgeIndex].image;
						GetItem(i, j).badgeName = badgeData.badge[badgeIndex].name;
						GetItem(i, j).visible = true;
						GetItem(i, j).opacity = 1;
						GetItem(i, j).deleted = false;
						was = true;
					}//end if
				}//end for
			}//end for
			
			if (was) {FindVariants();}
			
		};
		
		function CreateNewItems() {
			var was = false;
			for (var i=0;i<dimX;i++) {
				for (var j=0;j<dimY;j++) {
					if (GetItem(i,j).deleted == false)
					{
						var badgeIndex = Math.round(Math.random() * badgeData.maxIndex);
						GetItem(i, j).badgeIndex = badgeIndex;
						GetItem(i, j).backgroundImage = badgeData.badge[badgeIndex].image;
						GetItem(i, j).badgeName = badgeData.badge[badgeIndex].name;
						GetItem(i, j).visible = true;
						GetItem(i, j).opacity = 1;
						was = true;
					}//end if
				}//end for
			}//end for
			
			if (was) {FindVariants();}
		}//end CreateNewItem
		
		function initGame()
		{
			
			//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
			//Initialize
			for (var i=0;i<dimX;i++) {//for (var i=0;i<dimX;i++) {
				spriteList[i] = [];
				for (var j=0;j<dimY;j++) {//for (var j=0;j<dimY;j++) {
					var sView = Ti.UI.createView({borderColor:unSelectedColor, width:cellWidth, height:cellWidth });
					sView.i = i; sView.j = j;
					sView.top = (i*cellWidth+2);
					sView.left = (j*cellWidth+2);
					sView.deleted = false;
					sView.opacity = 1;
					spriteList[i][j] = sView;
					arenaView.add(sView);
					
					sView.addEventListener('click', function(e){
						if ( true /*e.source.deleted == false*/ )
						{
							if (e.source == selectedCell) {
								e.source.borderColor = unSelectedColor;
								selectedCell = null;
							}//end if 
							else if (selectedCell != null) {
								if (Math.abs(selectedCell.i-e.source.i) + Math.abs(selectedCell.j-e.source.j) == 1) {
									selectedCell.borderColor=unSelectedColor;
									var tempDiv1 = e.source;
									var tempDiv2 = selectedCell;
									SwapItems(tempDiv1, tempDiv2, function() { FindVariants(tempDiv1, tempDiv2);});
									selectedCell = null;
								}//end if 
								else {
									selectedCell.borderColor=unSelectedColor;
									e.source.borderColor=selectedColor;
									selectedCell = e.source;
								}//end else
							}//end if 
							else {
								e.source.borderColor=selectedColor;
								selectedCell = e.source;
							}//end else
						}
						return false;
					}); //end sView 'click'
					
				}//end for
			}//end for
			
			CreateNewItems();
		};// end initGame()
		//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		
		
		function GetItem(i, j) { return spriteList[i][j]; };//end GetItem
		function GetEnum(i, j ) { return (spriteList[i][j].deleted)? 9999999 : spriteList[i][j].badgeIndex; }//end GetEnum
		
		function ChangeItems(item1, item2) {
			var bg2 = item2.backgroundColor;
			item2.backgroundColor = item1.backgroundColor;
			item1.backgroundColor = bg2;
			
			//copy the badge index
			var bIndex = item2.badgeIndex;
			item2.badgeIndex = item1.badgeIndex;
			item1.badgeIndex = bIndex;
			
			//copy the background image
			var bImage = item2.backgroundImage;
			item2.backgroundImage = item1.backgroundImage;
			item1.backgroundImage = bImage;
			
			//copy the name prop
			var bName = item2.badgeName;
			item2.badgeName = item1.badgeName;
			item1.badgeName = bName;
				
			//copy del prop
			var del = item2.deleted;
			item2.deleted = item1.deleted;
			item1.deleted = del;
			
			//copy opacity prop
			var opa = item2.opacity;
			item2.opacity = item1.opacity;
			item1.opacity = opa;
		};//end changeItems
		
		function SwapItems(item1, item2, callBack) {
			ChangeItems(item1, item2);
			callBack();
		}//end SwapItems
		
		function FindVariants(item1, item2) {
			var hasVariants = false;
			var score = 0;
			for (var i=0;i<dimX;i++) {
				for (var j=0;j<dimY;j++) {
					if (i<dimX-2 && GetEnum(i,j)==GetEnum(i+1,j) && GetEnum(i,j)==GetEnum(i+2,j) ){
							GetItem(i,j).deleted = true;
							GetItem(i+1,j).deleted = true;
							GetItem(i+2,j).deleted = true;
							hasVariants = true;
							score++;
							API.scorePoints( score );
					}//end if
					if (j<dimY-2 && GetEnum(i,j)==GetEnum(i,j+1) && GetEnum(i,j)==GetEnum(i,j+2)) {
						GetItem(i,j).deleted = true;
						GetItem(i,j+1).deleted = true;
						GetItem(i,j+2).deleted = true;
						hasVariants = true;
						score++;
						API.scorePoints( score );
					}//end if
				}//end for dimY
			}//end for dimX
			
			if (!hasVariants && item1 && item2) {
				Ti.API.info('swap items back!');
				SwapItems(item1, item2); 	//this swaps the items back
			}//end if
			else {
				DeleteAnimate(FallToEmpty);
			}//end else
		}//end FindVariants
		
		function DeleteAnimate(callBack) {
			var done = true;
			for (var i=0;i<dimX;i++) {
				for (var j=0;j<dimY;j++) {
					if ( (GetItem(i,j).deleted == true) && (GetItem(i,j).opacity > 0.1) ) 
					{
						 GetItem(i,j).opacity =  GetItem(i,j).opacity - 0.1;
						done = false;
					}//end if
				}//end for
			}//end for
			if (!done){ setTimeout(function() {DeleteAnimate(callBack);}, 20); }
			if (done && callBack) { callBack();}
		}//end DeleteAnimate
		
		function FallToEmpty() {
			var done = false;
			var modified = false;
			while (!done) {
				done = true;
				for (var i=0;i<dimX-1;i++) {
					for (var j=0;j<dimY;j++) {
						if (GetItem(i,j).deleted == true && GetItem(i+1,j).deleted == false) {
							ChangeItems(GetItem(i,j), GetItem(i+1,j));
							done = false;
							modified = true;
						}//end if
					}//end for dimY
				}//end for dimX
			}//end while
			
			if ( modified == true ) { FindVariants(); }
			else { Ti.API.info('TallToEmpty ... CreateNewItems');  ReplaceDeletedItems(); }
		}//end FallToEmpty
		
		//Initialize
		initGame();
		
		
		return arenaView;
	}//end factoryView
	
	API.factoryWindow = function( options )
	{
		var win = Ti.UI.createWindow({title:'Match Three'});
		win.add( API.factoryView( options ) );
		return win;
	}//end factoryWindow
	
  return API;
})(); //end uiMatchThree
Ti.UI.currentWindow.add( uiMatchThree.factoryView({}) );
//uiMatchThree.factoryWindow({}).open({modal:true});
//exports = uiTemplate

