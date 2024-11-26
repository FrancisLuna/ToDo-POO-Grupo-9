import NombreInvalido from "../excepciones/textoInvalido";

export default class Validador{

    /**
     * Valida que un nombre no esté vacío.
     * @param nombre - El nombre a validar.
     * @throws Lanza una excepción si el nombre es inválido.
     */
    public static validarTexto(texto: string): void{
        if (!texto.trim()) {
            throw new NombreInvalido("El texto proporcionado no puede estar vacío.");
        }
    }
}