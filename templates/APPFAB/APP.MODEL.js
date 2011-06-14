APP.MODEL = (function() {

	var tableViewData = [{
		title:'row 1',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 2',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 3',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 4',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 5',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 6',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 7',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 8',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 9',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 1',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 2',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 3',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 4',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 5',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 6',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 7',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 8',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 9',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 1',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 2',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 3',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 4',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 5',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 6',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 7',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 8',
		hasChild:true,
		urlRef:'assets/html/template.html'
	},{
		title:'row 9',
		hasChild:true,
		urlRef:'assets/html/template.html'
	}
	];//end mDataHistory

	var mHistoryMapAnnotationData = [{
		title:"Brant Point Lighthouse",
		subtitle:'Brant Point Lighthouse',
		latitude:41.28992,
		longitude:-70.090285
	},{
		title:"Jethro Coffin House",
		subtitle:'Jethro Coffin House',
		latitude:41.2875,
		longitude:-70.106944
	},{
		title:"Great Point Lighthouse",
		subtitle:'Great Point Lighthouse',
		latitude:41.390167,
		longitude:-70.048278
	},{
		title:"Sankaty Head Light",
		subtitle:'Sankaty Head Light',
		latitude:41.283611,
		longitude:-69.965194
	},{
		title:"Old North Cemetery",
		subtitle:'Old North Cemetery',
		latitude:41.283611,
		longitude:-69.965194
	}
	];//end mHistoryMapAnnotationData

	var mCommercialMapAnnotationData = [{
		title:"Sankaty Head Light",
		subtitle:'Sankaty Head Light',
		latitude:41.283611,
		longitude:-69.965194
	},{
		title:"Old North Cemetery",
		subtitle:'Old North Cemetery',
		latitude:41.283611,
		longitude:-69.965194
	}
	];//end mHistoryMapAnnotationData

	var mDataTwitterSearchTerms = [ 'nantucket', 'capecod' ];

	var MODEL = {
		tableViewData : tableViewData,
		//CommercialMapAnnotationData : mCommercialMapAnnotationData,
		//HistoryMapAnnotationData : mHistoryMapAnnotationData,
		dataTwitterSearchTerms : mDataTwitterSearchTerms
	};

	return MODEL;

})();//end APP.MODEL