import GestorDeTarea from "./clases/gestorDeTarea";
import GestorDeEstadistica from "./clases/gestorDeEstadistica";
import CreadorDeTarea from "./clases/creadorDeTarea";
import Saver from './clases/saver';
import Tarea from "./clases/tarea";
import CreadorDeClasificador from "./clases/creadorDeClasificador";
import Categoria from "./clases/categoria";
import Etiqueta from "./clases/etiqueta";
import BuscadorDeTarea from "./clases/buscadorDeTarea";
import OrganizadorDeTarea from "./clases/organizadorDeTarea";
function main(){
  const misTareas: Array<Tarea> = [];
  const misCategorias: Array<Categoria> = [];
  const misEtiquetas: Array<Etiqueta> = [];

  const miCreadorDeTareas: CreadorDeTarea = new CreadorDeTarea();
  const miCreadorDeClasificador: CreadorDeClasificador = new CreadorDeClasificador();

  const miBuscadorDeTareas: BuscadorDeTarea = new BuscadorDeTarea(misTareas);
  const miOrganizadorDeTareas: OrganizadorDeTarea = new OrganizadorDeTarea(misTareas);

  const miGestorDeTareas: GestorDeTarea = new GestorDeTarea(misTareas,misCategorias,misEtiquetas,miCreadorDeTareas,miCreadorDeClasificador);
  const miGestorDeEstadisticas: GestorDeEstadistica = new GestorDeEstadistica();

  const miSaver: Saver = new Saver();
  
  miGestorDeTareas.agregarTarea();
  miGestorDeTareas.agregarEtiqueta();
  miGestorDeTareas.agregarEtiqueta();
  miGestorDeTareas.agregarCategoria();
  console.log(misTareas)
}  
main();