import { Component, OnInit, Input } from '@angular/core';
import { BlockViewModel } from '../../models/block.viewmodel';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../models/interfaces';
import { Utils } from '../../utils';

@Component({
    selector: 'app-block-item',
    templateUrl: './block-item.component.html',
    styleUrls: ['./block-item.component.scss']
})
export class BlockItemComponent implements OnInit {
    @Input() public block: BlockViewModel;
    public Theme = Theme;
    public Utils = Utils;

    constructor(public themeService: ThemeService) {}

    ngOnInit(): void {}
}
