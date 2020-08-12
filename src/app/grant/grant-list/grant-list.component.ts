import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { QueryRef } from 'apollo-angular';
import { GrantViewModel } from '../../models/grant.viewmodel';
import { Utils } from 'src/app/utils';

export enum GrantTableSortingType {
    IdDesc = 'idDesc',
    IdAsc = 'idAsc',
    AmountDesc = 'amountDesc',
    AmountAsc = 'amountAsc',
    CreatedAtDesc = 'createdAtDesc',
    CreatedAtAsc = 'createdAtAsc',
    FullyUnlockedAtDesc = 'fullyUnlockedAtDesc',
    FullyUnlockedAtAsc = 'fullyUnlockedAtAsc',
    StakedDesc = 'stakedDesc',
    StakedAsc = 'stakedAsc',
    RevokedDesc = 'revokedDesc',
    RevokedAsc = 'revokedAsc'
}

@Component({
    selector: 'app-grant-list',
    templateUrl: './grant-list.component.html',
    styleUrls: ['./grant-list.component.scss']
})
export class GrantListComponent implements OnInit, OnDestroy {
    public grants$: Observable<GrantViewModel[]>;
    public grantsQuery: QueryRef<any>;
    public Utils = Utils;
    public Math = Math;
    public GrantTableSortingType = GrantTableSortingType;
    public page = 1;
    public pageSize = 10;
    public totalItems = 0;
    public colspan = window.innerWidth < 768 ? 5 : 7;
    public isCollapsed: Array<boolean> = [];
    public sortType = GrantTableSortingType.IdAsc;

    private matcher: MediaQueryList;
    private listener: any;

    constructor(private dataService: DataService, private mediaMatcher: MediaMatcher, private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.load();
        this.matcher = this.mediaMatcher.matchMedia('(max-width: 767px)');
        // tslint:disable-next-line: deprecation
        this.listener = () => this.myListener(event);
        this.matcher.addEventListener('change', this.listener);
    }

    ngOnDestroy(): void {
        this.matcher.removeEventListener('change', this.listener);
    }

    public myListener(event) {
        this.colspan = event.matches ? 5 : 7;
    }

    public pageChanged(event: any) {
        // this.load();
    }

    public sortBy(value: string) {
        switch (value) {
            case 'id':
                if (this.sortType === GrantTableSortingType.IdAsc) {
                    this.sortType = GrantTableSortingType.IdDesc;
                } else {
                    this.sortType = GrantTableSortingType.IdAsc;
                }
                this.load();
                break;
            case 'amount':
                if (this.sortType === GrantTableSortingType.AmountAsc) {
                    this.sortType = GrantTableSortingType.AmountDesc;
                } else {
                    this.sortType = GrantTableSortingType.AmountAsc;
                }
                this.load();
                break;
            case 'createdAt':
                if (this.sortType === GrantTableSortingType.CreatedAtAsc) {
                    this.sortType = GrantTableSortingType.CreatedAtDesc;
                } else {
                    this.sortType = GrantTableSortingType.CreatedAtAsc;
                }
                this.load();
                break;
            case 'fullyUnlocked':
                if (this.sortType === GrantTableSortingType.FullyUnlockedAtAsc) {
                    this.sortType = GrantTableSortingType.FullyUnlockedAtDesc;
                } else {
                    this.sortType = GrantTableSortingType.FullyUnlockedAtAsc;
                }
                this.load();
                break;
            case 'staked':
                if (this.sortType === GrantTableSortingType.StakedAsc) {
                    this.sortType = GrantTableSortingType.StakedDesc;
                } else {
                    this.sortType = GrantTableSortingType.StakedAsc;
                }
                this.load();
                break;
            case 'revoked':
                if (this.sortType === GrantTableSortingType.RevokedAsc) {
                    this.sortType = GrantTableSortingType.RevokedDesc;
                } else {
                    this.sortType = GrantTableSortingType.RevokedAsc;
                }
                this.load();
                break;
        }
    }

    public load() {
        this.grantsQuery = this.dataService.getGrantsQueryRef(1, 10);
        this.grants$ = this.grantsQuery.valueChanges.pipe(
            tap((x) => {
                switch (this.sortType) {
                    case GrantTableSortingType.IdAsc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => a.id - b.id);
                        break;
                    case GrantTableSortingType.IdDesc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => b.id - a.id);
                        break;
                    case GrantTableSortingType.AmountAsc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => a.amount - b.amount);
                        break;
                    case GrantTableSortingType.AmountDesc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => b.amount - a.amount);
                        break;
                    case GrantTableSortingType.CreatedAtAsc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => a.timestamp - b.timestamp);
                        break;
                    case GrantTableSortingType.CreatedAtDesc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => b.timestamp - a.timestamp);
                        break;
                    case GrantTableSortingType.FullyUnlockedAtAsc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => a.timestamp - b.timestamp);
                        break;
                    case GrantTableSortingType.FullyUnlockedAtDesc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => b.timestamp - a.timestamp);
                        break;
                    case GrantTableSortingType.StakedAsc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => (a.staked - b.staked) * -1);
                        break;
                    case GrantTableSortingType.StakedDesc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => (b.staked - a.staked) * -1);
                        break;
                    case GrantTableSortingType.RevokedAsc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => (Number(a.revokedAt) - Number(b.revokedAt)) * -1);
                        break;
                    case GrantTableSortingType.RevokedDesc:
                        x.data.grants.sort((a: GrantViewModel, b: GrantViewModel) => (Number(b.revokedAt) - Number(a.revokedAt)) * -1);
                        break;
                    default:
                        break;
                }
            }),
            tap((x) => {
                this.totalItems = x.data?.grants?.length ?? 0;
                this.isCollapsed = new Array(this.totalItems).fill(true);
            }),
            map((x) => x.data.grants.map((g) => new GrantViewModel(g)))
        );
    }
}
