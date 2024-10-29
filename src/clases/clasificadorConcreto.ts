import Clasificador from "../interfaces/clasificador";

export default class ClasificadorConcreto implements Clasificador{

    private tipo: TipoDeClasificador = TipoDeClasificador.ninguno;
    private nombre: string = "";

    public setTipo(tipo: TipoDeClasificador): void {
        this.tipo = tipo;        
    }

    getTipo(): TipoDeClasificador {
        return this.tipo
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    getNombre(): string {
        return this.nombre
    }
}