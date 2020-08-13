import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { ThemeService } from '../../services/theme.service';
import { DataService } from '../../services/data.service';
import { Theme } from '../../models/interfaces';
import { TokenHolderViewModel } from '../../models/tokenHolder.viewmodel';
import { map, tap } from 'rxjs/operators';
import { Utils } from '../../utils';
import { Label } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-token-holder-page',
    templateUrl: './token-holder-page.component.html',
    styleUrls: ['./token-holder-page.component.scss']
})
export class TokenHolderPageComponent implements OnInit {
    public tokenHolders$: Observable<any>;
    public tokenHoldersQuery: QueryRef<any>;
    public currentPage = 1;
    public page: number;
    public Theme = Theme;
    public Math = Math;
    public Utils = Utils;
    public doughnutChartLabels: Label[] = [];
    public doughnutChartData = [];
    public options: ChartOptions = {
        legend: { position: 'left' },
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

    constructor(private dataService: DataService, public themeService: ThemeService) {}

    ngOnInit(): void {
        // Chart.defaults.global.legend.display = false;
        // tslint:disable-next-line: no-string-literal
        window['switchStyle'](this.themeService.getCurrentTheme());
        this.load();
    }

    public load() {
        this.tokenHoldersQuery = this.dataService.getTokenHoldersQueryRef(this.themeService.getCurrentTheme(), this.page, 20);
        this.tokenHolders$ = this.tokenHoldersQuery.valueChanges.pipe(
            map((x) => x.data.tokenHolders.map((t) => new TokenHolderViewModel(t))),
            tap((x: TokenHolderViewModel[]) => {
                if (this.doughnutChartLabels.length === 0) {
                    this.setChartData(x);
                }
            })
        );
    }

    public fetchMore() {
        this.tokenHoldersQuery.fetchMore({
            variables: { pageSize: 10, skip: 10 * this.currentPage },
            updateQuery: (prev, { fetchMoreResult }) => {
                this.currentPage++;
                if (!fetchMoreResult) {
                    return prev;
                }
                return Object.assign({}, prev, {
                    tokenHolders: [...prev.tokenHolders, ...fetchMoreResult.tokenHolders]
                });
            }
        });
    }

    public checkAddress(value: string): string {
        if (value === '0x175989c71fd023d580c65f5dc214002687ff88b7') {
            return (value += ' (Token Grant)');
        } else if (value === '0x68eb4de507c6802d73904a18fb228c7dc2981200') {
            return (value += ' (Stakedrop Escrow)');
        } else if (value === '0x6950c4c7e97c7d2e6b5bffec4634f841db2a5f3d') {
            return (value += ' (MultiSig)');
        } else if (value === '0x75e89d5979e4f6fba9f97c104c2f0afb3f1dcb88') {
            return (value += ' (MXC)');
        } else if (value === '0x0211f3cedbef3143223d3acf0e589747933e8527') {
            return (value += ' (MXC2)');
        } else if (value === '0xcce8d59affdd93be338fc77fa0a298c2cb65da59') {
            return (value += ' (Bilaxy 2)');
        } else if (value === '0xb38b0c480a451db976837a1a464af95bb0f3f5e2') {
            return (value += ' (Balancer: KEEP/ETH 80/20 #4)');
        } else if (value === '0xe6f19dab7d43317344282f803f8e8d240708174a') {
            return (value += ' (Uniswap V2: KEEP 3)');
        } else if (value === '0x944644ea989ec64c2ab9ef341d383cef586a5777') {
            return (value += ' (LoopringDEX: Beta 1)');
        }

        return value;
    }

    public sortBy(value: string) {}

    private setChartData(data: TokenHolderViewModel[]) {
        data.map((x) => this.doughnutChartLabels.push(this.checkAddress(x.id)));
        data.map((x) => this.doughnutChartData.push(Utils.printQuantity(x.tokenBalance.toString())));
    }
}
