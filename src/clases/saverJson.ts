import { CustomFileClass } from "stdio";
import path from "path";
import ListadoDeTarea from "./ListadoDeTareas";

/**
 * Clase encargada de guardar colecciones de tareas en formato JSON.
 */
export default class SaverJson {

    /**
     * Guarda una colección de tareas en un archivo JSON.
     * 
     * @param coleccionDeTareas - Instancia de ListadoDeTarea que contiene las tareas a guardar.
     * 
     * @throws Error - Si ocurre un problema al abrir o escribir en el archivo.
     */
    public guardarColeccionDeTareasJson(coleccionDeTareas: ListadoDeTarea): void {
        const file: CustomFileClass = new CustomFileClass();
        const tareasData = [];
        try {
            // Abre el archivo en modo escritura.
            file.open(path.resolve("coleccionDeTareas.json"), "w");

            // Itera sobre las tareas y las transforma a un formato serializable.
            for (const tarea of coleccionDeTareas.getTareas()) {
                const tareaData: Map<string, string> = new Map([
                    ["ID", `${tarea.getId()}`],
                    ["Título", `${tarea.getTitulo()}`],
                    ["Descripción", `${tarea.getDescripcion()}`],
                    ["Fecha de creación", `${tarea.getFechaCreacion()}`],
                    ["Fecha de vencimiento", `${tarea.getFechaVencimiento()}`],
                    ["Prioridad", `${tarea.getPrioridad()}`],
                    ["Avance", `${tarea.getAvance()}`],
                    ["Estado actual", `${tarea.getEstadoActual()}`],
                    ["Historial de estados", `${Array.from(tarea.getEstados())}`],
                    ["Categoría", `${tarea.getCategoria()?.getNombre()}`],
                    ["Etiquetas", `${tarea.getEtiquetas().map(etiqueta => etiqueta.getNombre())}`]
                ]);
                tareasData.push(Array.from(tareaData));
            }

            // Escribe el archivo JSON.
            file.writeToFile(JSON.stringify(tareasData, null, 2));
        } catch (error) {
            console.log("Error al intentar guardar.");
        } finally {
            // Cierra el archivo, independientemente de si hubo un error o no.
            file.close();
        }
    }

}
