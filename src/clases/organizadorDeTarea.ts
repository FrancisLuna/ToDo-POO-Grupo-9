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

    public ordenarTareasPorTitulo(): Tarea[]{
        //LocaleCompare: compara dos strings, devuelve negativo si el "a" va antes del "b"
        //o positivo en viceversa, 0 en caso de que sean iguales
        return this.tareas.sort((a, b) => a.getTitulo().localeCompare(b.getTitulo()));
    }
}