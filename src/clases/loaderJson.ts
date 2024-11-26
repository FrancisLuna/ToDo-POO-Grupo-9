import { CustomFileClass } from "stdio";
import path from "path";
import TareaBuilder from "./tareaBuilder";
import { PRIORIDAD } from "../enums/prioridad";
import { AVANCE } from "../enums/avance";
import { ESTADO } from "../enums/estado";
import Categoria from "./categoria";
import Etiqueta from "./etiqueta";
import moment from "moment";
import ITarea from "../interfaces/iTarea";
import Loader from "../interfaces/loader";

/**
 * Clase encargada de cargar colecciones de tareas desde un archivo JSON.
 */
export default class LoaderJson implements Loader{

    private builder: TareaBuilder;

    /**
     * Constructor de la clase LoaderJson.
     *
     * @param builder - Instancia de `TareaBuilder` utilizada para construir objetos `Tarea`.
     */
    constructor(builder: TareaBuilder) {
        this.builder = builder;
    }

    /**
     * Carga una colección de tareas desde un archivo JSON.
     *
     * El archivo debe contener una estructura JSON en la que cada tarea esté representada
     * como una lista de pares clave-valor.
     *
     * @returns Una promesa que se resuelve con un array de tareas (`ITarea[]`) cargadas desde el archivo JSON.
     *
     * @throws Error - Si ocurre un problema al abrir, leer o parsear el archivo JSON.
     */
    public async cargar(): Promise<ITarea[]> {
        const tareas: ITarea[] = [];
        const file: CustomFileClass = new CustomFileClass();

        try {
            file.open(path.resolve("coleccionDeTareas.json"), "r");

            let itLine = await file.readLine().next();
            let fileContent = "";

            while (!itLine.done) {
                fileContent += itLine.value;

                if (fileContent.trim().endsWith("],") || fileContent.trim().endsWith("]]")) {
                    try {
                        const cleanContent = fileContent.endsWith(",") 
                            ? fileContent.slice(0, -1) 
                            : fileContent;
                        const dataChunk: any[][][] = JSON.parse(cleanContent);

                        for (const tareaData of dataChunk) {
                            this.procesarTarea(tareaData, tareas);
                        }
                        fileContent = "";
                    } catch (error) {
                        console.error("Error al parsear JSON:", error);
                    }
                }

                itLine = await file.readLine().next();
            }
        } catch (error) {
            console.error("Error al cargar el archivo JSON:", error);
        } finally {
            
            file.close();
        }

        return tareas;
    }

    /**
     * Procesa un conjunto de datos representando una tarea y lo añade al arreglo de tareas.
     *
     * @param tareaData - Un array de pares clave-valor que representa una tarea.
     * @param tareas - Array donde se almacenan las tareas procesadas.
     */
    private procesarTarea(tareaData: any[][], tareas: ITarea[]): void {
        this.builder.reset();

        for (const [key, value] of tareaData) {
            switch (key) {
                case "ID":
                    this.builder.buildId(Number(value));
                    break;
                case "Título":
                    this.builder.buildTitulo(value);
                    break;
                case "Descripción":
                    this.builder.buildDescripcion(value);
                    break;
                case "Fecha de creación":
                    this.builder.buildFechaCreacion(moment(value));
                    break;
                case "Fecha de vencimiento":
                    this.builder.buildFechaVencimiento(moment(value));
                    break;
                case "Prioridad":
                    this.builder.buildPrioridad(value as PRIORIDAD);
                    break;
                case "Avance":
                    this.builder.buildAvance(Number(value) as AVANCE);
                    break;
                case "Estado actual":
                    this.builder.buildEstado(value as ESTADO);
                    break;
                case "Historial de estados":
                    const historialArray = value.split(",");
                    for (let i = 0; i < historialArray.length; i += 2) {
                        const estado = historialArray[i] as ESTADO;
                        const fecha = moment(historialArray[i + 1]);
                        this.builder.buildEstados(estado, fecha);
                    }
                    break;
                case "Categoría":
                    this.builder.buildCategoria(new Categoria(value));
                    break;
                case "Etiquetas":
                    const etiquetas: string[] = value.split(",");
                    etiquetas.forEach((etiqueta) =>
                        this.builder.buildEtiqueta(new Etiqueta(`${etiqueta}`))
                    );
                    break;
            }
        }
        if (this.builder.construido()) {
            const nuevaTarea = this.builder.getResult();
            if (nuevaTarea) tareas.push(nuevaTarea);
        }
    }
}
