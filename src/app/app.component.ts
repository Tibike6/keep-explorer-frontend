import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

export enum Theme {
    KEEP = 'Keep',
    TBTC = 'Tbtc'
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public isActive = false;
    public Theme = Theme;
    public theme: Theme;

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.urlAfterRedirects.includes('/tbtc')) {
                    this.theme = Theme.TBTC;
                } else {
                    this.theme = Theme.KEEP;
                }
            }
        });
    }
}
