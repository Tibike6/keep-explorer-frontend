import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ITransfer } from './models/interfaces';
import gql from 'graphql-tag';

const TRANSFERS_QUERY = gql`
    query transfers($pageSize: Int, $skip: Int) {
        transfers(first: $pageSize, skip: $skip, orderBy: timestamp, orderDirection: desc) {
            from
            to
            value
            timestamp
            transaction {
                hash
                block {
                    number
                }
            }
        }
    }
`;

type TransferResponse = {
    transfers: ITransfer[];
};

const BLOCKS_QUERY = gql`
    query blocks($pageSize: Int, $skip: Int) {
        blocks(first: $pageSize, skip: $skip, orderBy: timestamp, orderDirection: desc) {
            timestamp
            hash
            gasUsed
            author
            number
            transactions {
                hash
                transferEvents {
                    from
                    to
                    value
                }
            }
        }
    }
`;

type BlockResponse = {
    blocks: ITransfer[];
};

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private apollo: Apollo) {}

    public getTransfers(page: number = 1, pageSize: number = 10): Observable<ITransfer[]> {
        return this.apollo
            .watchQuery<TransferResponse>({ query: TRANSFERS_QUERY, variables: { pageSize, skip: pageSize * (page - 1) } })
            .valueChanges.pipe(map((x) => x.data.transfers));
    }

    public getTransfersQueryRef(page: number = 1, pageSize: number = 10): QueryRef<TransferResponse> {
        return this.apollo.watchQuery<TransferResponse>({
            query: TRANSFERS_QUERY,
            variables: { pageSize, skip: pageSize * (page - 1) },
            fetchPolicy: 'network-only'
        });
    }

    public getBlocksQueryRef(page: number = 1, pageSize: number = 10): QueryRef<BlockResponse> {
        return this.apollo.watchQuery<BlockResponse>({
            query: BLOCKS_QUERY,
            variables: { pageSize, skip: pageSize * (page - 1) },
            fetchPolicy: 'network-only'
        });
    }

    // getTransactions(
    //     page: number = 1,
    //     limit: number = 10,
    //     eventname: string = 'Transfer',
    //     tokentype: TokenType = TokenType.All
    // ): Observable<PagedResult> {
    //     return this.httpClient.get<PagedResult>(
    //         this.baseUrl + `/api/transactions?page=${page}&limit=${limit}&eventname=${eventname}&tokentype=${tokentype}`
    //     );
    // }

    // getBlocks(page: number = 1, limit: number = 10, eventname: string = 'Transfer'): Observable<PagedResult> {
    //     return this.httpClient.get<PagedResult>(this.baseUrl + `/api/blocks?page=${page}&limit=${limit}&eventname=${eventname}`);
    // }
}
