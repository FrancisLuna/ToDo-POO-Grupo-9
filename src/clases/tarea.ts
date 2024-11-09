import Etiqueta from "./etiqueta";
import Categoria from "./categoria";
import moment, { Moment } from "moment";
import { AVANCE } from "../enums/avance";
import { ESTADO } from "../enums/estado";
import { PRIORIDAD } from "../enums/prioridad";
moment.locale('es');

export default class Tarea {
    
    private id: number = 0;
    private titulo: string;
    private descripcion: string = "";
    private fechaCreacion: Moment = moment();
    private fechaVencimiento: Moment;
    private prioridad: PRIORIDAD;
    private avance: AVANCE;
    private estados: Map<ESTADO,Moment>;
    private estadoActual: ESTADO; 
    private categoria: Categoria | undefined;
    private etiquetas: Etiqueta[] = [];

    constructor(titulo: string,diasParaCompletar: number){
        this.titulo = titulo;
        this.fechaVencimiento = this.fechaCreacion.clone().add(diasParaCompletar,'days');
        this.prioridad = PRIORIDAD.Baja;
        this.avance = AVANCE["0%"];
        this.estados = new Map<ESTADO,Moment>;        
        this.estadoActual = this.setEstado(ESTADO.Pendiente);
    }

    public setId(id:number): void{
        this.id = id;
    }

    public getId(): number{
        return this.id;
    }

    public setTitulo(titulo: string): void{
        this.titulo = titulo;
    }

    public getTitulo(): string{
        return this.titulo;
    }

    public setDescripcion(descripcion: string): void{
        this.descripcion = descripcion;
    }

    public getDescripcion(): string{
    return this.descripcion;
    }

    public getFechaCreacion(): Moment{
        return this.fechaCreacion;
    }

    public setFechaVencimiento(fechaVencimiento: Moment): void{
        this.fechaVencimiento = fechaVencimiento;
    }

    public getFechaVencimiento(): Moment{
        return this.fechaVencimiento;
    }

    public setPrioridad(prioridad: PRIORIDAD): void{
        this.prioridad = prioridad;
    }

    public getPrioridad(): PRIORIDAD{
        return this.prioridad;
    }

    public setAvance(avance: AVANCE): void{
        this.avance = avance;
    }

    public getAvance(): AVANCE{
        return this.avance;
    }

    public setEstado(estado: ESTADO): ESTADO{
        if(!(this.estadoActual === estado)){
            this.estadoActual = estado;        
            const momentoActual:Moment = moment();
            this.estados.set(estado,momentoActual)
        } else {throw new Error(`La tarea ya se encuentra en el estado ${estado}.`);}
        return estado;        
    }

    public getEstadoActual(): ESTADO{
        return this.estadoActual;
    }

    public getEstados(): Map<ESTADO,Moment>{
        return this.estados;
    }

    public setCategoria(categoria: Categoria): void{
        this.categoria = categoria;
    }

    public getCategoria(): Categoria | undefined{
        return this.categoria;
    }

    public setEtiqueta(etiqueta: Etiqueta): void{  
        this.etiquetas.push(etiqueta);
    }

    public getEtiquetas(): Etiqueta[]{
        return this.etiquetas;
    }

    public eliminarEtiqueta(nombre: string): void{
        const index: number = this.etiquetas.findIndex(etiqueta => etiqueta.getNombre() === nombre);
        if (index !== -1) {
            this.etiquetas.splice(index, 1);
        }
    }    
}

