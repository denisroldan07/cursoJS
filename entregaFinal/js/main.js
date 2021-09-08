$(document).ready(function () {
        if("carrito" in localStorage){
        const arrayLiterales = JSON.parse(localStorage.getItem("carrito"));
        for (const literal of arrayLiterales) {
            carrito.push(new Producto(literal.id, literal.nombre, literal.precio, literal.categoria, literal.cantidad));
        }
      
        carritoUI(carrito);
    }

    $(".dropdown-menu").click(function (e) { 
        e.stopPropagation();
    });

    fetch("data/producto.json")
        .then(respuesta => respuesta.json())
        .then( data => respuestaSuccessProductos(data))
        .catch(r => respuestaError(r));
});

window.addEventListener('load',()=>{
    //MOSTRAR ELEMENTO CON UN FADE
    $('#divProductos').fadeIn("slow");
})

//GENERO LA INTERFAZ CON TODOS LOS PRODUCTOS
productosUI(productos, '#divProductos');
//------------------------------------------

selectUI(categorias,"#filtro");
//ASOCIO EVENTO
$("#filtro").change(function (e) { 
    const value = this.value;
    $('#divProductos').fadeOut(600,function(){
        //EL FILTRO SE REALIZA UNA VEZ OCULTO EL CONTENEDOR
        if(value == 'mostrar todo'){
            productosUI(productos, '#divProductos');
        }else{
            const filtrados = productos.filter(producto => producto.categoria == value);
            productosUI(filtrados, '#divProductos');
        }
        //MOSTRAR UNA VEZ GENERADOS LOS PRODUCTOS
        $('#divProductos').fadeIn();
    });
});

//EVENTO DE BUSQUEDA
$("#busquedaProducto").keyup(function (e) { 
    const criterio = this.value;
    console.log(criterio);
    if(criterio != ""){
                                                        //el resulado de esto es verdadero
        const encontrados = productos.filter(p =>       p.nombre.includes(criterio) 
                                                    || p.categoria.includes(criterio));
        productosUI(encontrados, '#divProductos');
    }
});

//DEFINIR EVENTOS SOMBRE EL INPUT DE FILTRO DE PRECIO
$(".inputPrecio").change(function (e) { 
    const min = $("#minPrecio").val();
    const max = $("#maxPrecio").val();
    if((min > 0) && (max > 0)){
        const encontrados = productos.filter(p => p.precio >= min && p.precio <= max);
        productosUI(encontrados, '#divProductos');
    }
});


$("#filtroPrecio1").click(function (e) { 
    e.preventDefault();
    const min = 7000;
    const max = 20000;
    if((min > 0) && (max > 0)){
        const encontrados = productos.filter(p => p.precio >= min && p.precio <= max);
        productosUI(encontrados, '#divProductos');
    }
});

$("#filtroPrecio2").click(function (e) { 
    e.preventDefault();
    const min = 20001;
    const max = 100000;
    console.log(min);
    console.log(max);
    if((min > 0) && (max > 0)){
        const encontrados = productos.filter(p => p.precio >= min && p.precio <= max);
        productosUI(encontrados, '#divProductos');
    }
});

$("#filtroPrecio3").click(function (e) { 
    e.preventDefault();
    const min = 100001;
    const max = 330000;
    if((min > 0) && (max > 0)){
        const encontrados = productos.filter(p => p.precio >= min && p.precio <= max);
        productosUI(encontrados, '#divProductos');
    }
});