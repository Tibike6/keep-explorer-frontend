import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionPageComponent } from './transaction/transaction-page/transaction-page.component';
import { HomeKeepComponent } from './home-keep/home-keep.component';
import { HomeTbtcComponent } from './home-tbtc/home-tbtc.component';
import { BlockPageComponent } from './block/block-page/block-page.component';
import { GrantsPageComponent } from './grant/grants-page/grants-page.component';
import { StakingPageComponent } from './staking/staking-page/staking-page.component';
import { TransactionDetailComponent } from './transaction/transaction-detail/transaction-detail.component';
import { BlockDetailComponent } from './block/block-detail/block-detail.component';
import { TokenHolderPageComponent } from './token-holder/token-holder-page/token-holder-page.component';

const routes: Routes = [
    {
        path: 'keep',
        component: HomeKeepComponent
    },
    {
        path: 'keep/transactions',
        component: TransactionPageComponent
    },
    {
        path: 'keep/transactions/:hash',
        component: TransactionDetailComponent
    },
    {
        path: 'keep/blocks/:hash',
        component: BlockDetailComponent
    },
    {
        path: 'keep/blocks',
        component: BlockPageComponent
    },
    {
        path: 'tbtc',
        component: HomeTbtcComponent
    },
    {
        path: 'tbtc/transactions',
        component: TransactionPageComponent
    },
    {
        path: 'tbtc/transactions/:hash',
        component: TransactionDetailComponent
    },
    {
        path: 'tbtc/blocks/:hash',
        component: BlockDetailComponent
    },
    {
        path: 'tbtc/blocks',
        component: BlockPageComponent
    },
    {
        path: 'keep/grants',
        component: GrantsPageComponent
    },
    {
        path: 'keep/staking',
        component: StakingPageComponent
    },
    {
        path: 'keep/token-holders',
        component: TokenHolderPageComponent
    },
    {
        path: 'tbtc/token-holders',
        component: TokenHolderPageComponent
    },
    { path: '', redirectTo: '/keep', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent },
    { path: '**', component: HomeKeepComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
