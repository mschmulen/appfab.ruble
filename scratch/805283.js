//https://gist.github.com/805283

//
// in this demo, we simply show how you could dynamically scroll
// with a continuous amount of data in the tableview by detecting
// when the user's scroll position gets near the end of the table
// and start a background fetch of new data and seamlessly append
// the new data to the table automatically
//

var win = Ti.UI.createWindow();

var data = [];
var numberOfRows = 575+1;
var showRows = 50;
var rowNumer = 1;
for (var c=0;c<showRows;c++){
	data[c] = {title:"Row "+(rowNumer)};
	rowNumer ++;
}

var tableView = Ti.UI.createTableView({
	data: data
});

win.add(tableView);

var navActInd = Titanium.UI.createActivityIndicator();

var updating = false;
var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."});

function beginUpdate(){
	updating = true;
	navActInd.show();

	tableView.appendRow(loadingRow);

	// just mock out the reload
	setTimeout(endUpdate,2000);
}

function endUpdate(){
	updating = false;

	tableView.deleteRow(showRows,{});

	// simulate loading
	for (var c=0;c<showRows;c++)
	{
		if(rowNumer == numberOfRows){return;}
		tableView.appendRow({title:"Row "+(rowNumer)},{});
		rowNumer++;
	}
	showRows = showRows * 2;
//	numberOfRows = (numberOfRows - showRows);

	// just scroll down a bit to the new rows to bring them into view

}

var lastDistance = 0; // calculate location to determine direction

tableView.addEventListener('scroll',function(e){
	if (rowNumer != numberOfRows){
		if(Ti.Platform.osname == 'iphone'){
			var offset = e.contentOffset.y;
			var height = e.size.height;
			var total = offset + height;
			var theEnd = e.contentSize.height;
			var distance = theEnd - total;

			// going down is the only time we dynamically load,
			// going up we can safely ignore -- note here that
			// the values will be negative so we do the opposite
			if (distance < lastDistance){
				// adjust the % of rows scrolled before we decide to start fetching
				var nearEnd = theEnd * .75;

				if (!updating && (total >= nearEnd))
				{
					beginUpdate();
				}
			}
			lastDistance = distance;
		}
		if(Ti.Platform.osname == 'android'){
			if((e.firstVisibleItem+e.visibleItemCount) == e.totalItemCount){
				for (var c=0;c<showRows;c++){
					if(rowNumer == numberOfRows){return;}
					tableView.appendRow({title:"Row "+(rowNumer)},{});
					rowNumer++;
				}
			}
		}
	}

});
win.open();
