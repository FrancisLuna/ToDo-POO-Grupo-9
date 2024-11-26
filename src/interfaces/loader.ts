import ITarea from "./iTarea"

/**
 * Interfaz que declara el método para cargar los datos de una colección de Tarea.
 */

export default interface Loader{
    cargar(): Promise<ITarea[]>
}