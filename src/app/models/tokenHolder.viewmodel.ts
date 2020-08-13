import { ITransfer, ITokenHolder } from './interfaces';

export class TokenHolderViewModel {
    public id: string;
    public tokenBalance: number;
    public transfersCount: number;

    constructor(tokenHolder: ITokenHolder) {
        this.id = tokenHolder.id;
        this.tokenBalance = tokenHolder.tokenBalance;
        this.transfersCount = tokenHolder.transfersCount;
    }
}
