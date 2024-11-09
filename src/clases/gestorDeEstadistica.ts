import { Moment } from "moment";
import Tarea from "./tarea";
import NoHayTareasCreadas from "./excepciones/noHayTareasCreadas";
import TareaNoCompletada from "./excepciones/tareaNoCompletada";
import moment from "moment";
import BuscadorDeTarea from "./buscadorDeTarea";
import { AVANCE } from "../enums/avance";
import { ESTADO } from "../enums/estado";
import { PRIORIDAD } from "../enums/prioridad";

export default class GestorDeEstadistica{

    private tareas: Array<Tarea>=[];
    private buscadorDeTarea: BuscadorDeTarea;

    constructor(buscadorDeTarea: BuscadorDeTarea) {
        this.buscadorDeTarea = buscadorDeTarea;
    }

    public obtenerTiempoDeFinalizacionDeUnaTarea(tarea: Tarea): number{

        if(tarea.getEstadoActual() === ESTADO.Completado){

            const fechaInicio = tarea.getEstados().get(ESTADO.EnProgreso); //obtengo la fecha en la que la tarea pasó a "En Progreso"
            const fechaFinalizacion = tarea.getEstados().get(ESTADO.Completado); //obtengo la fecha en la que la tarea pasó a "Completado"
            
            if(fechaInicio && fechaFinalizacion){
                return fechaFinalizacion.diff(fechaInicio, 'hours'); //obtengo la diferencia en horas
            }
        }
        return 0;
    }
    
    public obtenerTiempoDedicadoPorTarea(): Map<string, number>{

        const tiempoDedicadoPorTarea = new Map<string, number>();

        this.tareas.forEach(tarea => {
            const tiempoDedicado = this.obtenerTiempoDeFinalizacionDeUnaTarea(tarea);
            if(tiempoDedicado){
                tiempoDedicadoPorTarea.set(`id: ${tarea.getId()}, tarea: ${tarea.getTitulo()}.`, tiempoDedicado);
            } else {
                tiempoDedicadoPorTarea.set(`id: ${tarea.getId()}, tarea: ${tarea.getTitulo()}.`, 0); // si la tarea no está completado el tiempo dedicado es 0
            }
        });
    
        return tiempoDedicadoPorTarea;
    }

    public obtenerTiempoDeFinalizacionDeTareas(): number {
        const tareasCompletadas = this.buscadorDeTarea.getTareasCompletadas();
    
        if (tareasCompletadas.length === 0) {
            throw new TareaNoCompletada("No hay tareas completadas."); // considerar solo notificar en vez de enviar una excepción
        }
    
        return tareasCompletadas.reduce((total, tarea) => {    //El método reduce itera sobre el array tareasCompletadas y acumula el tiempo de finalización de cada tarea
            return total + this.obtenerTiempoDeFinalizacionDeUnaTarea(tarea);
        }, 0);
    }
    
    public obtenerTiempoPromedioDeFinalizacion(): number{

        const tareasCompletadas = this.buscadorDeTarea.getTareasCompletadas();

        if (tareasCompletadas.length === 0) {
            throw new TareaNoCompletada("No hay tareas completadas."); // considerar solo notificar en vez de enviar una excepción
        }

        let tiempoDeFinalizacionTotal = this.obtenerTiempoDeFinalizacionDeTareas();
        return tiempoDeFinalizacionTotal / tareasCompletadas.length;
    }

    public obtenercantidadDeTareasPorEstado(): Map<ESTADO, number>{

        if (this.tareas.length === 0) {
            throw new NoHayTareasCreadas("No hay tareas creadas que permitan saber la cantidad de tareas por estado.")
        }

        const cantidadDeTareasPorEstado = new Map<ESTADO, number>([
            [ESTADO.Pendiente, 0],
            [ESTADO.EnProgreso, 0],
            [ESTADO.Completado, 0],
        ]); // Inicializo la cantidad de cada estado
    
        this.tareas.forEach(tarea =>{                           
            const estadoActual = tarea.getEstadoActual();  //obtengo el estado actual de cada tarea
            if(cantidadDeTareasPorEstado.has(estadoActual)){
                cantidadDeTareasPorEstado.set(estadoActual, cantidadDeTareasPorEstado.get(estadoActual)! + 1);  //actualizo la cantidad para cada estado 
            }
        })
        return cantidadDeTareasPorEstado;
    }
}