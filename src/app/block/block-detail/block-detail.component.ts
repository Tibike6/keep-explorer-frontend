import { Component, OnInit } from '@angular/core';
import { Theme } from '../../models/interfaces';
import { ThemeService } from '../../services/theme.service';
import { Utils } from '../../utils';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-block-detail',
    templateUrl: './block-detail.component.html',
    styleUrls: ['./block-detail.component.scss']
})
export class BlockDetailComponent implements OnInit {
    public block$: Observable<any>; // TODO make Viewmodel
    public Theme = Theme;
    public Utils = Utils;
    public Number = Number;

    constructor(public themeService: ThemeService, private dataService: DataService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const blocknumber = this.route.snapshot.paramMap.get('hash');
        this.block$ = this.dataService.getBlock(this.themeService.getCurrentTheme(), blocknumber);
    }
}
