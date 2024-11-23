import Categoria from "../src/clases/categoria";

describe("Categoria", () => {
    
    it("debe inicializar correctamente el nombre", () => {
        const categoria = new Categoria("Trabajo");
        expect(categoria.getNombre()).toBe("Trabajo");
    });

    it("debe permitir cambiar el nombre", () => {
        const categoria = new Categoria("Trabajo");
        categoria.setNombre("Estudio");
        expect(categoria.getNombre()).toBe("Estudio");
    });
});