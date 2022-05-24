import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsRoutingModule } from './graphs-routing.module';
import { PiechartComponent } from './piechart/piechart.component';
import { NgChartsModule } from 'ng2-charts';
import { CandleStickComponent } from './piechart/candle-stick/candle-stick.component';
import { DateFnsModule } from 'ngx-date-fns';


@NgModule({
  declarations: [
    PiechartComponent,
    CandleStickComponent
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    NgChartsModule.forRoot(),
    DateFnsModule.forRoot()
  ]
})
export class GraphsModule { }
