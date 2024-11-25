import Tarea from "./tarea";
import Etiqueta from "./etiqueta";
import Categoria from "./categoria";
import { AVANCE } from "../enums/avance";
import { ESTADO } from "../enums/estado";
import { PRIORIDAD } from "../enums/prioridad";
import moment, { Moment } from "moment";
moment.locale('es');

export default class TareaBuilder{

    private tarea: Tarea | undefined;

    public reset(): Tarea{
        return this.tarea = new Tarea("",30);
    }

    public buildId(id: number): void{
        this.tarea?.setId(id);
    }

    public buildTitulo(titulo:string): void{
        this.tarea?.setTitulo(titulo)
    }

    public buildDescripcion(descripcion: string): void{
        this.tarea?.setDescripcion(descripcion);
    }

    public buildFechaCreacion(fecha: Moment): void{
        this.tarea?.setFechaCreacion(fecha);
    }

    public buildFechaVencimiento(fecha: Moment): void{
        this.tarea?.setFechaVencimiento(fecha);
    }

    public buildPrioridad(prioridad: PRIORIDAD): void{
        this.tarea?.setPrioridad(prioridad);
    }

    public buildAvance(avance: AVANCE): void{
        this.tarea?.setAvance(avance);
    }

    public buildEstado(estado: ESTADO): void{
        this.tarea?.setEstado(estado);
    }

    public buildEstados(key: ESTADO, value: Moment): void{
        this.tarea?.setEstados(key,value);
    }

    public buildCategoria(categoria: Categoria): void{
        this.tarea?.setCategoria(categoria);
    }

    public buildEtiqueta(etiqueta: Etiqueta): void{
        this.tarea?.setEtiqueta(etiqueta);
    }

    public getResult(): Tarea|undefined{
        return this.tarea;
    }

    public construido(): boolean {
        return !!this.tarea;
    }
}
