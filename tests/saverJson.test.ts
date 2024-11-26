import { CustomFileClass } from "stdio";
import path from "path";
import ListadoDeTareas from "../src/clases/ListadoDeTareas";
import SaverJson from "../src/clases/saverJson"
import { mock } from "jest-mock-extended";
import Tarea from "../src/clases/tarea";
import { ESTADO } from "../src/enums/estado";
import { PRIORIDAD } from "../src/enums/prioridad";
import { AVANCE } from "../src/enums/avance";
import Categoria from "../src/clases/categoria";
import Etiqueta from "../src/clases/etiqueta";
import moment from "moment";

describe("SaverJson", () => {
    let fileMock: jest.Mocked<CustomFileClass>;
    let listadoMock: jest.Mocked<ListadoDeTareas>;
    let tareaMock: jest.Mocked<Tarea>;
    let saver: SaverJson;

    beforeEach(() => {
        fileMock = mock<CustomFileClass>();
        listadoMock = mock<ListadoDeTareas>();
        tareaMock = mock<Tarea>();

        saver = new SaverJson(fileMock);

        // Configurar tarea mock con valores predecibles
        tareaMock.getId.mockReturnValue(1);
        tareaMock.getTitulo.mockReturnValue("Título de prueba");
        tareaMock.getDescripcion.mockReturnValue("Descripción de prueba");
        tareaMock.getFechaCreacion.mockReturnValue(moment("2024-11-26"));
        tareaMock.getFechaVencimiento.mockReturnValue(moment("2024-12-26"));
        tareaMock.getPrioridad.mockReturnValue(PRIORIDAD.Alta);
        tareaMock.getAvance.mockReturnValue(50);
        tareaMock.getEstadoActual.mockReturnValue(ESTADO.Pendiente);
        tareaMock.getEstados.mockReturnValue(new Map([[ESTADO.Pendiente, moment("2024-11-26")]]));
        tareaMock.getCategoria?.mockReturnValue({ getNombre: () => "Categoría de prueba" } as any);
        tareaMock.getEtiquetas.mockReturnValue([
            { getNombre: () => "Etiqueta 1" } as any,
            { getNombre: () => "Etiqueta 2" } as any,
        ]);

        // Configurar listado mock
        listadoMock.getTareas.mockReturnValue([tareaMock]);
    });

    it("Debe crear una instancia de SaverJson", () => {
        expect(saver).toBeInstanceOf(SaverJson);
    });

    it("Debe abrir el archivo en modo escritura al guardar", () => {
        saver.guardar(listadoMock);

        expect(fileMock.open).toHaveBeenCalledWith(path.resolve("coleccionDeTareas.json"), "w");
    });

    it("Debe iterar por las tareas y preparar los datos correctamente en formato JSON", () => {
        saver.guardar(listadoMock);

        const expectedData = [
            [
                ["ID", "1"],
                ["Título", "Título de prueba"],
                ["Descripción", "Descripción de prueba"],
                ["Fecha de creación", `${moment("2024-11-26")}`],
                ["Fecha de vencimiento", `${moment("2024-12-26")}`],
                ["Prioridad", `${PRIORIDAD.Alta}`],
                ["Avance", `${AVANCE["50%"]}`],
                ["Estado actual", `${ESTADO.Pendiente}`],
                ["Historial de estados", `${ESTADO.Pendiente},${moment("2024-11-26")}`],
                ["Categoría", "Categoría de prueba"],
                ["Etiquetas", "Etiqueta 1,Etiqueta 2"],
            ],
        ];

        expect(fileMock.writeToFile).toHaveBeenCalledWith(JSON.stringify(expectedData, null, 2));
    });

    it("Debe manejar correctamente el listado vacío y escribir un array vacío en el archivo", () => {
        // Configurar listado mock vacío
        listadoMock.getTareas.mockReturnValue([]);

        saver.guardar(listadoMock);

        expect(fileMock.writeToFile).toHaveBeenCalledWith(JSON.stringify([], null, 2));
    });

    it("Debe cerrar el archivo al finalizar, incluso si ocurre un error", () => {
        // Forzar un error en el método open
        fileMock.open.mockImplementation(() => {
            throw new Error("Error forzado");
        });

        saver.guardar(listadoMock);

        expect(fileMock.close).toHaveBeenCalled();
    });

    it("Debe manejar errores y no lanzar excepciones", () => {
        // Forzar un error en el método writeToFile
        fileMock.writeToFile.mockImplementation(() => {
            throw new Error("Error forzado");
        });

        expect(() => saver.guardar(listadoMock)).not.toThrow();
    });
});
