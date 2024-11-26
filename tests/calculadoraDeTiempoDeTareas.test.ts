import CalculadoraDeTiempoDeTareas from "../src/clases/calculadoraDeTiempoDeTareas";
import Tarea from "../src/clases/tarea";
import TareaNoCompletada from "../src/excepciones/tareaNoCompletada";
import { ESTADO } from "../src/enums/estado";
import { mock } from "jest-mock-extended";
import moment from "moment";
import BuscadorDeTarea from "../src/clases/buscadorDeTarea";

describe('CalculadoraDeTiempoDeTareas', () => {
  let mockBuscadorDeTarea: jest.Mocked<BuscadorDeTarea>;
  let calculadora: CalculadoraDeTiempoDeTareas;

    beforeEach(() => {
        mockBuscadorDeTarea = mock<BuscadorDeTarea>();
        calculadora = new CalculadoraDeTiempoDeTareas(mockBuscadorDeTarea);
    });

    describe('obtenerTiempoDeFinalizacionDeUnaTarea', () => {

        it('Debe retornar la diferencia en horas entre el estado EnProgreso y Completado si la tarea está completada', () => {
        const tareaMock = mock<Tarea>();
        tareaMock.getEstadoActual.mockReturnValue(ESTADO.Completado);
        tareaMock.getEstados.mockReturnValue(
            new Map([
            [ESTADO.EnProgreso, moment('2024-01-01T08:00:00')],
            [ESTADO.Completado, moment('2024-01-01T12:00:00')],
            ]));

            const resultado = calculadora.obtenerTiempoDeFinalizacionDeUnaTarea(tareaMock);

            expect(resultado).toBe(4);
        });
        
        it('Debe retornar 0 si la tarea no está en estado Completado', () => {
            const tareaMock = mock<Tarea>();
            tareaMock.getEstadoActual.mockReturnValue(ESTADO.EnProgreso);
    
            const resultado = calculadora.obtenerTiempoDeFinalizacionDeUnaTarea(tareaMock);
    
            expect(resultado).toBe(0);
        });            

        it('Debe retornar 0 si no hay fechas válidas en los estados', () => {
            const tareaMock = mock<Tarea>();
            tareaMock.getEstadoActual.mockReturnValue(ESTADO.Completado);
            tareaMock.getEstados.mockReturnValue(new Map());

            const resultado = calculadora.obtenerTiempoDeFinalizacionDeUnaTarea(tareaMock);

            expect(resultado).toBe(0);
        });
    });

    describe('obtenerTiempoDeFinalizacionPorTarea', () => {

        it('Debe retornar un Map con el tiempo de finalización de cada tarea', () => {
            const tareaMock1 = mock<Tarea>();
            const tareaMock2 = mock<Tarea>();

            tareaMock1.getId.mockReturnValue(1);
            tareaMock1.getTitulo.mockReturnValue('Tarea 1');
            tareaMock1.getEstadoActual.mockReturnValue(ESTADO.Completado);
            tareaMock1.getEstados.mockReturnValue(
            new Map([
            [ESTADO.EnProgreso, moment('2024-01-01T08:00:00')],
            [ESTADO.Completado, moment('2024-01-01T12:00:00')],
            ]));

            tareaMock2.getId.mockReturnValue(2);
            tareaMock2.getTitulo.mockReturnValue('Tarea 2');
            tareaMock2.getEstadoActual.mockReturnValue(ESTADO.EnProgreso);

            const resultado = calculadora.obtenerTiempoDeFinalizacionPorTarea([tareaMock1, tareaMock2]);

            expect(resultado.get('id: 1, tarea: Tarea 1.')).toBe(4);
            expect(resultado.get('id: 2, tarea: Tarea 2.')).toBe(0);
        });
    });

    describe('obtenerTiempoDeFinalizacionDeTareasCompletadas', () => {

        it('Debe retornar el tiempo total de finalización de todas las tareas completadas', () => {
            const tareaMock1 = mock<Tarea>();
            const tareaMock2 = mock<Tarea>();

            tareaMock1.getEstadoActual.mockReturnValue(ESTADO.Completado);
            tareaMock1.getEstados.mockReturnValue(
            new Map([
            [ESTADO.EnProgreso, moment('2024-01-01T08:00:00')],
            [ESTADO.Completado, moment('2024-01-01T12:00:00')],
            ]));

            tareaMock2.getEstadoActual.mockReturnValue(ESTADO.Completado);
            tareaMock2.getEstados.mockReturnValue(
            new Map([
            [ESTADO.EnProgreso, moment('2024-01-01T09:00:00')],
            [ESTADO.Completado, moment('2024-01-01T15:00:00')],
            ]));

            mockBuscadorDeTarea.getTareasCompletadas.mockReturnValue([tareaMock1, tareaMock2]);

            const resultado = calculadora.obtenerTiempoDeFinalizacionDeTareasCompletadas();

            expect(resultado).toBe(10);
        });

        it('Debe lanzar una excepción si no hay tareas completadas', () => {
            mockBuscadorDeTarea.getTareasCompletadas.mockReturnValue([]);

            expect(() => calculadora.obtenerTiempoDeFinalizacionDeTareasCompletadas()).toThrow(TareaNoCompletada);
        });
    });

    describe('obtenerTiempoPromedioDeFinalizacion', () => {

        it('Debe retornar el tiempo promedio de finalización', () => {
            const tareaMock1 = mock<Tarea>();
            const tareaMock2 = mock<Tarea>();

            tareaMock1.getEstadoActual.mockReturnValue(ESTADO.Completado);
            tareaMock1.getEstados.mockReturnValue(
            new Map([
            [ESTADO.EnProgreso, moment('2024-01-01T08:00:00')],
            [ESTADO.Completado, moment('2024-01-01T12:00:00')],
            ]));

            tareaMock2.getEstadoActual.mockReturnValue(ESTADO.Completado);
            tareaMock2.getEstados.mockReturnValue(
            new Map([
            [ESTADO.EnProgreso, moment('2024-01-01T09:00:00')],
            [ESTADO.Completado, moment('2024-01-01T15:00:00')],
            ]));

            mockBuscadorDeTarea.getTareasCompletadas.mockReturnValue([tareaMock1, tareaMock2]);

            const resultado = calculadora.obtenerTiempoPromedioDeFinalizacion();

            expect(resultado).toBe(5);
        });

        it('Debe lanzar una excepción si no hay tareas completadas', () => {
            mockBuscadorDeTarea.getTareasCompletadas.mockReturnValue([]);

            expect(() => calculadora.obtenerTiempoPromedioDeFinalizacion()).toThrow(TareaNoCompletada);
        });
    });
});
