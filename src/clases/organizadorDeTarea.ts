import Tarea from "./tarea";

/**
 * Representa un organizador de un listado de tareas que permite ordenar las tareas por prioridad, fecha
 * vencimiento y título.
 */

export default class OrganizadorDeTarea{
    
    /**
     * Array de tareas.
     */
    private tareas: Tarea[];

    /**
     * Crea un nuevo objeto de OrganizadorDeTarea.
     * @param tareas - Array de tareas sobre el cual se realizarán los diferentes tipos de ordenamiento.
     */
    constructor(tareas: Tarea[]){
        this.tareas = tareas;
    }

    /**
     * Permite ordenar el listado de tareas por prioridad.
     * 
     * @returns Un array de tareas ordenadas y agrupadas por prioridad. Si solo hay una tarea en el array, 
     * éste se devuelve sin modificar.
     */
    public ordenarTareasPorPrioridad(): Tarea[]{
        if (this.tareas.length > 1) { 
            return this.tareas.sort();
        } else {
            return this.tareas;
        }
    }

    /**
     * Permite ordenar el listado de tareas por fecha de vencimiento en orden ascendente.
     * 
     * @returns Un array de tareas ordenadas por fecha de vencimiento.
     * Si solo hay una tarea en el array, éste se devuelve sin modificar.
     */
    public ordenarTareasPorVencimiento(): Tarea[]{
        if (this.tareas.length > 1) {
            return this.tareas.sort((a, b) => a.getFechaVencimiento().valueOf() - b.getFechaVencimiento().valueOf());
        } else {
            return this.tareas;
        }
    }

    /**
     * Permite ordenar las tareas alfabéticamente por título.
     * 
     * @returns Un array de tareas ordenadas por título.
     * Si solo hay una tarea en el array, éste se devuelve sin modificar.
     */
    public ordenarTareasPorTitulo(): Tarea[]{
        if (this.tareas.length > 1) {
            return this.tareas.sort();
        } else {
            return this.tareas;
        }
    }
}