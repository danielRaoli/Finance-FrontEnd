import type { ITransactionType } from "./ITransactionType";

export default interface Transaction{
    id: string,
    value: number,
    description: string,
    date: Date,
    type: ITransactionType,
}