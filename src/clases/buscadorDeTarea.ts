import Tarea from "./tarea";
import { AVANCE } from "../enums/avance";
import { ESTADO } from "../enums/estado";
import { PRIORIDAD } from "../enums/prioridad";
import Etiqueta from "./etiqueta";
import Categoria from "./categoria";
export default class BuscadorDeTarea{
    
    private tareas: Tarea[];

    constructor(tareas: Array<Tarea>){
        this.tareas = tareas;
    }

    public getTareaPorTitulo(titulo: string): Tarea | undefined{
        const tareaBuscada: Tarea | undefined = this.tareas.find(tarea => tarea.getTitulo() === titulo);
        if (!tareaBuscada) {} // utilizar el gestor de notificaciones para notificar tarea no encontrada o enviar una excepcion
        return tareaBuscada;
    }

    public getTareasCompletadas(): Tarea[]{
        const tareasCompletadas: Tarea[] = this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.Completado);
        if (tareasCompletadas.length === 0) {} // utilizar el gestor de notificaciones para notificar tarea no encontrada o enviar una excepcion
        return tareasCompletadas;
    }

    public getTareasPorVencimiento(): Tarea[]{
        const tareasNoCompletadas: Tarea[] = this.tareas.filter(tarea => tarea.getEstadoActual() !== ESTADO.Completado);
        if (tareasNoCompletadas.length > 1) {
            tareasNoCompletadas.sort((a, b) => a.getFechaVencimiento().valueOf() - b.getFechaVencimiento().valueOf());
        }
        if (tareasNoCompletadas.length === 0) {} // utilizar el gestor de notificaciones para notificar tarea no encontrada o enviar una excepcion        
        return tareasNoCompletadas;
    }

    public getTareasPendientes(): Tarea[]{
        const tareasPendientes: Tarea[] = this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.Pendiente);
        if (tareasPendientes.length === 0) {} // utilizar el gestor de notificaciones para notificar tarea no encontrada o enviar una excepcion        
        return tareasPendientes;
    }

    public getTareasEnProgreso(): Tarea[]{
        const tareasEnProgreso: Tarea[] = this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.EnProgreso);
        if (tareasEnProgreso.length === 0) {} // utilizar el gestor de notificaciones para notificar tarea no encontrada o enviar una excepcion        
        return tareasEnProgreso;
    }

    public getTareasPorEtiqueta(etiqueta: Etiqueta): Tarea[]{
        const tareasEtiquetadas: Tarea[] = this.tareas.filter(tarea => tarea.getEtiquetas().includes(etiqueta) === true);
        if (tareasEtiquetadas.length === 0) {} // utilizar el gestor de notificaciones para notificar tarea no encontrada o enviar una excepcion
        return tareasEtiquetadas;
    }

    public getTareasPorCategoria(categoria: Categoria): Tarea[]{
        const tareasCategorizadas: Tarea[] = this.tareas.filter(tarea => tarea.getCategoria() === categoria);
        if (tareasCategorizadas.length === 0) {} // utilizar el gestor de notificaciones para notificar tarea no encontrada o enviar una excepcion
        return tareasCategorizadas;
    }
}