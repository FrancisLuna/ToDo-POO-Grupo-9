
import Tarea from "./tarea"

export default class ColeccionDeTareas{

    private tareas: Tarea[] = [];

    private errorTareaNoEncontrada(idTarea: number, tituloDeTarea: string): void {
        throw new Error(`No se encontró una tarea con id = ${idTarea}, título = ${tituloDeTarea}.`);
    }

    public agregarTareaAColeccion(nuevaTarea: Tarea): void{   
        this.tareas.push(nuevaTarea);
    }

    public eliminarTareaDeColeccion(idTarea: number, TituloDeTarea: string): void{                      
        const index: number = this.tareas.findIndex(tarea => tarea.getId() === idTarea);
        const tareaAEliminar: Tarea | undefined = this.tareas.find(tarea => tarea.getTitulo() === TituloDeTarea);        
        if (index !== -1 && tareaAEliminar && this.tareas[index].getTitulo() === TituloDeTarea) {
            this.tareas.splice(index, 1);             
        } else {this.errorTareaNoEncontrada(idTarea,TituloDeTarea);}                       
    }
}