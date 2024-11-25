import OrganizadorDeTarea from "../src/clases/organizadorDeTarea"
import Tarea from "../src/clases/tarea"
import { mock } from "jest-mock-extended"
import { PRIORIDAD } from "../src/enums/prioridad"
import moment from "moment"

describe('OrganizadorDeTarea', () => {
    let organizador: OrganizadorDeTarea
    let mockTareas: jest.Mocked<Tarea>[]
    let mockTarea1: jest.Mocked<Tarea>
    let mockTarea2: jest.Mocked<Tarea>
    let mockTarea3: jest.Mocked<Tarea>

    beforeEach(() => {
        mockTarea1 = mock<Tarea>()
        mockTarea2 = mock<Tarea>()
        mockTarea3 = mock<Tarea>()
        mockTareas = [mockTarea1, mockTarea2, mockTarea3]
        organizador = new OrganizadorDeTarea(mockTareas);

    });

    it('debe obtenerse una instancia de OrganizadorDeTarea', () => {
        expect(organizador).toBeInstanceOf(OrganizadorDeTarea);
    });

    it('debe ordenar las tareas según su prioridad en el orden ¨Alta¨, ¨Media¨, ¨Baja¨', () => {
        mockTarea1.getPrioridad.mockReturnValue(PRIORIDAD.Baja);
        mockTarea2.getPrioridad.mockReturnValue(PRIORIDAD.Alta);
        mockTarea3.getPrioridad.mockReturnValue(PRIORIDAD.Media);
        const tareasOrdenadas = organizador.ordenarTareasPorPrioridad()
        expect(tareasOrdenadas).toEqual([mockTarea2,mockTarea3,mockTarea1]);
    });

    it('debe ordenar las tareas según su fecha de vencimiento', () => {        
        const fechaMock1 = moment('2024-11-24');
        const fechaMock2 = moment('2024-11-22');
        const fechaMock3 = moment('2024-11-23');

        mockTarea1.getFechaVencimiento.mockReturnValue(fechaMock1)
        mockTarea2.getFechaVencimiento.mockReturnValue(fechaMock2)
        mockTarea3.getFechaVencimiento.mockReturnValue(fechaMock3)

        const tareasOrdenadas = organizador.ordenarTareasPorVencimiento();

        expect(tareasOrdenadas).toEqual([mockTarea2,mockTarea3,mockTarea1])
    });

    it('debe ordenar las tareas según su título', () => {
        mockTarea1.getTitulo.mockReturnValue('Z');
        mockTarea2.getTitulo.mockReturnValue('B');
        mockTarea3.getTitulo.mockReturnValue('A');

        const tareasOrdenadas = organizador.ordenarTareasPorTitulo();
        expect(tareasOrdenadas).toEqual([mockTarea3,mockTarea2,mockTarea1])
    })
    
})