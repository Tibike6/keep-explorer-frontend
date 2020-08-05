import { Component, OnInit, Input } from '@angular/core';
import { TransferViewModel } from 'src/app/models/transfer.viewmodel';
import { Theme } from '../../models/interfaces';
import { ThemeService } from '../../services/theme.service';
import { Utils } from '../../utils';

@Component({
    selector: 'app-transaction-item',
    templateUrl: './transaction-item.component.html',
    styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent implements OnInit {
    @Input() public transfer: TransferViewModel;
    public Theme = Theme;
    public Utils = Utils;

    constructor(public themeService: ThemeService) {}

    ngOnInit(): void {}
}
