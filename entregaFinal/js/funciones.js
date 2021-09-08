function productosUI(productos , id){
	$(id).empty();
	for(const producto of productos){
		
		$(id).append(`<div class="card border-primary mb-3" style="max-width: 900px;">
							<div class="row g-0">
							<div class="col-md-4">
							<img src="${producto.imagen}" class="card-img-top" alt="...">
							</div>
							<div class="col-md-8">
								<div class="card-body ">
								<h5 class="card-title">${producto.nombre}</h5>
								<p class="card-text text-info font-weight-bold">$ ${producto.precio}</p>
								<a href="#" id='${producto.id}' class="btn btn-primary btn-compra">COMPRAR</a>
								<span class="badge badge-dark">${producto.categoria}</span>
								</div>
							</div>
							</div>
						</div>	`)
	}

	//AGREGO EVENTO PARA LA COMPRA DE PRODUCTOS
	$('.btn-compra').click(comprarProducto);
	//------------------------------------------
}


//FUNCION QUE AGREGA PRODUCTOS AL CARRITO

function comprarProducto(e){
	e.preventDefault();
	e.stopPropagation();
	const idProducto   = e.target.id;
	const seleccionado = carrito.find(p => p.id == idProducto);
	if(seleccionado == undefined){
	  carrito.push(productos.find(p => p.id == idProducto));
	  //AGREGO CANTIDAD AL PRODUCTO

	}else{
	  //SI SE ENCONTRO AGREGAR UN CANTIDAD
	  seleccionado.agregarCantidad(1);
	 
	}
   
	
	localStorage.setItem("carrito",JSON.stringify(carrito));
	
	carritoUI(carrito);
  }
  //FUNCION PARA RENDERIZAR LA INTERFAZ DEL CARRITO
  function carritoUI(productos){
	$('#carritoCantidad').html(productos.length);
	$('#carritoProductos').empty();
	for (const producto of productos) {
	  $('#carritoProductos').append(registroCarrito(producto));
	}
	//AGREGAR TOTAL
	$('#carritoProductos').append(`TOTAL <span class="badge badge-warning">${totalCarrito(carrito)}</span>`)
	//ASOCIO LOS EVENTOS A LA INTERFAZ GENERADA
	$('.btn-delete').on('click', eliminarCarrito);
	$('.btn-add').click(addCantidad);
	$('.btn-sub').click(subCantidad);
  }
  //FUNCION PARA GENERAR LA ESTRUCTURA DEL REGISTO HTML
  function registroCarrito(producto){
	return `<p> ${producto.nombre} 
			<span class="badge badge-warning">$ ${producto.precio}</span>
			<span class="badge badge-dark">${producto.cantidad}</span>
			<span class="badge badge-success"> $ ${producto.subtotal()}</span>
			<a id="${producto.id}" class="btn btn-info    btn-add">+</a>
			<a id="${producto.id}" class="btn btn-info btn-sub">-</a>
			<a id="${producto.id}" class="btn btn-danger  btn-delete">x</a>
			</p>`
  }
  
  function eliminarCarrito(e){
	console.log(e.target.id);
	let posicion = carrito.findIndex(p => p.id == e.target.id);
	carrito.splice(posicion, 1);
	//GENERAR NUEVAMENTE INTERFAZ
	carritoUI(carrito);
	//GUARDAR EN STORAGE EL NUEVO CARRITO
	localStorage.setItem("carrito",JSON.stringify(carrito));
  }
  //MANEJADOR PARA AGREGAR CANTIDAD CANTIDAD
  function addCantidad(){
	let producto = carrito.find(p => p.id == this.id);
	producto.agregarCantidad(1);
	$(this).parent().children()[1].innerHTML = producto.cantidad;
	$(this).parent().children()[2].innerHTML = producto.subtotal();
	//MODIFICAR TOTAL
	$("#totalCarrito").html(`TOTAL <span class="badge badge-warning">${totalCarrito(carrito)}</span>`);
	//GUARDAR EN STORAGE
	localStorage.setItem("carrito",JSON.stringify(carrito));
  }
  //MANEJADOR PARA RESTAR CANTIDAD
  function subCantidad(){
	let producto = carrito.find(p => p.id == this.id);
	if(producto.cantidad > 1){
	  producto.agregarCantidad(-1);
	  //$(this).parent().children()[1].innerHTML = producto.cantidad;
	  let registroUI = $(this).parent().children();
	  registroUI[1].innerHTML = producto.cantidad;
	  registroUI[2].innerHTML = producto.subtotal();
		//MODIFICAR TOTAL
		$("#totalCarrito").html(`TOTAL <span class="badge badge-warning">${totalCarrito(carrito)}</span>`);
	  //GUARDAR EN STORAGE
	  localStorage.setItem("carrito",JSON.stringify(carrito));
	}
  }

//FUNCION PARA OBTENER EL PRECIO TOTAL DEL CARRITO
function totalCarrito(carrito){
	let total = 0;
	carrito.forEach(p => total += p.subtotal());
	return total;
}
  

//FUNCION GENERAR SELECT
function selectUI(lista,selector){
	$(selector).empty();
	lista.forEach(element => {
		$(selector).append(`<option value="${element}">${element}</option>`);
	});
	$(selector).prepend(`<option value='mostrar todo' selected>Todos</option>`);
}

