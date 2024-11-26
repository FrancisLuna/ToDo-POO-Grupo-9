/**
 * Excepción personalizada que hereda de Error y se usa cuando se intenta asignar un estado inválido a la tarea.
 */

export default class EstadoInvalido extends Error{
    constructor(message: string){
        super(message);
    }
}