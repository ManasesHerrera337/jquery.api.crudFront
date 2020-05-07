

/*
*	*** JQUERY API CRUDFRONT ***	
*
*	Requiere: 
*		-> lib Jquery : https://jquery.com/
*		-> lib jquery confirm v3: https://craftpip.github.io/jquery-confirm/
*
*
*/

/*
*	*** MODO DE USO ***
*
*	//  GUARDAR 
*	    $("form").store(function(res){
*	    	 alert('Exito!!' + res)
*	    });
*
*
*
*	 // BUSCAR Y MUESTRAR DATOS
*		   function show(e){
*				// type url: /controller/{id}
*		        var url = $(e).data('url');   // se obtiene la url
*
*		        $.showdata(url, function(data){ 
*		            $("#response-Modal").html(data);
*	            	$("#editModal").modal('show');
*		        });
*		    }
*
*
*
*
*
*	//  ACTUALIZA
*	    $("formEdit").update(function(res){
*	    	alert('Exito!!' + res)
*	    }); 
*
*
*
*
*	// ELIMINAR
*	    function remove(e){
*	    	// type url: /controller/{id}
*	        var url = $(e).data('url'); // se obtiene la url
*
*	        $.delete(url, function(res){
*	            alert('Exito!!' + res)
*	        });
*	    }
*
*
*/




/*
*	FUNCION PARA GUARDAR
*	ENVIA POR POST AL METODO STORE EN EL CONTROLADOR
*
*	call: $(Form).store(function(res){ // ... // });
*	@retorn funcions callblack con la data response
*/

jQuery.fn.store = function(success) {
	var ob = $(this[0]);
	ob.submit(function(e){
		e.preventDefault();
		var formData = new FormData(ob.context); //	
		formData.append("name", "value"); //necesario para al formdata
		var al = null;

		$.ajax({
	       	type:'POST',
	     	data: formData,
	       	url: $(ob).attr('action'),
	     	dataType: "json",//necesario para recibir objetos json
			cache: false,
			contentType: false,
			processData: false,
	     	beforeSend: function() {
	 			al = $.alert({ 
						icon: 'fa fa-spinner fa-spin',
						title: "Guardando...",
						content: 'Espere hasta que esta ventana se cierre automaticamente'
					});
	     	},
	       	success:function(data){
	       		al.close();
	       		success(data);
	       		

	        },
	        error: function(jqXHR, textStatus, errorThrown){
	        	$.alert({ 
					title: '¡Oh oh!',
			        content: "Error inesperado" + errorThrown,
			        type: 'red',
			        typeAnimated: true
			    });
	        }
	    });	
	});
}






/*
*	FUNCION PARA GUARDAR FORMS CON ARCHIVOS
*	ENVIA POR POST AL METODO STORE EN EL CONTROLADOR
*
*	call: $(Form).storeFile(function(res){ // ... // });
*	@retorn funcions callblack con la data response
*/

jQuery.fn.storeFile = function(success) {
	var ob = $(this[0]);
	ob.submit(function(e){
		e.preventDefault();
		var formData = new FormData(ob.context);	
		formData.append("name", "value"); //necesario para al formdata
		var al = null;
		
		$.ajax({
	       	type:'POST',
	     	data: formData,
	       	url: $(ob).attr('action'),
	     	dataType: "html",
			cache: false,
			contentType: false,
			processData: false,
	     	beforeSend: function() {
	 			al = $.alert({ 
						icon: 'fa fa-spinner fa-spin',
						title: "Guardando...",
						content: 'Espere hasta que esta ventana se cierre automaticamente'
					});
	     	},
	       	success:function(data){
	       		al.close();
	       		success(data);
	       		

	        },
	        error: function(jqXHR, textStatus, errorThrown){
	        	$.alert({ 
					title: '¡Oh oh!',
			        content: "Error inesperado" + errorThrown,
			        type: 'red',
			        typeAnimated: true
			    });
	        }
	    });	


	});
}





/*
*   FUNCION PARA MOSTRAR UN REGISTRO
*	ENVIA POR GET AL METODO "show" EN EL CONTROLADOR
*
*	call: $.showdata( url , function(res){ // ... // });
*	@retorn funcions callblack con la data response
*/
jQuery.showdata = function(url, success){
	var al = null;
	$.ajax({
       	type:'GET',
       	url: url,
     	beforeSend: function() {
 			al = $.alert({ 
				icon: 'fa fa-spinner fa-spin',
				title: "Buscando Datos...",
				content: 'Espere hasta que esta ventana se cierre automaticamente'
			});
     	},
       	success:function(data){
       		al.close();
   			success(data);
        },
        error:  function (jqXHR, textStatus, errorThrown){
        	
        	$.alert({ 
				title: '¡Oh oh!',
		        content: "Error inesperado" + errorThrown,
		        type: 'red',
		        typeAnimated: true
		    });
        }
    });
}
       		




/*
*	FUNCION PARA ACTUALIZAR
*	ENVIA POR PATCH AL METODO "update" EN EL CONTROLADOR
*
*	call: $(Form).update(function(res){ // ... // });
*	@retorn funcions callblack con la data response
*/

jQuery.fn.update = function( success) {
	var ob = $(this[0]);
	ob.submit(function(e){
		e.preventDefault();
		var formData = new FormData(ob.context);	
		formData.append("name", "value"); //necesario para al formdata
		var al = null;

		$.ajaxSetup({
        	headers: {
            	'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        	}
		});
		
		$.ajax({
	       	type:'PATCH',
	     	data: formData,
	       	url: $(ob).attr('action'),
	     	dataType: "json",//necesario para recibir objetos json
	     	cache: false,
			contentType: false,
			processData: false,
	     	beforeSend: function() {
	 			al = $.alert({ 
						icon: 'fa fa-spinner fa-spin',
						title: "Actualizando Datos...",
						content: 'Espere hasta que esta ventana se cierre automaticamente'
					});
	     	},
	       	success:function(data){
	       		al.close();
	       		success(data);
	       		

	        },
	        error: function(jqXHR, textStatus, errorThrown){
	        	$.alert({ 
					title: '¡Oh oh!',
			        content: "Error inesperado" + errorThrown,
			        type: 'red',
			        typeAnimated: true
			    });
	        }
	    });	
	});
}   			





/*
*   FUNCION PARA ELIMINA
*	ENVIA POR DELETE AL METODO "destroy" EN EL CONTROLADOR
*
*	call: $.delete( url , function(res){ // ... // });
*	@retorn funcions callblack con la data response
*/
jQuery.delete = function(url, success){
	var al = null;

	$.confirm({
  		icon: 'fa fa-warning',
        title: 'Detente!',
        content: 'Vas a eliminar permanentemente el registro seleccionado',
        type: 'red',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: 'Eliminar',
                btnClass: 'btn-red',
                action: function(){

            	 	$.ajaxSetup({
			            headers: {
			                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			            }
			        });
			      	$.ajax({
		    	        type:'DELETE',
			            dataType:'json',
			            url: url,
			            beforeSend: function(){
			            	
							al = $.alert({ 
								icon: 'fa fa-spinner fa-spin',
								title: "Eliminando el registro",
								content: 'Espere hasta que esta ventana se cierre automaticamente'
							});
			            },
			           	success:function(data){
			           		al.close();
			           		success(data);
			            },
			            error: function(jqXHR, textStatus, errorThrown) 
			            { 
				          	$.alert({ 
								title: '¡Oh oh!',
						        content: "Error inesperado" + errorThrown,
						        type: 'red',
						        typeAnimated: true
						    });
			            }
			        });
                }

            },
            close:{
            	text: 'Cerrar',
                btnClass: 'btn-dark',
                action: function(){
                }
            }
        }
    });
}

