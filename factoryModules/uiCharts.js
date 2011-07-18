
//<module version="1.0">ti.charts</module>

var uiCharts = (function() {
  	
  	var API = { }; 
    
  	API.factoryView = function( options )
	{
		var topView = Ti.UI.createView({ backgroundColor:'#B1B1B1' });
		
		var charts = require('ti.charts');
		Ti.API.info("module is => " + charts);
		
		var chart1 = charts.createChart({
			top:0,
			left:0,
			width:'100%',
			height:'50%',
			orientationModes: [
				Ti.UI.PORTRAIT,
				Ti.UI.UPSIDE_PORTRAIT,
				Ti.UI.LANDSCAPE_LEFT,
				Ti.UI.LANDSCAPE_RIGHT
			],
		
		    // Configure the title for the chart
			title: {
				text:'Bar & Line Chart',
				color: '#900',
				font: { fontFamily:'Times New Roman', fontSize:24, fontWeight:'bold', fontStyle:'italic' },
				location: charts.LOCATION_TOP,
				offset: { x: 0.0, y: 26.0 }
			},
			
			// Configure the external padding -- the area between the view edge and the plot area frame
			padding: { top:52, left:20, right:20, bottom:20 },
			
			// Configure the plot area -- the area where the chart is drawn
			plotArea: {
				borderRadius: 5.0,
				borderColor: '#48C',
				borderWidth: 2.0,
				// Configure the inner padding -- the area between the plot area frame and the actual 
				padding: {
			    	top:0.0,
					left:5.0,
					right:0.0,
					bottom:15.0
				},
				
				// Configure the background for the plat area
				// backgroundColor: 'blue',
				// -- or --
				backgroundGradient: { startColor: '#00F', endColor: '#004', angle: -45.0 }
			},
			
			// Configure a theme that contains default settings for most areas
			//theme: charts.THEME_SLATE,	
		
			// Configure the xAxis for the bar and line plots
			xAxis:
				{
					// origin defines where it intercepts the orthogonal axis (the y-axis)
					origin: 0,
					lineColor: 'yellow',
					lineWidth: 1.0,
					//tickDirection indicates which side of the axis the ticks are drawn -- default is negative
					//tickDirection: charts.SIGN_NEGATIVE,
					title: {
						text: 'X Axis',
						offset: 10.0,
						color: '#0f0',
						font: { fontFamily:'Helvetica', fontSize:14 }
					},
					majorTickInterval: 10,
					minorTickCount: 9,
					majorTicks: {
						color: 'red',
						width: 1.0,
						length: 5.0
					},
					minorTicks: {
						color: 'purple',
						width: 1.0,
						length: 3.0
					},
				 	majorGridLines: {
						width: 1.0,
						color: 'blue',
						opacity: 0.5
					},
					minorGridLines: {
						width: 1.0,
						color: 'white',
						opacity: 0.1
					},
					labels: {
						offset: 0.0,
						angle: 0.0,
						color: 'white',
						font: { fontFamily:'Helvetica', fontSize:8 }
					}
				},
			// Configure the yAxis for the bar and line plots
			yAxis:
				{
					// origin defines where it intercepts the orthogonal axis (the x-axis)
					origin: 0,
					lineColor: 'yellow',
					lineWidth: 1.0,
					title: {
						text: 'Y Axis',
						offset: 20.0,
						color: '#0f0',
						font: { fontFamily:'Helvetica', fontSize:14 }
					},	
					majorTickInterval: 5,		
					majorTicks: {
						color: 'white',
						width: 1.0,
						length: 5.0
					},
				 	majorGridLines: {
						width: 1.0,
						color: 'white',
						opacity: 0.2
					},
					// Note that minor tick  and gridlines are not defined for the yAxis and therefore
					// no minor ticks or minor gridlines will be drawn on the chart
					labels: {
						offset: 0.0,
						angle: 45.0,
						color: 'white',
						font: { fontFamily:'Helvetica', fontSize:8 }
					}
				},
				
			// Configure the plot space mapping. We want the coordinate space to be re-calculated on
			// all data updates so that all of the data points fit within the chart area. 
			// Expanding the calculated range by 40% allows for a small amount of space along the
			// axis so that the plots don't go right up against the edges.
			plotSpace: {
				scaleToFit: true,
				expandRangeByFactor: 1.4
			},
			// Enable user interaction -- defaults to true
			userInteraction:true
		});
		
		// Create a second chart view to contain the pie chart
		var chart2 = charts.createChart({
			top:'50%',
			left:0,
			width:'100%',
			height:'50%',
			orientationModes: [
				Ti.UI.PORTRAIT,
				Ti.UI.UPSIDE_PORTRAIT,
				Ti.UI.LANDSCAPE_LEFT,
				Ti.UI.LANDSCAPE_RIGHT
			],
		
		    // Configure the title for the chart
			title: {
				text:'Pie Chart',
				color: '#900',
				font: { fontFamily:'Times New Roman', fontSize:24, fontWeight:'bold', fontStyle:'italic' },
				location: charts.LOCATION_TOP,
				offset: { x: 0.0, y: 26.0 }
			},
			
			// Configure the external padding -- the area between the view edge and the plot area frame
			padding: {
				top:52,
				left:20,
				right:20,
				bottom:20
			},
			
			// Configure the plot area -- the area where the chart is drawn
			plotArea: {
				borderRadius: 5.0,
				borderColor: '#48C',
				borderWidth: 2.0,
				backgroundGradient: {
					startColor: '#00F',
					endColor: '#004',
					angle: -45.0
				}
			},
			
			// Use the dark-gradient theme
			theme: charts.THEME_DARK_GRADIENT,
			// Disable user interaction -- defaults to true
			userInteraction: false
		});
		
		// Create the bar plot
		var bar1 = chart1.createBarPlot({
			name: 'bar plot',
			lineColor: 'yellow',
			lineWidth: 1.0,
			fillGradient: {
				startColor: '#F00',
				endColor: '#FF0',
				angle: -45.0
			},
			fillOpacity: 1.0,
			barDirection: charts.DIRECTION_VERTICAL,
			barWidth: 0.75,
			barOffset: 0.5,
			barCornerRadius: 2.0,
			labels: {
				offset: 1.0,
				angle: 0.0,
				color: 'green',
				font: { fontFamily:'Helvetica', fontSize:12 }
			},
			data: [ 1, 4, 2, 3, 7, 6, 7 ]
		});
		bar1.addEventListener('dataClicked',function(e) {
			Ti.API.info('bar ' + e.name + ' clicked: index= ' + e.index + ' value= ' + e.value);
		});
		
		// Create the line plot
		var line1 = chart1.createLinePlot({
			name: 'line plot',
			lineColor: 'green',
			lineWidth: 2.0,
			fillGradient: {
				startColor: '#F00',
				endColor: '#0F0',
				angle: 90.0
			},
			fillOpacity: 0.5,
			// base for area fill: optional, but required if fill specified
			fillBase: 0.0,	
			// Note that labels are not defined for the line plot, so no labels are
			// displayed above the points along the line
			symbol: {
				type: charts.SYMBOL_DIAMOND,
				width: 10.0,
				height: 10.0,
				lineColor: 'red',
				lineWidth: 1.0,
				fillColor: 'green'
			},
			data: [ 1.5, 2.5, 5.5, 3.7, 0.4, 6.2, 5.1 ]
		});
		line1.addEventListener('dataClicked',function(e) {
			Ti.API.info('line ' + e.name + ' clicked: index= ' + e.index + ' value= ' + e.value);
			
			// Append 2 points to the existing line
			var rand1 = Math.floor(Math.random()*10);
			var rand2 = Math.floor(Math.random()*10);
			line1.appendData([ rand1, rand2 ]);
			
			// Append 2 bars to the existing bar
			var rand3 = Math.floor(Math.random()*10);
			var rand4 = Math.floor(Math.random()*10);
			bar1.appendData([ rand3, rand4 ]);
			
			// Change the line color if the first number added is less than 5
			if (rand1 < 5) {
				line1.lineColor = 'red';
			} else {
				line1.lineColor = 'green';
			}
		});
		
		// Create the pie plot
		var pie1 = chart2.createPiePlot(
			{
			name: 'pie chart',
			lineColor: 'yellow',
			lineWidth: 1.0,
			lineOpacity: 0.4,
			startAngle: 0.0,
			direction: charts.DIRECTION_COUNTERCLOCKWISE,
			radius:60.0,
			explodeOffset: 10.0,
			labels:{
				offset: 1.0,
				angle: 0.0,
				color: 'white',
				font: { fontFamily:'Helvetica', fontSize:12 }		
			},
			data: [ 20.0, 30.0, 60.0, 12.0, 9.4, 37.0, 19.0, 2.0 ]
		});
		pie1.addEventListener('dataClicked',function(e) {
			Ti.API.info('pie ' + e.name + ' clicked: index= ' + e.index + ' value= ' + e.value);
			
			// Explode every pie slice that is not the first slice
			if (e.index > 0) {
				pie1.explode = [ e.index ];
			} else {
				// Clear all of the exploded slices
				pie1.explode = null;
				
				// Change the data for the pie plot. In this case, set the data to an array
				// of mixed values (dictionary and flot values). Since a dictionary is included
				// as a data item we have to set the 'dataKey' property of the pie chart
				pie1.dataKey = 'value';
				pie1.data = [ 
					{ name: 'a', value:5.0 },
					{ name: 'b', value:17.0 },
					{ name: 'c', value:8.5 },
					9.2
					];
					
				// Also, grow the pie size by 10 until it has a radius bigger than or equal to 80
				if (pie1.radius < 80.0) {
					pie1.radius = pie1.radius + 10;
				}
			}
		});
		
		topView.add( chart1 );
		topView.add( chart2 );
		
		return topView;
	}//end factoryView
	
	API.factoryWindow = function( options )
	{
		var win = Ti.UI.createWindow({title:'charts'});
		win.add( API.factoryView( options ) );
		return win;
	}//end factoryWindow
	
  return API;
})(); //end uiCharts
//Ti.UI.currentWindow.add( uiCharts.factoryView({}) );
//uiCharts.factoryWindow({}).open({modal:true});
//uiCharts.factoryWindow({}).open({fullscreen:true});


