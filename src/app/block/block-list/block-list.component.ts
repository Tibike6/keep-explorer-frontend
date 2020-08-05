import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { QueryRef } from 'apollo-angular';
import { BlockViewModel } from '../../models/block.viewmodel';
import { Theme } from 'src/app/models/interfaces';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
    selector: 'app-block-list',
    templateUrl: './block-list.component.html',
    styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {
    public blocks$: Observable<BlockViewModel[]>;
    public blocksQuery: QueryRef<any>;
    public Theme = Theme;

    constructor(private dataService: DataService, public themeService: ThemeService) {}

    ngOnInit(): void {
        this.load();
    }

    public load() {
        this.blocksQuery = this.dataService.getBlocksQueryRef(this.themeService.getCurrentTheme(), 1, 10);
        this.blocks$ = this.blocksQuery.valueChanges.pipe(map((x) => x.data.blocks.map((b) => new BlockViewModel(b))));
    }
}
