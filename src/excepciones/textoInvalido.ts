/**
 * Excepción personalizada que hereda de Error y se usa cuando no se intenta asignar una cadena vacía a un campo de tipo string.
 */

export default class TextoInvalido extends Error{
    constructor(message: string){
        super(message);
    }
}