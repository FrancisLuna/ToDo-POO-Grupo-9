import ClasificadorConcreto from "./clasificadorConcreto"
export default class CreadorDeClasificador {

    public crearClasificador(): ClasificadorConcreto{
        return new ClasificadorConcreto();
    }
}