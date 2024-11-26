/**
 * Interfaz que define los métodos que se implementan en las clases que representan un clasificador 
 * de tareas. Los métodos permiten asignar y obtener el nombre del clasificador.
 */

export default interface Clasificador{
    setNombre(nombre: string): void,
    getNombre(): string
} 