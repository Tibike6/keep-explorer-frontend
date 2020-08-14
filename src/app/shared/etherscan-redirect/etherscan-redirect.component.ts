import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-etherscan-redirect',
    templateUrl: './etherscan-redirect.component.html',
    styleUrls: ['./etherscan-redirect.component.scss']
})
export class EtherscanRedirectComponent implements OnInit {
    @Input() width = 12;
    @Input() height = 12;
    @Input() type = 'tx';
    @Input() value: string;

    public link: string;

    constructor() {}

    ngOnInit(): void {
        this.link = `https://etherscan.io/${this.type}/${this.value}`;
    }
}
