import BuscadorDeTarea from "../src/clases/buscadorDeTarea"
import Tarea from "../src/clases/tarea"
import { ESTADO } from "../src/enums/estado"
import Categoria from "../src/clases/categoria"
import Etiqueta from "../src/clases/etiqueta"
import ErrorTareaNoEncontrada from "../src/excepciones/errorTareaNoEncontrada"
import { mock } from "jest-mock-extended"

describe('BuscadorDeTarea', () => {
  let mockTareas: jest.Mocked<Tarea>[];
  let mockEtiquetas1: jest.Mocked<Etiqueta>[];
  let mockEtiquetas2: jest.Mocked<Etiqueta>[];
  let mockEtiqueta1: jest.Mocked<Etiqueta>;
  let mockEtiqueta2: jest.Mocked<Etiqueta>;
  let buscador: BuscadorDeTarea;

  beforeEach(() => {

    mockEtiqueta1 = mock<Etiqueta>();
    mockEtiqueta2 = mock<Etiqueta>();
    mockEtiquetas1 = [mockEtiqueta1];
    mockEtiquetas2 = [mockEtiqueta2];
    mockTareas = [
      mock<Tarea>({ getEstadoActual: jest.fn().mockReturnValue(ESTADO.Pendiente), getTitulo: jest.fn().mockReturnValue('Tarea 1'), getEtiquetas: jest.fn().mockReturnValue(mockEtiquetas1)}),
      mock<Tarea>({ getEstadoActual: jest.fn().mockReturnValue(ESTADO.EnProgreso), getTitulo: jest.fn().mockReturnValue('Tarea 2'), getEtiquetas: jest.fn().mockReturnValue(mockEtiquetas1)}),
      mock<Tarea>({ getEstadoActual: jest.fn().mockReturnValue(ESTADO.Completado), getTitulo: jest.fn().mockReturnValue('Tarea 3'), getEtiquetas: jest.fn().mockReturnValue(mockEtiquetas2)}),
    ];
    buscador = new BuscadorDeTarea(mockTareas);
  });

  it('Debe obtener una instancia de un BuscadorDeTarea', () => {
    expect(buscador).toBeInstanceOf(BuscadorDeTarea);
  });

  it('Debe retornar tareas pendientes', () => {
    const tareasPendientes = buscador.getTareasPendientes();
    expect(tareasPendientes).toHaveLength(1);
    expect(tareasPendientes[0].getTitulo()).toBe('Tarea 1');
  });

  it('Debe lanzar una excepción si no hay tareas pendientes', () => {
    buscador = new BuscadorDeTarea([]);
    expect(() => buscador.getTareasPendientes()).toThrow(ErrorTareaNoEncontrada);
  });

  it('Debe retornar tareas en progreso', () => {
    const tareasEnProgreso = buscador.getTareasEnProgreso();
    expect(tareasEnProgreso).toHaveLength(1);
    expect(tareasEnProgreso[0].getTitulo()).toBe('Tarea 2');
  });

  it('Debe lanzar una excepción si no hay tareas en progreso', () => {
    buscador = new BuscadorDeTarea([]);
    expect(() => buscador.getTareasEnProgreso()).toThrow(ErrorTareaNoEncontrada);
  });

  it('Debe retornar tareas completadas', () => {
    const tareasCompletadas = buscador.getTareasCompletadas();
    expect(tareasCompletadas).toHaveLength(1);
    expect(tareasCompletadas[0].getTitulo()).toBe('Tarea 3');
  });

  it('Debe lanzar una excepción si no hay tareas completadas', () => {
    buscador = new BuscadorDeTarea([]);
    expect(() => buscador.getTareasCompletadas()).toThrow(ErrorTareaNoEncontrada);
  });

  it('Debe devolver las tareas ordenadas por fecha de vencimiento', () => {
    const mockTarea1 = mock<Tarea>({ getEstadoActual: jest.fn().mockReturnValue(ESTADO.Pendiente), getFechaVencimiento: jest.fn().mockReturnValue(new Date('2024-11-19')) });
    const mockTarea2 = mock<Tarea>({ getEstadoActual: jest.fn().mockReturnValue(ESTADO.Pendiente), getFechaVencimiento: jest.fn().mockReturnValue(new Date('2024-11-20')) });
    buscador = new BuscadorDeTarea([mockTarea2, mockTarea1]);

    const tareasOrdenadas = buscador.getTareasPorVencimiento();
    expect(tareasOrdenadas[0]).toBe(mockTarea1);
    expect(tareasOrdenadas[1]).toBe(mockTarea2);
  });

  it('Debe encontrar tareas por título', () => {
    const tarea = buscador.getTareaPorTitulo('Tarea 1');
    expect(tarea?.getTitulo()).toBe('Tarea 1');
  });

  it('Debe lanzar una excepción si no encuentra una tarea por título', () => {
    expect(() => buscador.getTareaPorTitulo('Inexistente')).toThrow(ErrorTareaNoEncontrada);
  });

  it('Debe encontrar tareas por etiqueta', () => {
    const tareasPorEtiqueta = buscador.getTareasPorEtiqueta(mockEtiqueta1);
    expect(tareasPorEtiqueta).toHaveLength(2);
    expect(tareasPorEtiqueta[0]).toBe(mockTareas[0]);
  });

  it('Debe lanzar una excepción si ninguna tarea contiene la etiqueta pasada por parámetro', () => {
    let mockEtiqueta3: jest.Mocked<Etiqueta> = mock<Etiqueta>();
    expect(() => buscador.getTareasPorEtiqueta(mockEtiqueta3)).toThrow(ErrorTareaNoEncontrada);
  });

  it('Debe encontrar tareas por categoría', () => {
    const categoria = mock<Categoria>();
    mockTareas[0].getCategoria.mockReturnValue(categoria);
    const tareasPorCategoria = buscador.getTareasPorCategoria(categoria);
    expect(tareasPorCategoria).toHaveLength(1);
    expect(tareasPorCategoria[0]).toBe(mockTareas[0]);
  });

  it('Debe lanzar una excepción si no encuentra tareas por categoría', () => {
    const categoria = mock<Categoria>();
    expect(() => buscador.getTareasPorCategoria(categoria)).toThrow(ErrorTareaNoEncontrada);
  });
}); 