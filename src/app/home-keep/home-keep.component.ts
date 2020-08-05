import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home-keep.component.html',
    styleUrls: ['./home-keep.component.scss']
})
export class HomeKeepComponent implements OnInit {
    constructor() {
        // tslint:disable-next-line: no-string-literal
        window['switchStyle']('keep');
    }

    ngOnInit() {}
}
