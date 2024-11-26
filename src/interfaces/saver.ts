import ListadoDeTareas from "../clases/ListadoDeTareas"

/**
 * Interfaz que declara el método para guardar datos de una colección de Tarea.
 */

export default interface Saver{
    guardar(coleccionDeTareas: ListadoDeTareas): void
}