import Tarea from "./tarea";
import ITarea from "../interfaces/iTarea";
import Etiqueta from "./etiqueta";
import Categoria from "./categoria";
import { AVANCE } from "../enums/avance";
import { ESTADO } from "../enums/estado";
import { PRIORIDAD } from "../enums/prioridad";
import moment, { Moment } from "moment";
moment.locale('es');

/**
 * Clase TareaBuilder
 * 
 * Implementa el patrón de diseño Builder para construir instancias de `ITarea` paso a paso.
 */
export default class TareaBuilder {

    /**
     * Instancia temporal de ITarea que se construye paso a paso.
     */
    private tarea: ITarea | undefined;

    /**
     * Reinicia el estado del builder creando una nueva instancia de Tarea con valores predeterminados.
     * @returns {ITarea} Una nueva instancia de `ITarea`.
     */
    public reset(): ITarea {
        return this.tarea = new Tarea("Predeterminado", 30) as ITarea;
    }

    /**
     * Establece el identificador único de la tarea.
     * @param {number} id - El ID único para la tarea.
     */
    public buildId(id: number): void {
        this.tarea?.setId(id);
    }

    /**
     * Establece el título de la tarea.
     * @param {string} titulo - El título descriptivo de la tarea.
     */
    public buildTitulo(titulo: string): void {
        this.tarea?.setTitulo(titulo);
    }

    /**
     * Establece la descripción de la tarea.
     * @param {string} descripcion - La descripción detallada de la tarea.
     */
    public buildDescripcion(descripcion: string): void {
        this.tarea?.setDescripcion(descripcion);
    }

    /**
     * Define la fecha de creación de la tarea.
     * @param {Moment} fecha - La fecha en la que se creó la tarea.
     */
    public buildFechaCreacion(fecha: Moment): void {
        this.tarea?.setFechaCreacion(fecha);
    }

    /**
     * Define la fecha de vencimiento de la tarea.
     * @param {Moment} fecha - La fecha en la que vence la tarea.
     */
    public buildFechaVencimiento(fecha: Moment): void {
        this.tarea?.setFechaVencimiento(fecha);
    }

    /**
     * Establece el nivel de prioridad de la tarea.
     * @param {PRIORIDAD} prioridad - La prioridad, representada por un enum.
     */
    public buildPrioridad(prioridad: PRIORIDAD): void {
        this.tarea?.setPrioridad(prioridad);
    }

    /**
     * Define el estado de avance de la tarea.
     * @param {AVANCE} avance - El nivel de avance, representado por un enum.
     */
    public buildAvance(avance: AVANCE): void {
        this.tarea?.setAvance(avance);
    }

    /**
     * Establece el estado actual de la tarea.
     * @param {ESTADO} estado - El estado actual, representado por un enum.
     */
    public buildEstado(estado: ESTADO): void {
        this.tarea?.setEstado(estado);
    }

    /**
     * Agrega o actualiza un estado en el historial de estados de la tarea.
     * Si el estado "Pendiente" no está configurado, lo asigna automáticamente con la fecha de creación.
     * @param {ESTADO} key - La clave que representa el estado.
     * @param {Moment} value - La fecha asociada con el estado.
     */
    public buildEstados(key: ESTADO, value: Moment): void {
        if (this.tarea?.getFechaCreacion() !== this.tarea?.getEstados().get(ESTADO.Pendiente)) {
            this.tarea?.setEstados(ESTADO.Pendiente, this.tarea.getFechaCreacion());
        }
        this.tarea?.setEstados(key, value);
    }

    /**
     * Asocia una categoría a la tarea.
     * @param {Categoria} categoria - La categoría asignada a la tarea.
     */
    public buildCategoria(categoria: Categoria): void {
        this.tarea?.setCategoria(categoria);
    }

    /**
     * Agrega una etiqueta a la tarea.
     * @param {Etiqueta} etiqueta - La etiqueta que se desea asignar.
     */
    public buildEtiqueta(etiqueta: Etiqueta): void {
        this.tarea?.setEtiqueta(etiqueta);
    }

    /**
     * Devuelve la instancia de la tarea construida.
     * @returns {ITarea | undefined} La tarea construida o `undefined` si no se ha inicializado.
     */
    public getResult(): ITarea | undefined {
        return this.tarea;
    }

    /**
     * Indica si la tarea ha sido inicializada y está lista para ser utilizada.
     * @returns {boolean} `true` si la tarea ha sido inicializada, de lo contrario, `false`.
     */
    public construido(): boolean {
        return !!this.tarea;
    }
}

