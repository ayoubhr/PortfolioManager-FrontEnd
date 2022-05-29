import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/state-service/state.service';
import { Asset, Portfolio } from '../interfaces/portfolio';
import { ApiService } from '../services/api.service';
import { CoingeckoService } from '../services/coingecko.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.scss']
})
export class AddPortfolioComponent implements OnInit, AfterViewInit {

  user = Number(localStorage.getItem('user_id'));

  @ViewChild('modal', { static: false }) modal!: ModalComponent

  @Input() asset!: any;

  @Output() symbol!: string;

  @Output() i!: number;

  bool!: boolean;

  portfolios: Portfolio[] = [];

  portfolio: Portfolio = {
    name: '',
    author: '',
    composition: []
  }

  totalBalance!: number;

  delete = 'Delete Asset';

  price!: number;

  constructor(private apiService: ApiService, private coingeckoService: CoingeckoService, private stateService: StateService, private router: Router) { }

  ngOnInit() {
    this.apiService.getPortfoliosByAuthor(this.user).subscribe({
      next: p => {
        if (p[0]) {
          this.portfolio = p[0];
          this.bool = true;
          this.stateService.setPortfolio(this.portfolio);
          this.stateService.setAsset(this.asset?.assetSymbol, this.asset);
        } else {
          this.bool = false
        }
      },
      complete: () => {
        console.log(this.portfolio)
      }

    })
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.totalBalanceCalc();
    }, 500);
  }

  openModal() {
    this.modal.open();
  }

  handleEvent(event: string) {
    // add the event, which is an asset, to the assets table.
    let asset: Asset = {
      assetName: '',
      assetSymbol: '',
      quantity: 0,
      assetPercentage: 0,
      assetPrice: 0,
      assetImage: ''
    }
    this.coingeckoService.getAsset(event).subscribe({
      next: a => {
        asset.assetName = a.id;
        asset.quantity = 0;
        asset.assetPercentage = 0;
        asset.assetSymbol = a.symbol;
        asset.assetPrice = a.market_data.current_price.usd
        asset.assetImage = a.image.thumb;
        this.portfolio.composition.push(asset);

        this.portfolio.author = String(this.user);
        //if portfolio is unnamed use this name
        this.portfolio.name = "portfolio_test";

        this.apiService.savePortfolio(this.portfolio).subscribe({
          next: p => {
            this.ngOnInit();
          }
        });
      },
      complete: () => {
        this.bool = true;
        this.modal.closeModal();
        console.log(this.portfolio)
      }
    })

  }

  deleteAsset(asset: any) {
    // delete the asset from the assets table.
    let index = this.portfolio.composition.indexOf(asset);
    this.portfolio.composition.splice(index, 1);

    this.totalBalanceCalc();
    this.portfolio.composition.forEach(a => {
      a.assetPercentage = (((a.quantity * a.assetPrice) * 100) / this.totalBalance).toFixed(2);
    });

    this.apiService.savePortfolio(this.portfolio).subscribe({
      next: p => {
        this.ngOnInit();
      }
    });
  }

  launch(asset: Asset) {
    this.stateService.setAsset(asset.assetSymbol, asset);
  }

  totalBalanceCalc() {
    this.totalBalance = 0;
    this.portfolio.composition.forEach(a => {
      this.totalBalance += a.assetPrice * a.quantity;
    });
  }

  keepAssetPricesUpdate() {
    this.portfolio.composition.forEach(a => {
      this.coingeckoService.getAsset(a.assetSymbol).subscribe({
        next: a => {
          a.assetPrice = a.market_data.current_price.usd;
        }
      })
    });
  }

  routeToPortfolioGraphs() {
    this.router.navigate(['/graphs/portfolio']);
  }
}
