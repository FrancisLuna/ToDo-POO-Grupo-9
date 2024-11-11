import Tarea from "./tarea";
import TareaNoCompletada from "../excepciones/tareaNoCompletada";
import BuscadorDeTarea from "./buscadorDeTarea";
import { ESTADO } from "../enums/estado";

/**
 * Representa una calculadora de tiempo de finalización de tareas.
 */
export default class CalculadoraDeTiempoDeTareas{

    /**
     * Representa el buscador de tareas interno.
     */
    private buscadorDeTarea: BuscadorDeTarea;

    /**
     * Crea un nuevo objeto CalculadoraDeTiempoDeTareas con un objeto de tipo BuscadorDeTarea.
     * @param buscadorDeTarea - Instancia de la clase BuscadorDeTarea que se utilizará para obtener las tareas completadas.
     */
    constructor(buscadorDeTarea: BuscadorDeTarea) {
        this.buscadorDeTarea = buscadorDeTarea;
    }

    /**
     * Permite obtener el tiempo de finalización de una tarea.
     * 
     * El tiempo de finalización se calcula como la diferencia entre la fecha en que la tarea 
     * pasó a "En Progreso" y la fecha en que la tarea pasó a "Completado".
     * 
     * @param tarea - La tarea de la cual se va a calcular el tiempo de finalización.
     * @returns El tiempo de finalización en horas o 0 si la tarea no está completada.
     */
    public obtenerTiempoDeFinalizacionDeUnaTarea(tarea: Tarea): number{

        if(tarea.getEstadoActual() === ESTADO.Completado){

            const fechaInicio = tarea.getEstados().get(ESTADO.EnProgreso);
            const fechaFinalizacion = tarea.getEstados().get(ESTADO.Completado);
            
            if(fechaInicio && fechaFinalizacion){
                return fechaFinalizacion.diff(fechaInicio, 'hours');
            }
        }
        return 0;
    }
    
    /**
     * Permite obtener el tiempo de finalización de un listado de tareas.
     * 
     * @param tareas - Array de tareas para las cuales se calculará el tiempo de finalización.
     * @returns Un `Map` donde la clave es el identificador y título de la tarea, y el valor es el 
     * tiempo de finalización de cada tarea. Si la tarea no está completada, su tiempo de 
     * finalización será 0.
     */
    public obtenerTiempoDeFinalizacionPorTarea(tareas: Tarea[]): Map<string, number>{

        const tiempoFinalizacionPorTarea = new Map<string, number>();

        tareas.forEach(tarea => {
            const tiempoDedicado = this.obtenerTiempoDeFinalizacionDeUnaTarea(tarea);
            if(tiempoDedicado){
                tiempoFinalizacionPorTarea.set(`id: ${tarea.getId()}, tarea: ${tarea.getTitulo()}.`, tiempoDedicado);
            } else {
                tiempoFinalizacionPorTarea.set(`id: ${tarea.getId()}, tarea: ${tarea.getTitulo()}.`, 0);
            }
        });
    
        return tiempoFinalizacionPorTarea;
    }

    /**
     * Permite obtener el tiempo total de finalización de todas las tareas que 
     * están en el estado "Completado".
     * @returns El tiempo total de finalización de todas las tareas completadas en horas.
     * @throws {TareaNoCompletada} Si no hay tareas completadas, lanza una excepción.
     */
    public obtenerTiempoDeFinalizacionDeTareasCompletadas(): number {
        const tareasCompletadas = this.buscadorDeTarea.getTareasCompletadas();
    
        if (tareasCompletadas.length === 0) {
            throw new TareaNoCompletada("No hay tareas completadas.");
        }
    
        return tareasCompletadas.reduce((total, tarea) => {
            return total + this.obtenerTiempoDeFinalizacionDeUnaTarea(tarea);
        }, 0);
    }
    
    /**
     * Permite obtener el tiempo promedio de finalización de todas las tareas que 
     * están en el estado "Completado".
     *
     * @returns El tiempo promedio de finalización de las tareas completadas en horas.
     * @throws {TareaNoCompletada} Si no hay tareas completadas, lanza una excepción.
     */
    public obtenerTiempoPromedioDeFinalizacion(): number{

        const tareasCompletadas = this.buscadorDeTarea.getTareasCompletadas();

        if (tareasCompletadas.length === 0) {
            throw new TareaNoCompletada("No hay tareas completadas.");
        }

        let tiempoDeFinalizacionTotal = this.obtenerTiempoDeFinalizacionDeTareasCompletadas();
        return tiempoDeFinalizacionTotal / tareasCompletadas.length;
    }
}