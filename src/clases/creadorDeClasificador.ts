import Etiqueta from "./etiqueta"
import Categoria from "./categoria"
export default class CreadorDeClasificador{
    public instanciarCategoria(): Categoria{
        return new Categoria("");
    }

    public instanciarEtiqueta(): Etiqueta{
        return new Etiqueta("");
    }
}