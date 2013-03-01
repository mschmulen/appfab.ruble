
var uiTable = (function() {
  	
  	var G ={};
  	G.u = Ti.Android != undefined ? 'dp' : 0;
  	
	var API = {}; 
  	
	API.AWS = require('ti.aws');
	API.AWS.authorize('1F2S3M1JWEWWPZCATQR2', 'eh2/QVuC0nc0oyAUYOfr3fqxk3i8hCzPJYNmD4AS');
	API.tableName = 'mytableConferenceA';
	
  	API.factoryView = function(opts){ 
    	var topView = Ti.UI.createView({});
	
		var createTableButton = Titanium.UI.createButton({
			title : "Create Table",
			width : 300 + G.u,
			height : 50 + G.u,
			bottom : 190 + G.u
		});
		createTableButton.addEventListener('click', function(e) {
		
		API.AWS.DDB.createTable({
			"requestJSON" : {
				'TableName' : API.tableName,
				'KeySchema' : {
					'HashKeyElement' : {
						'AttributeName' : 'userNo',
						'AttributeType' : 'N'
					}
				},
				'ProvisionedThroughput' : {
					'ReadCapacityUnits' : 5,
					'WriteCapacityUnits' : 10
				}
			}
		}, function(data, response) {
			Ti.API.info(JSON.stringify(data));
			alert('Started creating the test table...');
		}, function(message, error) {
			//alert('error' + message);
		});		
	});
	topView.add(createTableButton);
	
	var insertUsersButton = Titanium.UI.createButton({
		title : "Insert Users",
		width : 300 + G.u,
		height : 50 + G.u,
		bottom : 130 + G.u
	});
	insertUsersButton.addEventListener('click', function(e) {
		
		var names = ["Norm", "Jim", "Jason", "Zach", "Matt", "Glenn", "Will", "Wade", "Trevor", "Jeremy", "Ryan", "Matty", "Steve", "Pavel"];
		
		for (var i = 0; i < 10; i++) {
				API.AWS.DDB.putItem({
					"requestJSON" : {
						'TableName' : API.tableName,
						'Item' : {
							'userNo' : {
								'N' : i + ''
							},
							'firstName' : {
								'S' : names[Math.floor(Math.random() * names.length)]
							},
							'lastName' : {
								'S' : names[Math.floor(Math.random() * names.length)]
							}
						}
					}
				}, function(data, response) {
					Ti.API.info(JSON.stringify(data));
				}, function(message, error) {
					Ti.API.info('error' + message);
				});
			}//end create Users
			
			alert('Users have been inserted.');
	});
	topView.add(insertUsersButton);

	var listUsersButton = Titanium.UI.createButton({
		title : "List Users",
		width : 300 + G.u,
		height : 50 + G.u,
		bottom : 70 + G.u
	});
	listUsersButton.addEventListener('click', function(e) {
		
		//Create a window
		var newWin = Ti.UI.createWindow({
			backgroundColor : '#ffffff'
		});
		
		var tableData = [
			{title:'CLOSE', hasChild:true },
			{title:'Will Trevor', hasChild:false },
			{title:'Jeremy Norm', hasChild:false },
			{title:'Jason Matty', hasChild:false },
			{title:'Glenn Matt', hasChild:false }
		];
		
		var tableview = Ti.UI.createTableView({
			top : 0 + G.u
		});
		
		API.AWS.DDB.scan({
				"requestJSON" : {
					'TableName' : API.tableName
				}
			}, function(data, response) {
				
				Ti.API.info ( "scan " + data.Items );
				
				for (var i = 0; i < data.Items.length; i++) {
					tableData.push({title:userList[i].firstName.S + " " + userList[i].lastName.S, hasChild:false, userNo : userList[i].userNo.N });
				}
				//tableview.setData( tableData );
			}, function(message, error) {
				//alert('error_' + message);
			});
		
		tableview.setData( tableData );
		tableview.addEventListener('click', function handleOpenWindow(evt) {
			newWin.close();
		});//end click
		newWin.add(tableview);
		
		newWin.open();
	});
	topView.add(listUsersButton);
	
	var deleteTableButton = Titanium.UI.createButton({
		title : "Delete Table",
		width : 300 + G.u,
		height : 50 + G.u,
		bottom : 10 + G.u
	});
	deleteTableButton.addEventListener('click', function(e) {
		
		API.AWS.DDB.deleteTable({
				"requestJSON" : {
					'TableName' : API.tableName
				}
			}, function(data, response) {
				Ti.API.info(JSON.stringify(data));
				alert('The test table has been deleted.');
			}, function(messgae, error) {
				//alert('error' + message);
			});
	});
	
	topView.add(deleteTableButton);
	
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
//exports = uiSplash
  



