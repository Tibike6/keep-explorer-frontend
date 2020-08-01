import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { TransferViewModel } from 'src/app/models/transfer.viewmodel';

@Component({
    selector: 'app-transaction-item',
    templateUrl: './transaction-item.component.html',
    styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent implements OnInit {
    @Input() public transfer: TransferViewModel;

    constructor() {}

    ngOnInit(): void {}

    public printQuantity(value: string) {
        if (!value || value === '0') {
            return '0';
        } else if (value.length < 18) {
            value = this.zeroPad(value, 19);
        }
        const index = value.length - 18;
        const temp = value.slice(0, index) + '.' + value.slice(index, value.length);
        return temp.replace(/^0+(\d)|(\d)0+$/gm, '$1$2');
    }

    public getTime(timestamp: number) {
        return new Date(Number(timestamp) * 1000).toUTCString();
    }

    public getTimeAgo(timestamp: number) {
        return moment(new Date(Number(timestamp) * 1000).toUTCString()).fromNow();
    }

    public isKeepTransaction() {
        return true;
        // return this.transfer.token === 'KEEP';
    }

    private zeroPad(value: string, places: number): string {
        const zero = places - value.length + 1;
        return Array(+(zero > 0 && zero)).join('0') + value;
    }
}
