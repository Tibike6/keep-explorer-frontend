export interface ITransfer {
    id: string; // transaction hash concatenated with event log index
    value: string;
    from: string;
    to: string;
    timestamp: number;
    transaction: ITransaction;
}

export interface ITransferAggregation {
    id: string; // day as string format: YYYY-MM
    timestamp: number;
    count: number;
    sum: number;
}

export interface ITransaction {
    id: string; // transaction hash
    hash: string;
    index: number;
    from: string;
    to: string;
    value: number;
    gasUsed: number;
    gasPrice: number;
    timestamp: number;
    block: IBlock;
    transferEvents: ITransfer[];
}

export interface IBlock {
    id: string; // block hash
    hash: string;
    parentHash: string;
    unclesHash: string;
    author: string;
    stateRoot: string;
    transactionsRoot: string;
    receiptsRoot: string;
    number: number;
    gasUsed: number;
    gasLimit: number;
    timestamp: number;
    difficulty: number;
    totalDifficulty: number;
    size: number;
    transactions: ITransaction[];
}

export interface IGrant {
    id: number;
    grantManager: string;
    grantee: string;
    revokedAt: Date;
    revokedAmount: number;
    revokedWithdrawn: number;
    revocable: boolean;
    amount: number;
    duration: number;
    start: Date;
    cliff: string;
    withdrawn: number;
    staked: number;
    stakingPolicy: string;
    timestamp: number;
}

export enum Theme {
    KEEP = 'keep',
    TBTC = 'tbtc'
}

export enum ScreenSize {
    XS,
    SM,
    MD,
    LG,
    XL
}

export interface PagedResult {
    result: any[];
    totalPages: number;
    totalCount: number;
    currentPage: number;
}

export interface TokenTransaction {
    hash: string;
    nonce: number;
    blockHash: string;
    blockNumber: number;
    transactionIndex: number;
    timestamp: string;
    datetimeUTC: Date;
    from: string;
    to: string;
    value: string;
    gasPrice: string;
    gas: number;
    input: string;
    token: string;
    eventName: string;
    returnValues: any;
}

export interface BlockTransaction {
    hash: string;
    isRelevant: boolean;
    events: string[];
}

export interface Block {
    number: number;
    hash: string;
    parentHash: string;
    nonce: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionsRoot: string;
    stateRoot: string;
    miner: string;
    difficulty: number;
    totalDifficulty: number;
    extraData: string;
    size: number;
    gasLimit: number;
    gasUsed: number;
    timestamp: string;
    datetimeUTC: Date;
    transactions: BlockTransaction[];
    uncles: string[];
}
