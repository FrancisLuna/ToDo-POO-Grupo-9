import fs from 'fs'
export default class Loader{
    public async load(path: string): Promise<any> { //no funciona
        try{
            const datos = await fs.promises.readFile(path, 'utf8');
            const datosReformateados = JSON.parse(datos);
            return datosReformateados;
        } catch (error) {console.error('Error al leer el archivo:', error);}
    }
}