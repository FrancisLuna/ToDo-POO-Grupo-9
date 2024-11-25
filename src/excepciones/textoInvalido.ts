export default class TextoInvalido extends Error{
    constructor(message: string){
        super(message);
    }
}