import Clasificador from "./clasificador";

/**
 * Clase que extiende los atributos y métodos de la clase Clasificador y representa una categoría 
 * para clasificar tareas.
 */
export default class Categoria extends Clasificador{
    
    /**
     * Crea un nuevo objeto Categoría.
     * @param nombre - El nombre de la categoría.
     */
    constructor(nombre: string){
        super(nombre);
    }
}