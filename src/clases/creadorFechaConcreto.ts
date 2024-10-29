export default class CreadorFechaConcreto implements CreadorDeFecha{
    
    public getFechaActual(): Date {
        return new Date(); //Devuelve algo como: "2024-10-17T10:45:30.000Z"
    }
}