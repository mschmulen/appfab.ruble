//TabMap.js


var mapView = $.map;
var currentLat, currentLong;
var dataDir = "gpx";
//var gpxFile = require("gpxfile");

function init() {
	/*
	Ti.API.info("In init model, about to load data.");
	var file, files, gpxDataFile, loadedFileList, loadedFiles = false, gpxDataDir, annotation, cacheAnnotations = [], i, len, attr, aMenu;
	// Load data from files, if required.
	loadedFileList = Ti.App.Properties.getList('loadedGPXFiles', []);
	gpxDataDir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, dataDir);
	files = gpxDataDir.getDirectoryListing();
	if (files) {
		for ( i = 0, len = files.length; i < len; i++) {
			file = files[i];
			Ti.API.info("File: " + file);
			if (! _.include(loadedFileList, file)) {
				gpxDataFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, dataDir, file);
				if (gpxFile.parse(gpxDataFile, addCacheToCollection)) {
					loadedFileList.push(file);
					loadedFiles = true;
				}//end if
			}//end if
		}//end for
		if (loadedFiles) {
			Ti.App.Properties.setList('loadedGPXFiles', loadedFileList);
		}//end if
	}//end if
	*/
}//end init
