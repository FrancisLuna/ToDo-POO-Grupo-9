import CreadorDeTarea from "./creadorDeTarea";
import CreadorDeClasificador from "./creadorDeClasificador";
import moment from "moment";
import Tarea from "./tarea"
import Categoria from "./categoria";
import Etiqueta from "./etiqueta";

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

    public agregarTarea(): void{
        const nuevaTarea: Tarea = this.creadorDeTareas.instanciarTarea();
        nuevaTarea.setId(this.tareas.length + 1);
        nuevaTarea.setTitulo(`Tarea${nuevaTarea.getId()}`);
        this.tareas.push(nuevaTarea);
    }

    public agregarCategoria(): void{
        const nuevaCategoria: Categoria = this.creadorDeClasificador.instanciarCategoria();
        nuevaCategoria.setNombre(`categoria${this.categorias.length+1}`);
        this.categorias.push(nuevaCategoria);
    }

    public agregarEtiqueta(): void{
        const nuevaEtiqueta: Etiqueta = this.creadorDeClasificador.instanciarEtiqueta();
        nuevaEtiqueta.setNombre(`etiqueta${this.etiquetas.length+1}`)
        this.etiquetas.push(nuevaEtiqueta);
    }

    public eliminarTarea(id: number): void{                      
        const index = this.tareas.findIndex((tarea) => tarea.getId() === id);        
        if (index !== -1) {
            this.tareas.splice(index, 1);             
        }                       
    }
}