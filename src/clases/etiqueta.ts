import Clasificador from "../interfaces/clasificador";

/**
 * Clase que implementa los métodos de la interfaz Clasificador y representa una Etiqueta 
 * para clasificar tareas.
 */
export default class Etiqueta implements Clasificador{
    
    /**Nombre de la etiqueta.*/
    private nombre: string;
    
    /**
     * Crea un nuevo objeto Etiqueta.
     * @param nombre - El nombre de la etiqueta.
     */
    constructor(nombre: string){
        this.nombre = nombre;
    }

    /**
     * Permite asignar y actualizar el nombre a la etiqueta.
     * @param nombre - El nuevo nombre a asignar.
     */
    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }

    /**
     * Permite obtener el nombre de la etiqueta.
     * @returns El nombre de la etiqueta.
     */
    public getNombre(): string{
        return this.nombre;
    }
}