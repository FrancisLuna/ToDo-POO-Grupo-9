export default class EstadoInvalido extends Error{
    constructor(message: string){
        super(message);
    }
}