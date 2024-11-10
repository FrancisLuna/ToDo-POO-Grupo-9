import Tarea from "./tarea";
import TareaNoCompletada from "../excepciones/tareaNoCompletada";
import BuscadorDeTarea from "./buscadorDeTarea";
import { ESTADO } from "../enums/estado";

export default class CalculadoraDeTiempoDeTareas{

    private buscadorDeTarea: BuscadorDeTarea;

    constructor(buscadorDeTarea: BuscadorDeTarea) {
        this.buscadorDeTarea = buscadorDeTarea;
    }

    public obtenerTiempoDeFinalizacionDeUnaTarea(tarea: Tarea): number{

        if(tarea.getEstadoActual() === ESTADO.Completado){

            const fechaInicio = tarea.getEstados().get(ESTADO.EnProgreso);
            const fechaFinalizacion = tarea.getEstados().get(ESTADO.Completado);
            
            if(fechaInicio && fechaFinalizacion){
                return fechaFinalizacion.diff(fechaInicio, 'hours');
            }
        }
        return 0;
    }
    
    public obtenerTiempoDeFinalizacionPorTarea(tareas: Tarea[]): Map<string, number>{

        const tiempoFinalizacionPorTarea = new Map<string, number>();

        tareas.forEach(tarea => {
            const tiempoDedicado = this.obtenerTiempoDeFinalizacionDeUnaTarea(tarea);
            if(tiempoDedicado){
                tiempoFinalizacionPorTarea.set(`id: ${tarea.getId()}, tarea: ${tarea.getTitulo()}.`, tiempoDedicado);
            } else {
                tiempoFinalizacionPorTarea.set(`id: ${tarea.getId()}, tarea: ${tarea.getTitulo()}.`, 0);
            }
        });
    
        return tiempoFinalizacionPorTarea;
    }

    public obtenerTiempoDeFinalizacionDeTareasCompletadas(): number {
        const tareasCompletadas = this.buscadorDeTarea.getTareasCompletadas();
    
        if (tareasCompletadas.length === 0) {
            throw new TareaNoCompletada("No hay tareas completadas.");
        }
    
        return tareasCompletadas.reduce((total, tarea) => {
            return total + this.obtenerTiempoDeFinalizacionDeUnaTarea(tarea);
        }, 0);
    }
    
    public obtenerTiempoPromedioDeFinalizacion(): number{

        const tareasCompletadas = this.buscadorDeTarea.getTareasCompletadas();

        if (tareasCompletadas.length === 0) {
            throw new TareaNoCompletada("No hay tareas completadas.");
        }

        let tiempoDeFinalizacionTotal = this.obtenerTiempoDeFinalizacionDeTareasCompletadas();
        return tiempoDeFinalizacionTotal / tareasCompletadas.length;
    }
}