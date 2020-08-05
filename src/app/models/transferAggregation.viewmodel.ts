import { Label, Color } from 'ng2-charts';
import { ITransferAggregation, Theme } from './interfaces';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Utils } from '../utils';

export class TransferAggregationViewModel {
    public chartLabels: Label[];
    public chartData: ChartDataSets[];
    public chartColors: Color[];
    public barChartOptions: ChartOptions;

    constructor(transferAggregation: ITransferAggregation[], theme: Theme) {
        this.chartColors =
            theme === Theme.KEEP
                ? [{ backgroundColor: '#48dbb4' }, { backgroundColor: '#616161' }]
                : [{ backgroundColor: '#000000' }, { backgroundColor: '#616161' }];
        this.chartLabels = transferAggregation.map((x) => x.id);
        this.chartData = [
            {
                data: transferAggregation.map((x) => Utils.printQuantity(x.sum.toString())),
                // tslint:disable-next-line: quotemark
                label: 'Sum ' + Utils.getThemeText(theme) + "'s transferred ",
                yAxisID: 'y-axis-1'
            },
            { data: transferAggregation.map((x) => x.count), label: 'Txn Count', yAxisID: 'y-axis-2' }
        ];
        this.barChartOptions = {
            responsive: true,
            scales: {
                xAxes: [{}],
                yAxes: [
                    {
                        type: 'linear',
                        position: 'left',
                        id: 'y-axis-1',
                        scaleLabel: {
                            display: true,
                            labelString: 'Sum  ' + Utils.getThemeText(theme)
                        }
                    },
                    {
                        type: 'linear',
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            drawOnChartArea: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Txn Count'
                        }
                    }
                ]
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end'
                }
            }
        };
    }
}
