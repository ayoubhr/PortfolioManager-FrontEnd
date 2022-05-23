import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() add = new EventEmitter<UserLogin>();
  @ViewChild('loginForm') loginForm!: NgForm;

  user: UserLogin = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(user: UserLogin) {
    if (this.loginForm.valid) {
      this.authService.login(user);
    }
  }

  register() {
    this.router.navigate(['auth/register']);
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }
}
