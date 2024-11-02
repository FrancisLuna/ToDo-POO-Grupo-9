import CreadorDeTarea from "./creadorDeTarea";
import moment from "moment";
import Tarea from "./tarea"

export default class GestorDeTarea{

    private tareas: Tarea[] = [];
    private creadorDeTareas: CreadorDeTarea;

    constructor(creadorDeTareas: CreadorDeTarea){
        this.creadorDeTareas = creadorDeTareas;
    }

    public agregarTarea(tarea: Tarea): void{
        const nuevaTarea: Tarea = this.creadorDeTareas.instanciarTarea();
        nuevaTarea.setId(this.tareas.length + 1);
        nuevaTarea.setTitulo(`Tarea${nuevaTarea.getId()}`);
        this.tareas.push(nuevaTarea);
    }

    public eliminarTarea(id: number): void{                      
        const index = this.tareas.findIndex((tarea) => tarea.getId() === id);        
        if (index !== -1) {
            this.tareas.splice(index, 1);             
        }                       
    }

    public ordenarTareasPorPrioridad(): Tarea[]{
        return this.tareas.sort((a, b) => a.getPrioridad() - b.getPrioridad());    
    }

    public ordenarTareasPorFecha(): Tarea[] {
        return this.tareas.sort((a, b) => a.getFechaCreacion().valueOf() - b.getFechaCreacion().valueOf());
    }
    
    public buscarTareaPorTitulo(titulo: string): Tarea | undefined{
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