import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { Asset, Portfolio } from '../social-network/interfaces/portfolio';
import { ApiService } from '../social-network/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  portfolios$ = new ReplaySubject<boolean>(1);
  addPortfolio$ = new ReplaySubject<boolean>(1);
  mybuddies$ = new ReplaySubject<boolean>(1);
  main$ = new ReplaySubject<boolean>(1);

  portfolio = new Map();

  assets = new Map();

  totalBalance = 0;

  constructor(private router: Router, private apiService: ApiService) { }

  // method that emits a boolean variable true for the active option on the navigation bar.
  private whichOneIsActive(option: string) {

    switch (option) {
      case "portfolios":
        this.main$.next(false);
        this.mybuddies$.next(false);
        this.addPortfolio$.next(false);
        this.portfolios$.next(true);
        break;
      case "addPortfolio":
        this.main$.next(false);
        this.mybuddies$.next(false);
        this.addPortfolio$.next(true);
        this.portfolios$.next(false);
        break;
      case "mybuddies":
        this.main$.next(false);
        this.mybuddies$.next(true);
        this.addPortfolio$.next(false);
        this.portfolios$.next(false);
        break;
      case "main":
        this.main$.next(true);
        this.mybuddies$.next(false);
        this.addPortfolio$.next(false);
        this.portfolios$.next(false);
        break;
      default:
        this.main$.next(true);
        this.mybuddies$.next(false);
        this.addPortfolio$.next(false);
        this.portfolios$.next(false);
        break;
    }

  }

  activateOption(btnTitle: any, btnMain: any, id: string) {

    this.whichOneIsActive(id);

    const btn = document.getElementById(id);
    switch (id) {
      case "title":
        this.router.navigate(['']);
        btnMain!.style.color = "white";
        btnTitle!.style.color = "white";
        break;
      case "main":
        this.router.navigate(['']);
        btnMain!.style.color = "white";
        btnTitle!.style.color = "white";
        break;
      default:
        this.router.navigate(['']);
        btn!.style.color = "white";
        break;
    }

  }

  resetState(btnTitle: any) {
    this.mybuddies$.next(false);
    this.addPortfolio$.next(false);
    this.portfolios$.next(false);
    this.main$.next(true);

    btnTitle!.style.color = "white";
  }

  setPortfolio(portfolio: Portfolio) {
    this.portfolio.set(portfolio.author, portfolio);
    //console.log(this.portfolio);
  }

  getPortfolio(author: any) {
    return this.portfolio.get(author);
  }

  setAsset(symbol: string, asset: Asset) {
    this.assets.set(symbol, asset);
    //console.log(this.assets);
  }

  getAsset(symbol: string) {
    return this.assets.get(symbol);
  }

  setTotalBalance(totalBalance: number){
    this.totalBalance = totalBalance;
  }

  getTotalBalance(){
    return this.totalBalance;
  }
}
