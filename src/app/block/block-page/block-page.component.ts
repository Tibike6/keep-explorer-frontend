import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { QueryRef } from 'apollo-angular';
import { BlockViewModel } from '../../models/block.viewmodel';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/interfaces';

@Component({
    selector: 'app-block-page',
    templateUrl: './block-page.component.html',
    styleUrls: ['./block-page.component.scss']
})
export class BlockPageComponent implements OnInit {
    public blocks$: Observable<BlockViewModel[]>;
    public blocksQuery: QueryRef<any>;
    // public totalItems = 0;
    public currentPage = 1;
    public page: number;
    public Theme = Theme;

    constructor(private dataService: DataService, public themeService: ThemeService) {}

    ngOnInit(): void {
        // tslint:disable-next-line: no-string-literal
        window['switchStyle'](this.themeService.getCurrentTheme());
        this.load();
    }

    public load() {
        this.blocksQuery = this.dataService.getBlocksQueryRef(this.themeService.getCurrentTheme(), this.page, 10);
        this.blocks$ = this.blocksQuery.valueChanges.pipe(map((x) => x.data.blocks.map((b) => new BlockViewModel(b))));
    }

    public fetchMore() {
        this.blocksQuery.fetchMore({
            variables: { pageSize: 10, skip: 10 * this.currentPage },
            updateQuery: (prev, { fetchMoreResult }) => {
                this.currentPage++;
                if (!fetchMoreResult) {
                    return prev;
                }
                return Object.assign({}, prev, {
                    blocks: [...prev.blocks, ...fetchMoreResult.blocks]
                });
            }
        });
    }

    // public pageChanged(event: any): void {
    //     this.page = event.page;
    //     this.load();
    // }
}
