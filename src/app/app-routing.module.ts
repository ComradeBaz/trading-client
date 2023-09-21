import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForexWrapperComponent } from './features/forex/components/forex-wrapper/forex-wrapper.component';
import { StocksWrapperComponent } from './features/stocks/components/stocks-wrapper/stocks-wrapper.component';

const routes: Routes = [
  { path: 'stocks', component: StocksWrapperComponent },
  { path: 'forex', component: ForexWrapperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
