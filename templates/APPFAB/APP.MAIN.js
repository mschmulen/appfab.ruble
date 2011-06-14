var APP = {};

APP = (function() {
	var MAIN = {

		// App specific variables
		assetsPath: 'APP/',
		location: [ 41.248611, -70.11527 ],  	// Lat Long of the location
		radius: 333.33,				 		//Radius from Lat Long in km that contains the location
		
		//Platform info
		platform: 'unknown',
		osname: 'unknown',
		isAndroid: false,
		isSimulator: false,
		platformWidth: 320,
		platformHeight: 480,
		currentLanguage: 'en',
		
		rootWindow: null,
		mainTabGroup:null,
		
		tab1:null,
		tab2:null,
		tab3:null,
		tab4:null,
		
		tab1Name:'tab1',
		tab2Name:'tab2',
		tab3Name:'tab3',
		tab4Name:'tab4',
		
		tab1Icon:'assets/images/KS_nav_ui.png',
		tab2Icon:'assets/images/KS_nav_ui.png',
		tab3Icon:'assets/images/KS_nav_ui.png',
		tab4Icon:'assets/images/KS_nav_ui.png'
		
	};
	
	MAIN.AssetPath = function( path )
	{
		return MAIN.assetsPath+ path;
	};
	
	MAIN.tabs =  [
		{
			tabRef: null,
			tabData :{ title:'Find Cookies', icon:MAIN.AssetPath('assets/images/custom/mf_510_9456.png')}
		},{
			tabRef: null,
			tabData :{ title:'Favorites', icon:MAIN.AssetPath('assets/images/custom/mf_510_9457.png')}
		},{
			tabRef: null,
			tabData :{ title:'Fun', icon:MAIN.AssetPath('assets/images/custom/mf_510_9458.png')}
		},{
			tabRef: null,
			tabData :{ title:'About', icon:MAIN.AssetPath('assets/images/custom/mf_510_9459.png')}
		},{
			tabRef: null,
			tabData :{ title:'Alerts', icon:MAIN.AssetPath('assets/images/custom/mf_510_10547.png')}
		}
	];//end mHistoryMapAnnotationData
	
	MAIN.init = function() {
		Ti.API.info('init here! ');

		//platform specs
		MAIN.platform = Ti.Platform.name;
		MAIN.osname = Ti.Platform.osname;
		MAIN.isAndroid = (Ti.Platform.osname=='android');
		MAIN.isSimulator = (Ti.Platform.model == 'Simulator' || Ti.Platform.model == 'sdk');
		MAIN.platformWidth = Ti.Platform.displayCaps.platformWidth;
		MAIN.platformHeight = Ti.Platform.displayCaps.platformHeight;

		MAIN.currentLanguage = Ti.Locale.currentLanguage;

		//facebook info
		//Titanium.Facebook.appid = "123456789";
		//Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];

	};//end init
	MAIN.showTabled = function(opts) {
		if ( Ti.Platform.osname=='android' ) {
			// dashboard layout
		} else //ipad
		{
			//splitview
		}
	}//end
	MAIN.showMobile = function(opts) {
		// main window
		Titanium.UI.setBackgroundColor('#000');

		// create tab group
		APP.mainTabGroup = Titanium.UI.createTabGroup();

		APP.tab1 = Titanium.UI.createTab({
			icon: APP.tab1Icon,
			title: APP.tab1Name
		});
		var win1 = APP.UI.createWindow1({
			parentTab:APP.tab1
		});
		APP.tab1.window = win1;
	
		APP.tab2 = Titanium.UI.createTab({
			icon: APP.tab2Icon,
			title: APP.tab2Name
		});
		var win2 = APP.UI.createWindow2({
			parentTab:APP.tab2
		});
		APP.tab2.window = win2;

		APP.tab3 = Titanium.UI.createTab({
			icon: APP.tab3Icon,
			title: APP.tab3Name
		});
		var win3 = APP.UI.createWindow3({
			parentTab:APP.tab3
		});
		APP.tab3.window = win3;

		APP.tab4 = Titanium.UI.createTab({
			icon: APP.tab4Icon,
			title: APP.tab4Name
		});
		var win4 = APP.UI.createWindow4({
			parentTab:APP.tab4
		});
		APP.tab4.window = win4;
		
		//add tabs
		APP.mainTabGroup.addTab( APP.tab1 );
		APP.mainTabGroup.addTab( APP.tab2 );
		APP.mainTabGroup.addTab( APP.tab3 );
		APP.mainTabGroup.addTab( APP.tab4 );

		// open tab group
		APP.mainTabGroup.open();

	}; //end showMobile
	return MAIN;
})();