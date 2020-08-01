import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../../data.service';
import { QueryRef } from 'apollo-angular';
import { BlockViewModel } from '../../models/block.viewmodel';

@Component({
    selector: 'app-block-list',
    templateUrl: './block-list.component.html',
    styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {
    public blocks$: Observable<BlockViewModel[]>;
    public blocksQuery: QueryRef<any>;

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.load();
    }

    public load() {
        this.blocksQuery = this.dataService.getBlocksQueryRef(1, 10);
        this.blocks$ = this.blocksQuery.valueChanges.pipe(map((x) => x.data.blocks.map((b) => new BlockViewModel(b))));
    }
}
