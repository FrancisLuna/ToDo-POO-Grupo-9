import CreadorDeTarea from "./creadorDeTarea";
import CreadorDeClasificador from "./creadorDeClasificador";
import moment, { Moment } from "moment";
import Tarea from "./tarea"
import Categoria from "./categoria";
import Etiqueta from "./etiqueta";
import IdNoCorrespondeATareaVigente from "./excepciones/idNoCorrespondeATareaVigente";

export default class GestorDeTarea{

    private tareas: Tarea[];
    private categorias: Array<Categoria>;
    private etiquetas: Array<Etiqueta>
    private creadorDeTareas: CreadorDeTarea;
    private creadorDeClasificador: CreadorDeClasificador;

    constructor(tareas: Array<Tarea>, categorias: Array<Categoria>, etiquetas: Array<Etiqueta>, creadorDeTareas: CreadorDeTarea, creadorDeClasificador: CreadorDeClasificador){
        this.creadorDeTareas = creadorDeTareas;
        this.tareas = tareas;
        this.categorias = categorias;
        this.etiquetas = etiquetas;
        this.creadorDeClasificador = creadorDeClasificador
    }

    private errorIdNoEncontrado(idTarea: number): void {
        throw new IdNoCorrespondeATareaVigente(`No se encontró una tarea con id = ${idTarea}.`);
    }

    private obtenerTareaPorId(idTarea: number): Tarea | undefined {
        const tarea: Tarea | undefined = this.tareas.find(tarea => tarea.getId() === idTarea);
        if (!tarea) {
            this.errorIdNoEncontrado(idTarea);
        }
        return tarea;
    }

    public agregarTareaALista(): void{
        const nuevaTarea: Tarea = this.creadorDeTareas.instanciarTarea();
        nuevaTarea.setId(this.tareas.length + 1);
        nuevaTarea.setTitulo(`Tarea${nuevaTarea.getId()}`);
        this.tareas.push(nuevaTarea);
    }

    public agregarCategoriaALista(nombre: string): void{
        const nuevaCategoria: Categoria = this.creadorDeClasificador.instanciarCategoria(nombre);
        this.categorias.push(nuevaCategoria);
    }

    public agregarEtiquetaALista(nombre: string): void{
        const nuevaEtiqueta: Etiqueta = this.creadorDeClasificador.instanciarEtiqueta(nombre);
        this.etiquetas.push(nuevaEtiqueta);
    }

    public eliminarTareaDeLista(id: number): void{                      
        const index: number = this.tareas.findIndex((tarea) => tarea.getId() === id);        
        if (index !== -1) {
            this.tareas.splice(index, 1);             
        }                       
    }

    public eliminarCategoriaDeLista(nombre: string): void{
        const index: number = this.categorias.findIndex(categoria => categoria.getNombre() === nombre);
        if (index !== -1) {
            this.categorias.splice(index, 1);
        }       
    }

    public eliminarEtiquetaDeLista(nombre: string): void{
        const index: number = this.etiquetas.findIndex(etiqueta => etiqueta.getNombre() === nombre);
        if (index !== -1) {
            this.etiquetas.splice(index, 1);
        }
    }
    
    public editarTituloDeTarea(idTarea: number, nuevoTitulo: string): void {
        const tareaAEditar: Tarea | undefined = this.obtenerTareaPorId(idTarea);
        if (tareaAEditar && nuevoTitulo.trim().length > 0) {
            tareaAEditar.setTitulo(nuevoTitulo);
        }
    }
    
    public editarDescripcionDeTarea(idTarea: number, nuevaDescripcion: string): void {
        const tareaAEditar: Tarea | undefined = this.obtenerTareaPorId(idTarea);
        if (tareaAEditar && nuevaDescripcion.trim().length > 0) {
            tareaAEditar.setDescripcion(nuevaDescripcion);
        }
    }
    
    public editarFechaDeVencimientoDeTarea(idTarea: number, year: number, month: number, day: number): void {
        const tareaAEditar: Tarea | undefined = this.obtenerTareaPorId(idTarea);
        if (tareaAEditar) {
            const nuevaFecha: Moment = moment({ year, month: month - 1, day });
            if (nuevaFecha.isValid() && tareaAEditar.getFechaCreacion().isBefore(nuevaFecha)) {
                tareaAEditar.setFechaVencimiento(nuevaFecha);
            }
        }
    }

    public editarPrioridadDeTarea(idTarea: number, prioridad: PRIORIDAD): void{
        const tareaAEditar: Tarea | undefined = this.obtenerTareaPorId(idTarea);
        if (tareaAEditar && Object.values(PRIORIDAD).includes(prioridad)) {
            tareaAEditar.setPrioridad(prioridad);
        }
    }

    public editarAvanceDeTarea(idTarea: number, avance: AVANCE): void{
        const tareaAEditar: Tarea | undefined = this.obtenerTareaPorId(idTarea);
        if (tareaAEditar && Object.values(AVANCE).includes(avance)) {
            tareaAEditar.setAvance(avance);
        }
    }

    public editarEstadoDeTarea(idTarea: number, estado: ESTADO): void{
        const tareaAEditar: Tarea | undefined = this.obtenerTareaPorId(idTarea);
        if (tareaAEditar && Object.values(ESTADO).includes(estado) && tareaAEditar.getEstadoActual() !== estado) {
            tareaAEditar.setEstado(estado);
        }
    }

    public editarCategoriaDeTarea(idTarea: number, nombreDeCategoria: string): void{
        const tareaAEditar: Tarea | undefined = this.obtenerTareaPorId(idTarea);
        const nuevaCategoria: Categoria | undefined = this.categorias.find(categoria => categoria.getNombre() === nombreDeCategoria);
        if (tareaAEditar && nuevaCategoria) {
            tareaAEditar.setCategoria(nuevaCategoria);
        }
    }

    public agregarEtiquetaATarea(idTarea: number, nombreDeEtiqueta: string): void{
        const tareaAEditar: Tarea | undefined = this.obtenerTareaPorId(idTarea);
        const nuevaEtiqueta: Etiqueta | undefined = this.etiquetas.find(etiqueta => etiqueta.getNombre() === nombreDeEtiqueta);
        if (tareaAEditar && nuevaEtiqueta) {
            tareaAEditar.setEtiqueta(nuevaEtiqueta);
        }        
    }

    public eliminarEtiquetaDeTarea(idTarea: number, nombreDeEtiqueta: string): void{
        const tareaAEditar: Tarea | undefined = this.obtenerTareaPorId(idTarea);
        if (tareaAEditar) {
            const etiquetaAEliminar: Etiqueta | undefined = tareaAEditar.getEtiquetas().find(etiqueta => etiqueta.getNombre() === nombreDeEtiqueta);
            if(etiquetaAEliminar) {
                tareaAEditar.eliminarEtiquetaDeLista(etiquetaAEliminar.getNombre());
            }
        }

    }
}

enum AVANCE {
    Cero = 0,
    Veinticinco = 25,
    Cincuenta = 50,
    SetentaYCinco = 75,
    Cien = 100
}

enum ESTADO{
    Pendiente,
    EnProgreso,
    Completado
}

enum PRIORIDAD{
    Baja,
    Media,
    Alta
}