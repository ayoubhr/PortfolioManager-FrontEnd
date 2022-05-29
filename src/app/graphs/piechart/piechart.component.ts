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

  constructor(private route: ActivatedRoute, private apiService: ApiService, private stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    if (+this.route.snapshot.params['id']) {
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

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // estos metodos sobran
  /*changeLabels(): void {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map(_ => randomWord());

    this.chart?.update();
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3']);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  // vale
  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }

    this.chart?.render();
  }*/

  // vale
  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

  backToPortfolioManager() {
    this.router.navigate(['']);

    this.stateService.activateOption("", "main", "addPortfolio");
  }
}
