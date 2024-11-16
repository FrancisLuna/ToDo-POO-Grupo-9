import ColeccionDeTareas from "./ListadoDeTareas";
import { CustomFileClass } from "stdio";
import path from "path";

export default class Loader {

    public async CargarColeccionDeTareas() {

        const file: CustomFileClass = new CustomFileClass();
        try {
            file.open(path.resolve("coleccionDeTareas.txt"), "r");

            let i: number = 1
            for await (const linea of file.readLine()) {
                
                console.log(`#${i} - ${linea}`);
                i++;
            }            
        } catch (error) {
            console.log("Error al intentar cargar el archivo <coleccionDeTareas.json>");
        } finally {
            file.close();
        }
    }
}