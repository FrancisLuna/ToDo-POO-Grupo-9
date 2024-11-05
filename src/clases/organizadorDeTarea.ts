import Tarea from "./tarea";

export default class OrganizadorDeTarea{
    private tareas: Array<Tarea>;

    constructor(tareas: Array<Tarea>){
        this.tareas = tareas;
    }

    public ordenarTareasPorPrioridad(): Tarea[]{
        return this.tareas.sort((a, b) => a.getPrioridad() - b.getPrioridad());    
    }

    public ordenarTareasPorFecha(): Tarea[] {
        return this.tareas.sort((a, b) => a.getFechaCreacion().valueOf() - b.getFechaCreacion().valueOf());
    }
}