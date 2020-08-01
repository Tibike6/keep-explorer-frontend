import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { BlockViewModel } from 'src/app/models/block.viewmodel';

@Component({
    selector: 'app-block-item',
    templateUrl: './block-item.component.html',
    styleUrls: ['./block-item.component.scss']
})
export class BlockItemComponent implements OnInit {
    @Input() public block: BlockViewModel;

    constructor() {}

    ngOnInit(): void {}

    public getTimeAgo(timestamp: number) {
        return moment(new Date(Number(timestamp) * 1000).toUTCString()).fromNow();
    }
}
