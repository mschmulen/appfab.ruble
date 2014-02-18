
function ApplicationWindow(title) {
	
	var self = Ti.UI.createWindow({ title:title.title, backgroundColor:'white' });
	
	var defaultColorBlue = '#035385';
	var defaultColorRed = '#9a0707';
	var rowColor = '#EBEBEB';
	var selectedRowColor = '#4B4B4B';
	var backgroundColor = '#4B4B4B';
	var defaultColor = defaultColorRed;
	
	//DetailView = require('ui/handheld/ApplicationWindowDetail');
	
	var topView = Ti.UI.createView({});
	
	var footerLabel = Ti.UI.createLabel({
		backgroundColor : backgroundColor,
		color : "white",
		font : { fontSize : 10 },
		text : "[data supplied by node.js]",
		textAlign : "center",
		height : 25,
		width : 320
	});
	
	var tv = Ti.UI.createTableView({ footerView : footerLabel  });
	
	tv.addEventListener('click', function(e) {
		/*
		dView = new DetailView({ appData : e.rowData });
		var w = Ti.UI.createWindow({ appData : e.rowData, title : e.rowData.appName });
		self.containingTab.open(dView);
		*/
	});
	self.add(tv);
	
	self.refreshData = function() {
		Ti.API.info(" self.refreshData ");
		var LoopBack = require('LoopBack');
		LoopBack.getData(title.title, function(data) {
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
			
			var row = Ti.UI.createTableViewRow(modelInstance);
			
			row.title = modelInstance.id + " " + modelInstance.name;
			
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

