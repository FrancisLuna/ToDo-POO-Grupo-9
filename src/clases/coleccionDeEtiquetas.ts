import Etiqueta from "./etiqueta";

export default class coleccionDeEtiquetas {

    private etiquetas: Array<Etiqueta> = [];

    public agregarEtiquetaAColeccion(nuevaEtiqueta: Etiqueta): void{   
        this.etiquetas.push(nuevaEtiqueta);        
    }

    public eliminarEtiquetaDeColeccion(nombreDeEtiqueta: string): void{                      
        const etiquetaAEliminar: number = this.etiquetas.findIndex(etiqueta => etiqueta.getNombre() === nombreDeEtiqueta);        
        if (etiquetaAEliminar !== -1) {
            this.etiquetas.splice(etiquetaAEliminar, 1);             
        } else {throw new Error(`No se encontró una etiqueta con nombre = ${nombreDeEtiqueta}.`)}                       
    }
}