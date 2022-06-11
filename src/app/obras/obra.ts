import { Encargado } from "../encargados/encargado";

export class Obra {
    id: number;
    denominacion: string;
    direccion: string;
    ciudad: string;
    encargado: Encargado;
}
