import Categoria from "../src/clases/categoria";
import TextoInvalido from "../src/excepciones/textoInvalido";

describe('Categoria', () => {

    let categoria: Categoria;

    beforeEach(() => {
        categoria = new Categoria('Trabajo');
    });

    it('Debe obtener una instancia de Categoría', () => {
        expect(categoria).toBeInstanceOf(Categoria);
    });

    it('Debe actualizar el nombre de la categoría', () => {
        categoria.setNombre('Estudio');
        expect(categoria.getNombre()).toBe('Estudio');
    });
});

describe("Categoria con validaciones externas", () => {

    it("Debe lanzar una excepción si se intenta crear una categoría con un nombre vacío", () => {
      expect(() => new Categoria("")).toThrow(TextoInvalido);
    });
  
    it("Debe lanzar una excepción si se intenta asignar un nombre vacío a una categoría existente", () => {
      const categoria = new Categoria("Inicial");
      expect(() => categoria.setNombre("")).toThrow(TextoInvalido);
    });
  
    it("Debe permitir crear y actualizar nombres válidos", () => {
      const categoria = new Categoria("Trabajo");
      categoria.setNombre("Personal");
      expect(categoria.getNombre()).toBe("Personal");
    });
});