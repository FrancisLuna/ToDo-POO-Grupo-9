import Tarea from "./tarea";
import { AVANCE } from "../enums/avance";
import { ESTADO } from "../enums/estado";
import { PRIORIDAD } from "../enums/prioridad";
export default class BuscadorDeTarea{
    
    private tareas: Tarea[];

    constructor(tareas: Array<Tarea>){
        this.tareas = tareas;
    }

    public getTareaPorTitulo(titulo: string): Tarea | undefined{
        return this.tareas.find(tarea => tarea.getTitulo() === titulo);
    }

    public getTareasCompletadas(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.Completado);
    }

    public getTareasNoCompletadas(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() !== ESTADO.Completado);
    }

    public getTareasPendientes(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.Pendiente);
    }
}