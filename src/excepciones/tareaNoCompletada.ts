/**
 * Excepción personalizada que hereda de Error y se usa cuando se intenta procesar una tarea no completada.
 */

export default class TareaNoCompletada extends Error{
    constructor(message: string){
        super(message);
    }
}