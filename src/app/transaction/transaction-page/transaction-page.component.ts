import { TransferAggregationViewModel } from './../../models/transferAggregation.viewmodel';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { TransferViewModel } from 'src/app/models/transfer.viewmodel';
import { QueryRef } from 'apollo-angular';
import * as moment from 'moment';

@Component({
    selector: 'app-transaction-page',
    templateUrl: './transaction-page.component.html',
    styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit {
    public transfers$: Observable<TransferViewModel[]>;
    public transfersQuery: QueryRef<any>;
    public transferAggregation$: Observable<TransferAggregationViewModel>;
    public transferAnalyticsModel = 'months';
    // public totalItems = 20;
    public currentPage = 1;
    public page: number;

    private lastTimestampInApril = 1588291199; // 2020-04-30 23:59:59 UTC

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.load();
        this.loadChartsData();
    }

    public load() {
        this.transfersQuery = this.dataService.getTransfersQueryRef(this.page, 10);
        this.transfers$ = this.transfersQuery.valueChanges.pipe(map((x) => x.data.transfers.map((t) => new TransferViewModel(t))));
    }

    public loadChartsData() {
        if (this.transferAnalyticsModel === 'months') {
            this.transferAggregation$ = this.dataService
                .getMontlyTransfers(this.lastTimestampInApril)
                .pipe(map((x) => new TransferAggregationViewModel(x)));
        } else {
            const twentyDaysAgoTimestamp = moment.utc().startOf('day').add(-14, 'days').unix();
            this.transferAggregation$ = this.dataService
                .getDailyTransfers(twentyDaysAgoTimestamp)
                .pipe(map((x) => new TransferAggregationViewModel(x)));
        }
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
