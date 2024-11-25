import { CustomFileClass } from "stdio";
import path from "path";
import ListadoDeTarea from "./ListadoDeTareas";
import Tarea from "./tarea";
import Etiqueta from "./etiqueta";

export default class Saver {

    public guardarColeccionDeTareasJson(coleccionDeTareas: ListadoDeTarea): void {
        const file: CustomFileClass = new CustomFileClass();
        const tareasData = [];
        try {
            file.open(path.resolve("coleccionDeTareas.json"), "w");

            for (const tarea of coleccionDeTareas.getTareas()) {
                const tareaData: Map<string,string> = new Map([
                    ["ID",`${tarea.getId()}`],
                    ["Título",`${tarea.getTitulo()}`],
                    ["Descripción",`${tarea.getDescripcion()}`],
                    ["Fecha de creación", `${tarea.getFechaCreacion()}`],
                    ["Fecha de vencimiento",`${tarea.getFechaVencimiento()}`],
                    ["Prioridad",`${tarea.getPrioridad()}`],
                    ["Avance",`${tarea.getAvance()}`],
                    ["Estado actual",`${tarea.getEstadoActual()}`],
                    ["Historial de estados",`${Array.from(tarea.getEstados())}`],
                    ["Categoría",`${tarea.getCategoria()?.getNombre()}`],
                    ["Etiquetas",`${tarea.getEtiquetas().map(etiqueta => etiqueta.getNombre())}`]
                ]);
                tareasData.push(Array.from(tareaData));
            }

            file.writeToFile(JSON.stringify(tareasData, null, 2));
            
        } catch (error) {
            console.log("Error al intentar guardar.")
        } finally {
            file.close();
        }
    
    }

    public guardarColeccionDeTareasPlainText(coleccionDeTareas: ListadoDeTarea): void {
        
        const file: CustomFileClass = new CustomFileClass();
        try {
            file.open(path.resolve("coleccionDeTareas.txt"),"w");
            file.writeToFile("");
            for(const tarea of coleccionDeTareas.getTareas()){
                const tareaData: Map<string,string> = new Map([
                    ["ID",`${tarea.getId()}`],
                    ["Título",`${tarea.getTitulo()}`],
                    ["Descripción",`${tarea.getDescripcion()}`],
                    ["Fecha de creación", `${tarea.getFechaCreacion()}`],
                    ["Fecha de vencimiento",`${tarea.getFechaVencimiento()}`],
                    ["Prioridad",`${tarea.getPrioridad()}`],
                    ["Avance",`${tarea.getAvance()}`],
                    ["Estado actual",`${tarea.getEstadoActual()}`],
                    ["Historial de estados",`${Array.from(tarea.getEstados())}`],
                    ["Categoría",`${tarea.getCategoria()?.getNombre()}`],
                    ["Etiquetas",`${tarea.getEtiquetas().map(etiqueta => etiqueta.getNombre())}`]
                ]);
                tareaData.forEach((value,key) => file.writeToFile(`${key}: ${value}`) );
                file.writeToFile("");             
            }
            file.writeToFile("END OF FILE");
        } catch (error) {
            console.log("Error al intentar guardar.")
        } finally {
            file.close();
        }
    }
}