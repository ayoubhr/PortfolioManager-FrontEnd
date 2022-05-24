import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StateService } from 'src/app/state-service/state.service';
import { Portfolio, Asset } from '../../interfaces/portfolio';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transaction = 'Add Transaction';
  
  portfolio!: Portfolio;

  quantity: number = 0;

  asset!: Asset;

  @Output() totalBalance = new EventEmitter<number>();
  //@Input() asset!: any;
  @Input() symbol!: any;
  
  @Input() author: any;

  @Input() i!: number;

  constructor(private apiService: ApiService, private stateService: StateService) { }

  ngOnInit(): void {
    this.portfolio = this.stateService.getPortfolio(this.author);
    this.asset = this.stateService.getAsset(this.symbol);
  }

  addTx() {

    let t = 'tx' + this.i;
    let f = 'form' + this.i;
    let tx = document.getElementById(t);
    let form = document.getElementById(f);

    if (form?.getAttribute('hidden') === 'true') {
      form?.removeAttribute('hidden');
      tx?.setAttribute('hidden', 'true');
    } else {
      form?.setAttribute('hidden', 'true');
      tx?.removeAttribute('hidden');
    }
  }

  confirm(asset: Asset) {
    // add a transaction to the asset.
    let sumOfQuantity = 0;
    this.portfolio.composition.forEach(a => {
      if (a.assetName === asset.assetName) {
        a.quantity += this.quantity;
      }
      sumOfQuantity += a.quantity * a.assetPrice;
    });

    this.portfolio.composition.forEach(a => {
      a.assetPercentage = (((a.quantity * a.assetPrice) * 100) / sumOfQuantity).toFixed(2);
    });

    this.stateService.setTotalBalance(sumOfQuantity);

    this.apiService.savePortfolio(this.portfolio).subscribe({
      next: p => {
        this.ngOnInit();
        this.addTx();
      }
    });

  }
}
