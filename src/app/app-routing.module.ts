import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionPageComponent } from './transaction/transaction-page/transaction-page.component';
import { HomeKeepComponent } from './home-keep/home-keep.component';
import { HomeTbtcComponent } from './home-tbtc/home-tbtc.component';
import { BlockPageComponent } from './block/block-page/block-page.component';
import { GrantsPageComponent } from './grants/grants-page/grants-page.component';

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
        path: 'tbtc/blocks',
        component: BlockPageComponent
    },
    {
        path: 'keep/grants',
        component: GrantsPageComponent
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
