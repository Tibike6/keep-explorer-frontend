import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-tbtc-logo',
    templateUrl: './tbtc-logo.component.html',
    styleUrls: ['./tbtc-logo.component.scss']
})
export class TbtcLogoComponent implements OnInit {
    @Input() width = 140;
    @Input() height = 'auto';
    @Input() color = 'black';

    constructor() {}

    ngOnInit(): void {}
}
