import { CustomFileClass } from "stdio";
import path from "path";
import ColeccionDeTareas from "./ListadoDeTareas";
import Tarea from "./tarea";
import moment, { Moment } from "moment";
export default class Saver{

    
    public GuardarColeccionDeTareasJson(coleccionDeTareas: ColeccionDeTareas): void {

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

    public GuardarColeccionDeTareasPlainText(coleccionDeTareas: ColeccionDeTareas): void {
        
        const file: CustomFileClass = new CustomFileClass();
        try {
            file.open(path.resolve("coleccionDeTareas.txt"),"w");
            coleccionDeTareas.getTareas().forEach(tarea => file.writeToFile(`- id: ${tarea.getId()}, título: ${tarea.getTitulo()}, estado: ${tarea.getEstadoActual()}, vencimiento: ${tarea.getFechaVencimiento().format('dddd Do MMMM YYYY')}.`));
        } catch (error) {
            console.log("Error al intentar guardar.")
        } finally {
            file.close();
        }
    }
}   