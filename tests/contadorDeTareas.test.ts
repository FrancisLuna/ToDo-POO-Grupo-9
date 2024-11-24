import ContadorDeTareas from "../src/clases/contadorDeTareas";
import Tarea from "../src/clases/tarea";
import { ESTADO } from "../src/enums/estado";
import NoHayTareasCreadas from "../src/excepciones/noHayTareasCreadas";
import { mock } from "jest-mock-extended"

describe('ContadorDeTareas', () => {
  let contadorDeTareas: ContadorDeTareas;
  let mockTareas: jest.Mocked<Tarea>[];
  let mockTarea1: jest.Mocked<Tarea>;
  let mockTarea2: jest.Mocked<Tarea>;
  let mockTarea3: jest.Mocked<Tarea>;

    beforeEach(() => {
        contadorDeTareas = new ContadorDeTareas();
        mockTarea1 = mock<Tarea>();
        mockTarea2 = mock<Tarea>();
        mockTarea3 = mock<Tarea>();
        mockTareas = [];
    });

    describe('obtenerCantidadDeTareasPorEstado', () => {

        it('debería lanzar una excepción si el listado de tareas está vacío', () => {
            expect(() => contadorDeTareas.obtenerCantidadDeTareasPorEstado(mockTareas)).toThrow(NoHayTareasCreadas);
        });       
        
        it('debería contar correctamente las tareas agrupadas por estado', () => {
            mockTarea1.getEstadoActual.mockReturnValue(ESTADO.Pendiente);
            mockTarea2.getEstadoActual.mockReturnValue(ESTADO.EnProgreso);
            mockTarea3.getEstadoActual.mockReturnValue(ESTADO.Completado);
            mockTareas = [mockTarea1,mockTarea2,mockTarea3];

            const resultado = contadorDeTareas.obtenerCantidadDeTareasPorEstado(mockTareas);

            expect(resultado.get(ESTADO.Pendiente)).toBe(1);
            expect(resultado.get(ESTADO.EnProgreso)).toBe(1);
            expect(resultado.get(ESTADO.Completado)).toBe(1);
        });
                        
    

        it('debería sumar correctamente cuando hay múltiples tareas del mismo estado', () => {
            mockTarea1.getEstadoActual.mockReturnValue(ESTADO.Pendiente);
            mockTarea2.getEstadoActual.mockReturnValue(ESTADO.Pendiente);
            mockTarea3.getEstadoActual.mockReturnValue(ESTADO.Pendiente);
            mockTareas = [mockTarea1,mockTarea2,mockTarea3];

            const resultado = contadorDeTareas.obtenerCantidadDeTareasPorEstado(mockTareas);

            expect(resultado.get(ESTADO.Pendiente)).toBe(3);
            expect(resultado.get(ESTADO.EnProgreso)).toBe(0);
            expect(resultado.get(ESTADO.Completado)).toBe(0);            
        });
    });
});
