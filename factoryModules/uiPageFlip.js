/*
<modules>
	<module platform="iphone" version="1.1">ti.pageflip</module>
</modules>
 */
var uiPageFlip = (function() {
  
  var API = { }; 
 	
  API.factoryViewPDF = function(opts){ 
    topView = Ti.UI.createView({});
    
	Titanium.PageFlip = Ti.PageFlip = require('ti.pageflip');
	
	var pdf = 'http://assets.appcelerator.com.s3.amazonaws.com/docs/Appcelerator-IDC-Q1-2011-Mobile-Developer-Report.pdf';
	var fileName = pdf.split('/').pop();
	var pdfFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);
	
	function downloadPDF() {
	    var progressBar = Ti.UI.createProgressBar({ max: 1, min: 0, value: 0, visible: true });
	    topView.add(progressBar);
	    var xhr = Ti.Network.createHTTPClient({
	        ondatastream: function(e) {
	            progressBar.value = e.progress;
	        },
	        onreadystatechange: function() {
	            if (xhr.readyState == 4) {
	                pdfFile.write(this.responseData);
	                topView.remove(progressBar);
	                showPDF();
	            }
	        }
	    });
	    xhr.open('GET', pdf);
	    xhr.send();
	}
	
	function showPDF() {
	    /**
	     * "createView" will return a pageflip view. It can be sized and positioned like any other Titanium view. Here we
	     * call it with a pdf and a transition; it will handle paging the PDF for us.
	     */
	    var pageflip = Ti.PageFlip.createView({
	        transition: Ti.PageFlip.TRANSITION_FLIP, /* All Options: TRANSITION_FLIP [default], TRANSITION_SLIDE, TRANSITION_FADE */
	        pdf: pdfFile.nativePath,
	        tapToAdvanceWidth: '15%'
	    });
	    topView.add(pageflip);
	
	    function updateWindowTitle(evt) {
	        //win.title = 'PDF, 1 < ' + (evt.currentPage+1) + ' > ' + evt.pageCount;
	    }
	    updateWindowTitle(pageflip);
	
	    pageflip.addEventListener('change', function(evt) {
	        updateWindowTitle(evt);
	    });
	}
	
	if (pdfFile.exists()) {
	    showPDF();
	}
	else {
	    downloadPDF();
	}

	
	
    return topView; 
  }; //factoryViewPDF
  
  
    API.factoryView = function(opts){ 
    topView = Ti.UI.createView({});
    
	Titanium.PageFlip = Ti.PageFlip = require('ti.pageflip');
	
	function createPage(number) {
	    return Ti.UI.createLabel({
	        text: 'p' + number, textAlign: 'center',
	        font: { fontSize: 150, fontWeight: 'bold' },
	        backgroundColor: '#fff'
	    });
	}
	
	var pages = [], count;
	for (count = 1; count <= 4; count++) {
	    pages.push(createPage(count));
	}
	
	var pageflip = Ti.PageFlip.createView({
	    transition: Ti.PageFlip.TRANSITION_FLIP, /* All Options: TRANSITION_FLIP [default], TRANSITION_SLIDE, TRANSITION_FADE */
	    landscapeShowsTwoPages: true,
	    pages: pages
	});
	topView.add(pageflip);
	
	function updateWindowTitle() {
	    //win.title = 'Views, 1 < ' + (pageflip.currentPage+1) + ' > ' + pageflip.pageCount;
	}
	updateWindowTitle();
	
	pageflip.addEventListener('change', function(evt) {
	    // evt.currentPage
	    updateWindowTitle();
	});
	
	var previous = Ti.UI.createButton({ title: '<', style:Ti.UI.iPhone.SystemButtonStyle.BORDERED });
	previous.addEventListener('click', function() {
	    pageflip.changeCurrentPage(pageflip.currentPage-1, false);
	    updateWindowTitle();
	});
	var insert = Ti.UI.createButton({ title: 'Insrt', style:Ti.UI.iPhone.SystemButtonStyle.BORDERED });
	insert.addEventListener('click', function() {
	    pageflip.insertPageBefore(0, createPage(++count));
	    updateWindowTitle();
	});
	var append = Ti.UI.createButton({ title: 'Apnd', style:Ti.UI.iPhone.SystemButtonStyle.BORDERED });
	append.addEventListener('click', function() {
	    pageflip.appendPage(createPage(++count));
	    updateWindowTitle();
	});
	var remove = Ti.UI.createButton({ title: 'Del', style:Ti.UI.iPhone.SystemButtonStyle.BORDERED });
	remove.addEventListener('click', function() {
	    pageflip.deletePage(pageflip.currentPage);
	    updateWindowTitle();
	});
	var gestures = Ti.UI.createButton({ title: 'Gstrs', style:Ti.UI.iPhone.SystemButtonStyle.BORDERED });
	gestures.addEventListener('click', function() {
	    pageflip.enableBuiltInGestures = !pageflip.enableBuiltInGestures;
	});
	var next = Ti.UI.createButton({ title: '>', style:Ti.UI.iPhone.SystemButtonStyle.BORDERED });
	next.addEventListener('click', function() {
	    pageflip.changeCurrentPage(pageflip.currentPage+1, true);
	    updateWindowTitle();
	});
	var flexSpace = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE });
	//win.toolbar = [ previous, flexSpace, gestures, insert, append, remove, flexSpace, next ];
	
    return topView;
  }; //end factoryViewPDF
  
  API.factoryWindow = function(options){
     win = Ti.UI.createWindow({title:'PageFlip'}); 
     win.add( API.factoryView( options ) ); 
     return win; 
  };//end factoryWindow
  
  return API;
})(); //end uiPageFlip
Ti.UI.currentWindow.add( uiPageFlip.factoryView({}) );
//Ti.UI.currentWindow.add( uiPageFlip.factoryViewPDF({}) );
//uiPageFlip.factoryWindow({}).open({modal:true});
//uiPageFlip.factoryWindow({}).open({fullscreen:true});

