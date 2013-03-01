// PRIVATE FUNCTIONS

// update the table here
function populateData() {
	
	Ti.API.info( "populateData");
	
    var animalCollection = Alloy.createCollection("Animal");
	
    // update the table here
    animalCollection.on("fetch", function() {
    	
        // filter the collection
        var atLargeCollection = animalCollection.where({ captured : 0 });
        //Ti.API.info(" users..." + JSON.stringify(fugitiveCollection));
		
        var rows = [];
        $.table.setData([]);
		
		//Ti.API.info( "build table " + atLargeCollection.length);
		
        // loop throu collection and add them to table
        for (var i = 0; i < atLargeCollection.length; i++) {
        	Ti.API.info( "adding row ");
            var model = atLargeCollection[i];
            var rowCtrl = Alloy.createController('AnimalRow', model);
            rows.push(rowCtrl.row);
        }//end for
        // set the table
        $.table.setData(rows);
    });
	
    // get the data
    animalCollection.fetch();
}//end populateData

/*
// EVENT LISTENERS
$.table.addEventListener('click', function(_e) {
	
    Ti.API.info ("_e  :" + _e );
    Ti.API.info ("_e.rowData  :" + _e.rowData );
    //Ti.API.info ("_e.rowData.model  :" + _e.rowData.model );
	
    var detailController = Alloy.createController('AnimalDetail', {
        parentTab : $.fugitiveTab,
        data : _e.rowData.model
    });
    $.fugitiveTab.open(detailController.getView());
});
*/

// force table update
$.on('update_table', populateData);

// force tables to update
Ti.App.addEventListener('update_table', function() {
	Ti.API.info( "update_table");
    populateData();
});

/*
function addNewFugitive() {
    var addFugitiveController = Alloy.createController('AnimalAdd');
    $.fugitiveTab.open(addFugitiveController.getView());
}

// INITIALIZERS
// add the add button, this can be refactored
if (Ti.Platform.osname === 'iphone') {
    $.add.style = Titanium.UI.iPhone.SystemButtonStyle.PLAIN;
    $.add.addEventListener('click', addNewFugitive);
    $.fugitiveWindow.setRightNavButton($.add);
}
*/


//run initial query
populateData();
