import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { QueryRef } from 'apollo-angular';
import { GrantViewModel } from '../../models/grant.viewmodel';
import { Utils } from 'src/app/utils';
import { Label, MultiDataSet, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';

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

export interface GrantStats {
    totalCount: number;
    totalIssued: number;
    totalAvailableToStake: number;
    totalStaked: number;
    totalWithdrawn: number;
    totalRevoked: number;
    totalReadyToRelease: number;
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
    public grantStats: GrantStats;
    public doughnutChartLabels: Label[] = ['Withdrawn', 'Revoked', 'Ready to Release', 'Locked'];
    public doughnutChartData: MultiDataSet = [[0, 0, 0]];
    public chartColors = [{ backgroundColor: ['#48dbb4', '#af0000', '#616161', '#f7be13'] }];
    public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [];

    private matcher: MediaQueryList;
    private listener: any;

    constructor(private dataService: DataService, private mediaMatcher: MediaMatcher) {}

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
            map((x) => x.data.grants.map((g) => new GrantViewModel(g))),
            tap((x) => this.createGrantStats(x))
        );
    }

    private createGrantStats(models: GrantViewModel[]) {
        const grantStats: GrantStats = {
            totalCount: 0,
            totalAvailableToStake: 0,
            totalIssued: 0,
            totalReadyToRelease: 0,
            totalStaked: 0,
            totalRevoked: 0,
            totalWithdrawn: 0
        };

        for (const model of models) {
            grantStats.totalCount++;
            grantStats.totalIssued += Number(model.amount);
            // grantStats.totalAvailableToStake += model.availableToStake;
            grantStats.totalReadyToRelease += Number(model.readyToReleaseExclusiveStaked);
            grantStats.totalStaked += Number(model.staked);
            grantStats.totalWithdrawn += Number(model.withdrawn);
            grantStats.totalRevoked += Number(model.revokedAmount);
        }

        grantStats.totalIssued = Math.round(Utils.printQuantity(Utils.toFixed(grantStats.totalIssued)));
        grantStats.totalReadyToRelease = Math.round(Utils.printQuantity(Utils.toFixed(grantStats.totalReadyToRelease)));
        grantStats.totalStaked = Math.round(Utils.printQuantity(Utils.toFixed(grantStats.totalStaked)));
        grantStats.totalWithdrawn = Math.round(Utils.printQuantity(Utils.toFixed(grantStats.totalWithdrawn)));
        grantStats.totalRevoked = Math.round(Utils.printQuantity(Utils.toFixed(grantStats.totalRevoked)));

        this.grantStats = grantStats;
        this.doughnutChartData = [
            [
                grantStats.totalWithdrawn,
                grantStats.totalRevoked,
                grantStats.totalReadyToRelease,
                grantStats.totalIssued - grantStats.totalReadyToRelease - grantStats.totalWithdrawn - grantStats.totalRevoked
            ]
        ];

        this.doughnutChartPlugins.push({
            beforeDraw(chart: any) {
                const ctx = chart.ctx;
                // const txt = 'Total Issued: ' + this.grantStats?.totalIssued;
                const txt = `Issued: ${grantStats.totalIssued.toLocaleString('en-US')}`;
                const txt2 = `Grant Count: ${grantStats.totalCount}`;

                // Get options from the center object in options
                const sidePadding = 65;
                const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                const stringWidth = ctx.measureText(txt).width;
                const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                const widthRatio = elementWidth / stringWidth;
                const newFontSize = Math.floor(30 * widthRatio);
                const elementHeight = chart.innerRadius * 2;

                // Pick a new font size so it will not be larger than the height of label.
                const fontSizeToUse = Math.min(newFontSize, elementHeight);

                ctx.font = fontSizeToUse + 'px Arial';
                ctx.fillStyle = 'black';

                // Draw text in center
                ctx.fillText(txt2, centerX, centerY - fontSizeToUse / 2 - 3);
                ctx.fillText(txt, centerX, centerY + fontSizeToUse / 2);
            }
        });
    }
}
