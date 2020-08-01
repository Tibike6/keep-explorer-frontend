import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenType } from '../../models/interfaces';
import { Router } from '@angular/router';
import { TransferViewModel } from 'src/app/models/transfer.viewmodel';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
    public transfers$: Observable<TransferViewModel[]>;
    public TokenType = TokenType;
    public checkModel: any = { keep: true, tbtc: true };

    constructor(public router: Router, private dataService: DataService) {}

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

        this.transfers$ = this.dataService.getTransfers(1, 10).pipe(map((x) => x.map((t) => new TransferViewModel(t))));
    }
}
