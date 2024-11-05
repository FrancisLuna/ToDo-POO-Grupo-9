import { Moment } from "moment";
import Tarea from "./tarea";
import NoHayTareasCreadas from "./excepciones/noHayTareasCreadas";
import TareaNoCompletada from "./excepciones/tareaNoCompletada";
import moment from "moment";
import BuscadorDeTarea from "./buscadorDeTarea";

export default class GestorDeEstadistica{

    private tareas: Array<Tarea>=[];
    private buscadorDeTarea: BuscadorDeTarea;

    constructor(buscadorDeTarea: BuscadorDeTarea) {
        this.buscadorDeTarea = buscadorDeTarea;
    }

    public obtenerTiempoDeFinalizacionDeUnaTarea(tarea: Tarea): number{

        if(tarea.getEstadoActual() == Estado.Completado){

            const fechaInicio = tarea.getEstados().get(Estado.EnProgreso); //obtengo la fecha en la que la tarea pasó a "En Progreso"
            const fechaFinalizacion = tarea.getEstados().get(Estado.Completado); //obtengo la fecha en la que la tarea pasó a "Completado"
            
            if(fechaInicio && fechaFinalizacion){
                return fechaFinalizacion.diff(fechaInicio, 'hours'); //obtengo la diferencia en horas
            }
        }
        return 0;
    }
    
    public obtenerTiempoDedicadoPorTarea(): Map<number, number>{

        const tiempoDedicadoPorTarea = new Map<number, number>();

        this.tareas.forEach(tarea => {
            const tiempoDedicado = this.obtenerTiempoDeFinalizacionDeUnaTarea(tarea);
            if(tiempoDedicado){
                tiempoDedicadoPorTarea.set(tarea.getId(), tiempoDedicado);
            } else {
                tiempoDedicadoPorTarea.set(tarea.getId(), 0); // si la tarea no está completado el tiempo dedicado es 0
            }
        });
    
        return tiempoDedicadoPorTarea;
    }

    public obtenerTiempoDeFinalizacionDeTareas(): number {
        const tareasCompletadas = this.buscadorDeTarea.getTareasCompletadas();
    
        if (tareasCompletadas.length === 0) {
            throw new TareaNoCompletada("No hay tareas completadas.");
        }
    
        return tareasCompletadas.reduce((total, tarea) => {    //El método reduce itera sobre el array tareasCompletadas y acumula el tiempo de finalización de cada tarea
            return total + this.obtenerTiempoDeFinalizacionDeUnaTarea(tarea);
        }, 0);
    }
    
    public obtenerTiempoPromedioDeFinalizacion(): number{

        const tareasCompletadas = this.buscadorDeTarea.getTareasCompletadas();

        if (tareasCompletadas.length === 0) {
            throw new TareaNoCompletada("No hay tareas completadas.");
        }

        let tiempoDeFinalizacionTotal = this.obtenerTiempoDeFinalizacionDeTareas();
        return tiempoDeFinalizacionTotal / tareasCompletadas.length;
    }

    public obtenercantidadDeTareasPorEstado(): Map<Estado, number>{

        if (this.tareas.length === 0) {
            throw new NoHayTareasCreadas("No hay tareas creadas que permitan saber la cantidad de tareas por estado.")
        }

        const cantidadDeTareasPorEstado = new Map<Estado, number>([
            [Estado.Pendiente, 0],
            [Estado.EnProgreso, 0],
            [Estado.Completado, 0],
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