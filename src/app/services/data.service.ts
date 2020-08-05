import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ITransfer, ITransferAggregation } from '../models/interfaces';
import { TRANSFERS_QUERY, MONTHLY_TRANSFERS_QUERY, DAILY_TRANSFERS_QUERY } from '../queries/transfers.query';
import { BLOCKS_QUERY } from '../queries/blocks.query';

type Response = {
    transfers: ITransfer[] | null;
    blocks: ITransfer[] | null;
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

    public getBlocksQueryRef(clientName: string = 'keep', page: number = 1, pageSize: number = 10): QueryRef<Response> {
        return this.apollo.use(clientName).watchQuery<Response>({
            query: BLOCKS_QUERY,
            variables: { pageSize, skip: pageSize * (page - 1) },
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
