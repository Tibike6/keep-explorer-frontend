import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-keep-logo',
    templateUrl: './keep-logo.component.html',
    styleUrls: ['./keep-logo.component.scss']
})
export class KeepLogoComponent implements OnInit {
    @Input() width = 100;
    @Input() height = 'auto';
    @Input() color = 'black';

    constructor() {}

    ngOnInit(): void {}
}
