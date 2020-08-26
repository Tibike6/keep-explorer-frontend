import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { TransactionItemComponent } from './transaction/transaction-item/transaction-item.component';
import { TransactionPageComponent } from './transaction/transaction-page/transaction-page.component';
import { TransactionDetailComponent } from './transaction/transaction-detail/transaction-detail.component';
import { BlockPageComponent } from './block/block-page/block-page.component';
import { BlockListComponent } from './block/block-list/block-list.component';
import { HomeKeepComponent } from './home-keep/home-keep.component';
import { HomeTbtcComponent } from './home-tbtc/home-tbtc.component';
import { BlockIconComponent } from './shared/block-icon/block-icon.component';
import { BlockItemComponent } from './block/block-item/block-item.component';
import { TransactionIconComponent } from './shared/transaction-icon/transaction-icon.component';
import { GraphQLModule } from './graphql.module';
import { LoadingComponent } from './shared/loading/loading.component';
import { GrantsPageComponent } from './grant/grants-page/grants-page.component';
import { TbtcLogoComponent } from './shared/tbtc-logo/tbtc-logo.component';
import { KeepLogoComponent } from './shared/keep-logo/keep-logo.component';
import { GrantItemComponent } from './grant/grant-item/grant-item.component';
import { GrantListComponent } from './grant/grant-list/grant-list.component';
import { BlockDetailComponent } from './block/block-detail/block-detail.component';
import { TokenHolderPageComponent } from './token-holder/token-holder-page/token-holder-page.component';
import { EtherscanRedirectComponent } from './shared/etherscan-redirect/etherscan-redirect.component';
import { HiddenPageComponent } from './hidden/hidden-page.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeKeepComponent,
        HomeTbtcComponent,
        TransactionPageComponent,
        TransactionListComponent,
        TransactionItemComponent,
        BlockListComponent,
        BlockPageComponent,
        BlockIconComponent,
        BlockItemComponent,
        TransactionIconComponent,
        TransactionDetailComponent,
        BlockDetailComponent,
        LoadingComponent,
        GrantsPageComponent,
        TbtcLogoComponent,
        KeepLogoComponent,
        GrantItemComponent,
        GrantListComponent,
        TokenHolderPageComponent,
        EtherscanRedirectComponent,
        HiddenPageComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ButtonsModule,
        FormsModule,
        ChartsModule,
        AlertModule.forRoot(),
        PaginationModule.forRoot(),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        GraphQLModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
