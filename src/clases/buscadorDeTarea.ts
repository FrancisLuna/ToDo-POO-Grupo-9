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
        const tareasCompletadas: Tarea[] = this.tareas.filter(tarea => tarea.getEstadoActual() === ESTADO.Completado);
        if (tareasCompletadas.length === 0) {
            throw new ErrorTareaNoEncontrada("No hay tareas completadas.");
        }
        return tareasCompletadas;
    }

    /**
     * Permite obtener todas las tareas no completadas, ordenadas por fecha de vencimiento ascendente.
     * 
     * @returns Un array de tareas no completadas, ordenadas por fecha de vencimiento.
     */
    public getTareasPorVencimiento(): Tarea[]{
        const tareasNoCompletadas: Tarea[] = this.tareas.filter(tarea => tarea.getEstadoActual() !== ESTADO.Completado);
        if (tareasNoCompletadas.length > 0) {
            tareasNoCompletadas.sort((a, b) => a.getFechaVencimiento().valueOf() - b.getFechaVencimiento().valueOf());
        }
        return tareasNoCompletadas;
    }

    /**
     * Permite obtener una tarea del listado de tareas que contiene un título especificado.
     * 
     * @param titulo - El título de la tarea a buscar.
     * @returns La tarea encontrada con el título especificado.
     * @throws {ErrorTareaNoEncontrada} Si no se encuentra una tarea con el título dado se lanza una excepción.
     */
    public getTareaPorTitulo(titulo: string): Tarea | undefined{
        const tareaBuscada: Tarea | undefined = this.tareas.find(tarea => tarea.getTitulo() === titulo);
        if (!tareaBuscada) {
            throw new ErrorTareaNoEncontrada("No existen tareas con el título especificado");
        }
        return tareaBuscada;
    }

    /**
     * Permite obtener un listado de tareas que contienen una etiqueta específica.
     * 
     * @param etiqueta - La etiqueta que deben tener las tareas.
     * @returns Un array de tareas con la etiqueta especificada.
     * @throws {ErrorTareaNoEncontrada} Si no se encuentran tareas con la etiqueta dada se lanza una excepción.
     */
    public getTareasPorEtiqueta(etiqueta: Etiqueta): Tarea[]{
        const tareasEtiquetadas: Tarea[] = this.tareas.filter(tarea => tarea.getEtiquetas().includes(etiqueta));
        if (tareasEtiquetadas.length === 0) {
            throw new ErrorTareaNoEncontrada("No existen tareas con la etiqueta especificada");
            
        }
        return tareasEtiquetadas;
    }

    /**
     * Permite obtener un listado de tareas que contienen una categoría específica.
     * 
     * @param categoria - La categoría que deben tener las tareas.
     * @returns Un array de tareas con la categoría especificada.
     * @throws {ErrorTareaNoEncontrada} Si no se encuentran tareas con la categoría dada se lanza una excepción.
     */
    public getTareasPorCategoria(categoria: Categoria): Tarea[]{
        const tareasCategorizadas: Tarea[] = this.tareas.filter(tarea => tarea.getCategoria() === categoria);
        if (tareasCategorizadas.length === 0) {
            throw new ErrorTareaNoEncontrada("No existen tareas con la categoria especificada")
        }
        return tareasCategorizadas;
    }
}