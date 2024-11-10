/**
 * Clase abstracta que representa un clasificador genérico y es utilizada como base para clases concretas.
 */

export default  abstract class Clasificador{
    
    /**
     * Nombre del clasificador.
     */
    private nombre: string;

    /**
     * Inicializa el nombre del clasificador y es utilizado por las subclases.
     * @param nombre 
     */
    constructor(nombre: string){
        this.nombre = nombre;
    }
    
    /**
     * Permite asignar y actualizar el nombre al clasificador.
     * @param nombre - El nuevo nombre a asignar.
     */
    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }

    /**
     * Permite obtener el nombre del clasificador.
     * @returns El nombre del clasificador.
     */
    public getNombre(): string{
        return this.nombre;
    }
}