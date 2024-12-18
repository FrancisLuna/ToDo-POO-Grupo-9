import Tarea from "./clases/tarea";
import Categoria from "./clases/categoria";
import Etiqueta from "./clases/etiqueta";
import BuscadorDeTarea from "./clases/buscadorDeTarea";
import OrganizadorDeTarea from "./clases/organizadorDeTarea";
import ListadoDeTareas from "./clases/ListadoDeTareas";
import { AVANCE } from "./enums/avance";
import moment, { Moment } from "moment";
import { ESTADO } from "./enums/estado";
import { PRIORIDAD } from "./enums/prioridad";
import SaverJson from "./clases/saverJson";
import SaverPlainText from "./clases/saverPlainText";
import LoaderPlainText from "./clases/loaderPlainText";
import LoaderJson from "./clases/loaderJson";
import TareaBuilder from "./clases/tareaBuilder";
import ITarea from "./interfaces/iTarea";
import { CustomFileClass } from "stdio";

function main(){
    const tarea1: Tarea = new Tarea("Completar el trabajo práctico", 1);
    const categoria1: Categoria = new Categoria("TSSI");
    const etiqueta1: Etiqueta = new Etiqueta("Programación II");
    const etiqueta2: Etiqueta = new Etiqueta("CUVL");
    const etiqueta3: Etiqueta = new Etiqueta("2do cuatrimestre");

    tarea1.setAvance(AVANCE["25%"]);
    tarea1.setCategoria(categoria1);
    tarea1.setEtiqueta(etiqueta1);tarea1.setEtiqueta(etiqueta2);tarea1.setEtiqueta(etiqueta3);
    tarea1.setDescripcion("Debemos completar exitosamente el trabajo práctico para la materia Programación 2.")
    let fechaDeVencimiento: Moment = moment("2024-11-21");
    tarea1.setFechaVencimiento(fechaDeVencimiento);
    tarea1.setEstado(ESTADO.EnProgreso);
    tarea1.setPrioridad(PRIORIDAD.Alta);

    const tarea2: Tarea = new Tarea("Crear tests unitarios",1)
    tarea2.setCategoria(categoria1);
    tarea2.setEtiqueta(etiqueta2);
    tarea2.setDescripcion("Debemos realizar los tests unitarios para todas las clases del sistema con una cobertura de al menos el 80%.")
    tarea2.setFechaVencimiento(fechaDeVencimiento);
    tarea2.setEstado(ESTADO.EnProgreso);
    tarea2.setPrioridad(PRIORIDAD.Alta);

    const tarea3: Tarea = new Tarea("Crear patrón Observer",1);
    tarea3.setCategoria(categoria1);
    tarea3.setEtiqueta(etiqueta2);
    tarea3.setDescripcion("Debemos crear un patrón Observer para la clase Tarea que informe al gestor de notificaciones que queda poco tiempo para que se cumpla el vencimiento y por lo tanto debe notificar.")
    tarea3.setFechaVencimiento(fechaDeVencimiento);
    tarea3.setEstado(ESTADO.EnProgreso);
    tarea3.setPrioridad(PRIORIDAD.Alta);

    const miListadoDeTareas: ListadoDeTareas = new ListadoDeTareas();

    miListadoDeTareas.agregarTarea(tarea1);
    miListadoDeTareas.agregarTarea(tarea2);
    miListadoDeTareas.agregarTarea(tarea3);

    const customfile: CustomFileClass = new CustomFileClass();
    const saverTxt: SaverPlainText = new SaverPlainText(customfile);
    const saverJson: SaverJson = new SaverJson(customfile);
    saverJson.guardar(miListadoDeTareas);
    saverTxt.guardar(miListadoDeTareas);

    tarea1.getEstados().forEach((value,key) => {console.log(`estado: ${key}, fecha: ${value}`)});
}
async function main2() {
    const miBuilder: TareaBuilder = new TareaBuilder();
    const miLoader: LoaderJson = new LoaderJson(miBuilder);

    const miListaDeTareasCargadas: ITarea[] = await miLoader.cargar();

    for (let task of miListaDeTareasCargadas as Tarea[]) {
        console.log(`ID: ${task.getId()}`);
        console.log(`Título: ${task.getTitulo()}`);
        console.log(`Descripción: ${task.getDescripcion()}`);
        console.log(`Fecha de creación: ${task.getFechaCreacion()}`);
        console.log(`Fecha de Vencimiento: ${task.getFechaVencimiento()}`);
        console.log(`Prioridad: ${task.getPrioridad()}`);
        console.log(`Avance: ${task.getAvance()}`);
        console.log(`Estado actual: ${task.getEstadoActual()}`);
        console.log(`Historial de estados: ${Array.from(task.getEstados())}`);
        console.log(`Categoría: ${task.getCategoria()?.getNombre()}`);
        console.log(`Etiquetas: ${task.getEtiquetas().map(etiqueta => etiqueta.getNombre())}`);
    }
}
main();
main2();