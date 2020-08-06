import { Component, OnInit, Input } from '@angular/core';
import { Theme } from '../../models/interfaces';
import { ThemeService } from '../../services/theme.service';
import { Utils } from '../../utils';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
    public transaction$: Observable<any>; // TODO make Viewmodel
    public Theme = Theme;
    public Utils = Utils;
    public Number = Number;

    constructor(public themeService: ThemeService, private dataService: DataService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const transactionHash = this.route.snapshot.paramMap.get('hash');
        this.transaction$ = this.dataService.getTransaction(this.themeService.getCurrentTheme(), transactionHash);
    }
}
