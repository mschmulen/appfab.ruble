/*
<modules>
	<module platform="iphone" version="1.0">ti.styledlabel</module>
</modules>
 */
var uiStyledLabel = (function() {
  	
  	var API = { };
    
  	API.factoryView = function( options )
	{
		var topView = Ti.UI.createView({ backgroundColor:'#B1B1B1' });
		
		Titanium.StyledLabel = Ti.StyledLabel = require('ti.styledlabel');
		
		var onlyAllowLinks = Ti.UI.createButton({
		    title: 'Only Allow Links',
		    top: 0, height: 40, left: 0, width: '50%'
		});
		onlyAllowLinks.addEventListener('click', function() {
		    label.filteredTags = ['a'];
		    label.filteredTagsMode = Ti.StyledLabel.INCLUDE_SPECIFIED_TAGS_ONLY;
		});
		topView.add(onlyAllowLinks);
		
		var everythingButLinks = Ti.UI.createButton({
		    title: 'Allow Everything But Links',
		    top: 0, height: 40, right: 0, width: '50%'
		});
		everythingButLinks.addEventListener('click', function() {
		    label.filteredTags = ['a'];
		    label.filteredTagsMode = Ti.StyledLabel.EXCLUDE_SPECIFIED_TAGS;
		});
		topView.add(everythingButLinks);
		
		var label = Ti.StyledLabel.createLabel({
		    html: Ti.Filesystem.getFile('text.html').read().text,
		    backgroundColor: '#fff',
		    borderColor: '#ccc', borderWeight: 1,
		    top: 40
		});
		label.addEventListener('click', function (evt) {
		    if (evt.url) {
		        alert('You clicked ' + evt.url);
		    }
		});
		topView.add(label);
		
		return topView;
	}//end factoryView
	
	API.factoryWindow = function( options )
	{
		var win = Ti.UI.createWindow({title:'Syled Label'});
		win.add( API.factoryView( options ) );
		return win;
	}//end factoryWindow
	
  return API;
})(); //end uiStyledLabel
Ti.UI.currentWindow.add( uiStyledLabel.factoryView({}) );
//uiStyledLabel.factoryWindow({}).open({});
//uiStyledLabel.factoryWindow({}).open({fullscreen:true});

