import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-transaction-icon',
    templateUrl: './transaction-icon.component.html',
    styleUrls: ['./transaction-icon.component.scss']
})
export class TransactionIconComponent implements OnInit {
    @Input() width = 30;
    @Input() height = 30;

    constructor() {}

    ngOnInit(): void {}
}
