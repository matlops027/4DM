import { Carrinho } from "./carrinho";

export class DoacaoConfirmada{
    constructor(
        public email_doador:string,
        public instituicao:string,
        public produtos:Carrinho[],
        public id:string,
        public data

    ){}
}