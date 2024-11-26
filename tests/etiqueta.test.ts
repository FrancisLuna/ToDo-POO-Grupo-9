import Etiqueta from "../src/clases/etiqueta";
import TextoInvalido from "../src/excepciones/textoInvalido";

describe('Etiqueta', () => {

    let etiqueta: Etiqueta;

    beforeEach(() => {
        etiqueta = new Etiqueta('Urgente');
    });

    it('Debe obtener una instancia de Etiqueta', () => {
        expect(etiqueta).toBeInstanceOf(Etiqueta);
    });

    it('Debe actualizar el nombre de la etiqueta', () => {
        etiqueta.setNombre('Importante');
        expect(etiqueta.getNombre()).toBe('Importante');
    });

});

describe("Etiqueta con validaciones externas", () => {

    it("Debe lanzar una excepción si se intenta crear una etiqueta con un nombre vacío", () => {
      expect(() => new Etiqueta("")).toThrow(TextoInvalido);
    });
  
    it("Debe lanzar una excepción si se intenta asignar un nombre vacío a una etiqueta existente", () => {
      const etiqueta = new Etiqueta("CUVL");
      expect(() => etiqueta.setNombre("")).toThrow(TextoInvalido);
    });
  
    it("Debe permitir crear y actualizar nombres válidos", () => {
      const etiqueta = new Etiqueta("Grupal");
      etiqueta.setNombre("Individual");
      expect(etiqueta.getNombre()).toBe("Individual");
    });
});