import { CustomFileClass } from "stdio";
import path from "path";
import ListadoDeTarea from "./ListadoDeTareas";

/**
 * Clase encargada de guardar colecciones de tareas en formato texto plano.
 */
export default class SaverPlainText {

    /**
     * Guarda una colección de tareas en un archivo de texto plano.
     * 
     * @param coleccionDeTareas - Instancia de ListadoDeTarea que contiene las tareas a guardar.
     * 
     * @throws Error - Si ocurre un problema al abrir o escribir en el archivo.
     */
    public guardarColeccionDeTareasPlainText(coleccionDeTareas: ListadoDeTarea): void {
        const file: CustomFileClass = new CustomFileClass();
        try {
            // Abre el archivo en modo escritura y limpia su contenido.
            file.open(path.resolve("coleccionDeTareas.txt"), "w");
            file.writeToFile("");

            // Itera sobre las tareas y las guarda en formato texto plano.
            for (const tarea of coleccionDeTareas.getTareas()) {
                const tareaData: Map<string, string> = new Map([
                    ["ID", `${tarea.getId()}`],
                    ["Título", `${tarea.getTitulo()}`],
                    ["Descripción", `${tarea.getDescripcion()}`],
                    ["Fecha de creación", `${tarea.getFechaCreacion().locale("es")}`],
                    ["Fecha de vencimiento", `${tarea.getFechaVencimiento().locale("es")}`],
                    ["Prioridad", `${tarea.getPrioridad()}`],
                    ["Avance", `${tarea.getAvance()}`],
                    ["Estado actual", `${tarea.getEstadoActual()}`],
                    ["Historial de estados", `${Array.from(tarea.getEstados())}`],
                    ["Categoría", `${tarea.getCategoria()?.getNombre()}`],
                    ["Etiquetas", `${tarea.getEtiquetas().map(etiqueta => etiqueta.getNombre())}`]
                ]);
                // Escribe cada par clave-valor de la tarea en el archivo.
                tareaData.forEach((value, key) => file.writeToFile(`${key}: ${value}`));
                file.writeToFile(""); // Línea vacía entre tareas.
            }

            // Indica el final del archivo.
            file.writeToFile("END OF FILE");
        } catch (error) {
            console.log("Error al intentar guardar.");
        } finally {
            // Cierra el archivo, independientemente de si hubo un error o no.
            file.close();
        }
    }

}