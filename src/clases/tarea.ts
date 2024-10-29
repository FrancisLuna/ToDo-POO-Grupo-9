import Clasificador from "../interfaces/clasificador";


export default class Tarea{
    private titulo: string;
    private descripcion: string = "";
    private fechaCreacion: Date;
    private fechaVencimiento: Date;
    private prioridad: Prioridad = Prioridad.Baja;
    private avance: Avance = Avance.Cero;
    private estado: Estado = Estado.Pendiente;
    private categoria: Clasificador;
    private etiquetas: Clasificador[] = [];

    constructor(titulo: string, creadorDeFecha: CreadorDeFecha, fechaVencimiento: Date, prioridad: Prioridad, categoria: Clasificador){
        this.titulo = titulo;
        this.fechaCreacion = creadorDeFecha.getFechaActual();
        this.fechaVencimiento = fechaVencimiento;
        this.categoria = categoria;
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

    public getFechaCreacion(): Date{
        return this.fechaCreacion;
    }

    public setFechaVencimiento(fechaVencimiento: Date){
        this.fechaVencimiento = fechaVencimiento;
    }

    public getFechaVencimiento(): Date{
        return this.fechaVencimiento;
    }

    public setPrioridad(prioridad: Prioridad): void{
        this.prioridad = prioridad;
    }

    public getPrioridad(): Prioridad{
        return this.prioridad;
    }

    public setAvance(avance: Avance): void{
        this.avance = avance;
    }

    public getAvance(): Avance{
        return this.avance;
    }

    public setEstado(estado: Estado): void{
        this.estado = estado;
    }

    public getEstado(): Estado{
        return this.estado;
    }

    public setCategoria(categoria: Clasificador): void{
        this.categoria = categoria;
    }

    public getCategoria(): Clasificador{
        return this.categoria;
    }

    public setEtiqueta(etiqueta: Clasificador): void{  
        this.etiquetas.push(etiqueta); //una tarea puede tener más de una etiqueta
    }

    public getEtiquetas(): Clasificador[]{
        return this.etiquetas;
    }
}