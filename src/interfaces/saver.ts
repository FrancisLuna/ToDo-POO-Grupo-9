import ListadoDeTareas from "../clases/ListadoDeTareas"
export default interface Saver{
    guardar(coleccionDeTareas: ListadoDeTareas): void
}