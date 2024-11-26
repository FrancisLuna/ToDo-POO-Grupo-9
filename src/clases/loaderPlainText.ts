import { CustomFileClass } from "stdio";
import path from "path";
import TareaBuilder from "./tareaBuilder";
import { PRIORIDAD } from "../enums/prioridad";
import { AVANCE } from "../enums/avance";
import { ESTADO } from "../enums/estado";
import Categoria from "./categoria";
import Etiqueta from "./etiqueta";
import moment from "moment";
import Tarea from "./tarea";
import ITarea from "../interfaces/iTarea";
import Loader from "../interfaces/loader";

/**
 * Clase encargada de cargar colecciones de tareas desde un archivo de texto plano.
 */
export default class LoaderPlainText implements Loader{
    private builder: TareaBuilder;

    /**
     * Constructor de la clase LoaderPlainText.
     * 
     * @param builder - Instancia de TareaBuilder utilizada para construir objetos `Tarea`.
     */
    constructor(builder: TareaBuilder) {
        this.builder = builder;
    }

    /**
     * Carga una colección de tareas desde un archivo de texto plano.
     * 
     * El archivo debe estar estructurado con líneas que representen propiedades de cada tarea.
     * Los datos de una tarea termina con un salto de línea. Cuando se encuentra un salto de línea, se 
     * agrega la tarea construida a la colección.
     * @returns Una promesa que se resuelve con un array de tareas (`ITarea[]`) cargadas desde el archivo.
     * 
     * @throws Error - Si ocurre un problema al abrir o leer el archivo.
     */
    public async cargar(): Promise<ITarea[]> {
        const file = new CustomFileClass();
        const tareas: ITarea[] = [];

        try {
            file.open(path.resolve("coleccionDeTareas.txt"), "r");

            let itLine = await file.readLine().next();
            while (!itLine.done) {
                const line = itLine.value.trim();

                if (line.startsWith("ID: ")) {
                    this.builder.reset();
                    this.builder.buildId(Number(this.extraerValor(line, "ID: ")));
                } else if (line.startsWith("Título: ")) {
                    this.builder.buildTitulo(this.extraerValor(line, "Título: "));
                } else if (line.startsWith("Descripción: ")) {
                    this.builder.buildDescripcion(this.extraerValor(line, "Descripción: "));
                } else if (line.startsWith("Fecha de creación: ")) {
                    this.builder.buildFechaCreacion(
                        moment(this.extraerValor(line, "Fecha de creación: "))
                    );
                } else if (line.startsWith("Fecha de vencimiento: ")) {
                    this.builder.buildFechaVencimiento(
                        moment(this.extraerValor(line, "Fecha de vencimiento: "))
                    );
                } else if (line.startsWith("Prioridad: ")) {
                    this.builder.buildPrioridad(this.extraerValor(line, "Prioridad: ") as PRIORIDAD);
                } else if (line.startsWith("Avance: ")) {
                    this.builder.buildAvance(
                        Number(this.extraerValor(line, "Avance: ")) as AVANCE
                    );
                } else if (line.startsWith("Estado actual: ")) {
                    this.builder.buildEstado(
                        this.extraerValor(line, "Estado actual: ") as ESTADO
                    );
                } else if (line.startsWith("Historial de estados: ")) {
                    const historialString = this.extraerValor(line, "Historial de estados: ");
                    const historialArray = historialString.split(",");
                    for (let i = 0; i < historialArray.length; i += 2) {
                        const estado = historialArray[i] as ESTADO;
                        const fecha = moment(historialArray[i + 1]);
                        this.builder.buildEstados(estado, fecha);
                    }
                } else if (line.startsWith("Categoría: ")) {
                    this.builder.buildCategoria(new Categoria(this.extraerValor(line, "Categoría: ")));
                } else if (line.startsWith("Etiquetas: ")) {
                    const etiquetas = this.extraerValor(line, "Etiquetas: ").split(",");
                    etiquetas.forEach((etiqueta) =>
                        this.builder.buildEtiqueta(new Etiqueta(etiqueta))
                    );
                } else if (line.length === 0) {
                    if (this.builder.construido()) {
                        const nuevaTarea = this.builder.getResult();
                        if (nuevaTarea) tareas.push(nuevaTarea);
                    }
                }
                itLine = await file.readLine().next();
            }
        } catch (error) {
            console.error("Error al intentar cargar el archivo <coleccionDeTareas.txt>", error);
        } finally {
            file.close();
        }

        return tareas;
    }

    /**
     * Extrae el valor asociado a una clave en una línea de texto.
     * 
     * @param line - Línea de texto de la cual se extraerá el valor.
     * @param key - Clave que precede al valor en la línea.
     * @returns El valor asociado a la clave en la línea.
     */
    private extraerValor(line: string, key: string): string {
        return line.replace(key, "").trim();
    }
}
