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
            for(const tarea of coleccionDeTareas.getTareas()){
                file.writeToFile(`${tarea.getId()}`);
                file.writeToFile(`${tarea.getTitulo()}`);
                file.writeToFile(`${tarea.getDescripcion()}`);
                file.writeToFile(`${tarea.getFechaCreacion()}`);
                file.writeToFile(`${tarea.getFechaVencimiento()}`);
                file.writeToFile(`${tarea.getPrioridad()}`);
                file.writeToFile(`${tarea.getAvance()}`);
                file.writeToFile(`${tarea.getEstadoActual()}`);
                tarea.getEstados().forEach((value, key) => {
                    file.writeToFile(`key:${key}, value:${value}`);
                });
                file.writeToFile(`${tarea.getCategoria()?.getNombre()}`);
                for(const etiqueta of tarea.getEtiquetas()){
                    file.writeToFile(`${etiqueta.getNombre()}`);
                }
                file.writeToFile("");
            }
        } catch (error) {
            console.log("Error al intentar guardar.")
        } finally {
            file.close();
        }
    }
}