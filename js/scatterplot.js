(function ($){	
			var r;
			var circles;
			var colorByCircle;
			var textX;
			var textY;
			var palette;
			var X;
			var Y;
			var width;
			var height;
			var leftgutter;
			var bottomgutter;
			var xOrigin;
			var yOrigin;
			var gridHeight;          
			var gridWidth;				
			var labels;
			var minValueX;
			var maxValueX;
			var minValueY;
			var maxValueY;
			var methods = {
				init : function(options){					
					var settings = {
						width : 500,
						height : 500,
						palette : ["#E41A1C","#377EB8","#4DAF4A","#984EA3","#FF7F00","#FFFF33","#A65628","#F781BF","#999999"],
						dots : 2456,
						axisx : 10,
						axisy : 10,
						minValueX : 0,
						maxValueX : 1,
						minValueY : 0,
						maxValueY : 1,
						leftgutter : 10,
        				bottomgutter : 10, 
        				labels : ["Aguascalientes","Baja California","Baja California Sur","Campeche","Coahuila de Zaragoza",
									"Colima","Chiapas","Chihuahua","Distrito Federal","Durango","Guanajuato","Guerrero","Hidalgo",
									"Jalisco","México","Michoacán de Ocampo","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla",
									"Querétaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala",
									"Veracruz de Ignacio de la Llave","Yucatán","Zacatecas"]       												
					};
					if(options)
					{
						$.extend(settings, options);
					}
					
					palette = settings.palette;
					width = settings.width;
					height = settings.height;
					bottomgutter = settings.bottomgutter;
					leftgutter	= settings.leftgutter;
					labels = settings.labels;
					minValueX = settings.minValueX;
					maxValueX  = settings.maxValueX;
					minValueY = settings.minValueY;
					maxValueY = settings.maxValueY;			
					var txt = {"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "black"};
					X = (settings.width - leftgutter) / settings.axisx;
                    Y = (settings.height - bottomgutter) / settings.axisy;				
					r = Raphael(this.selector, settings.width, settings.height);
					//Eventos de Resaltado
					var mouseover = function (event) {
						this.attr({"fill-opacity": 0.85, "stroke-opacity":1, "stroke-width":3});
					}
					var mouseout = function (event) {
						this.attr({"fill-opacity": 0.35, "stroke-opacity":0.5,"stroke-width":1});
					}
					//Rotular Ejes
					textX =  new Array(settings.axisx);
				    for (var i = 0, ii = settings.axisx; i <= ii; i++) {
				        var tx = r.text(leftgutter + X * i , settings.height-bottomgutter,  Math.round((((settings.maxValueX-settings.minValueX)/settings.axisx)*i)*10)/10).attr(txt);
				        textX[i] = tx;
				    }
				    textY =  new Array(settings.axisy);
				    for (var i = 0, ii = settings.axisy; i <= ii; i++) {
				        var ty = r.text(leftgutter, (settings.height-bottomgutter)-(Y * i),  Math.round((((settings.maxValueY-settings.minValueY)/settings.axisx)*i)*10)/10).attr(txt);
				        textY[i] = ty;
				    }
					
					circles =  new Array(settings.dots);
					for(var i=0,ii = settings.dots; i < ii; i++)
    				{
						var colorRelleno = settings.palette[Math.floor(Math.random()* settings.palette.length)];
    					var dt = r.circle((leftgutter*2)+(i*leftgutter), settings.height - ((bottomgutter+5)+(i*bottomgutter)), 3).attr({stroke: colorRelleno, fill: colorRelleno, "fill-opacity": 0.35, "stroke-opacity":0.5});	
    					//dt["customColor"] = colorRelleno;
    					dt.hover(mouseover, mouseout);
    					dt.attr({ title: labels[i] });
    					dt.toFront();
						circles[i] = dt;
    				}
					return this
				},
				animate : function(options){
					var settings = {
						dataX:[], 
						dataY:[],
						dataZ:[],
						dataColor:[],
						labels : [] 
					}
					if(options)
					{
						$.extend(settings, options);
					}
					labels = settings.labels;
					for(var i=0,ii = circles.length; i < ii; i++)
				    {    	
				    	dt = circles[i];   
				    	var animateX = xOrigin + ((gridWidth/(maxValueX-minValueX))*settings.dataX[i]); 		
				    	var animateY = (gridHeight+10-yOrigin) - ((gridHeight/(maxValueY-minValueY))*settings.dataY[i]);			    	
				    	dt.animate({cx: animateX, cy: animateY, r:settings.dataZ[i]*(gridHeight/20),stroke: settings.dataColor[i], fill: settings.dataColor[i], "fill-opacity": 0.35, "stroke-opacity":0.5},2000,"bounce");	
				    	dt.attr({ title: labels[i] });			    	
				    }
					
				},
				drawGrid : function (options) {
						var settings = {
							x:leftgutter*2, 
							y:bottomgutter/2 , 
							w:width -leftgutter*2, 
							h:height - bottomgutter*2, 
							wv:10, 
							hv: 10, 
							color : "#F0F0F0"
						}
						xOrigin = settings.x;
						yOrigin = settings.y;
						gridHeight =settings.h; 
						gridWidth = settings.w;
												
						if(options)
						{
							$.extend(settings, options)
						}												   
					    var path = ["M", Math.round(settings.x) + .5, Math.round(settings.y)+ .5, "L", Math.round(settings.x + settings.w)+ .5, Math.round(settings.y)+ .5, Math.round(settings.x + settings.w), Math.round(settings.y + settings.h)+ .5, Math.round(settings.x)+ .5, Math.round(settings.y + settings.h), Math.round(settings.x), Math.round(settings.y)],
					        rowHeight = settings.h / settings.hv,
					        columnWidth = settings.w / settings.wv;

					    for (var i = 1; i < settings.hv; i++) {
					        path = path.concat(["M", Math.round(settings.x), Math.round(settings.y + i * rowHeight)+.5, "H", Math.round(settings.x + settings.w)]);

					    }
					    for (i = 1; i < settings.wv; i++) {
					        path = path.concat(["M", Math.round(settings.x + i * columnWidth)+.5, Math.round(settings.y), "V", Math.round(settings.y + settings.h)]);

					    }
					    return r.path(path.join(",")).attr({stroke: settings.color});
					}
			};
			$.fn.scatterplot=function(method){				
				if(methods[method])
				{
					return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
				} else if (typeof method === 'object' || !method){
					return methods.init.apply(this,arguments);
				} else
				{
					$.error('Method '+ method +'does not exist on jQuery.scatterplot');
				}
			};				
})(jQuery);
