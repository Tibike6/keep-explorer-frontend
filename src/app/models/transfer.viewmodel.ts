import { ITransfer } from './interfaces';

export class TransferViewModel {
    public transactionhash: string;
    public blockNumber: number;
    public blockHash: string;
    public timestamp: number;
    public from: string;
    public to: string;
    public value: string;

    constructor(transfer: ITransfer) {
        this.transactionhash = transfer.transaction.hash;
        this.blockNumber = transfer.transaction.block.number;
        this.blockHash = transfer.transaction.block.hash;
        this.timestamp = transfer.timestamp;
        this.to = transfer.to;
        this.from = transfer.from;
        this.value = transfer.value;
    }
}
