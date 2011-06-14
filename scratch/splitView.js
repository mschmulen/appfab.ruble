




// ======== sidebar ========
var listWin = Ti.UI.createWindow();
var tableData = [];
for (var i = 0;i<200;i++){
	tableData[i] = {title:'Row #'+(i+1),rowId:i};
}
var table = Ti.UI.createTableView({
	data:tableData,
	search:Ti.UI.createSearchBar()
});

listWin.add(table);


// ======== main window ========

var mainWin = Ti.UI.createWindow();
var label = Ti.UI.createLabel({
	text:'This is a label',
	backgroundColor:'white',
	width:200,
	height:50
});
mainWin.add(label);


// split view stuff
var masterNav = Ti.UI.iPhone.createNavigationGroup({});
var detailNav = Ti.UI.iPhone.createNavigationGroup({});

masterNav.window=listWin;
detailNav.window=mainWin;

var splitView = Titanium.UI.iPad.createSplitWindow({
	masterView:masterNav,
	detailView:detailNav
});

splitView.addEventListener('visible', function(e) {
    if (e.view == 'detail') {
        e.button.title = "List";

        detailNav.window.leftNavButton = e.button;          
    }else if (e.view  == 'master') {
		detailNav.window.leftNavButton = null;
    }
});

splitView.open();