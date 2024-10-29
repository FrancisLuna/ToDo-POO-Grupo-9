export default interface Clasificador{
    setTipo(tipo:TipoDeClasificador): void;
    getTipo(): TipoDeClasificador;
    setNombre(nombre: string): void;
    getNombre(): string;
}