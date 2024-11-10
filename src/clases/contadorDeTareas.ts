import Tarea from "./tarea";
import NoHayTareasCreadas from "../excepciones/noHayTareasCreadas";
import { ESTADO } from "../enums/estado";

/**
 * Clase encargada de contar las tareas agrupadas por su estado.
 */
export default class ContadorDeTareas{

    /**
     * Permite obtener la cantidad tareas agrupadas por estado.
     * @param tareas - Listado de tareas que será recorrido para obtener el estado actual de cada tarea.
     * @returns Un `Map` donde la clave es un estado y el valor es el número de tareas que tienen ese estado.
     * @throws {NoHayTareasCreadas} Si el listado de tareas está vacío, lanza una excepción.
     */
    public obtenerCantidadDeTareasPorEstado(tareas: Tarea[]): Map<ESTADO, number>{

        if (tareas.length  === 0) {
            throw new NoHayTareasCreadas("No hay tareas creadas que permitan saber la cantidad de tareas por estado.")
        }

        const cantidadDeTareasPorEstado = new Map<ESTADO, number>([
            [ESTADO.Pendiente, 0],
            [ESTADO.EnProgreso, 0],
            [ESTADO.Completado, 0],
        ]);
    
        tareas.forEach(tarea =>{                           
            const estadoActual = tarea.getEstadoActual();
            if(cantidadDeTareasPorEstado.has(estadoActual)){
                cantidadDeTareasPorEstado.set(estadoActual, cantidadDeTareasPorEstado.get(estadoActual)! + 1);
            }
        })
        return cantidadDeTareasPorEstado;
    }
}