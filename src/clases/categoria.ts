import Clasificador from "../interfaces/clasificador";

/**
 * Clase que implementa los métodos de la interfaz Clasificador y representa una Categoría 
 * para clasificar tareas.
 */
export default class Categoria implements Clasificador{

    /**Nombre de la categoría.*/
    private nombre: string;
    
    /**
     * Crea un nuevo objeto Categoría.
     * @param nombre - El nombre de la categoría.
     */
    constructor(nombre: string){
        this.nombre = nombre;
    }

    /**
     * Permite asignar y actualizar el nombre a la categoría.
     * @param nombre - El nuevo nombre a asignar.
     */
    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }

    /**
     * Permite obtener el nombre de la categoría.
     * @returns El nombre de la categoría.
     */
    public getNombre(): string{
        return this.nombre;
    }
}