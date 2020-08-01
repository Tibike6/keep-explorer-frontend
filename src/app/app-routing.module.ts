import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionPageComponent } from './transaction/transaction-page/transaction-page.component';
import { HomeComponent } from './home/home.component';
import { BlockPageComponent } from './block/block-page/block-page.component';
import { AnalyticsPageComponent } from './analytics/analytics-page/analytics-page.component';

const routes: Routes = [
    { path: 'transactions', component: TransactionPageComponent },
    { path: 'blocks', component: BlockPageComponent },
    { path: 'analytics', component: AnalyticsPageComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
