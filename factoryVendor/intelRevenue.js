
var uiStoreReport = (function() {
	
  	var API = { }; 
  	
  	API.name = "Revenue";
	API.icon = "/KS_nav_ui.png";
	API.parentNav = null;
	API.win = null;
	
  	API.factoryView = function(opts){
  		
    	topView = Ti.UI.createView({});
		
		function getData(args){
			
			// create table view data object
			var data = [];
			
			var xhr = Ti.Network.createHTTPClient();
			xhr.timeout = 1000000;
			xhr.open("GET","http://23.21.138.200:8080");
			
			xhr.onload = function()
			{
				try
				{
					var response = eval('('+this.responseText+')');
					var storeList = eval(this.responseText);
					
					Ti.API.info( "response:"  + response );
					
					var storeList = response[0]; //response
					
					Ti.API.info( "storeList:" +  storeList );
					
					var storeInfoList = storeList["StoreInfo"];
					
					Ti.API.info( storeInfoList );
					
					for ( var c=0;c< storeInfoList.length; c++){
						
						Ti.API.info("c: " + c);
						
						var storeObj = storeInfoList[c];
						
						Ti.API.info("storeObj" + storeObj );
						var storeEntity  = storeObj["Store"];
						
						Ti.API.info( storeEntity );
						var storeNameEntity = storeEntity[0];
						var storeName = storeNameEntity["@Name"];
						Ti.API.info( "storeName " + storeName );
						
						var cityEntity = storeEntity[1];
						var cityValue = cityEntity["@City"];
						Ti.API.info( "cityValue " + cityValue );
						
						var stateEntity = storeEntity[2];
						var stateValue = stateEntity["@State"];
						Ti.API.info( "stateValue " + stateValue );
						
						var revenueEntity = storeEntity[3];
						var revenueValue = revenueEntity["@Revenue"];
						Ti.API.info( "revenueValue " + revenueValue );
						
						var avatar = "https://twimg0-a.akamaihd.net/profile_images/2179402304/appc-fb_normal.png";
						
						var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
						
						var row = Ti.UI.createTableViewRow({hasChild:true,height:'fill',backgroundColor:bgcolor});
						
						// Create a vertical layout view to hold all the info labels and images for each tweet
						var post_view = Ti.UI.createView({
							height:'fill',
							layout:'vertical',
							left:5,
							top:5,
							bottom:5,
							right:5
						});
						
						var av = Ti.UI.createImageView({
								image:avatar,
								left:0,
								top:0,
								height:48,
								width:48
							});
						// Add the avatar image to the view
						post_view.add(av);
						
						var user_label = Ti.UI.createLabel({
							text:storeName,
							left:54,
							width:180,
							top:-48,
							bottom:2,
							height:16,
							textAlign:'left',
							color:'#444444',
							font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
						});
						post_view.add(user_label);
						
						var rev_text = Ti.UI.createLabel({
							text: String.formatCurrency(Number(revenueValue)),
							left:64,
							top:0,
							bottom:2,
							height:'fill',
							width:236,
							textAlign:'left',
							font:{fontSize:16}
						});
						post_view.add(rev_text);
						
						// Add the vertical layout view to the row
						row.add(post_view);
						row.className = 'item'+c;
						data[c] = row;
					}//end for
					// Create the tableView and add it to the view.	
					var tableview = Titanium.UI.createTableView({data:data,minRowHeight:58});
					
					tableview.addEventListener('click', function(e)
					{
						API.showDetailWindow({name:storeName, city:cityValue, state:stateValue, revenue:revenueValue});
					});//end click
					
					topView.add(tableview);
				}//end try
				catch(E){
					alert(E);
				}
			};
			// Get the data
			xhr.send();
		}
		
		// Get the tweets for 'twitter_name'
		getData({});
		
    	return topView;
 	};//end factoryView
  	
  	API.showDetailWindow = function(args){
		
		var sectionTitles = [
			'Store Information',
			'Map',
			'Operations'
		];
		
		var items = [
			{ section: 0, text: 'StoreName:', 		label: 'name' },
			{ section: 0, text: 'Location City:', 	label: 'city' },
			{ section: 0, text: 'Location Date:', 		label: 'state' },
			{ section: 0, text: 'Revenue:', 	label: 'revenue' },
			{ section: 0, text: 'Close',  operation: 'close' }
		];
		
		var sections = [];
		
		if (Titanium.Platform.name === 'android') {
			
	  		var win = Titanium.UI.createWindow({
				backgroundColor: "white", //"#781717",//'#336699',
				borderWidth:2,
				borderColor:'#777', //height:500, //width:400,
				borderRadius:10 //opacity:0.92
			});
			
			var cnt = items.length;
			var currentSection = -1;
			
			var topView = Ti.UI.createView();
			
			for (var i = 0; i < cnt; i++) {
				
				if (items[i].section != currentSection) {
					currentSection = items[i].section;
					sections[currentSection] = Ti.UI.createTableViewSection({
						headerTitle: sectionTitles[currentSection]
					});
				}
				
				var row = Ti.UI.createTableViewRow({
					backgroundColor: 'white'
				});
				
				// If a 'label' is specified then create 2 label controls: title of the field and the property Otherwise, if a 'clickUri' is specified then create a single label
				if (items[i].label) {
					row.add(Ti.UI.createLabel({
						text: items[i].text,
						textAlign: 'left',
						font: { fontWeight: 'bold' },
						color:'black',
						left: 8, width: 120, height: 40
					}));
					
					topView[items[i].label] = Ti.UI.createLabel({
						text: "",
						textAlign: 'right',
						font: { fontWeight: 'normal' },
						color:'black',
						right: 8, width: 160, height: 40
					});
					row.add(topView[items[i].label]);
					
					sections[currentSection].add(row);
				}
				else if (items[i].clickUri) {
					row.hasDetail = true;
					row.title = items[i].text;
					var clickUri = items[i].clickUri;
					row.addEventListener('click', function(e) {
						alert("Clicked on link")
						Ti.API.info("Need to make oData request: " +  uri);
					});
					sections[currentSection].add(row);
				}//end else if
				else if (items[i].operation) {
					row.hasDetail = true;
					row.title = items[i].text;
					row.addEventListener('click', function(e) {
						win.close();
					});
					sections[currentSection].add(row);
				}//end else if Operation
				
			}///end for
			var tableView = Ti.UI.createTableView({ data: sections });
			win.add(tableView);
			
			topView.name.text = args.name;
			topView.city.text = args.city;
			topView.state.text = args.state;
			topView.revenue.text = args.revenue;
			
			win.open();
			
		}//end android
		else // if iOS
		{
			
	  		var t = Titanium.UI.create2DMatrix(); t = t.scale(0);
			
	  		var win = Titanium.UI.createWindow({
				backgroundColor:"#781717",//'#336699',
				borderWidth:2,
				borderColor:'#777', //height:500, //width:400,
				borderRadius:10,
				opacity:0.92,
				transform:t
			});
			
			// create first transform to go beyond normal size
			var t1 = Titanium.UI.create2DMatrix(); t1 = t1.scale(1.1);
			var a = Titanium.UI.createAnimation(); a.transform = t1; a.duration = 200;
			
			// when this animation completes, scale to normal size
			a.addEventListener('complete', function()
			{
				Titanium.API.info('here in complete');
				var t2 = Titanium.UI.create2DMatrix();
				t2 = t2.scale(1.0);
				win.animate({transform:t2, duration:200});
			});//end addEventListener
			
			var cnt = items.length;
			var currentSection = -1;
			
			var topView = Ti.UI.createView();
			
			for (var i = 0; i < cnt; i++) {
				
				if (items[i].section != currentSection) {
					currentSection = items[i].section;
					sections[currentSection] = Ti.UI.createTableViewSection({
						headerTitle: sectionTitles[currentSection]
					});
				}
				
				var row = Ti.UI.createTableViewRow({
					backgroundColor: 'white'
				});
				
				// If a 'label' is specified then create 2 label controls: title of the field and the property Otherwise, if a 'clickUri' is specified then create a single label
				if (items[i].label) {
					row.add(Ti.UI.createLabel({
						text: items[i].text,
						textAlign: 'left',
						font: { fontWeight: 'bold' },
						left: 8, width: 120, height: 40
					}));
					
					topView[items[i].label] = Ti.UI.createLabel({
						text: "",
						textAlign: 'right',
						font: { fontWeight: 'normal' },
						right: 8, width: 160, height: 40
					});
					row.add(topView[items[i].label]);
					
					sections[currentSection].add(row);
				}
				else if (items[i].clickUri) {
					row.hasDetail = true;
					row.title = items[i].text;
					var clickUri = items[i].clickUri;
					row.addEventListener('click', function(e) {
						alert("Clicked on link")
						Ti.API.info("Need to make oData request: " +  uri);
					});
					sections[currentSection].add(row);
				}//end else if
				else if (items[i].operation) {
					row.hasDetail = true;
					row.title = items[i].text;
					row.addEventListener('click', function(e) {
						var t3 = Titanium.UI.create2DMatrix(); t3 = t3.scale(0);
						win.close({transform:t3,duration:300});
					});
					sections[currentSection].add(row);
				}//end else if Operation
				
			}///end for
			var tableView = Ti.UI.createTableView({ data: sections });
			win.add(tableView);
			
			topView.name.text = args.name;
			topView.city.text = args.city;
			topView.state.text = args.state;
			topView.revenue.text = args.revenue;
			
			win.open(a);
			
		}//end is iOS

  	};//end showDetailWindow
  	
  	
  	API.factoryWindow = function(opts){
 		API.win = Ti.UI.createWindow(UTILS.combine(STYLE.Win, {
			title : API.name
		}));
		API.win.add(API.factoryView(opts));
		return API.win;
  	};//end factoryWindow
	
  	return API;
})(); //end uiStoreReport
Ti.UI.currentWindow.add( uiStoreReport.factoryView({}) ); 
//uiStoreReport.factoryWindow({}).open({modal:true});
//uiStoreReport.factoryWindow({}).open({fullscreen:true});
//module.exports = uiStoreReport

