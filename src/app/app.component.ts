import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Portfolio } from './social-network/interfaces/portfolio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Output() title = 'Portgular';

  user = Number(localStorage.getItem('user_id'));

  portfolio!: Portfolio;

  dataArray: number[] = [];

  constructor(private authService: AuthService) { }
    
  ngOnInit(): void {
    

    this.authService.loginChange$.subscribe({
      next: o => {
        if (o === true) {
          setInterval(() => this.authService.logout(), 600000);
        }
      }
    })
  }
}
