import fs from 'fs'
export default class Saver{

    public persistir(object: any){
        const jsonData = JSON.stringify(object);
        fs.writeFile('./src/saves/save.json',jsonData,(err) => {if (err) {console.error(err);} else {console.log('Datos guardados correctamente');}})
    }
}