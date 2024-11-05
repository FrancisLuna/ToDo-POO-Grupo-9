import { Moment } from "moment";
import Etiqueta from "./etiqueta";
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
        return this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.Completado);
    }

    public getTareasNoCompletadas(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() !== ESTADO.Completado);
    }

    public getTareasPendientes(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.Pendiente);
    }

    public getTareasXEtiquetas(etiqueta: Etiqueta): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEtiquetas().some(etiquetaTarea => etiquetaTarea.getNombre() === etiqueta.getNombre()))
    }

    public getTareasXFechaDeVencimiento(fechaVencimiento: Moment): Tarea[]{
        return this.tareas.filter(tarea => tarea.getFechaVencimiento() === fechaVencimiento)
    }
}

enum ESTADO{
    Pendiente,
    EnProgreso,
    Completado
}