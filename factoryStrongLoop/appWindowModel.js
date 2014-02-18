function ApplicationWindowModel(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});

	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);

	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});

	return self;
};

module.exports = ApplicationWindow;

function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	/*
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);

	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});
	*/
	
	var defaultColorBlue = '#035385';
	var defaultColorRed = '#9a0707';
	var rowColor = '#EBEBEB';
	var selectedRowColor = '#4B4B4B';
	var backgroundColor = '#4B4B4B';
	var defaultColor = defaultColorRed;
	
	DetailView = require('ui/handheld/ApplicationWindowDetail');
	
	var topView = Ti.UI.createView({});

	var footerLabel = Ti.UI.createLabel({
		backgroundColor : backgroundColor,
		color : "white",
		font : {
			fontSize : 10
		},
		text : "[data supplied by node.js]",
		textAlign : "center",
		height : 25,
		width : 320
	});

	var tv = Ti.UI.createTableView({
		footerView : footerLabel,
		backgroundColor : backgroundColor
	});
	
	tv.addEventListener('click', function(e) {
		dView = new DetailView({
			appData : e.rowData
		});
		var w = Ti.UI.createWindow({
			appData : e.rowData,
			title : e.rowData.appName
		});
		self.containingTab.open(dView);
	});
	self.add(tv);
	
	self.refreshData = function() {
		Ti.API.info(" self.refreshData ");
		var LoopBack = require('LoopBack');
		LoopBack.getData(title, function(data) {
			//Ti.API.info ( "success data[0] " + data[0].title );
			self.updateTableView(data);
		}, function() {
			Ti.API.info(" error");
		});
	};//end refreshData
	
	self.updateTableView = function(newData) {
		
		Ti.API.info( "update tableView ... ");
		var data = [];
		var rows = [];
		
		for (var i = 0; i < newData.length; i++) {
			var modelInstance = newData[i];
			
			Ti.API.info(" Add id: " + modelInstance.id);
			
			modelInstance.height = '100';
			modelInstance.backgroundColor = rowColor;
			modelInstance.selectedBackgroundColor = selectedRowColor;
			modelInstance.indentionLevel = 10;
			appRefIndex = i;
			
			var row = Ti.UI.createTableViewRow(modelInstance);
			
			var rowView = Ti.UI.createView({
				height : 'auto',
				layout : 'vertical',
				left : 5,
				top : 5,
				bottom : 5,
				right : 5,
				backgroundGradient : {
					type : 'linear',
					colors : [{
						color : '#d4d4d4',
						position : 0.0
					}, {
						color : '#c4c4c4',
						position : 0.50
					}]
				}
			});
			
			row.title ="id: " + modelInstance.id;
			
			/*
			var item_image = Ti.UI.createImageView({
				borderRadius : 17,
				borderWidth : 0,
				borderColor : rowColor,
				image : modelInstance.appIcon,
				left : 20,
				top : 10,
				width : 70,
				height : 70
			});
			row.add(item_image);
			*/

			data.push(row);
		}//end for

		tv.setData(data);
	};//end updateTableView
	
	//add Listeners
	Titanium.App.addEventListener('WindowAppListingRefreshData', function(e) {
		Ti.API.info( " WindowAppListingRefreshData ");
		self.refreshData();
	});
	
	self.addEventListener('open', function() {
		Ti.API.info( " open ");
		self.refreshData();
	});
	
	return self;
};

module.exports = ApplicationWindow;

