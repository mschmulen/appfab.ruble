
var uiFactorySplitView = (function() {
  	
  	var API = { };
  	
  	API.factorySplitWinMaster = function ( options ) {
  		
  		var w = Titanium.UI.createWindow({
			title:'Master',
			backgroundColor: '#fff'
		});
		
		var tableData = [
			Ti.UI.createTableViewRow({title:'Monday'}),
		 	Ti.UI.createTableViewRow({title:'Tuesday'}),
			Ti.UI.createTableViewRow({title:'Wednesday'}),
			Ti.UI.createTableViewRow({title:'Thursday'}),
			Ti.UI.createTableViewRow({title:'Friday'}),
			Ti.UI.createTableViewRow({title:'Saturday'}),
			Ti.UI.createTableViewRow({title:'Sunday'})
		];//end tableData
		
		var tableview = Titanium.UI.createTableView({data:tableData});	
		w.add(tableview);
		
		tableview.addEventListener('click',tableClick);
			function tableClick(evt) {
				var evtData = {
					"row" : evt.index,
					"title": evt.row.title 
				}
				Ti.App.fireEvent('app:rowClicked', evtData);
			}
			
		return w;
  	}; //end factorySplitWinMaster
  	
  	API.factorySplitWinDetail = function ( options ) {
  		
  		var w = Titanium.UI.createWindow({
  			title:'Detail',
			backgroundColor: '#fff'
		});
		
		var webView = Ti.UI.createWebView({
		            autoDetect: [Ti.UI.AUTODETECT_NONE]
	   	});
		w.add(webView);
		
		function rowClicked(evtData) {
			Ti.API.debug(evtData);
			
	        if (webView == null ){
				webView = Ti.UI.createWebView({
		            autoDetect: [Ti.UI.AUTODETECT_NONE]
	        	});	
				win.add(webView);	
			}
			
			webView.url = "http://en.wikipedia.org/wiki/" + evtData.title;
		}
		
		Ti.App.addEventListener('app:rowClicked',rowClicked);						
		
		return w;
  	}; //end factorySplitWinDetail
  	
  	API.factoryWindow = function ( options ) {
		
		var masterWindow = uiFactorySplitView.factorySplitWinMaster({});
		var detailWindow = uiFactorySplitView.factorySplitWinDetail({});
		
		//Forces the application to only open in Landscape
		// MASTER NAV GROUP
		var masterNav = Ti.UI.iPhone.createNavigationGroup({
			window: masterWindow
		});
		
		// DETAIL NAV GROUP
		var detailNav = Ti.UI.iPhone.createNavigationGroup({
			window: detailWindow
		});
		
		// SPLIT VIEW
		var splitView = Titanium.UI.iPad.createSplitWindow({
			masterView:	masterNav,
			detailView:	detailNav
		});
		
		Ti.App.addEventListener.addEventListener('app:rowClicked', function(e) {
			Ti.API.log('setMasterPopupVisible');
			splitView.setMasterPopupVisible(false);
			splitView.setMasterPopupVisible(true);
		});
		
		splitView.addEventListener('visible', function(e) {
			if (e.view == 'detail') {
				e.button.title = "Master View List";
				detailWindow.leftNavButton = e.button;
				Ti.API.log('Set button');
			}
			else if (e.view == 'master') {
				detailWindow.leftNavButton = null;
				Ti.API.log('Removed button');
			}
		});
		
		return splitView;

	}; //end factoryWindow
	
  	return API;
})(); //end uiFactorySplitView

var splitView = uiFactorySplitView.factoryWindow({}).open();
//Ti.UI.currentWindow.add( uiFactorySplitView.factoryView({}) );
//uiFactorySplitView.factoryWindow({}).open({modal:true});
//uiFactorySplitView.factoryWindow({}).open({fullscreen:true});
//exports = uiFactorySplitView
