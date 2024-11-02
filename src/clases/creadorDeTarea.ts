import Tarea from "./tarea";

export default class CreadorDeTarea{
    public instanciarTarea(): Tarea{
        return new Tarea("",30);
    }
}