

//<module version="0.3">ti.opengl</module>

/*  gear.js
 *
 * 3-D gear wheels.  This program is in the public domain.
 *
 * Brian Paul
 *
 * Conversion to OpenGL ES:  http://www.khronos.org/message_boards/viewtopic.php?f=4&t=1906
 * Conversion to Javascript for use with Ti.OpenGL module by Richard M. Salter, Logical Labs
 * Copyright 2011, Logical Labs. All rights reserved.
 */

var window = Ti.UI.createWindow({
	backgroundColor:'white'
});

var TiOpengl = require('Ti.OpenGL');

/*  gearMaker.js
 *
 * 3-D gear wheels.  This program is in the public domain.
 *
 * Brian Paul
 *
 * Conversion to OpenGL ES:  http://www.khronos.org/message_boards/viewtopic.php?f=4&t=1906
 * Conversion to Javascript for use with Ti.OpenGL module by Richard M. Salter, Logical Labs
 *
 */

var GearMaker = function(inner_radius, outer_radius, width, teeth, tooth_depth, color_, openGL) {
	function push3(vx, x, y, z) {
		vx.push(x);
		vx.push(y);
		vx.push(z);
	}

	this.vertices = new Array();
	this.normals = new Array();
	this.indices = new Array();
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

	vx = this.vertices;
	nx = this.normals;
	ix = this.indices;

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
    this.vertexBuffer = openGL.createDataBuffer({
    	data: this.vertices,
    	type: openGL.GL_FLOAT
    });
    this.normalBuffer = openGL.createDataBuffer({
    	data: this.normals,
    	type: openGL.GL_FLOAT
    });
    this.indexBuffer = openGL.createDataBuffer({
    	data: this.indices,
    	type: openGL.GL_UNSIGNED_SHORT
    });
    this.vertices = null;
    this.normals = null;
    this.indices = null;
}

var GestureListener = function(opengl) {
	
	this.width = opengl.width;
	this.height = opengl.height
	this.pinchStart = 0;
	this.newPinch = true;
	this.scaleStart = 1;
	this.xstart = 0;
	this.ystart = 0
	this.xpos = 0; 
	this.ypos = 0; 
	this.xcur = 0; 
	this.ycur = 0;
	this.scale = 1;
	
	var me = this;
	
	opengl.addEventListener('pinch', function(e) {
		if (me.newPinch) {
			me.newPinch = false;
			me.scaleStart = me.scale;
			me.pinchStart = e.scale;
		} else {
			me.scale = Math.max(me.scaleStart + e.scale - me.pinchStart, 0);
		}
	});

	opengl.addEventListener('touchstart', function(e) {
		me.xstart = e.x;
		me.ystart = e.y;
		me.newPinch = true;
	});
	
	opengl.addEventListener('touchmove', function(e) {
		me.xpos = 2*(e.x - me.xstart)/me.width;
		me.ypos = 2*(e.y - me.ystart)/me.width;
	});
	
	opengl.addEventListener('touchend', function(e) {
		me.xcur = me.xcur-me.xpos;
		me.ycur = me.ypos+me.ycur;
		me.xpos = 0;
		me.ypos = 0;
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



Demo = new Object();

// create OpenGL view

Demo.opengl = TiOpengl.createView({
	backgroundColor:"#000",
	top:10,
	left:10,
	width:300,
	height:340,
	initializer:false,
	depthbuffer:true,
});

Demo.slider = Ti.UI.createSlider({
	top:410,
	left:30,
	width:260,
	min:0,
	max:200,
	value:100,
	title:"Speed"
});

Demo.draw = function(e) {
	var opengl = Demo.opengl;
	var button = Demo.button;
	var slider = Demo.slider;

	var speed = 100;
	var mover = new Mover(speed);
	var gestureListener = new GestureListener(opengl);
	
	slider.addEventListener('change', function(e) {
		mover.setSpeed(e.source.value)
	})

	var view_rotx = 20.0, view_roty = 30.0, view_rotz = 0.0;
	var gear1, gear2, gear3;
	var angle = 0.0;
	var viewDist = 40.0;

	var setup = function(view) {
		var pos = [ 0.0, 10.0, 10.0, 0 ];
		var red = [ 0.8, 0.1, 0.0, 1.0 ];
		var green = [ 0.0, 0.8, 0.2, 1.0 ];
		var blue = [ 0.2, 0.2, 1.0, 1.0 ];
		var h = view.height / view.width;

		view.glViewport(0, 0, view.width, view.height);
		view.glMatrixMode(TiOpengl.GL_PROJECTION);
		view.glLoadIdentity();
		view.glFrustumf(-1.0, 1.0, -h, h, 5.0, 200.0);
		view.glMatrixMode(TiOpengl.GL_MODELVIEW);

		view.glEnable(TiOpengl.GL_CULL_FACE);
		view.glEnable(TiOpengl.GL_LIGHTING);
		view.glEnable(TiOpengl.GL_LIGHT0);
		view.glEnable(TiOpengl.GL_DEPTH_TEST);
		view.glShadeModel(TiOpengl.GL_SMOOTH);
		view.glLightfv(TiOpengl.GL_LIGHT0, TiOpengl.GL_POSITION, pos);
		var light0Ambient = [0.1, 0.1, 0.1, 1.0];
		view.glLightfv(TiOpengl.GL_LIGHT0, TiOpengl.GL_AMBIENT, light0Ambient);
		var light0Diffuse = [2.0, 2.0, 2.0, 1.0];
		view.glLightfv(TiOpengl.GL_LIGHT0, TiOpengl.GL_DIFFUSE, light0Diffuse);
		var light0Specular = [1.5, 1.5, 1.5, 1.0];
		var light0Shininess = 0.4;
		view.glLightfv(TiOpengl.GL_LIGHT0, TiOpengl.GL_SPECULAR, light0Specular);
		var light0Direction = [0.0, 0.0, -1.0];
		view.glLightfv(TiOpengl.GL_LIGHT0, TiOpengl.GL_SPOT_DIRECTION, light0Direction);
		view.glLightf(TiOpengl.GL_LIGHT0, TiOpengl.GL_SPOT_CUTOFF, 100.0);

		view.glEnableClientState(TiOpengl.GL_NORMAL_ARRAY);
		view.glEnableClientState(TiOpengl.GL_VERTEX_ARRAY);
		view.glEnable(TiOpengl.GL_NORMALIZE);

		view.glFinish();

		gear1 = new GearMaker(1.0, 4.0, 1.0, 20, 0.7, red, TiOpengl);
		gear2 = new GearMaker(0.5, 2.0, 2.0, 10, 0.7, green, TiOpengl);
		gear3 = new GearMaker(1.3, 2.0, 0.5, 10, 0.7, blue, TiOpengl);
	}
	var drawImage = function(view, timestamp) {
		angle = mover.iterate(timestamp);
		if (angle > 3600.0)
			angle -= 3600.0;
		view.setFrameBuffer();
		view.erase();
		view.glPushMatrix();
		view.glTranslatef(1.0, 0, -viewDist);
		var scale = gestureListener.scale;
		view.glScalef(scale, scale, scale);

		view.glRotatef(view_rotx+100*(gestureListener.ypos+gestureListener.ycur), 1.0, 0.0, 0.0);
		view.glRotatef(view_roty+100*(gestureListener.xpos-gestureListener.xcur), 0.0, 1.0, 0.0);
		view.glRotatef(view_rotz, 0.0, 0.0, 1.0);

		view.glPushMatrix();
		view.glTranslatef(-3.0, -2.0, 0.0);
		view.glRotatef(angle, 0.0, 0.0, 1.0);
		draw_gear(view, gear1);
		view.glPopMatrix();

		view.glPushMatrix();
		view.glTranslatef(3.1, -2.0, 0.0);
		view.glRotatef(-2.0 * angle - 9.0, 0.0, 0.0, 1.0);
		draw_gear(view, gear2);
		view.glPopMatrix();

		view.glPushMatrix();
		view.glTranslatef(-3.1, 4.2, 0.0);
		view.glRotatef(-2.0 * angle - 25.0, 0.0, 0.0, 1.0);
		draw_gear(view, gear3);
		view.glPopMatrix();

		view.glPopMatrix();
		view.glFinish();
		view.presentFrameBuffer();
	}
	
	var draw_gear = function(view, gear) {
		view.glMaterialfv(TiOpengl.GL_FRONT_AND_BACK, TiOpengl.GL_AMBIENT_AND_DIFFUSE, gear.color);
		view.glVertexPointer(3, TiOpengl.GL_FLOAT, 0, gear.vertexBuffer);
		view.glNormalPointer(TiOpengl.GL_FLOAT, 0, gear.normalBuffer);
		view.glDrawElements(TiOpengl.GL_TRIANGLES, gear.nindices/3, TiOpengl.GL_UNSIGNED_SHORT, gear.indexBuffer);
	}

	var init = function () {
		setup(opengl);
		var drawFrame = function(e) {
			drawImage(opengl, new Date().getTime());
		}
		var interval = 33;
		var timer = setInterval(drawFrame, interval);
	}
	
	init();
}

window.add(Demo.opengl);
window.add(Demo.slider);
window.addEventListener('open', Demo.draw);
window.open();

