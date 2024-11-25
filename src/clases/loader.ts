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

moment.locale("es");

export default class Loader {
    private builder: TareaBuilder;

    constructor(builder: TareaBuilder) {
        this.builder = builder;
    }

    public async cargarColeccionDeTareasPlainText(): Promise<Tarea[]> {
        const file = new CustomFileClass();
        const tareas: Tarea[] = [];

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

    private extraerValor(line: string, key: string): string {
        return line.replace(key, "").trim();
    }

    public async cargarColeccionDeTareasJson(): Promise<Tarea[]> {
        const tareas: Tarea[] = [];
        const file: CustomFileClass = new CustomFileClass();

        try {
            file.open(path.resolve("coleccionDeTareas.json"), "r");

            let itLine = await file.readLine().next();
            let fileContent = "";
            while (!itLine.done) {
                fileContent += itLine.value; 
                itLine = await file.readLine().next();
            }

            const data: any[][][] = JSON.parse(fileContent);

            for (const tareaData of data) {
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
        } catch (error) {
            console.error("Error al cargar el archivo JSON:", error);
        } finally {
            file.close();
        }

        return tareas;
    }
}