(function ($){	
			var historial = [];
			var methods = {
				init : function(options){					
					var settings = {
						metodo : "kmedias"
					};
					if(options)
					{
						$.extend(settings, options);
					}
					var entrada = new Object();
					entrada.estratos = settings.estratos;
					entrada.sldFile = settings.sldFile;
					entrada.variables = settings.variables;
					entrada.metodo = settings.metodo;
					entrada.parametros	= settings.parametros;
                                        entrada.hora = settings.hora;
                                        entrada.identificador = settings.identificador;
					entrada.numEstratos = Math.max.apply( null, estratos);
                                        entrada.urlLineChart = settings.urlLineChart;
                                        entrada.urlComponentChart = settings.urlComponentChart;
                                        entrada.filtroEstados = settings.filtroEstados;
                                        historial.push(entrada);
                                        entrada.urlCSVEstratos =settings.urlCSVEstratos; 
                                        entrada.grafTiraMarginal =settings.grafTiraMarginal;
                                        entrada.colorEstratos = settings.colorEstratos;
                                        entrada.nivelGeografico = settings.nivelGeografico;
					return this
				},
                                getText:function(param){
                                var i = param.id-1;                                                                
                                var entrada = historial[i];    
                                var strFiltroEstados = "";
								if(entrada.filtroEstados==null)
								{
									strFiltroEstados = "";
								}else
								{
									strFiltroEstados = entrada.filtroEstados.join(",")
								}                                                            
                                var str = '<div class="tweet" id="'+"Estratificacion_"+entrada.identificador+'">\
					<div class="avatar"><img src="img/mexico.png" /></div>\
					<div class="user">'+entrada.metodo+'</div>\
					<div class="time"> Hora:'+entrada.hora.getHours()+ ":" + entrada.hora.getMinutes() +":"+entrada.hora.getSeconds()+'</div>\
					<div class="time">'+'Vars: '+entrada.variables+' Estratos: '+entrada.numEstratos+'</div>\
					</div>\
                                        <script type="text/javascript">\
                                            var elemento = document.getElementById("'+"Estratificacion_"+entrada.identificador+'");\
                                            elemento.style.cursor = "pointer";\
                                            elemento.onclick = function(){\
                                            jQuery("#tabs").showLoading();\
                                            unselectDivs();	\
			                                $("#Estratificacion_'+entrada.identificador+'").css("background-color","blue");\
			                                $("#titulo").html("ESTRATIFICADOR [ '+entrada.metodo+' ]");\
                                            filtroEstados = ['+strFiltroEstados+'];\
                                            grafTiraMarginal="'+entrada.grafTiraMarginal+'";\
			                                urlCSVEstratos="'+entrada.urlCSVEstratos+'";\
                                            estratos = ['+entrada.estratos.join(",")+'];\
                                            colorEstratos = ["'+entrada.colorEstratos.join('","')+'"];\
                                            jQuery("#tabs").showLoading();\
                                            nivelGeografico="'+entrada.nivelGeografico+'";\
                                            animaScatterPlot();\
                                            generaMapa();\
                                            estableceGraficaCentros("'+entrada.urlLineChart+'");\
                                            estableceGraficaComponentes("'+entrada.urlComponentChart+'");\
                                            };\
                                        </script>';
                                //alert(str);    
                                return  str;
                                },
                                changeStratification:function(param){
                                    var i = param.id-1;  
                                    var entrada = historial[i];
                                    //alert("jejeje :"+param.id);
                                    
                                    
                                }
			};
			$.fn.itemStratification=function(method){				
                                
				if(methods[method])
				{
					return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
				} else if (typeof method === 'object' || !method){
					return methods.init.apply(this,arguments);
				} else
				{
					$.error('Method '+ method +'does not exist on jQuery.itemStratification');
				}
			};				
})(jQuery);


