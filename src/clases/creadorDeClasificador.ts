import Etiqueta from "./etiqueta"
import Categoria from "./categoria"
export default class CreadorDeClasificador{
    
    public instanciarCategoria(nombre: string): Categoria{
        return new Categoria(nombre);
    }

    public instanciarEtiqueta(nombre: string): Etiqueta{
        return new Etiqueta(nombre);
    }
}