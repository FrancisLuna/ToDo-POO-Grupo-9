/**
 * Excepción personalizada que hereda de Error y se usa cuando no se encuentra una tarea para procesar.
 */

export default class ErrorTareaNoEncontrada extends Error{
    constructor(message: string){
        super(message);
    }
}