import BuscadorDeTarea from "../../clases/buscadorDeTarea";
import Tarea from "../../clases/tarea";
import { ESTADO } from "../../enums/estado";
import { mock } from "jest-mock-extended";

describe("Tests para la clase BuscadorDeTarea y sus métodos", () => {
  let buscador: BuscadorDeTarea;
  let tarea1: Tarea;
  let tarea2: Tarea;
  let tarea3: Tarea;

  beforeEach(() => {
    tarea1 = mock<Tarea>();
    tarea2 = mock<Tarea>();
    tarea3 = mock<Tarea>();

    // Configuración de estados para las tareas
    (tarea1.getEstadoActual as jest.Mock).mockReturnValue(ESTADO.Pendiente);
    (tarea2.getEstadoActual as jest.Mock).mockReturnValue(ESTADO.EnProgreso);
    (tarea3.getEstadoActual as jest.Mock).mockReturnValue(ESTADO.Completado);

    buscador = new BuscadorDeTarea([tarea1, tarea2, tarea3]);
  });

  it("Debe retornar todas las tareas pendientes", () => {
    const tareasPendientes = buscador.getTareasPendientes();
    expect(tareasPendientes.length).toBe(1);
    expect(tareasPendientes[0]).toBe(tarea1);
  });

  it("Debe retornar todas las tareas en progreso", () => {
    const tareasEnProgreso = buscador.getTareasEnProgreso();
    expect(tareasEnProgreso.length).toBe(1);
    expect(tareasEnProgreso[0]).toBe(tarea2);
  });

  it("Debe retornar todas las tareas completadas", () => {
    const tareasCompletadas = buscador.getTareasCompletadas();
    expect(tareasCompletadas.length).toBe(1);
    expect(tareasCompletadas[0]).toBe(tarea3);
  });

  it("Debe retornar las tareas no completadas", () => {
    const tareasNoCompletadas = buscador.getTareasNoCompletadas();
    expect(tareasNoCompletadas.length).toBe(2);
    expect(tareasNoCompletadas).toContain(tarea1);
    expect(tareasNoCompletadas).toContain(tarea2);
  });

  it("Debe lanzar un error si no hay tareas pendientes", () => {
    const buscadorVacio = new BuscadorDeTarea([]);
    expect(() => buscadorVacio.getTareasPendientes()).toThrow("No hay tareas pendientes.");
  });
});