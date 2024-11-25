import Clasificador from "../interfaces/clasificador";
import Validador from "./validador";

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
     * @throws Lanza una excepción si el nombre proporcionado es inválido.
     */
    constructor(nombre: string){
        Validador.validarTexto(nombre);
        this.nombre = nombre;
    }

    /**
     * Permite asignar y actualizar el nombre a la categoría.
     * @param nombre - El nuevo nombre a asignar.
     * @throws Lanza una excepción si el nombre a asignar es inválido.
     */
    public setNombre(nombre: string): void{
        Validador.validarTexto(nombre);
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