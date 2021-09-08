function respuestaSuccessProductos(data){
    for (const objeto of data) {
        productos.push(new Producto(objeto.id,
                                    objeto.categoria,
                                    objeto.nombre,
                                    objeto.precio, 
                                    objeto.cantidad,
                                    objeto.imagen));
    }
    
    productosUI(productos, '#divProductos');
}