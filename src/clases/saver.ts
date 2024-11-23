import { CustomFileClass } from "stdio";
import path from "path";
import ListadoDeTarea from "./ListadoDeTareas";
import Tarea from "./tarea";
import Etiqueta from "./etiqueta";
export default class Saver{

    
    public GuardarColeccionDeTareasJson(coleccionDeTareas: ListadoDeTarea): void {

        const file: CustomFileClass = new CustomFileClass();
        try {
            file.open(path.resolve("coleccionDeTareas.json"), "w");
            file.writeToFile(JSON.stringify(coleccionDeTareas,null,2));
        } catch (error) {
            console.log("Error al intentar guardar.")
        } finally {
            file.close();
        }
    }

    public GuardarColeccionDeTareasPlainText(coleccionDeTareas: ListadoDeTarea): void {
        
        const file: CustomFileClass = new CustomFileClass();
        try {
            file.open(path.resolve("coleccionDeTareas.txt"),"w");
            coleccionDeTareas.getTareas().forEach(tarea => file.writeToFile(`${tarea.getId()} ${tarea.getTitulo()} ${tarea.getDescripcion()} ${tarea.getFechaCreacion()} ${tarea.getFechaVencimiento()} ${tarea.getPrioridad()} ${tarea.getAvance()} ${tarea.getEstadoActual()} ${tarea.getEstados()} ${tarea.getCategoria()?.getNombre()} ${tarea.getEtiquetas().forEach((etiqueta) => etiqueta.getNombre())}`));
        } catch (error) {
            console.log("Error al intentar guardar.")
        } finally {
            file.close();
        }
    }
}