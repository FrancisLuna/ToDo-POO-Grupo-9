import Etiqueta from "../src/clases/etiqueta";

describe('Etiqueta', () => {

    it('debe inicializar correctamente el nombre', () => {
        const etiqueta = new Etiqueta('Urgente');
        expect(etiqueta.getNombre()).toBe('Urgente');
    });

    it('debe permitir cambiar el nombre', () => {
        const etiqueta = new Etiqueta('Urgente');
        etiqueta.setNombre('Importante');
        expect(etiqueta.getNombre()).toBe('Importante');
    });
});