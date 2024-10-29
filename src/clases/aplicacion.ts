import Usuario from ""
import GestorDeTarea from ""
import GestorDeEstadisticas from ""

export default class aplicacion{
    private usuario: Usuario;
    private gestorDeTarea: GestorDeTarea;
    private gestorDeEstadisticas: GestorDeEstadisticas;

    constructor(usuario: Usuario, gestorDeTarea: GestorDeTarea, gestorDeEstadisticas: GestorDeEstadisticas){
        this.usuario = usuario;
        this.gestorDeTarea = gestorDeTarea;
        this.gestorDeEstadisticas = gestorDeEstadisticas;
    }
}