import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StocksListComponent } from './features/stocks/components/stocks-list/stocks-list.component';
import { StocksDetailComponent } from './features/stocks/components/stocks-detail/stocks-detail.component';
import { StocksListItemComponent } from './features/stocks/components/stocks-list-item/stocks-list-item.component';
import { StocksWrapperComponent } from './features/stocks/components/stocks-wrapper/stocks-wrapper.component';
import { ChartBaseComponent } from './shared-components/chart-base/chart-base.component';
import { ForexWrapperComponent } from './features/forex/components/forex-wrapper/forex-wrapper.component';
import { ForexListComponent } from './features/forex/components/forex-list/forex-list.component';
import { ForexListItemComponent } from './features/forex/components/forex-list-item/forex-list-item.component';
import { ForexDetailComponent } from './features/forex/components/forex-detail/forex-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    StocksListComponent,
    StocksDetailComponent,
    StocksListItemComponent,
    StocksWrapperComponent,
    ChartBaseComponent,
    ForexWrapperComponent,
    ForexListComponent,
    ForexListItemComponent,
    ForexDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
