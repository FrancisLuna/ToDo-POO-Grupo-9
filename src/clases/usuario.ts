import Tarea from "./tarea";
import CreadorDeClasificador from "./creadorDeclasificador";
import Clasificador from "../interfaces/clasificador";
export default class Usuario{
    private email:string;
    private password: string;
    private tareas: Array<Tarea> = [];
    private clasificadores: Array<Clasificador>=[]
    private creadorDeClasificador: CreadorDeClasificador;

    constructor(email: string, password: string, creadorDeClasificador: CreadorDeClasificador){
        this.email = email;
        this.password = password;
        this.creadorDeClasificador = creadorDeClasificador;
    }

    public setEmail(email: string): void{
        this.email = email;
    }

    public getEmail(): string{
        return this.email;
    }

    public setPassword(password: string): void{
        this.password = password;
    }

    public getPassword(): string{
        return this.password;
    }

    public crearClasificador(nombre: string, tipo: TipoDeClasificador): void{
        if(tipo !== TipoDeClasificador.ninguno){
            const nuevoClasificador: Clasificador = this.creadorDeClasificador.crearClasificador();
            nuevoClasificador.setTipo(tipo);
            nuevoClasificador.setNombre(nombre);
            this.clasificadores.push(nuevoClasificador);
        }                
    }
}