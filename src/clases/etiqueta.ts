import Clasificador from "./clasificador";

/**
 * Clase que extiende los atributos y métodos de la clase Clasificador y representa una etiqueta 
 * para clasificar tareas.
 */
export default class Etiqueta extends Clasificador{
    
    /**
     * Crea un nuevo objeto Etiqueta.
     * @param nombre - El nombre de la etiqueta.
     */
    constructor(nombre: string){
        super(nombre);
    }
}