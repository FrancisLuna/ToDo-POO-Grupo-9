import ITarea from "./iTarea"
export default interface Loader{
    cargar(): Promise<ITarea[]>
}