export default  abstract class Clasificador{
    
    private nombre: string;

    constructor(nombre: string){
        this.nombre = nombre;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
}