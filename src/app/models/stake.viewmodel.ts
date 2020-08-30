import { StakeStatus, IStake } from './interfaces';

export class StakeViewModel {
    public id: string;
    public amount: number;
    public status: StakeStatus;
    public timestamp: number;
    public lockedUntil: number;
    public undelegatedAt: number;
    public recoveredAt: number;
    public lockCreator: string;
    public transactionHash: string;

    constructor(stake: IStake) {
        this.id = stake.id;
        this.amount = stake.amount;
        this.status = stake.status;
        this.timestamp = stake.timestamp;
        this.lockedUntil = stake.lockedUntil;
        this.undelegatedAt = stake.undelegatedAt;
        this.recoveredAt = stake.recoveredAt;
        this.lockCreator = stake.lockCreator;
        this.transactionHash = stake.transactionHash;
    }
}
