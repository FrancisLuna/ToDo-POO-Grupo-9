import Tarea from "../src/clases/tarea";
import moment from "moment";
import { ESTADO } from "../src/enums/estado";
import Etiqueta from "../src/clases/etiqueta";
import { PRIORIDAD } from "../src/enums/prioridad";
import { AVANCE } from "../src/enums/avance";
import {mock} from "jest-mock-extended";
import Categoria from "../src/clases/categoria";
import EstadoInvalido from "../src/excepciones/estadoInvalido";
import TextoInvalido from "../src/excepciones/textoInvalido";

describe('Tarea', () =>{
    
    let tarea: Tarea;

    beforeEach(() => {
        tarea = new Tarea('Desarrollar una aplicación para crear tareas', 10);
    });

    it('Debe obtener una instancia de Tarea', () => {
        expect(tarea).toBeInstanceOf(Tarea);
    });

    it('Debe asegurar que un objeto de Tarea se cree con todos sus atributos inicializados', () => {
        expect(tarea.getId()).toBe(2);
        expect(tarea.getTitulo()).toBe('Desarrollar una aplicación para crear tareas');
        expect(tarea.getFechaCreacion().isSame(moment(), 'day')).toBe(true);
        expect(tarea.getDescripcion()).toBe('');
        expect(tarea.getEstadoActual()).toBe(ESTADO.Pendiente);
        expect(tarea.getPrioridad()).toBe(PRIORIDAD.Baja);
        expect(tarea.getFechaVencimiento()).toStrictEqual(tarea.getFechaCreacion().add(10, 'days'));
        expect(tarea.getAvance()).toBe(AVANCE['0%']);
        expect(tarea.getCategoria()).toBe(undefined);
        expect(tarea.getEtiquetas()).toBeNull;
    });

    it('Debe cambiar el titulo de la tarea', () => {
        tarea.setTitulo('Crear diagrama de clase de la aplicación');
        expect(tarea.getTitulo()).toBe('Crear diagrama de clase de la aplicación');
    });

    it('Debe asignar una descripción a la tarea', () => {
        tarea.setDescripcion('Se debe crear el diagrama de clase y el diagrama se secuencia');
        expect(tarea.getDescripcion()).toBe('Se debe crear el diagrama de clase y el diagrama se secuencia');
    });

    it('Debe poder acceder al historial de estados de la tarea', () => {
        const historialDeEstados = tarea.getEstados();
        expect(historialDeEstados.size).toBe(1);
        expect(historialDeEstados.has(ESTADO.Pendiente)).toBe(true);
        expect(historialDeEstados.get(ESTADO.Pendiente)?.isSame(tarea.getFechaCreacion()));
    });

    it('Debe permitir cambiar el estado de la tarea si el estado es diferente al actual', () => {
        tarea.setEstado(ESTADO.EnProgreso);
        expect(tarea.getEstadoActual()).toBe(ESTADO.EnProgreso);
    });

    it('Debe verificar que se lance una excepción cuando la tarea ya se encuentre en el estado al que se pretende cambiar', () => {
        tarea.setEstado(ESTADO.EnProgreso); 
        expect(() => tarea.setEstado(ESTADO.EnProgreso)).toThrow(new EstadoInvalido(`La tarea ya se encuentra en el estado ${ESTADO.EnProgreso}.`));
    });
    

    it('Debe asegurar que se pueda cambiar la prioridad de la tarea', () => {
        tarea.setPrioridad(PRIORIDAD.Alta);
        expect(tarea.getPrioridad()).toBe(PRIORIDAD.Alta);
    });

    it('Debe actualizar el avance de la tarea', () => {
        tarea.setAvance(AVANCE['50%']);
        expect(tarea.getAvance()).toBe(AVANCE['50%']);
    });

    it('Debe cambiar la fecha de vencimiento a la tarea', () => {
        const fechaVencimiento = moment().add(7, 'days');
        tarea.setFechaVencimiento(fechaVencimiento);
        expect(tarea.getFechaVencimiento().isSame(fechaVencimiento)).toBe(true);
    });

    it('Debe asignar una categoría a la tarea', () => {
        const categoria1 = mock<Categoria>();
        categoria1.setNombre('Estudio');
        tarea.setCategoria(categoria1);
        expect(tarea.getCategoria()).toBe(categoria1);
    });

    it('Debe asignar etiquetas a la tarea', () => {
        const etiqueta1 = mock<Etiqueta>();
        const etiqueta2 = mock<Etiqueta>();

        etiqueta1.setNombre('Desarrollo');
        etiqueta2.setNombre('Grupal');

        tarea.setEtiqueta(etiqueta1);
        tarea.setEtiqueta(etiqueta2);

        const etiquetas = tarea.getEtiquetas();
        
        expect(etiquetas).toContain(etiqueta1);
        expect(etiquetas).toContain(etiqueta2);
        expect(etiquetas.length).toBe(2);
    });

    it('Debe eliminar una etiqueta existente de la tarea por su nombre', () => {
        const etiqueta1 = mock<Etiqueta>();
        const etiqueta2 = mock<Etiqueta>();

        etiqueta1.getNombre.mockImplementation(() => 'Teoria');
        etiqueta2.getNombre.mockImplementation(() => 'Práctica');

        tarea.setEtiqueta(etiqueta1);
        tarea.setEtiqueta(etiqueta2);

        expect(tarea.getEtiquetas().length).toBe(2);
        
        tarea.eliminarEtiqueta('Teoria');

        const etiquetas = tarea.getEtiquetas();
        expect(etiquetas.length).toBe(1);
        expect(etiquetas).not.toContain(etiqueta1);
        expect(etiquetas).toContain(etiqueta2);
    });
})

describe("Título de la tarea con validaciones externas", () => {

    it("Debe lanzar una excepción si se intenta crear una tarea con un título vacío", () => {
      expect(() => new Tarea("", 7)).toThrow(TextoInvalido);
    });
  
    it("Debe lanzar una excepción si se intenta asignar un título vacío a una tarea existente", () => {
      const tarea = new Tarea("Cocinar", 5);
      expect(() => tarea.setTitulo("")).toThrow(TextoInvalido);
    });
  
    it("Debe permitir crear y actualizar títulos válidos", () => {
      const tarea = new Tarea("Lavar la ropa", 3);
      tarea.setTitulo("Salir de shopping");
      expect(tarea.getTitulo()).toBe("Salir de shopping");
    });
});

describe("Descripción de la tarea con validaciones externas", () => {
  
    it("Debe lanzar una excepción si se intenta asignar una descripción vacía a una tarea existente", () => {
      const tarea = new Tarea("Estudiar", 10);
      expect(() => tarea.setDescripcion("")).toThrow(TextoInvalido);
    });
  
    it("Debe permitir asignar y actualizar descripciones válidas", () => {
      const tarea = new Tarea("Dormir", 1);
      tarea.setDescripcion("Soñar que apruebo programación II");
      expect(tarea.getDescripcion()).toBe("Soñar que apruebo programación II");
    });
});