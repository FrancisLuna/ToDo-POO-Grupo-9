import GestorDeEstadistica from "./clases/gestorDeEstadistica";
import Tarea from "./clases/tarea";
import Categoria from "./clases/categoria";
import Etiqueta from "./clases/etiqueta";
import BuscadorDeTarea from "./clases/buscadorDeTarea";
import OrganizadorDeTarea from "./clases/organizadorDeTarea";
import ColeccionDeTareas from "./clases/coleccionDeTareas";
import coleccionDeEtiquetas from "./clases/coleccionDeEtiquetas";
import coleccionDeCategorias from "./clases/coleccionDeCategorias";
import { AVANCE } from "./enums/avance";
import moment, { Moment } from "moment";
import { ESTADO } from "./enums/estado";
import { PRIORIDAD } from "./enums/prioridad";
function main(){
    const tarea1: Tarea = new Tarea("Asegurarme de que funcione el sistema", 1);
    const categoria1: Categoria = new Categoria("TSSI");
    const etiqueta1: Etiqueta = new Etiqueta("Programación II");
    const etiqueta2: Etiqueta = new Etiqueta("CUVL");
    const etiqueta3: Etiqueta = new Etiqueta("2do cuatrimestre");
    tarea1.setAvance(AVANCE["25%"]);
    tarea1.setCategoria(categoria1);
    tarea1.setEtiqueta(etiqueta1);tarea1.setEtiqueta(etiqueta2),tarea1.setEtiqueta(etiqueta3);
    tarea1.setDescripcion("Nosotros, el grupo 9, debemos completar exitosamente el trabajo práctico para la materia Programación 2.")
    let fechaDeVencimiento: Moment = moment("2024-11-21");
    tarea1.setFechaVencimiento(fechaDeVencimiento);
    tarea1.setEstado(ESTADO.EnProgreso);
    tarea1.setId(0);
    tarea1.setPrioridad(PRIORIDAD.Alta);
    const miColeccionDeTareas: ColeccionDeTareas = new ColeccionDeTareas();
    miColeccionDeTareas.agregarTareaAColeccion(tarea1);
    console.log(miColeccionDeTareas);
}
main();