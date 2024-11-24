import ErrorTareaNoEncontrada from "../src/excepciones/errorTareaNoEncontrada";
import ListadoDeTareas from "../src/clases/ListadoDeTareas"
import { mock } from "jest-mock-extended"
import Tarea from "../src/clases/tarea";

describe('ListadoDeTareas', () => {

    let listado: ListadoDeTareas;
    let mockTareas: jest.Mocked<Tarea>[];
    let mockTarea1: jest.Mocked<Tarea>;
    let mockTarea2: jest.Mocked<Tarea>;

    beforeEach(()=>{
        mockTareas = [];
        mockTarea1 = mock<Tarea>();
        mockTarea2 = mock<Tarea>();
        listado = new ListadoDeTareas();
    });

    it('debe obtenerse una instancia de un ListadoDeTareas.', () => {
        expect(listado).toBeInstanceOf(ListadoDeTareas);
    });

    it('debe agregar una tarea al listado', () => {
        listado.agregarTarea(mockTarea1);  
        const tareas = listado.getTareas();
        expect(tareas).toContain(mockTarea1);
        expect(tareas.length).toBe(1);
    });

    it('debe devolver todas las tareas actuales del listado', () => {
        listado.agregarTarea(mockTarea1);
        listado.agregarTarea(mockTarea2)
        const tareas = listado.getTareas();
        expect(tareas).toEqual([mockTarea1, mockTarea2]);
    });

    it('debe poder eliminar una tarea del listado', () => {
        mockTarea1.getId.mockReturnValue(1);
        mockTarea1.getTitulo.mockReturnValue('Tarea1')
        listado.agregarTarea(mockTarea1);
        listado.agregarTarea(mockTarea2)
        listado.eliminarTarea(1,'Tarea1')
        const tareas = listado.getTareas();
        expect(tareas).toEqual([mockTarea2]);
    })

    it('debe lanzar error si el id o el nombre no se corresponden', () => {
        mockTarea1.getId.mockReturnValue(1);
        mockTarea1.getTitulo.mockReturnValue('Tarea1')
        listado.agregarTarea(mockTarea1);
        expect( () => listado.eliminarTarea(2,'Tarea1')).toThrow(ErrorTareaNoEncontrada);
        expect( () => listado.eliminarTarea(1,'Tarea2')).toThrow(ErrorTareaNoEncontrada);
    })
  
})