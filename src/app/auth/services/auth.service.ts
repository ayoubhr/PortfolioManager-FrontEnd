import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { User, UserLogin } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authLogin = 'api/v1/login';
  private authValidate = 'auth/validate';
  //private authGoogle = 'auth/google';
  logged: boolean = false;
  loginChange$ = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient, private router: Router) { }

  login(user: UserLogin) {
    this.http.post<any>(`${this.authLogin}`, { username: user.email, password: user.password }).subscribe({
      next: (resp) => {
        localStorage.setItem('token', resp['access_token'])
        localStorage.setItem('user_id', resp['user_id'])
      },
      error: (error) => {
        alert('Either your password or your email isnt correct.');
        location.reload();
      },
      complete: () => this.router.navigate(['']),
    });

    if (localStorage.getItem('token') != null) {
      this.logged = true;
      this.loginChange$.next(this.logged);
    }
  }

  logout() {
    localStorage.clear();
    this.logged = false;
    this.loginChange$.next(this.logged);
    this.router.navigate(['auth/login']);
  }

  isLogged(): Observable<boolean> {
    if (this.logged === true && localStorage.getItem('token') != null) {
      return of(true);
    } else if (this.logged === false && localStorage.getItem('token') != null) {
      if (this.http.get(`${this.authValidate}`)) {
        this.logged = true;
        this.loginChange$.next(true);
        return of(true);
      } else {
        localStorage.clear();
        return of(false);
      }
    }
    return of(false);
  }
}
