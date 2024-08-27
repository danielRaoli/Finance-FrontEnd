import { ITransactionType } from '../interfaces/ITransactionType';

const transactionstypes = Object.keys(ITransactionType)
  .filter(key => isNaN(Number(key)))
  .map(key => ({
    label: key,
    value: ITransactionType[key as keyof typeof ITransactionType]
  }));

export default transactionstypes;