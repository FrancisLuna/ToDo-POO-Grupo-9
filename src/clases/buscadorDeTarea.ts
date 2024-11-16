import { Moment } from "moment";
import Etiqueta from "./etiqueta";
import Tarea from "./tarea";
export default class BuscadorDeTarea{
    
    /**
     *  Array de tareas.
     */
    private tareas: Tarea[];

    /**
     * Crea un nuevo objeto de BuscadorDeTarea
     * @param tareas - Array de tareas sobre el cual se realizarán las búsquedas.
     */
    constructor(tareas: Tarea[]){
        this.tareas = tareas;
    }

    /**
     * Permite obtener un listado de tareas con el estado 'Pendiente'.
     * 
     * @returns Un Array de tareas con el estado 'Pendiente'.
     * @throws {ErrorTareaNoEncontrada} Si no hay tareas pendientes lanza una excepción. 
     */
    public getTareasPendientes(): Tarea[]{
        const tareasPendientes: Tarea[] = this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.Pendiente);
        if (tareasPendientes.length === 0) {
            throw new ErrorTareaNoEncontrada("No hay tareas pendientes.");
        }        
        return tareasPendientes;
    }

    /**
     * Permite obtener un listado de tareas con el estado 'EnProgreso'.
     * 
     * @returns Un Array de tareas con el estado 'EnProgreso'.
     * @throws {ErrorTareaNoEncontrada} Si no hay tareas en progreso lanza una excepción. 
     */
    public getTareasEnProgreso(): Tarea[]{
        const tareasEnProgreso: Tarea[] = this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.EnProgreso);
        if (tareasEnProgreso.length === 0) {
            throw new ErrorTareaNoEncontrada("No hay tareas en progreso.");
        }        
        return tareasEnProgreso;
    }

     /**
     * Permite obtener un listado de tareas con el estado 'Completado'.
     * 
     * @returns Un Array de tareas con el estado 'Completado'.
     * @throws {ErrorTareaNoEncontrada} Si no hay tareas completadas lanza una excepción. 
     */
    public getTareasCompletadas(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.Completado);
    }

    public getTareasNoCompletadas(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() !== ESTADO.Completado);
    }

    public getTareasPendientes(): Tarea[]{
        return this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.Pendiente);
    }
}

enum ESTADO{
    Pendiente,
    EnProgreso,
    Completado
}