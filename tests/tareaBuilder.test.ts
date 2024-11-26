import TareaBuilder from "../src/clases/TareaBuilder";
import Tarea from "../src/clases/tarea";
import ITarea from "../src/interfaces/iTarea";
import Etiqueta from "../src/clases/etiqueta";
import Categoria from "../src/clases/categoria";
import { AVANCE } from "../src/enums/avance";
import { ESTADO } from "../src/enums/estado";
import { PRIORIDAD } from "../src/enums/prioridad";
import moment, { Moment } from "moment";
import { mock } from "jest-mock-extended"

describe("TareaBuilder", () => {
    let tareaBuilder: TareaBuilder;
    let mockTarea: jest.Mocked<ITarea>;

    beforeEach(() => {
        tareaBuilder = new TareaBuilder();
        mockTarea = mock<ITarea>();
        tareaBuilder.reset()
    });

    it('Debe inicializar una nueva Tarea', () => {
        expect(tareaBuilder.getResult()).toBeInstanceOf(Tarea);
    });

    it('Debe asignarle el id correspondiente al resultado', ()=>{
        tareaBuilder.buildId(10);
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getId()).toBe(10)
    });

    it('Debe asignarle el título correspondiente al resultado', ()=>{
        tareaBuilder.buildTitulo("Tarea1");
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getTitulo()).toBe("Tarea1")
    });
    
    it('Debe asignarle la descripción correspondiente al resultado', ()=>{
        tareaBuilder.buildDescripcion("test del builder");
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getDescripcion()).toBe("test del builder");
    });

    it('Debe asignarle la fecha de creación correspondiente al resultado', ()=>{
        tareaBuilder.buildFechaCreacion(moment('2024-11-25'));
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getFechaCreacion()).toEqual(moment('2024-11-25'))
    });

    it('Debe asignarle la fecha de vencimiento correspondiente al resultado', ()=>{
        tareaBuilder.buildFechaVencimiento(moment('2024-11-25'));
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getFechaVencimiento()).toEqual(moment('2024-11-25'))
    });

    it('Debe asignarle la prioridad correspondiente al resultado', ()=>{
        tareaBuilder.buildPrioridad(PRIORIDAD.Alta);
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getPrioridad()).toBe(PRIORIDAD.Alta);
    });

    it('Debe asignarle el avance correspondiente al resultado', ()=>{
        tareaBuilder.buildAvance(AVANCE["75%"]);
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getAvance()).toBe(AVANCE["75%"]);
    });

    it('Debe asignarle el estado correspondiente al resultado', ()=>{
        tareaBuilder.buildEstado(ESTADO.EnProgreso);
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getEstadoActual()).toBe(ESTADO.EnProgreso);
    });

    it('Debe asignarle los estados correspondientes al resultado', ()=>{
        tareaBuilder.buildEstados(ESTADO.Completado,moment('2024-11-25'));
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getEstados().get(ESTADO.Completado)).toEqual(moment('2024-11-25'));
    });

    it('Debe poder modificar el momento del estado pendiente que se genera por defecto', ()=>{
        tareaBuilder.buildFechaCreacion(moment('2024-11-25'));
        tareaBuilder.buildEstados(ESTADO.Completado,moment('2024-11-26'));
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getEstados().get(ESTADO.Pendiente)).toEqual(moment('2024-11-25'));
    });

    it('Debe asignarle categoría correspondiente al resultado', ()=>{
        const categoriaMock: jest.Mocked<Categoria> = mock<Categoria>();
        tareaBuilder.buildCategoria(categoriaMock);
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getCategoria()).toBe(categoriaMock);
    });

    it('Debe asignarle las etiquetas correspondientes al resultado', ()=>{
        const etiquetaMock1: jest.Mocked<Etiqueta> = mock<Etiqueta>();
        const etiquetaMock2: jest.Mocked<Etiqueta> = mock<Etiqueta>();
        const etiquetaMock3: jest.Mocked<Etiqueta> = mock<Etiqueta>();
        tareaBuilder.buildEtiqueta(etiquetaMock1);
        tareaBuilder.buildEtiqueta(etiquetaMock2);
        tareaBuilder.buildEtiqueta(etiquetaMock3);
        const resultado = tareaBuilder.getResult() as Tarea;
        expect(resultado.getEtiquetas()).toEqual([etiquetaMock1,etiquetaMock2,etiquetaMock3]);
    });

    it('Debe devolver falso si el builder no posee una ITarea activa, verdadero caso contrario', () => {
        const nuevoBuilder: TareaBuilder = new TareaBuilder();
        expect(nuevoBuilder.construido()).toBeFalsy();
        nuevoBuilder.reset();
        expect(nuevoBuilder.construido()).toBeTruthy();
    }); 

});
