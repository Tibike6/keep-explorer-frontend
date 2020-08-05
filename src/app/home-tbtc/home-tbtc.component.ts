import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home-tbtc.component.html',
    styleUrls: ['./home-tbtc.component.scss']
})
export class HomeTbtcComponent implements OnInit {
    constructor() {
        // tslint:disable-next-line: no-string-literal
        window['switchStyle']('tbtc');
    }

    ngOnInit() {}
}
