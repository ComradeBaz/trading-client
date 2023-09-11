import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksWrapperComponent } from './features/stocks/components/stocks-wrapper/stocks-wrapper.component';

const routes: Routes = [
  { path: 'stocks', component: StocksWrapperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
