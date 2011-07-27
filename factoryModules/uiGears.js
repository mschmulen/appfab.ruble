

//<module platform="iphone" version="1.0">ti.opengl</module>

Ti.Opengl = require('Ti.OpenGL');

//var window = Ti.UI.createWindow();
var window = Ti.UI.currentWindow;

var GearMaker = function(inner_radius, outer_radius, width, teeth, tooth_depth, color_, openGL) {
	function push3(vx, x, y, z) {
		vx.push(x);
		vx.push(y);
		vx.push(z);
	}

	var vertices = new Array();
	var normals = new Array();
	var indices = new Array();
	this.nindices = teeth*66*3
	this.color = color_

	var i, j
	var r0, r1, r2;
	var ta, da;
	var u1, v1, u2, v2, len;
	var cos_ta, cos_ta_1da, cos_ta_2da, cos_ta_3da, cos_ta_4da;
	var sin_ta, sin_ta_1da, sin_ta_2da, sin_ta_3da, sin_ta_4da;
	var ix0, ix1, ix2, ix3, ix4, ix5;
	var vx, nx, ix;
	var ctr = 0;
	var ictr = 0;

	r0 = inner_radius;
	r1 = outer_radius - tooth_depth / 2.0;
	r2 = outer_radius + tooth_depth / 2.0;
	da = (2.0 * Math.PI / teeth) / 4.0;

	vx = vertices;
	nx = normals;
	ix = indices;

	for (i = 0; i < teeth; i++) {
		ta = i * 2.0 * Math.PI / teeth;

		cos_ta = Math.cos(ta);
		cos_ta_1da = Math.cos(ta + da);
		cos_ta_2da = Math.cos(ta + 2 * da);
		cos_ta_3da = Math.cos(ta + 3 * da);
		cos_ta_4da = Math.cos(ta + 4 * da);
		sin_ta = Math.sin(ta);
		sin_ta_1da = Math.sin(ta + da);
		sin_ta_2da = Math.sin(ta + 2 * da);
		sin_ta_3da = Math.sin(ta + 3 * da);
		sin_ta_4da = Math.sin(ta + 4 * da);

		u1 = r2 * cos_ta_1da - r1 * cos_ta;
		v1 = r2 * sin_ta_1da - r1 * sin_ta;
		len = Math.sqrt(u1 * u1 + v1 * v1);
		u1 /= len;
		v1 /= len;
		u2 = r1 * cos_ta_3da - r2 * cos_ta_2da;
		v2 = r1 * sin_ta_3da - r2 * sin_ta_2da;

		/* front face */

		push3(vx, r0 * cos_ta,          r0 * sin_ta,          width * 0.5);
		push3(nx, 0, 0, 1);
		ix0 = ctr++;
		push3(vx, r1 * cos_ta,          r1 * sin_ta,          width * 0.5);
		push3(nx,  0, 0, 1.0);
		ix1 = ctr++;
		push3(vx, r0 * cos_ta,          r0 * sin_ta,          width * 0.5);
		push3(nx,  0, 0, 1.0);
		ix2 = ctr++;
		push3(vx, r1 * cos_ta_3da,      r1 * sin_ta_3da,      width * 0.5);
		push3(nx,  0, 0, 1.0);
		ix3 = ctr++;
		push3(vx, r0 * cos_ta_4da,      r0 * sin_ta_4da,      width * 0.5);
		push3(nx,  0, 0, 1.0);
		ix4 = ctr++;
		push3(vx, r1 * cos_ta_4da,      r1 * sin_ta_4da,      width * 0.5);
		push3(nx,  0, 0, 1.0);
		ix5 = ctr++;

		ix[ictr++] = ix0, ix[ictr++] = ix1;
		ix[ictr++] = ix2;
		ix[ictr++] = ix1, ix[ictr++] = ix3;
		ix[ictr++] = ix2;
		ix[ictr++] = ix2, ix[ictr++] = ix3;
		ix[ictr++] = ix4;
		ix[ictr++] = ix3, ix[ictr++] = ix5;
		ix[ictr++] = ix4;

		/* front sides of teeth */
		push3(vx, r1 * cos_ta,          r1 * sin_ta,          width * 0.5);
		push3(nx,  0, 0, 1.0);
		ix0 = ctr++;
		push3(vx, r2 * cos_ta_1da,      r2 * sin_ta_1da,      width * 0.5);
		push3(nx,  0, 0, 1.0);
		ix1 = ctr++;
		push3(vx, r1 * cos_ta_3da,      r1 * sin_ta_3da,      width * 0.5);
		push3(nx,  0, 0, 1.0);
		ix2 = ctr++
		push3(vx, r2 * cos_ta_2da,      r2 * sin_ta_2da,      width * 0.5);
		push3(nx,  0, 0, 1.0);
		ix3 = ctr++;
		ix[ictr++] = ix0, ix[ictr++] = ix1;
		ix[ictr++] = ix2;
		ix[ictr++] = ix1, ix[ictr++] = ix3;
		ix[ictr++] = ix2;

		/* back face */
		push3(vx, r1 * cos_ta,          r1 * sin_ta,          -width * 0.5);
		push3(nx,  0, 0, -1.0);
		ix0 = ctr++;
		push3(vx, r0 * cos_ta,          r0 * sin_ta,          -width * 0.5);
		push3(nx,  0, 0, -1.0);
		ix1 = ctr++;
		push3(vx, r1 * cos_ta_3da,      r1 * sin_ta_3da,      -width * 0.5);
		push3(nx,  0, 0, -1.0);
		ix2 = ctr++;
		push3(vx, r0 * cos_ta,          r0 * sin_ta,          -width * 0.5);
		push3(nx,  0, 0, -1.0);
		ix3 = ctr++;
		push3(vx, r1 * cos_ta_4da,      r1 * sin_ta_4da,      -width * 0.5);
		push3(nx,  0, 0, -1.0);
		ix4 = ctr++;
		push3(vx, r0 * cos_ta_4da,      r0 * sin_ta_4da,      -width * 0.5);
		push3(nx,  0, 0, -1.0);
		ix5 = ctr++;
		ix[ictr++] = ix0, ix[ictr++] = ix1;
		ix[ictr++] = ix2;
		ix[ictr++] = ix1, ix[ictr++] = ix3;
		ix[ictr++] = ix2;
		ix[ictr++] = ix2, ix[ictr++] = ix3;
		ix[ictr++] = ix4;
		ix[ictr++] = ix3, ix[ictr++] = ix5;
		ix[ictr++] = ix4;

		/* back sides of teeth */
		push3(vx, r1 * cos_ta_3da,      r1 * sin_ta_3da,      -width * 0.5);
		push3(nx,  0, 0, -1.0);
		ix0 = ctr++;
		push3(vx, r2 * cos_ta_2da,      r2 * sin_ta_2da,      -width * 0.5);
		push3(nx,  0, 0, -1.0);
		ix1 = ctr++;
		push3(vx, r1 * cos_ta,          r1 * sin_ta,          -width * 0.5);
		push3(nx,  0, 0, -1.0);
		ix2 = ctr++;
		push3(vx, r2 * cos_ta_1da,      r2 * sin_ta_1da,      -width * 0.5);
		push3(nx,  0, 0, -1.0);
		ix3 = ctr++;
		ix[ictr++] = ix0, ix[ictr++] = ix1;
		ix[ictr++] = ix2;
		ix[ictr++] = ix1, ix[ictr++] = ix3;
		ix[ictr++] = ix2;

		/* draw outward faces of teeth */
		push3(vx, r1 * cos_ta,          r1 * sin_ta,          width * 0.5);
		push3(nx,  v1, -u1, 0);
		ix0 = ctr++;
		push3(vx, r1 * cos_ta,          r1 * sin_ta,          -width * 0.5);
		push3(nx,  v1, -u1, 0);
		ix1 = ctr++;
		push3(vx, r2 * cos_ta_1da,      r2 * sin_ta_1da,      width * 0.5);
		push3(nx,  v1, -u1, 0);
		ix2 = ctr++;
		push3(vx, r2 * cos_ta_1da,      r2 * sin_ta_1da,      -width * 0.5);
		push3(nx,  v1, -u1, 0);
		ix3 = ctr++;
		ix[ictr++] = ix0, ix[ictr++] = ix1;
		ix[ictr++] = ix2;
		ix[ictr++] = ix1, ix[ictr++] = ix3;
		ix[ictr++] = ix2;

		push3(vx, r2 * cos_ta_1da,      r2 * sin_ta_1da,      width * 0.5);
		push3(nx,  cos_ta, sin_ta, 0.0);
		ix0 = ctr++;
		push3(vx, r2 * cos_ta_1da,      r2 * sin_ta_1da,      -width * 0.5);
		push3(nx,  cos_ta, sin_ta, 0.0);
		ix1 = ctr++;
		push3(vx, r2 * cos_ta_2da,      r2 * sin_ta_2da,      width * 0.5);
		push3(nx,  cos_ta, sin_ta, 0.0);
		ix2 = ctr++;
		push3(vx, r2 * cos_ta_2da,      r2 * sin_ta_2da,      -width * 0.5);
		push3(nx,  cos_ta, sin_ta, 0.0);
		ix3 = ctr++;
		ix[ictr++] = ix0, ix[ictr++] = ix1;
		ix[ictr++] = ix2;
		ix[ictr++] = ix1, ix[ictr++] = ix3;
		ix[ictr++] = ix2;

		push3(vx, r2 * cos_ta_2da,      r2 * sin_ta_2da,      width * 0.5);
		push3(nx,  v2, -u2, 0.0);
		ix0 = ctr++;
		push3(vx, r2 * cos_ta_2da,      r2 * sin_ta_2da,      -width * 0.5);
		push3(nx,  v2, -u2, 0.0);
		ix1 = ctr++;
		push3(vx, r1 * cos_ta_3da,      r1 * sin_ta_3da,      width * 0.5);
		push3(nx,  v2, -u2, 0.0);
		ix2 = ctr++;
		push3(vx, r1 * cos_ta_3da,      r1 * sin_ta_3da,      -width * 0.5);
		push3(nx,  v2, -u2, 0.0);
		ix3 = ctr++;
		ix[ictr++] = ix0, ix[ictr++] = ix1;
		ix[ictr++] = ix2;
		ix[ictr++] = ix1, ix[ictr++] = ix3;
		ix[ictr++] = ix2;

		push3(vx, r1 * cos_ta_3da,      r1 * sin_ta_3da,      width * 0.5);
		push3(nx,  cos_ta, sin_ta, 0.0);
		ix0 = ctr++;
		push3(vx, r1 * cos_ta_3da,      r1 * sin_ta_3da,      -width * 0.5);
		push3(nx,  cos_ta, sin_ta, 0.0);
		ix1 = ctr++;
		push3(vx, r1 * cos_ta_4da,      r1 * sin_ta_4da,      width * 0.5);
		push3(nx,  cos_ta, sin_ta, 0.0);
		ix2 = ctr++;
		push3(vx, r1 * cos_ta_4da,      r1 * sin_ta_4da,      -width * 0.5);
		push3(nx,  cos_ta, sin_ta, 0.0);
		ix3 = ctr++;
		ix[ictr++] = ix0, ix[ictr++] = ix1;
		ix[ictr++] = ix2;
		ix[ictr++] = ix1, ix[ictr++] = ix3;
		ix[ictr++] = ix2;

		/* draw inside radius cylinder */
		push3(vx, r0 * cos_ta,          r0 * sin_ta,          -width * 0.5);
		push3(nx,  -cos_ta, -sin_ta, 0.0);
		ix0 = ctr++;
		push3(vx, r0 * cos_ta,          r0 * sin_ta,          width * 0.5);
		push3(nx,  -cos_ta, -sin_ta, 0.0);
		ix1 = ctr++;
		push3(vx, r0 * cos_ta_4da,      r0 * sin_ta_4da,      -width * 0.5);
		push3(nx,  -cos_ta_4da, -sin_ta_4da, 0.0);
		ix2 = ctr++;
		push3(vx, r0 * cos_ta_4da,      r0 * sin_ta_4da,      width * 0.5);
		push3(nx,  -cos_ta_4da, -sin_ta_4da, 0.0);
		ix3 = ctr++;
		ix[ictr++] = ix0, ix[ictr++] = ix1;
		ix[ictr++] = ix2;
		ix[ictr++] = ix1, ix[ictr++] = ix3;
		ix[ictr++] = ix2;
	}
    this.vertexDB = openGL.createDataBuffer({
    	data: vertices,
    	type: openGL.GL_FLOAT
    });
    this.normalDB = openGL.createDataBuffer({
    	data: normals,
    	type: openGL.GL_FLOAT
    });
    this.indexDB = openGL.createDataBuffer({
    	data: indices,
    	type: openGL.GL_UNSIGNED_SHORT
    });
}


var Mover = function(speed_) {
		this.trans = 0.0;
		this.last = 0;
		this.flag = false;
		this.speed = speed_; 
		this.setSpeed = function(speed_) {this.speed = speed_}
		this.reset = function() {this.flag = false;}
		this.iterate = function(timestamp) {
			if (this.flag) {
				this.trans += this.speed*(timestamp-this.last)/1000;
			} else {
				this.flag = true;
			}	
			this.last = timestamp;
			return this.trans;
		}
	}


var GestureListener = function(opengl) {

	var rect = opengl.bounds;
	var width = rect.width;
	var height = rect.height;
	var pinchStart = 0;
	var newPinch = true;
	var scaleStart = 1;
	var xstart = 0;
	var ystart = 0
	var xpos = 0; 
	var ypos = 0; 
	var xcur = 0; 
	var ycur = 0;
	var scale = 1;

	opengl.addEventListener('pinch', function(e) {
		if (newPinch) {
			newPinch = false;
			scaleStart = scale;
			pinchStart = e.scale;
		} else {
			scale = Math.max(scaleStart + e.scale - pinchStart, 0);
		}
	});

	opengl.addEventListener('touchstart', function(e) {
		xstart = e.x;
		ystart = e.y;
		newPinch = true;
	});
	
	opengl.addEventListener('touchmove', function(e) {
		xpos = 2*(e.x - xstart)/width;
		ypos = 2*(e.y - ystart)/height;
	});
	
	opengl.addEventListener('touchend', function(e) {
		xcur = xcur-xpos;
		ycur = ypos+ycur;
		xpos = 0;
		ypos = 0;
	});

	this.xmove = function() {
		return xpos-xcur;
	}
	
	this.ymove = function() {
		return -(ypos+ycur);
	}

	this.scale = function() {
		return scale;
	}
	
}


var TiOpenGLUtil = {
	startAnimation : function(view, callback, interval, delay, target) {
		if (delay == null || target == null) {
			return setInterval(function(e){callback(view, new Date().getTime());}, interval);
		};
		if (delay > 0) {
			setTimeout(
				function() {
					target.timer = setInterval(function(e){callback(view, new Date().getTime());}, interval);
				}, 
				delay
			);
		}
	},
	addComponents : function(parent, children) {
		for (var idx in children) {
			if (!children[idx].noadd) parent.add(children[idx]);
		}
	},
	makeBuffers : function(view, dataBufs) {
		var bufs0 = [dataBufs.vertexDB, 
					dataBufs.colorDB, 
					dataBufs.normalDB,
					dataBufs.textureDB];
		var idb = dataBufs.indexDB;					
		bufs = [];
		starts = [];
		tot = 0;
		for (idx in bufs0) {
			if (bufs0[idx] != null) {
				bufs.push(bufs0[idx]);
				starts.push(tot);
				tot += bufs0[idx].size;
			}
		}
		var vbo = view.glGenBuffers((idb == null) ? 1 : 2);
		view.glBindBuffer(view.GL_ARRAY_BUFFER, vbo[0]);
		view.mapBuffer(view.GL_ARRAY_BUFFER, view.GL_STATIC_DRAW, bufs);
		if (idb != null) {
			view.glBindBuffer(view.GL_ELEMENT_ARRAY_BUFFER, vbo[1]);
			view.glBufferData(view.GL_ELEMENT_ARRAY_BUFFER, idb.getSize(), idb, view.GL_STATIC_DRAW);
		}
		return {
			vbo : vbo, 
			start : starts
		}
	},
	starter : function(n_, f_) {
		this.n = n_
		this.f = f_
		var me = this;
		this.wait = function(e) {
			me.n--;
			if (me.n == 0) {me.f();}
		}
	},
	
	// www.sean.co.uk 
	// (yuck)
	
	 pauseComp : function(millis) 
	{
		var date = new Date();
		var curDate = null;
	
		do { curDate = new Date(); } 
		while(curDate-date < millis);
	} 
	
}

var defaultInit = {
	setup: function(view) {
		view.setCurrentContext();
    	view.glMatrixMode(view.GL_PROJECTION);
	    view.glLoadIdentity();
	    var frame = view.bounds;
	   	var scale = view.contentScaleFactor;
    // Setup the view port in Pixels
	    view.glOrthof(0, frame.width * scale, 0, frame.height * scale, -1, 1);
	    view.glViewport(0, 0, frame.width * scale, frame.height * scale);
	    view.glMatrixMode(view.GL_MODELVIEW);
	    view.glLoadIdentity();    
	    view.glDisable(view.GL_DITHER);
	    view.glEnable(view.GL_TEXTURE_2D);
	    view.glEnableClientState(view.GL_VERTEX_ARRAY);
	    view.glEnable(view.GL_BLEND);
    // Set a blending function appropriate for premultiplied alpha pixel data
	    view.glBlendFunc(view.GL_ONE, view.GL_ONE_MINUS_SRC_ALPHA);
	    view.glEnable(view.GL_POINT_SPRITE_OES);
	    view.glTexEnvf(view.GL_POINT_SPRITE_OES, view.GL_COORD_REPLACE_OES, view.GL_TRUE); 		
	}
}

function getOrientation(o)
{
	switch (o)
	{
		case Titanium.UI.PORTRAIT:
		{
			return 'portrait';
		}
		case Titanium.UI.UPSIDE_PORTRAIT:
		{
			return 'upside portrait';
		}
		case Titanium.UI.LANDSCAPE_LEFT:
		{
			return 'landscape left';
		}
		case Titanium.UI.LANDSCAPE_RIGHT:
		{
			return 'landscape right';
		}
		case Titanium.UI.FACE_UP:
		{
			return 'face up';
		}
		case Titanium.UI.FACE_DOWN:
		{
			return 'face down';
		}
		case Titanium.UI.UNKNOWN:
		{
			return 'unknown';
		}
	}
}

function isPortrait(o) {
	return o == Ti.UI.PORTRAIT || o == Ti.UI.UPSIDE_PORTRAIT;
}

if (!Array.prototype.map)
{
  Array.prototype.map = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        res[i] = fun.call(thisp, this[i], i, this);
    }

    return res;
  };
}




var Gears = function() {
	var viewRect = {
		left:0,
		width:"100%",
		top:0,
		height:window.height
	};

	var obj = {
		onClose : function(e) {
			clearInterval(Gears.timer);
		},

		components : {
			opengl : Ti.Opengl.createView({
				backgroundColor:"#aaa",
				top:viewRect.top,
				left:viewRect.left,
				width:viewRect.width,
				height:viewRect.height,
				depthbuffer:true,
			}),
			button : Ti.UI.createButton({
//				width:100,
//				height:30,
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
				title:"Light Off",
				noadd:true
			}),
			slider: Ti.UI.createSlider({
				width:window.width/2 - 20,
				min:0,
				max:250,
				value:100,
				title:"Speed",
				noadd:true				
			}),
			toolbar: Ti.UI.createToolbar({bottom:0}),
			flex: Titanium.UI.createButton({
               systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
               noadd:true
           	}),
		},

		gears : function() {
			var red = [ 0.8, 0.1, 0.0, 1.0 ];
			var green = [ 0.0, 0.8, 0.2, 1.0 ];
			var blue = [ 0.2, 0.2, 1.0, 1.0 ];
			var ans =
				new Array(new GearMaker(1.0, 4.0, 1.0, 20, 0.7, red, Ti.Opengl),
				new GearMaker(0.5, 2.0, 2.0, 10, 0.7, green, Ti.Opengl),
				new GearMaker(1.3, 2.0, 0.5, 10, 0.7, blue, Ti.Opengl));
			return ans;
		}(),
		
		vbufs : null,

		begin : function() {
			var opengl = obj.components.opengl;
			var button = obj.components.button;
			var slider = obj.components.slider;
			var toolbar = obj.components.toolbar;
			var speed = 100;
			var mover = new Mover(speed);
			var gestureListener = new GestureListener(opengl);
			var flex = obj.components.flex;
			
			toolbar.items = [flex,button,flex,slider,flex];		
			
			slider.addEventListener('change', function(e) {
				mover.setSpeed(e.source.value)
			})
			button.addEventListener('click', function(e) {
				if (button.title == 'Light Off') {
					var light0Diffuse = [0.0, 0.0, 0.0, 1.0];
					opengl.glLightfv(Ti.Opengl.GL_LIGHT0, Ti.Opengl.GL_DIFFUSE, light0Diffuse);
					button.title = 'Light On';
				} else {
					var light0Diffuse = [2.0, 2.0, 2.0, 1.0];
					opengl.glLightfv(Ti.Opengl.GL_LIGHT0, Ti.Opengl.GL_DIFFUSE, light0Diffuse);
					button.title = 'Light Off';
				}
			});
			
			var view_rotx = 20.0, view_roty = 30.0, view_rotz = 0.0;
			var gear1, gear2, gear3;
			var angle = 0.0;
			var viewDist = 40.0;
			var transY = new Array();
				transY[Ti.UI.UPSIDE_PORTRAIT] = transY[Ti.UI.PORTRAIT] = .5;
				transY[Ti.UI.LANDSCAPE_LEFT] = transY[Ti.UI.LANDSCAPE_RIGHT] = 3.5;
				transY[Titanium.UI.FACE_UP] = transY[Titanium.UI.FACE_DOWN] = transY[Titanium.UI.UNKNOWN] = .5;								
			var transZ = new Array();
				transZ[Ti.UI.UPSIDE_PORTRAIT] = transZ[Ti.UI.PORTRAIT] = -40;
				transZ[Ti.UI.LANDSCAPE_LEFT] = transZ[Ti.UI.LANDSCAPE_RIGHT] = -60;
				transZ[Titanium.UI.FACE_UP] = transZ[Titanium.UI.FACE_DOWN] = transZ[Titanium.UI.UNKNOWN] = -40;								

			var setCamera = function(view) {
				
				rect = view.bounds;
				var h = rect.height / rect.width;
				view.setCurrentContext();
				view.glViewport(0, 0, view.width, view.height);
				view.glMatrixMode(Ti.Opengl.GL_PROJECTION);
				view.glLoadIdentity();
				view.glFrustumf(-1.0, 1.0, -h, h, 5.0, 200.0);
				view.glMatrixMode(Ti.Opengl.GL_MODELVIEW);				
			}

			var setup = function(view) {
				var pos = [ 0.0, 10.0, 10.0, 0 ];				
				setCamera(view);

				view.glEnable(Ti.Opengl.GL_CULL_FACE);
				view.glEnable(Ti.Opengl.GL_LIGHTING);
				view.glEnable(Ti.Opengl.GL_LIGHT0);
				view.glEnable(Ti.Opengl.GL_DEPTH_TEST);
				view.glShadeModel(Ti.Opengl.GL_SMOOTH);
				view.glLightfv(Ti.Opengl.GL_LIGHT0, Ti.Opengl.GL_POSITION, pos);
				var light0Ambient = [0.1, 0.1, 0.1, 1.0];
				view.glLightfv(Ti.Opengl.GL_LIGHT0, Ti.Opengl.GL_AMBIENT, light0Ambient);
				var light0Diffuse = [2.0, 2.0, 2.0, 1.0];
				view.glLightfv(Ti.Opengl.GL_LIGHT0, Ti.Opengl.GL_DIFFUSE, light0Diffuse);
				var light0Specular = [1.5, 1.5, 1.5, 1.0];
				var light0Shininess = 0.4;
				view.glLightfv(Ti.Opengl.GL_LIGHT0, Ti.Opengl.GL_SPECULAR, light0Specular);
				var light0Direction = [0.0, 0.0, -1.0];
				view.glLightfv(Ti.Opengl.GL_LIGHT0, Ti.Opengl.GL_SPOT_DIRECTION, light0Direction);
				view.glLightf(Ti.Opengl.GL_LIGHT0, Ti.Opengl.GL_SPOT_CUTOFF, 100.0);

				view.glEnableClientState(Ti.Opengl.GL_NORMAL_ARRAY);
				view.glEnableClientState(Ti.Opengl.GL_VERTEX_ARRAY);
				view.glEnable(Ti.Opengl.GL_NORMALIZE);

				obj.vbufs =
				obj.gears.map( function(dbuf) {
					return TiOpenGLUtil.makeBuffers(view, dbuf);
				});
				view.glFinish();

			}
			var drawImage = function(view, timestamp) {
				angle = mover.iterate(timestamp);
				if (angle > 3600.0)
					angle -= 3600.0;
				view.setFrameBuffer();
				view.clear();
				view.glPushMatrix();
				view.glTranslatef(1.0, transY[Ti.UI.orientation], transZ[Ti.UI.orientation]);
				var scale = gestureListener.scale();
				view.glScalef(scale, scale, scale);

				view.glRotatef(view_rotx-100*gestureListener.ymove(), 1.0, 0.0, 0.0);
				view.glRotatef(view_roty+100*gestureListener.xmove(), 0.0, 1.0, 0.0);
				view.glRotatef(view_rotz, 0.0, 0.0, 1.0);

				view.glPushMatrix();
				view.glTranslatef(-3.0, -2.0, 0.0);
				view.glRotatef(angle, 0.0, 0.0, 1.0);
				draw_gear(view, 0);
				view.glPopMatrix();

				view.glPushMatrix();
				view.glTranslatef(3.1, -2.0, 0.0);
				view.glRotatef(-2.0 * angle - 9.0, 0.0, 0.0, 1.0);
				draw_gear(view, 1);
				view.glPopMatrix();

				view.glPushMatrix();
				view.glTranslatef(-3.1, 4.2, 0.0);
				view.glRotatef(-2.0 * angle - 25.0, 0.0, 0.0, 1.0);
				draw_gear(view, 2);
				view.glPopMatrix();

				view.glPopMatrix();
				view.glFinish();
				view.presentFrameBuffer();
				view.glFinish();
			}
			var draw_gear = function(view, idx) {
				var gear = obj.gears[idx];
				var vbuf = obj.vbufs[idx];
				view.glMaterialfv(Ti.Opengl.GL_FRONT_AND_BACK, Ti.Opengl.GL_AMBIENT_AND_DIFFUSE, gear.color);
				view.glBindBuffer(Ti.Opengl.GL_ARRAY_BUFFER, vbuf.vbo[0]);
				view.glBindBuffer(Ti.Opengl.GL_ELEMENT_ARRAY_BUFFER, vbuf.vbo[1]);
				view.glVertexPointer(3, Ti.Opengl.GL_FLOAT, 0, vbuf.start[0]);
				view.glNormalPointer(Ti.Opengl.GL_FLOAT, 0, vbuf.start[1]);
				view.glDrawElements(Ti.Opengl.GL_TRIANGLES, gear.nindices/3, Ti.Opengl.GL_UNSIGNED_SHORT, 0);
			}
			var interval = 33.33333;

			var init = function() {
				setup(opengl);
				TiOpenGLUtil.startAnimation(opengl, drawImage, interval, 100, obj);				
			}
			
			var reInit = function(e) {
				clearInterval(obj.timer);
				setCamera(opengl);
				TiOpenGLUtil.startAnimation(opengl, drawImage, interval, 100, obj);								
			}

			Ti.Gesture.addEventListener('orientationchange', reInit);
   			
			init();
		}
	}
	return obj;
}();

var initialize = function() {
	Gears.components.opengl.addEventListener('ready', function() {
		Gears.begin()
	});
	TiOpenGLUtil.addComponents(window, Gears.components);
}
initialize();

//window.open();


/*
 * 
 
	var textureFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, '/assets/my_texture_filepvrtc');
	
	
 texture = view.glGenTextures(1);

       view.glBindTexture(Ti.Opengl.GL_TEXTURE_2D, texture[0]);
       view.glTexParameteri(Ti.Opengl.GL_TEXTURE_2D,Ti.Opengl.GL_TEXTURE_MIN_FILTER,Ti.Opengl.GL_LINEAR);
       view.glTexParameteri(Ti.Opengl.GL_TEXTURE_2D,Ti.Opengl.GL_TEXTURE_MAG_FILTER,Ti.Opengl.GL_LINEAR);
       view.glCompressedTexImage2D(Ti.Opengl.GL_TEXTURE_2D, 0, Ti.Opengl.GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG, 512, 512, 0, textureFile);

	module supports
  ES 1.1& ES 2.0

  ES 1.1 maps to OGL 1.5

* */
       
       
       
       
