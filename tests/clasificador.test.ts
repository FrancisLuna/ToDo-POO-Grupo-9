import Clasificador from "../src/clases/clasificador";

describe("Clasificador", () => {
  class ClasificadorConcreto extends Clasificador {
    constructor(nombre: string) {
      super(nombre);
    }}

    it("debe inicializar correctamente el nombre", () => {
        const clasificador = new ClasificadorConcreto("General");
        expect(clasificador.getNombre()).toBe("General");
    });

    it("debe actualizar correctamente el nombre", () => {
        const clasificador = new ClasificadorConcreto("General");
        clasificador.setNombre("Específico");
        expect(clasificador.getNombre()).toBe("Específico");
    });
});