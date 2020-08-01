import { IBlock } from './interfaces';

export class BlockViewModel {
    public hash: string;
    public number: number;
    public timestamp: number;
    public gasUsed: number;
    public miner: string;
    public transactionsCount: number;

    constructor(block: IBlock) {
        this.hash = block.hash;
        this.number = block.number;
        this.timestamp = block.timestamp;
        this.gasUsed = block.gasUsed;
        this.miner = block.author;
        this.transactionsCount = block.transactions?.length;
    }
}
