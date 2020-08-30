import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ITransfer, ITransferAggregation, ITransaction, IBlock, IGrant, ITokenHolder, IStake } from '../models/interfaces';
import { TRANSFERS_QUERY, MONTHLY_TRANSFERS_QUERY, DAILY_TRANSFERS_QUERY } from '../queries/transfers.query';
import { TRANSACTION_QUERY } from '../queries/transaction.query';
import { BLOCKS_QUERY, BLOCK_QUERY } from '../queries/blocks.query';
import { GRANTS_QUERY } from '../queries/grants.query';
import { TOKENHOLDERS_QUERY } from '../queries/token-holders.query';
import { STAKES_QUERY } from '../queries/stakes.query';

type Response = {
    transfers: ITransfer[] | null;
    blocks: ITransfer[] | null;
    transactions: ITransaction[] | null;
    transaction: ITransaction | null;
    block: IBlock | null;
    grants: IGrant | null;
    tokenHolders: ITokenHolder[] | null;
    stakes: IStake[] | null;
};

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private apollo: Apollo) {}

    public getTransfers(clientName: string = 'keep', page: number = 1, pageSize: number = 10): Observable<ITransfer[]> {
        return this.apollo
            .use(clientName)
            .watchQuery<Response>({ query: TRANSFERS_QUERY, variables: { pageSize, skip: pageSize * (page - 1) } })
            .valueChanges.pipe(map((x) => x.data.transfers));
    }

    public getTransfersQueryRef(clientName: string = 'keep', page: number = 1, pageSize: number = 10): QueryRef<Response> {
        return this.apollo.use(clientName).watchQuery<Response>({
            query: TRANSFERS_QUERY,
            variables: { pageSize, skip: pageSize * (page - 1) },
            fetchPolicy: 'network-only'
        });
    }

    public getTokenHoldersQueryRef(clientName: string = 'keep', page: number = 1, pageSize: number = 25): QueryRef<Response> {
        return this.apollo.use(clientName).watchQuery<Response>({
            query: TOKENHOLDERS_QUERY,
            variables: { pageSize, skip: pageSize * (page - 1) },
            fetchPolicy: 'network-only'
        });
    }

    public getStakesQueryRef(clientName: string = 'keep', page: number = 1, pageSize: number = 25): QueryRef<Response> {
        return this.apollo.use(clientName).watchQuery<Response>({
            query: STAKES_QUERY,
            variables: { pageSize, skip: pageSize * (page - 1) },
            fetchPolicy: 'network-only'
        });
    }

    public getTransaction(clientName: string = 'keep', hash: string): Observable<ITransaction> {
        return this.apollo
            .use(clientName)
            .watchQuery<Response>({ query: TRANSACTION_QUERY, variables: { id: hash } })
            .valueChanges.pipe(map((x) => x.data.transaction));
    }

    public getBlock(clientName: string = 'keep', blockhash: string): Observable<IBlock> {
        return this.apollo
            .use(clientName)
            .watchQuery<Response>({ query: BLOCK_QUERY, variables: { id: blockhash } })
            .valueChanges.pipe(map((x) => x.data.block));
    }

    public getBlocksQueryRef(clientName: string = 'keep', page: number = 1, pageSize: number = 10): QueryRef<Response> {
        return this.apollo.use(clientName).watchQuery<Response>({
            query: BLOCKS_QUERY,
            variables: { pageSize, skip: pageSize * (page - 1) },
            fetchPolicy: 'network-only'
        });
    }

    public getGrantsQueryRef(page: number = 1, pageSize: number = 10): QueryRef<Response> {
        return this.apollo.watchQuery<Response>({
            query: GRANTS_QUERY,
            // variables: { pageSize, skip: pageSize * (page - 1) },
            fetchPolicy: 'network-only'
        });
    }

    public getMontlyTransfers(clientName: string = 'keep', timestampFrom: number): Observable<ITransferAggregation[]> {
        return this.apollo
            .use(clientName)
            .watchQuery<any>({ query: MONTHLY_TRANSFERS_QUERY, variables: { timestampFrom } })
            .valueChanges.pipe(map((x) => x.data.montlyTransferAggregations));
    }

    public getDailyTransfers(clientName: string = 'keep', timestampFrom: number): Observable<ITransferAggregation[]> {
        return this.apollo
            .use(clientName)
            .watchQuery<any>({ query: DAILY_TRANSFERS_QUERY, variables: { timestampFrom } })
            .valueChanges.pipe(map((x) => x.data.dailyTransferAggregations));
    }
}
