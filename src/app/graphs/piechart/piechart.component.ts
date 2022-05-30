import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from 'src/app/social-network/services/api.service';
import { Portfolio } from 'src/app/social-network/interfaces/portfolio';
import { StateService } from 'src/app/state-service/state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  user = Number(localStorage.getItem('user_id'));

  portfolio!: Portfolio;

  dataArray: any = [];

  labelsArray: string[] = [];

  assetName!: string;

  routeTo = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    if (+this.route.snapshot.params['id']) {
      this.routeTo = true;
      let id = +this.route.snapshot.params['id'];
      this.apiService.getPortfolio(id).subscribe({
        next: p => {
          this.portfolio = p;
          console.log(this.portfolio)
          this.portfolio.composition.forEach(asset => {
            if (Number(asset.assetPercentage) > 0) {
              this.dataArray.push(Number(asset.assetPercentage));
              this.labelsArray.push(asset.assetName);
            }
          });
          this.assetName = this.portfolio.name;
          console.log(this.dataArray);
          console.log(this.labelsArray);
          this.toggleLegend();
        },
        error: err => console.log(err),
        complete: () => {

        }
      })
    } else {
      this.apiService.getPortfoliosByAuthor(this.user).subscribe({
        next: p => {
          this.portfolio = p[0];
          console.log(this.portfolio)
          this.portfolio.composition.forEach(asset => {
            if (Number(asset.assetPercentage) > 0) {
              this.dataArray.push(Number(asset.assetPercentage));
              this.labelsArray.push(asset.assetName);
            }
          });
          this.assetName = this.portfolio.name;
          console.log(this.dataArray);
          console.log(this.labelsArray);
          this.toggleLegend();
        },
        error: err => console.log(err),
        complete: () => {

        }
      });
    }
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left'
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.labelsArray,
    datasets: [{
      data: this.dataArray
    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

  backToPortfolioManager() {
    if(this.routeTo === false) {
      this.stateService.activateOption("", "main", "addPortfolio");
      this.router.navigate(['']);
    } else if (this.routeTo === true) {
      this.stateService.activateOption("", "main", "portfolios");
      this.router.navigate(['']);
    }
  }
}
