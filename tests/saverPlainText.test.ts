import { CustomFileClass } from "stdio";
import path from "path";
import ListadoDeTareas from "../src/clases/ListadoDeTareas";
import SaverPlainText from "../src/clases/saverPlainText";
import { mock } from "jest-mock-extended";
import Tarea from "../src/clases/tarea";
import { ESTADO } from "../src/enums/estado";
import { PRIORIDAD } from "../src/enums/prioridad";
import { AVANCE } from "../src/enums/avance";
import Categoria from "../src/clases/categoria";
import Etiqueta from "../src/clases/etiqueta";
import moment from "moment";

describe("SaverPlainText", () => {
    let fileMock: jest.Mocked<CustomFileClass>;
    let listadoMock: jest.Mocked<ListadoDeTareas>;
    let tareaMock: jest.Mocked<Tarea>;
    let saver: SaverPlainText;

    beforeEach(() => {
        fileMock = mock<CustomFileClass>();
        listadoMock = mock<ListadoDeTareas>();
        tareaMock = mock<Tarea>();

        saver = new SaverPlainText(fileMock);

        tareaMock.getId.mockReturnValue(1);
        tareaMock.getTitulo.mockReturnValue("Título de prueba");
        tareaMock.getDescripcion.mockReturnValue("Descripción de prueba");
        tareaMock.getFechaCreacion.mockReturnValue({ locale: () => "2024-11-26" } as any);
        tareaMock.getFechaVencimiento.mockReturnValue({ locale: () => "2024-12-26" } as any);
        tareaMock.getPrioridad.mockReturnValue(PRIORIDAD.Alta);
        tareaMock.getAvance.mockReturnValue(50);
        tareaMock.getEstadoActual.mockReturnValue(ESTADO.Pendiente);
        tareaMock.getEstados.mockReturnValue(new Map([[ESTADO.Pendiente,moment("2024-11-26")]]));
        tareaMock.getCategoria?.mockReturnValue({ getNombre: () => "Categoría de prueba" } as any);
        tareaMock.getEtiquetas.mockReturnValue([
            { getNombre: () => "Etiqueta 1" } as any,
            { getNombre: () => "Etiqueta 2" } as any,
        ]);

        listadoMock.getTareas.mockReturnValue([tareaMock]);
    });

    it("Debe crear una instancia de SaverPlainText", () => {
        expect(saver).toBeInstanceOf(SaverPlainText);
    });

    it("Debe abrir el archivo en modo escritura al guardar", () => {
        saver.guardar(listadoMock);

        expect(fileMock.open).toHaveBeenCalledWith(path.resolve("coleccionDeTareas.txt"), "w");
    });

    it("Debe limpiar el archivo antes de escribir los datos", () => {
        saver.guardar(listadoMock);

        expect(fileMock.writeToFile).toHaveBeenCalledWith("");
    });

    it("Debe iterar por las tareas y escribir sus datos correctamente", () => {
        saver.guardar(listadoMock);

        expect(fileMock.writeToFile).toHaveBeenCalledWith("ID: 1");
        expect(fileMock.writeToFile).toHaveBeenCalledWith("Título: Título de prueba");
        expect(fileMock.writeToFile).toHaveBeenCalledWith("Descripción: Descripción de prueba");
        expect(fileMock.writeToFile).toHaveBeenCalledWith("Fecha de creación: 2024-11-26");
        expect(fileMock.writeToFile).toHaveBeenCalledWith("Fecha de vencimiento: 2024-12-26");
        expect(fileMock.writeToFile).toHaveBeenCalledWith("Prioridad: Alta");
        expect(fileMock.writeToFile).toHaveBeenCalledWith("Avance: 50");
        expect(fileMock.writeToFile).toHaveBeenCalledWith("Estado actual: Pendiente");
        expect(fileMock.writeToFile).toHaveBeenCalledWith(`Historial de estados: ${ESTADO.Pendiente},${moment("2024-11-26")}`);
        expect(fileMock.writeToFile).toHaveBeenCalledWith("Categoría: Categoría de prueba");
        expect(fileMock.writeToFile).toHaveBeenCalledWith("Etiquetas: Etiqueta 1,Etiqueta 2");

        expect(fileMock.writeToFile).toHaveBeenCalledWith("");
    });

    it("Debe escribir 'END OF FILE' al final del archivo", () => {
        saver.guardar(listadoMock);

        expect(fileMock.writeToFile).toHaveBeenCalledWith("END OF FILE");
    });

    it("Debe cerrar el archivo al finalizar, incluso si ocurre un error", () => {
        fileMock.open.mockImplementation(() => {
            throw new Error("Error forzado");
        });

        saver.guardar(listadoMock);

        expect(fileMock.close).toHaveBeenCalled();
    });

    it("Debe manejar errores y no lanzar excepciones", () => {
        fileMock.writeToFile.mockImplementation(() => {
            throw new Error("Error forzado");
        });

        expect(() => saver.guardar(listadoMock)).not.toThrow();
    });

    it("Debe manejar un listado vacío sin errores", () => {
        listadoMock.getTareas.mockReturnValue([]);

        saver.guardar(listadoMock);

        expect(fileMock.writeToFile).toHaveBeenCalledWith("");
        expect(fileMock.writeToFile).toHaveBeenCalledWith("END OF FILE");
    });
});


