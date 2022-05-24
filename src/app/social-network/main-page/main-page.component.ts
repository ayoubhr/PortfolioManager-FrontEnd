import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StateService } from 'src/app/state-service/state.service';
import { Publication, SavePublication } from '../interfaces/publication';
import { Reaction, SaveReaction } from '../interfaces/reaction';
import { ApiService } from '../services/api.service';
import { CoingeckoService } from '../services/coingecko.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  portfolios: boolean = false;
  addPortfolio: boolean = false;
  mybuddies: boolean = false;
  main: boolean = true;

  user = Number(localStorage.getItem('user_id'));

  assets!: any;

  constructor(private router: Router, private apiService: ApiService, private stateService: StateService, private coingeckoService: CoingeckoService) { }

  ngOnInit(): void {
    this.stateService.portfolios$.subscribe({
      next: t => this.portfolios = t
    });
    this.stateService.addPortfolio$.subscribe({
      next: t => this.addPortfolio = t
    });
    this.stateService.mybuddies$.subscribe({
      next: t => this.mybuddies = t
    });
    this.stateService.main$.subscribe({
      next: t => this.main = t
    });

    this.coingeckoService.getAssets().subscribe({
      next: as => {
        this.assets = as
      },
      complete: () => console.log(this.assets)
    })
  }
}

