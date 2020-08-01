import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-block-icon',
    templateUrl: './block-icon.component.html',
    styleUrls: ['./block-icon.component.scss']
})
export class BlockIconComponent implements OnInit {
    @Input() width = 38;
    @Input() height = 34;

    constructor() {}

    ngOnInit(): void {}
}
