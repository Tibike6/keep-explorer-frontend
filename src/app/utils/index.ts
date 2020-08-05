import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Theme } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    public static getTimeAgo(timestamp: number) {
        return moment(new Date(Number(timestamp) * 1000).toUTCString()).fromNow();
    }

    public static printQuantity(value: string): number {
        if (!value || value === '0') {
            return 0;
        } else if (value.length < 18) {
            value = this.zeroPad(value, 19);
        }
        const index = value.length - 18;
        const temp = value.slice(0, index) + '.' + value.slice(index, value.length);
        return Number(temp.replace(/^0+(\d)|(\d)0+$/gm, '$1$2'));
    }

    public static zeroPad(value: string, places: number): string {
        const zero = places - value.length + 1;
        return Array(+(zero > 0 && zero)).join('0') + value;
    }

    public static getThemeText(theme: Theme) {
        return theme === Theme.KEEP ? 'KEEP' : 'tBTC';
    }
}
