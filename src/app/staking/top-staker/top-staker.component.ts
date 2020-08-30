import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { ThemeService } from '../../services/theme.service';
import { DataService } from '../../services/data.service';
import { Theme } from '../../models/interfaces';
import { StakeViewModel } from '../../models/stake.viewmodel';
import { map, tap } from 'rxjs/operators';
import { Utils } from '../../utils';
import { Label } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { MediaMatcher } from '@angular/cdk/layout';
import { BaseChartDirective } from 'ng2-charts';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-top-staker',
    templateUrl: './top-staker.component.html',
    styleUrls: ['./top-staker.component.scss']
})
export class TopStakerComponent implements OnInit {
    @ViewChild(BaseChartDirective) public chart: BaseChartDirective;
    public stakes$: Observable<any>;
    public stakesQuery: QueryRef<any>;
    public currentPage = 1;
    public page: number;
    public Theme = Theme;
    public Math = Math;
    public Utils = Utils;
    public doughnutChartLabels: Label[] = [];
    public doughnutChartData = [];
    public showLegend = window.innerWidth <= 991 ? false : true;
    public options: ChartOptions = {
        legend: { position: 'left', display: this.showLegend },
        tooltips: {
            callbacks: {
                label(tooltipItem, chart) {
                    const datasetLabel = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString('en-US');
                    return datasetLabel + ' KEEP';
                }
            }
        }
    };
    public chartColors = [
        {
            backgroundColor: [
                '#7cb5ec',
                '#616161',
                '#f7a35c',
                '#8085e9',
                '#82e677',
                '#f15c80',
                '#e4d354',
                '#2b908f',
                '#f45b5b',
                '#48dbb4',
                '#541d9a',
                '#28a745',
                '#033669',
                '#bd2130',
                '#cb48db',
                '#ffc107',
                '#7b4d00',
                '#a0a09e',
                '#ea0016',
                '#007bff'
            ],
            borderColor: 'transparent'
        }
    ];

    private matcher: MediaQueryList;
    private listener: any;

    constructor(private dataService: DataService, private mediaMatcher: MediaMatcher, public themeService: ThemeService) {}

    ngOnInit(): void {
        this.matcher = this.mediaMatcher.matchMedia('(max-width: 991px)');
        // tslint:disable-next-line: deprecation
        this.listener = () => this.myListener(event);
        this.matcher.addEventListener('change', this.listener);
        // Chart.defaults.global.legend.display = false;
        // tslint:disable-next-line: no-string-literal
        window['switchStyle'](this.themeService.getCurrentTheme());
        this.load();
    }

    public load() {
        this.stakesQuery = this.dataService.getStakesQueryRef(this.themeService.getCurrentTheme(), this.page, 20);
        this.stakes$ = this.stakesQuery.valueChanges.pipe(
            map((x) => x.data.stakes.map((t) => new StakeViewModel(t))),
            tap((x: StakeViewModel[]) => {
                if (this.doughnutChartLabels.length === 0) {
                    this.setChartData(x);
                }
            })
        );
    }

    public myListener(event) {
        this.showLegend = window.innerWidth <= 991 ? false : true;
        this.chart.chart.options.legend.display = this.showLegend;
    }

    public fetchMore() {
        this.stakesQuery.fetchMore({
            variables: { pageSize: 10, skip: 10 * this.currentPage },
            updateQuery: (prev, { fetchMoreResult }) => {
                this.currentPage++;
                if (!fetchMoreResult) {
                    return prev;
                }
                return Object.assign({}, prev, {
                    stakes: [...prev.stakes, ...fetchMoreResult.stakes]
                });
            }
        });
    }

    public sortBy(value: string) {}

    private setChartData(data: StakeViewModel[]) {
        data.map((x) => this.doughnutChartLabels.push(x.id));
        data.map((x) => this.doughnutChartData.push(Utils.printQuantity(x.amount.toString())));
    }
}
