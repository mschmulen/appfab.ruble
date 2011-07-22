
//var UI = require('myfile'); // no .js extension
//var win = UI.Window({backgroundColor:'#999'});
//var view = UI.View({top:20,left:20,right:20,bottom:20,backgroundColor:'#ccc'});
//win.add(view);
//win.open();

exports.Window = function(e){
	return Ti.UI.createWindow(e);
};
exports.View = function(e){
	return Ti.UI.createView(e);
};