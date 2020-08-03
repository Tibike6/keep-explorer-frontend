import { Label, Color } from 'ng2-charts';
import { ITransferAggregation } from './interfaces';
import { ChartDataSets, ChartOptions } from 'chart.js';

export class TransferAggregationViewModel {
    public chartLabels: Label[];
    public chartData: ChartDataSets[];
    public chartColors: Color[];
    public barChartOptions: ChartOptions = {
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
                        labelString: 'Sum KEEP'
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

    constructor(transferAggregation: ITransferAggregation[]) {
        this.chartColors = [{ backgroundColor: '#48dbb4' }, { backgroundColor: '#616161' }];
        this.chartLabels = transferAggregation.map((x) => x.id);
        this.chartData = [
            { data: transferAggregation.map((x) => this.printQuantity(x.sum.toString())), label: "Sum KEEP's transferred ", yAxisID: 'y-axis-1' },
            { data: transferAggregation.map((x) => x.count), label: 'Txn Count', yAxisID: 'y-axis-2' }
        ];
    }

    public printQuantity(value: string): number {
        if (!value || value === '0') {
            return 0;
        } else if (value.length < 18) {
            value = this.zeroPad(value, 19);
        }
        const index = value.length - 18;
        const temp = value.slice(0, index) + '.' + value.slice(index, value.length);
        return Number(temp.replace(/^0+(\d)|(\d)0+$/gm, '$1$2'));
    }

    private zeroPad(value: string, places: number): string {
        const zero = places - value.length + 1;
        return Array(+(zero > 0 && zero)).join('0') + value;
    }
}
