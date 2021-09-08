class Producto{

        constructor (id,categoria,nombre,precio,cantidad,imagen)
        {
        
        // PROPIEDADES

        this.id = parseInt(id);
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad  = cantidad || 1;
        this.imagen = imagen;

        
        }
                
        // METODOS
        agregarCantidad(valor){
        this.cantidad += valor; 
        }

        subtotal(){
        return this.cantidad * this.precio;
        }
        
        
}