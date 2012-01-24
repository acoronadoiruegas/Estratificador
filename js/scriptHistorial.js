         function AgregarEstrtificacion(id,estratos,sldFile,variables,metodo,parametros,urlLineChart,urlComponentChart,filtroEstados)
			{
				var container=$('#listaEstratificaciones');
				var curDate = new Date();
				var curr_hour = curDate.getHours();
			        var curr_min = curDate.getMinutes();
			        var curr_sec = curDate.getSeconds();
			        var sldFile = "";
			        var numEstratos = Math.max.apply( null, estratos);
			               var str    = '	<div class="tweet" id="'+"Estratificacion_"+id+'">\
								<div class="avatar"><img src="img/mexico.png" /></div>\
								<div class="user">'+metodo+'</div>\
								<div class="time"> Hora:'+curr_hour + ":" + curr_min+":"+curr_sec+'</div>\
								<div class="time">'+'Vars: '+variables+'  Estratos: '+numEstratos+'</div>\
			                                        </div>\
			                                        <script type="text/javascript">\
			                                            var elemento = document.getElementById("'+"Estratificacion_"+id+'");\
			                                            elemento.style.cursor = "pointer";\
			                                            elemento.onclick = function(){\
			                                            filtroEstados = ['+filtroEstados.join(",")+'];\
			                                            estratos = ['+estratos.join(",")+'];\
			                                            animaScatterPlot();\
			                                            generaMapa();\
			                                            estableceGraficaCentros("'+urlLineChart+'");\
			                                            cambiaGraficaComponentes("'+urlComponentChart+'");\
                                                                    }</script >';
    
				//var contenido = container.html(); ACHIS!!!!
			        //alert(contenido );
			        container.html('');  
			        
			        for(var i=1; i < id; i++)
			        {  
			             var old_str = $("#"+"Estratificacion_"+i).itemStratification("getText",{id:i});
			             container.append(old_str);
			        }                                
			        container.append(str);                
				//alert(str);
			        
			        $("#"+"Estratificacion_"+id).itemStratification({identificador:id,estratos:estratos,sldFile:sldFile,variables:variables,metodo:metodo,parametros:parametros,hora:curDate,urlLineChart:urlLineChart,urlComponentChart:urlComponentChart,filtroEstados:filtroEstados});
			}       
