import { Moment } from "moment";
import { PRIORIDAD } from "../enums/prioridad";
import { AVANCE } from "../enums/avance";
import { ESTADO } from "../enums/estado";
import Categoria from "../clases/categoria";
import Etiqueta from "../clases/etiqueta";

/**
 * Interfaz constructora que declara los pasos de construcción de un objeto Tarea.
 */

export default interface ITarea{

    setId(id: number): void;
    setTitulo(titulo: string): void;
    setDescripcion(descripcion: string): void;
    setFechaCreacion(fechaCreacion: Moment): void;
    setFechaVencimiento(fechaVencimiento: Moment): void;
    setPrioridad(prioridad: PRIORIDAD): void;
    setAvance(avance: AVANCE): void;
    setEstado(estado: ESTADO): ESTADO;
    setEstados(key: ESTADO, value: Moment): void;
    setCategoria(categoria: Categoria): void;
    setEtiqueta(etiqueta: Etiqueta): void;
    getFechaCreacion(): Moment;
    getEstados(): Map<ESTADO,Moment>;
}