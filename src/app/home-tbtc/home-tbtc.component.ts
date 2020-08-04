import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home-tbtc.component.html',
    styleUrls: ['./home-tbtc.component.scss']
})
export class HomeTbtcComponent implements OnInit {
    constructor() {
        window['switchStyle']('Tbtc');
    }

    ngOnInit() {}
}
