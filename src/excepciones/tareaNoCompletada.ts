export default class TareaNoCompletada extends Error{
    constructor(message: string){
        super(message);
    }
}