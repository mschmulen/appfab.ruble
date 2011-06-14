
var uiChess = (function() {
  	
  	var API = { }; 
    
  	API.factoryView = function( options )
	{
		// Simple and tiny chess for Appcelerator
		// Javascript chess engine (c)2011 Oscar Toledo G.
		// Modified by @pecdev with the help of @pec1985 (follow us on twitter)
		// For information on the code, please visit: http://nanochess.110mb.com/chess4.html
		
		var B,i,y,u,b,I=[],G=120,x=10,z=15,M=1e4,l=[5,3,4,6,2,4,3,5,1,1,1,1,1,1,1,1,9,9,9,9
		,9,9,9,9,13,11,12,14,10,12,11,13,0,99,0,306,297,495,846,-1,0,1,2,2,1,0,-1,-1,1,-10,
		10,-11,-9,9,11,10,20,-9,-11,-10,-20,-21,-19,-12,-8,8,12,19,21];function X(w,c,h,e,S
		,s){var t,o,L,E,d,O=e,N=-M*M,K=78-h<<x,p,g,n,m,A,q,r,C,J,a=y?-x:x;y^=8;G++;d=w||s&&
		s>=h&&X(0,0,0,21,0,0)>M;do{if(o=I[p=O]){q=o&z^y;if(q<7){A=q--&2?8:4;C=o-9&z?[53,47,
		61,51,47,47][q]:57;do{r=I[p+=l[C]];if(!w|p==w){g=q|p+a-S?0:S;if(!r&(!!q|A<3||!!g)||
		(r+1&z^y)>9&&q|A>2){if(m=!(r-2&7))return y^=8,I[G--]=O,K;J=n=o&z;E=I[p-a]&z;t=q|E-7
		?n:(n+=2,6^y);while(n<=t){L=r?l[r&7|32]-h-q:0;if(s)L+=(1-q?l[(p-p%x)/x+37]-l[(O-O%x)
		/x+37]+l[p%x+38]*(q?1:2)-l[O%x+38]+(o&16)/2:!!m*9)+(!q?!(I[p-1]^n)+!(I[p+1]^n)+l[n&7
		|32]-99+!!g*99+(A<2):0)+!(E^y^9);if(s>h||1<s&s==h&&L>z|d){I[p]=n,I[O]=m?(I[g]=I[m],I
		[m]=0):g?I[g]=0:0;L-=X(s>h|d?0:p,L-N,h+1,I[G+1],J=q|A>1?0:p,s);if(!(h||s-1|B-O|i-n|p
		-b|L<-M))return W(),G--,u=J;J=q-1|A<7||m||!s|d|r|o<z||X(0,0,0,21,0,0)>M;I[O]=o;I[p]=
		r;m?(I[m]=I[g],I[g]=0):g?I[g]=9^y:0;}if(L>N||s>1&&L==N&&!h&&Math.random()<.5){I[G]=O;
		if(s>1){if(h&&c-L<0)return y^=8,G--,L;if(!h)i=n,B=O,b=p;}N=L;}n+=J||(g=p,m=p<O?g-3:g+
		2,I[m]<z|I[m+O-p]||I[p+=p-O])?1:0;}}}}while(!r&q>2||(p=O,q|A>2|o>z&!r&&++C*--A));}}}
		while(++O>98?O=20:e-O);return y^=8,G--,N+M*M&&N>-K+1924|d?N:0;}B=i=y=u=0;while(B++<
		120)I[B-1]=B%x?B/x%x<2|B%x<2?7:B/x&4?0:l[i++]|16:7;
		
		var topView = Ti.UI.createView({layout:'horizontal', width: 320, height:480 });
		//var win = Ti.UI.createWindow({layout:'horizontal', title:'chess'});
		var arry = [];
		var view = function(e){
			var label = Ti.UI.createLabel(e);
			label.replaceText = function(e){
				switch(e){
					case 1: e = 9823; break; case 2: e = 9818; break;
					case 3: e = 9822; break; case 4: e = 9821; break;
					case 5: e = 9820; break; case 6: e = 9819; break;
					case 9: e = 9817; break; case 10: e = 9812; break;
					case 11: e = 9816; break; case 12: e = 9815; break;
					case 13: e = 9814; break; case 14: e = 9813; break;
					default: e = '';
				}
				label.text= String.fromCharCode(e)
			}
			label.addEventListener('click', function(e){
				Y(label.id);
			});
			arry[e.id] = label;
			return arry[e.id];
		}
		for (var a = '',i = 18;i < 100;a += ++i % 10 - 9 ?
			topView.add( view({ top:0, left:0, width:40, height:40, borderWidth:1, text: '',
			textAlign:'center', font:{ fontWeight:'bold', fontSize:30 }, id:i,
			backgroundColor:'#' + (i * .9 & 1 ? '9090d0':'c0c0ff') })
			) : (i++, '')
		);
		//win.open({modal:true});
		
		function W() {
			B = b;
			for (p = 21; p < 99; ++p)
			if (q = arry[p]) {
				q.replaceText((I[p] & z));
				q.borderColor = p == B ? "#ff0" : "#aae";
			}
		}
		W();
		function Y(s) {
			i = (I[s] ^ y) & z; if (i > 8) { b = s; W(); }
			else if (B && i < 9) {b = s; i = I[B] & z; if
			((i & 7) == 1 & (b < 29 | b > 90)) i = 14; X(0,
			0, 0, 21, u, 1);if (y) setTimeout(function(){
			X(0,0,0,21,u,2/*ply*/);X(0,0,0,21,u,1)}, 250);}
		}
		
		return topView;
	}//end factoryView
	
	API.factoryWindow = function( options )
	{
		var win = Ti.UI.createWindow({title:'chess'});
		win.addChild( API.factoryView( options ) );
		return win;
	}//end factoryWindow
	
  return API;
})(); //end uiChess
//Ti.UI.currentWindow.add( uiChess.factoryView({}) );
//uiChess.factoryWindow({}).addChild( uiChess.factoryView({}) ).open({modal:true});

