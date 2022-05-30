import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StateService } from 'src/app/state-service/state.service';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})
export class MenuTopComponent implements OnInit {

  logged: boolean = false;
  @Input() title!: string;

  constructor(private authService: AuthService, private router: Router, private stateService: StateService) { }

  ngOnInit(): void {
    this.authService.loginChange$.subscribe({
      next: o => this.logged = o
    })
  }

  kill() {
    const btnTitle = document.getElementById("title");
    this.stateService.resetState(btnTitle);
    this.authService.logout();
  }

  route(id: string) {
    const btnTitle = document.getElementById("title");
    const btnPortfolios = document.getElementById("portfolios");
    const btnAddPortfolio = document.getElementById("addPortfolio");
    //const btnBuddies = document.getElementById("mybuddies");
    const btnMain = document.getElementById("main");

    btnTitle!.style.color = 'rgba(255, 255, 255, 0.624)';
    btnPortfolios!.style.color = 'rgba(255, 255, 255, 0.624)';
    btnAddPortfolio!.style.color = 'rgba(255, 255, 255, 0.624)';
    //btnBuddies!.style.color = 'rgba(255, 255, 255, 0.624)';
    btnMain!.style.color = 'rgba(255, 255, 255, 0.624)';

    // State service to show in white the active option on the navigation bar.
    this.stateService.activateOption(btnTitle, btnMain, id);

  }
}
