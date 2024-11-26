import Tarea from "./tarea";

/**
 * Representa un organizador de un listado de tareas que permite ordenar las tareas por prioridad, fecha
 * vencimiento y título.
 */
export default class OrganizadorDeTarea {
    
    /**
     * Array de tareas.
     */
    private tareas: Tarea[];

    /**
     * Estructura para ordenar por prioridad
     */
    private static readonly prioridades: { [key: string]: number } = {
    "Alta": 1,
    "Media": 2,
    "Baja": 3
    };

    /**
     * Crea un nuevo objeto de OrganizadorDeTarea.
     * @param tareas - Array de tareas sobre el cual se realizarán los diferentes tipos de ordenamiento.
     */
    constructor(tareas: Tarea[]) {
    this.tareas = tareas;
    }

    /**
     * Función para comparar dos tareas por su prioridad.
     * @param a - Primera tarea.
     * @param b - Segunda tarea.
     * @returns Un número negativo, cero o positivo dependiendo de la comparación de prioridad.
     */
    private compararPrioridad(a: Tarea, b: Tarea): number {
    return OrganizadorDeTarea.prioridades[a.getPrioridad()] - OrganizadorDeTarea.prioridades[b.getPrioridad()];
    }

    /**
     * Permite ordenar el listado de tareas por prioridad.
     * 
     * @returns Un array de tareas ordenadas y agrupadas por prioridad. 
     * El array original es mutado.
     */
    public ordenarTareasPorPrioridad(): Tarea[] {
    return this.tareas.sort(this.compararPrioridad);
    }

    /**
     * Permite ordenar el listado de tareas por fecha de vencimiento en orden ascendente.
     * 
     * @returns Un array de tareas ordenadas por fecha de vencimiento.
     */
    public ordenarTareasPorVencimiento(): Tarea[]{
        return this.tareas.sort((a, b) => a.getFechaVencimiento().valueOf() - b.getFechaVencimiento().valueOf());     
    }

    /**
     * Permite ordenar las tareas alfabéticamente por título.
     * 
     * @returns Un array de tareas ordenadas por título.
     */
    public ordenarTareasPorTitulo(): Tarea[]{        
        return this.tareas.sort((a, b) => a.getTitulo().localeCompare(b.getTitulo()));
    }
}