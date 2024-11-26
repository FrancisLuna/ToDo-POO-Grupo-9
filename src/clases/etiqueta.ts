import Clasificador from "../interfaces/clasificador";
import Validador from "./validador";

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
     * @throws Lanza una excepción si el nombre proporcionado es inválido.
     */
    constructor(nombre: string){
        Validador.validarTexto(nombre);
        this.nombre = nombre;
    }

    /**
     * Permite asignar y actualizar el nombre a la etiqueta.
     * @param nombre - El nuevo nombre a asignar.
     * @throws Lanza una excepción si el nombre a asignar es inválido.
     */
    public setNombre(nombre: string): void{
        Validador.validarTexto(nombre);
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