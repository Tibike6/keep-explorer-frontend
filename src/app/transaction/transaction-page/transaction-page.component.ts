import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { TokenType } from '../../models/interfaces';
import { TransferViewModel } from 'src/app/models/transfer.viewmodel';
import { QueryRef } from 'apollo-angular';

@Component({
    selector: 'app-transaction-page',
    templateUrl: './transaction-page.component.html',
    styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit {
    public transfers$: Observable<TransferViewModel[]>;
    public transfersQuery: QueryRef<any>;
    public TokenType = TokenType;
    public checkModel: any = { keep: true, tbtc: true };
    // public totalItems = 20;
    public currentPage = 1;
    public page: number;

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.load();
    }

    public load() {
        let tokenType = TokenType.All;
        if (this.checkModel.keep && !this.checkModel.tbtc) {
            tokenType = TokenType.Keep;
        } else if (!this.checkModel.keep && this.checkModel.tbtc) {
            tokenType = TokenType.Tbtc;
        }

        this.transfersQuery = this.dataService.getTransfersQueryRef(this.page, 10);
        this.transfers$ = this.transfersQuery.valueChanges.pipe(map((x) => x.data.transfers.map((t) => new TransferViewModel(t))));
    }

    public fetchMore() {
        this.transfersQuery.fetchMore({
            variables: { pageSize: 10, skip: 10 * this.currentPage },
            updateQuery: (prev, { fetchMoreResult }) => {
                this.currentPage++;
                if (!fetchMoreResult) {
                    return prev;
                }
                return Object.assign({}, prev, {
                    transfers: [...prev.transfers, ...fetchMoreResult.transfers]
                });
            }
        });
    }
}
