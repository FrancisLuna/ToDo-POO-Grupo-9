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
        expect(() => Validador.validarTexto("Trabajo")).not.toThrow(new TextoInvalido("El texto proporcionado no puede estar vacío."));
    });

    it("no debería lanzar una excepción si el texto no está vacío", () => {
        expect(() => Validador.validarTexto("Texto válido")).not.toThrow();
        expect(() => Validador.validarTexto("  Texto válido con espacios  ")).not.toThrow();
    });
})