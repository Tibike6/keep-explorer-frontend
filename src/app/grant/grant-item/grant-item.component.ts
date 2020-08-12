import { Component, OnInit, Input } from '@angular/core';
import { GrantViewModel } from '../../models/grant.viewmodel';
import { Utils } from '../../utils';

@Component({
    selector: 'app-grant-item',
    templateUrl: './grant-item.component.html',
    styleUrls: ['./grant-item.component.scss']
})
export class GrantItemComponent implements OnInit {
    @Input() public grant: GrantViewModel;
    public Utils = Utils;

    constructor() {}

    ngOnInit(): void {}
}
