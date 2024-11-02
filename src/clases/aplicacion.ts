import Etiqueta from "./etiqueta";
import Categoria from "./categoria";
import GestorDeEstadistica from "./gestorDeEstadistica";
import GestorDeTarea from "./gestorDeTarea";
import CreadorDeTarea from "./creadorDeTarea";
import Tarea from "./tarea";

export default class Aplicacion {
    private gestorDeTarea: GestorDeTarea;
    private gestorDeEstadística: GestorDeEstadistica;
    private creadorDeTarea: CreadorDeTarea;
    private categorias: Array<Categoria>=[];
    private etiquetas: Array<Etiqueta>=[];

    constructor(gestorDeTarea: GestorDeTarea, gestorDeEstadística: GestorDeEstadistica, creadorDeTarea: CreadorDeTarea){
        this.gestorDeTarea = gestorDeTarea;
        this.gestorDeEstadística = gestorDeEstadística;
        this.creadorDeTarea = creadorDeTarea;
    }
}