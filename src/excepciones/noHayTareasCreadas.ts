/**
 * Excepción personalizada que hereda de Error y se usa cuando no hay tareas creadas para procesar.
 */

export default class NoHayTareasCreadas extends Error{
    constructor(message: string){
        super(message);
    }
}