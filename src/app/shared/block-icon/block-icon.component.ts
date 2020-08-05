import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-block-icon',
    templateUrl: './block-icon.component.html',
    styleUrls: ['./block-icon.component.scss']
})
export class BlockIconComponent implements OnInit {
    @Input() width = 30;
    @Input() height = 30;

    constructor() {}

    ngOnInit(): void {}
}
