import Tarea from "./tarea";
import NoHayTareasCreadas from "../excepciones/noHayTareasCreadas";
import { ESTADO } from "../enums/estado";

export default class ContadorDeTareas{

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