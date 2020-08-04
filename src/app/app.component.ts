import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Theme } from './models/interfaces';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public isActive = false;
    public Theme = Theme;

    constructor(private router: Router, public themeService: ThemeService) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.urlAfterRedirects.includes('/tbtc')) {
                    this.themeService.setTheme(Theme.TBTC);
                } else {
                    this.themeService.setTheme(Theme.KEEP);
                }
            }
        });
    }
}
