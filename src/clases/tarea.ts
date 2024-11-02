    import Etiqueta from "./etiqueta";
    import Categoria from "./categoria";
    import moment, { Moment } from "moment";

    export default class Tarea{
        private id: number = 0;
        private titulo: string;
        private descripcion: string = "";
        private fechaCreacion: Moment = moment();
        private fechaVencimiento: Moment;
        private prioridad: Prioridad = Prioridad.Baja;
        private avance: Avance = Avance.Cero;
        private estados: Map<Estado,Moment>= new Map;
        private estadoActual: Estado = Estado.Pendiente; 
        private categoria: Categoria | undefined;
        private etiquetas: Etiqueta[] = [];

        constructor(titulo: string,diasParaCompletar: number){
            this.titulo = titulo;
            this.fechaVencimiento = this.fechaCreacion.clone().add(diasParaCompletar,'days');
            this.estados.set(Estado.Pendiente,this.fechaCreacion);
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

        public setFechaVencimiento(fechaVencimiento: Moment){ // cualquier formato de fecha de moment
            this.fechaVencimiento = fechaVencimiento;
        }

        public getFechaVencimiento(): Moment{
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
            if(!(this.estadoActual === estado)){
                this.estadoActual = estado;        
                const momentoActual:Moment = moment();
                this.estados.set(estado,momentoActual)
            } else {throw new Error(`La tarea ya se encuentra en el estado ${estado}.`);}
        
        }

        public getEstadoActual(): Estado{
            return this.estadoActual;
        }

        public getEstados(): Map<Estado,Moment>{
            return this.estados;
        }

        public setCategoria(categoria: Categoria): void{
            this.categoria = categoria;
        }

        public getCategoria(): Categoria | undefined{
            return this.categoria;
        }

        public setEtiqueta(etiqueta: Etiqueta): void{  
            this.etiquetas.push(etiqueta); //una tarea puede tener más de una etiqueta
        }

        public getEtiquetas(): Etiqueta[]{
            return this.etiquetas;
        }
    }