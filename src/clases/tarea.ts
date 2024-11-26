import Etiqueta from "./etiqueta";
import Categoria from "./categoria";
import moment, { Moment } from "moment";
import { AVANCE } from "../enums/avance";
import { ESTADO } from "../enums/estado";
import { PRIORIDAD } from "../enums/prioridad";
import EstadoInvalido from "../excepciones/estadoInvalido";
import ITarea from "../interfaces/iTarea";
import Validador from "./validador";

/**
 * Representa una tarea dentro de la aplicación.
 */
export default class Tarea implements ITarea{
    
    /**Contador estático para generar un ID único para cada tarea.*/
    private static constadorId: number = 1;

    /**Identificador único de la tarea.*/
    private id: number = 0;

    /**Título de la tarea.*/
    private titulo: string;

    /**Descripción de la tarea.*/
    private descripcion: string = "";

    /**Fecha de creación de la tarea, establecida automáticamente al crear la instancia.*/
    private fechaCreacion: Moment = moment();

    /**Fecha de vencimiento de la tarea, definida por el usuario.*/
    private fechaVencimiento: Moment;

    /**Prioridad de la tarea. Establecida automáticamente como Pendiente al crear la instancia de la tarea.*/
    private prioridad: PRIORIDAD;

    /**Nivel de avance de la tarea. Establecido automáticamente como 0 al crear la instancia de la tarea. */
    private avance: AVANCE;

    /**
     * Mapa que guarda el historial de estados de la tarea junto con sus respectivas fechas de cambio.
     * La clave es el estado y el valor es la fecha en la que se asignó ese estado.
     */
    private estados: Map<ESTADO,Moment>;

    /**Estado actual de la tarea.*/
    private estadoActual: ESTADO;

    /**Categoría a la cual pertenece la tarea.*/
    private categoria: Categoria | undefined;

    /**Etiquetas asignadas a la tarea.*/
    private etiquetas: Etiqueta[] = [];

    /**
     * Crea una instancia de Tarea.
     * @param titulo - Título de la tarea.
     * @param diasParaCompletar - Cantidad de días para completar la tarea.
     */
    constructor(titulo: string, diasParaCompletar: number){
        this.id = Tarea.constadorId++;
        Validador.validarTexto(titulo);
        this.titulo = titulo;
        this.fechaVencimiento = this.fechaCreacion.clone().add(diasParaCompletar,'days');
        this.prioridad = PRIORIDAD.Baja;
        this.avance = AVANCE["0%"];
        this.estados = new Map<ESTADO,Moment>;        
        this.estadoActual = this.setEstado(ESTADO.Pendiente);
    }

    /**
     * Permite obtener el identificador único de la tarea.
     * @returns El ID de la tarea.
     */
    public getId(): number{
        return this.id;
    }
    
    /**
     * Permite establecer el ID de una tarea
     * @param id el nuevo ID de la tarea
     */
    public setId(id: number):void{
        this.id = id;
    }

    /**
     * Permite asignar y actualizar el título de la tarea con un nuevo valor.
     * @param titulo - El nuevo título de la tarea.
     */
    public setTitulo(titulo: string): void{
        Validador.validarTexto(titulo);
        this.titulo = titulo;
    }

    /**
     * Permite obtener el título de la tarea.
     * @returns El título de la tarea.
     */
    public getTitulo(): string{
        return this.titulo;
    }

    /**
     * Permite asignar y actualizar la descripción de la tarea con un nuevo valor.
     * @param descripcion - La nueva descripción de la tarea.
     */
    public setDescripcion(descripcion: string): void{
        Validador.validarTexto(descripcion)
        this.descripcion = descripcion;
    }

    /**
     * Permite obtener la descripçión de la tarea.
     * @returns La descripción de la tarea.
     */
    public getDescripcion(): string{
    return this.descripcion;
    }

    /**
     * Permite asignar y actualizar la fecha de creación de la tarea con una nueva fecha.
     * @param fechaCreacion - La nueva fecha de creación de la tarea.
     */
    public setFechaCreacion(fechaCreacion: Moment): void{
        this.fechaCreacion = fechaCreacion;
    }

    /**
     * Permite obtener la fecha de creación de la tarea.
     * @returns La fecha de creación de la tarea.
     */
    public getFechaCreacion(): Moment{
        return this.fechaCreacion;
    }

    /**
     * Permite asignar y actualizar la fecha de vencimiento de la tarea con una nueva fecha.
     * @param fechaVencimiento - La nueva fecha de vencimiento de la tarea.
     */
    public setFechaVencimiento(fechaVencimiento: Moment): void{
        this.fechaVencimiento = fechaVencimiento;
    }

    /**
     * Permite obtener la fecha de vencimiento de la tarea.
     * @returns La fecha de vencimiento de la tarea.
     */
    public getFechaVencimiento(): Moment{
        return this.fechaVencimiento;
    }

    /**
     * Permite asignar y actualizar el nivel de prioridad de la tarea.
     * @param prioridad - La nueva prioridad de la tarea, que debe ser un valor del tipo `PRIORIDAD`.
     */
    public setPrioridad(prioridad: PRIORIDAD): void{
        this.prioridad = prioridad;
    }

    /**
     * Permite obtener el nivel de prioridad que tiene la tarea.
     * @returns La prioridad de la tarea.
     */
    public getPrioridad(): PRIORIDAD{
        return this.prioridad;
    }

    /**
     * Permite asignar y actualizar el nivel de avance de la tarea.
     * @param avance - El nuevo nivel de avance de la tarea, que debe ser un valor del tipo `AVANCE`.
     */
    public setAvance(avance: AVANCE): void{
        this.avance = avance;
    }

    /**
     * Permite obtener el nivel de avance de la tarea. 
     * @returns El nivel de avance de la tarea.
     */
    public getAvance(): AVANCE{
        return this.avance;
    }

    /**
     * Permite establecer el estado de la tarea y actualiza el historial de cambios.
     * @param estado - El nuevo estado que se va a asignar a la tarea.
     * @returns El nuevo estado que se va a asignar a la tarea.
     */
    public setEstado(estado: ESTADO): ESTADO{
        if(!(this.estadoActual === estado)){
            this.estadoActual = estado;        
            const momentoActual:Moment = moment();
            this.estados.set(estado,momentoActual)
        }else {
            throw new EstadoInvalido(`La tarea ya se encuentra en el estado ${estado}.`);
        }
        return estado;        
    }

    /**
     * Permite establecer los estados guardados de la tarea
     * @param key - El estado que se desea modificar
     * @param value - el momento que se desea asignar al estado
     */
    public setEstados(key: ESTADO, value: Moment): void{
        this.estados.set(key,value);
    }

    /**
     * Permite obtener el estado actual de la tarea.
     * @returns El estado actual de la tarea.
     */
    public getEstadoActual(): ESTADO{
        return this.estadoActual;
    }

    /**
     * Permite obtener el historial de cambios de estado de la tarea.
     * @returns Un mapa con los estados de la tarea y sus respectivas fechas de cambio.
     */
    public getEstados(): Map<ESTADO,Moment>{
        return this.estados;
    }

    /**
     * Permite asignar y actualizar la categoria a la tarea.
     * @param categoria - La nueva categoria de la tarea.
     */
    public setCategoria(categoria: Categoria): void{
        this.categoria = categoria;
    }

    /**
     * Permite obtener la categoría de la tarea.
     * @returns La categoría de la tarea.
     */
    public getCategoria(): Categoria | undefined{
        return this.categoria;
    }

    /**
     * Permite agregar una nueva etiqueta al listado de etiquetas que puede tener la tarea.
     * @param etiqueta - La nueva etiqueta a agregar.
     */
    public setEtiqueta(etiqueta: Etiqueta): void{  
        this.etiquetas.push(etiqueta);
    }

    /**
     * Permite obtener las etiquetas asignadas a la tarea.
     * @returns Las etiquetas asignadas a la tarea.
     */
    public getEtiquetas(): Etiqueta[]{
        return this.etiquetas;
    }

    /**
     * Permite eliminar una etiqueta del listado de etiquetas de la tarea.
     * @param nombre - El nombre de la etiqueta que se desea eliminar.
     */
    public eliminarEtiqueta(nombre: string): void{
        const index: number = this.etiquetas.findIndex(etiqueta => etiqueta.getNombre() === nombre);
        if (index !== -1) {
            this.etiquetas.splice(index, 1);
        }
    }    
}

