import Categoria from "./categoria";

export default class coleccionDeCategorias {

    private Categorias: Array<Categoria> = [];

    public agregarCategoriaAColeccion(nuevaCategoria: Categoria): void{   
        this.Categorias.push(nuevaCategoria);        
    }

    public eliminarCategoriaDeColeccion(nombreDeCategoria: string): void{                      
        const categoriaAEliminar: number = this.Categorias.findIndex(categoria => categoria.getNombre() === nombreDeCategoria);        
        if (categoriaAEliminar !== -1) {
            this.Categorias.splice(categoriaAEliminar, 1);             
        } else {throw new Error(`No se encontró una categoría con nombre = ${nombreDeCategoria}.`)}                       
    }
}