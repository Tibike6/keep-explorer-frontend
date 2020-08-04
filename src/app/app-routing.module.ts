import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionPageComponent } from './transaction/transaction-page/transaction-page.component';
import { HomeKeepComponent } from './home-keep/home-keep.component';
import { HomeTbtcComponent } from './home-tbtc/home-tbtc.component';
import { BlockPageComponent } from './block/block-page/block-page.component';
import { AnalyticsPageComponent } from './analytics/analytics-page/analytics-page.component';

const routes: Routes = [
    { path: 'keep', component: HomeKeepComponent },
    { path: 'tbtc', component: HomeTbtcComponent },
    { path: 'transactions', component: TransactionPageComponent },
    { path: 'blocks', component: BlockPageComponent },
    { path: 'analytics', component: AnalyticsPageComponent },
    { path: '', redirectTo: '/keep', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent },
    { path: '**', component: HomeKeepComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
