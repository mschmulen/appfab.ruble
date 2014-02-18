function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	// create table view data object
	var data = [
		/* 
		{title:'Users', hasChild:true, test:'ui/common/users'},
		{title:'AccessTokens', hasChild:true, test:'ui/common/accesstokens'},
		{title:'Applications', hasChild:true, test:'ui/common/applictions'},
		{title:'Push', hasChild:true, test:'ui/common/push'},
		{title:'Installations', hasChild:true, test:'ui/common/installations'},
		{title:'Notifications', hasChild:true, test:'ui/common/notifications'},
		*/
		{title:'products', hasChild:true, test:'ui/common/datamodel'},
		{title:'locations', hasChild:true, test:'ui/common/datamodel'},
		{title:'customers', hasChild:true, test:'ui/common/datamodel'}
	];
	
	// create table view
	for (var i = 0; i < data.length; i++ ) { data[i].color = '#000'; data[i].font = {fontWeight:'bold'} };
	var tableview = Titanium.UI.createTableView({ data:data });
	
	// create table view event listener
	tableview.addEventListener('click', function(e) {
		if (e.rowData.test) {
			var ExampleWindow = require(e.rowData.test),
				win = new ExampleWindow({
					title:e.rowData.title,
					containingTab:self.containingTab,
					tabGroup:self.tabGroup
				});
			self.containingTab.open(win,{animated:true});
		}
	});
	
	// add table view to the window
	self.add(tableview);
	
	return self;
};

module.exports = ApplicationWindow;

