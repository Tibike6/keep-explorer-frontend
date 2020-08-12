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

    public static getDate(timestamp: number) {
        return moment(new Date(Number(timestamp) * 1000).toUTCString()).format('MMMM Do YYYY, hh:mm:ss A');
    }

    public static getDateOnly(timestamp: number) {
        return moment(new Date(Number(timestamp) * 1000).toUTCString()).format('MM-DD-YYYY');
    }

    public static getMonths(seconds: number) {
        return moment.duration(seconds, 'seconds').asMonths();
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

    public static toFixed(x) {
        if (Math.abs(x) < 1.0) {
            const e = parseInt(x.toString().split('e-')[1], 10);
            if (e) {
                x *= Math.pow(10, e - 1);
                x = '0.' + new Array(e).join('0') + x.toString().substring(2);
            }
        } else {
            let e = parseInt(x.toString().split('+')[1], 10);
            if (e > 20) {
                e -= 20;
                x /= Math.pow(10, e);
                x += new Array(e + 1).join('0');
            }
        }
        return x;
    }

    public static getThemeText(theme: Theme) {
        return theme === Theme.KEEP ? 'KEEP' : 'tBTC';
    }
}
