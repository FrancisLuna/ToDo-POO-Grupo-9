import Tarea from "./tarea"

/** 
 * Representa un listado de tareas.
*/
export default class ListadoDeTareas{

    /**
     * Array de tareas.
     */
    private tareas: Tarea[] = [];

    /**
     * Permite agregar una instancia de la clase `Tarea` al listado de de tareas.
     * 
     * @param nuevaTarea - La tarea que se va a agregar al listado.
     */
    public agregarTarea(nuevaTarea: Tarea): void{   
        this.tareas.push(nuevaTarea);
    }

    /**
     * Permite eliminar una tarea del listado por su id y título.
     * 
     * @param idTarea - El id de la tarea que se desea eliminar.
     * @param tituloDeTarea - El título de la tarea que se desea eliminar.
     * @throws {Error} Si no se encuentra una tarea con el id y título proporcionados lanza una excepción.
     */
    public eliminarTarea(idTarea: number, tituloDeTarea: string): void{                      
        const index: number = this.tareas.findIndex(tarea => tarea.getId() === idTarea);
        const tareaAEliminar: Tarea | undefined = this.tareas.find(tarea => tarea.getTitulo() === tituloDeTarea);

        if (index !== -1 && tareaAEliminar && this.tareas[index].getTitulo() === tituloDeTarea) {
            this.tareas.splice(index, 1);             
        } else {
            throw new Error(`No se encontró una tarea con id = ${idTarea}, título = ${tituloDeTarea}.`);
        }                       
    }

    /**
     * Permite obtener todas las tareas del listado.
     * 
     * @returns Un array de instancias de `Tarea` que representan todas las tareas del listado.
     */
    public getTareas(): Tarea[]{
        return this.tareas;
    } 
}