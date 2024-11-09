import Tarea from "./tarea";

export default class OrganizadorDeTarea{
    
    private tareas: Array<Tarea>;

    constructor(tareas: Array<Tarea>){
        this.tareas = tareas;
    }

    public ordenarTareasPorPrioridad(): Tarea[]{
        if (this.tareas.length > 1) { 
            return this.tareas.sort();
        } else {
             return this.tareas;
            }
    }

    public ordenarTareasPorVencimiento(): Tarea[]{
        if (this.tareas.length > 1) {
            return this.tareas.sort((a, b) => a.getFechaVencimiento().valueOf() - b.getFechaVencimiento().valueOf());
        } else {
            return this.tareas;
        }
    }

    public ordenarTareasPorTitulo(): Tarea[]{
        if (this.tareas.length > 1) {
            return this.tareas.sort();
        } else {
            return this.tareas;
        }
    }
}