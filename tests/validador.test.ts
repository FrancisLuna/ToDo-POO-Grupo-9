import Validador from "../src/clases/validador";
import TextoInvalido from "../src/excepciones/textoInvalido";

describe("Validador", () => {

    it("Debe lanzar una excepción si el nombre es vacío", () => {
        expect(() => Validador.validarTexto("")).toThrow(TextoInvalido);
    });

    test("Debe lanzar una excepción si el nombre contiene solo espacios en blanco", () => {
        expect(() => Validador.validarTexto("   ")).toThrow(TextoInvalido);
    });

    test("No debe lanzar una excepción si el nombre es válido", () => {
        expect(() => Validador.validarTexto("Trabajo")).not.toThrow(TextoInvalido);
    });
})