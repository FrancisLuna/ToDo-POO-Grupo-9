import Tarea from "./tarea";
export default class BuscadorDeTarea{
    private tareas: Tarea[];

    constructor(tareas: Array<Tarea>){
        this.tareas = tareas;
    }

    public getTareaPorTitulo(titulo: string): Tarea | undefined{
        return this.tareas.find(tarea => tarea.getTitulo() === titulo);
    }

    public getTareasCompletadas(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() === Estado.Completado);
    }

    public getTareasNoCompletadas(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() !== Estado.Completado);
    }

    public getTareasPendientes(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() === Estado.Pendiente);
    }
}