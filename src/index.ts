import Aplicacion from "./clases/aplicacion";
import GestorDeTarea from "./clases/gestorDeTarea";
import GestorDeEstadistica from "./clases/gestorDeEstadistica";
import CreadorDeTarea from "./clases/creadorDeTarea";
import Saver from './clases/saver';
import Loader from "./clases/loader";
function main(){
  // const miCreadorDeTareas: CreadorDeTarea = new CreadorDeTarea();
  // const miGestorDeTareas: GestorDeTarea = new GestorDeTarea(miCreadorDeTareas);
  // const miGestorDeEstadisticas: GestorDeEstadistica = new GestorDeEstadistica();
  // const miApp: Aplicacion = new Aplicacion(miGestorDeTareas,miGestorDeEstadisticas,miCreadorDeTareas)
  // const miSaver: Saver = new Saver();
  // miSaver.persistir(miApp)
  const miLoader: Loader = new Loader()
  const miAppReestablecida = miLoader.load('./src/saves/save.json');
  console.log(miAppReestablecida);
}
  
main();