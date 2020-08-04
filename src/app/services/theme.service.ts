import { Injectable } from '@angular/core';
import { Theme } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    public theme: Theme;

    constructor() {}

    public getCurrentTheme(): Theme {
        return this.theme;
    }

    public setTheme(value: Theme): void {
        this.theme = value;
    }
}
