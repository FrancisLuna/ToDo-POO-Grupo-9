
import Tarea from "./tarea"

export default class ColeccionDeTareas{

    private tareas: Tarea[] = [];

    public agregarTareaAColeccion(nuevaTarea: Tarea): void{   
        this.tareas.push(nuevaTarea);
    }

    public eliminarTareaDeColeccion(idTarea: number, tituloDeTarea: string): void{                      
        const index: number = this.tareas.findIndex(tarea => tarea.getId() === idTarea);
        const tareaAEliminar: Tarea | undefined = this.tareas.find(tarea => tarea.getTitulo() === tituloDeTarea);        
        if (index !== -1 && tareaAEliminar && this.tareas[index].getTitulo() === tituloDeTarea) {
            this.tareas.splice(index, 1);             
        } else {throw new Error(`No se encontró una tarea con id = ${idTarea}, título = ${tituloDeTarea}.`);}                       
    }

    public getTareas(): Tarea[]{
        return this.tareas;
    }    
}