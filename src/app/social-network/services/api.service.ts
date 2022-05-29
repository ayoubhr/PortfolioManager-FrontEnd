import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user';
import { Portfolio } from '../interfaces/portfolio';
import { Publication, SavePublication } from '../interfaces/publication';
import { Reaction, SaveReaction } from '../interfaces/reaction';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiFindPortfoliosByAuthor = "api/v1/portfolios/find-portfolio-author"
  private apiFindPortfolios = "api/v1/portfolios/find-all-portfolios";
  private apiFindPortfolio = "api/v1/portfolios/find-portfolio";
  private apiSavePortfolio = "api/v1/portfolios/save-portfolio";
  private apiFindPortfolioReactions = "api/v1/portfolios/find-portfolio-reactions";

  private apiFindReactions = "api/v1/reactions/find-reactions";
  private apiSaveReaction = "api/v1/reactions/save-reaction";

  private apiFindUser = "api/v1/users/find-user";
  private apifindUsers = 'api/v1/users/find-users';
  private apiSaveUser = 'api/v1/users/save-user';

  private apiFriendships = "api/v1/friendships";
  private apiReactions = "api/v1/reactions";
  private apiDeleteReaction = "api/v1/reactions/delete-reaction";

  constructor(private http: HttpClient, private router: Router) { }

  getPortfoliosByAuthor(id: number): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.apiFindPortfoliosByAuthor}?author=${id}`);
  }

  getPortfolio(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.apiFindPortfolio}?id=${id}`);
  }
  
  getPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.apiFindPortfolios}`);
  }

  getObjects(id: number): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiFindPortfolioReactions}?id=${id}`);
  }

  savePortfolio(portfolio: Portfolio): Observable<any> {
    return this.http.post<any>(`${this.apiSavePortfolio}`, portfolio);
  }

  getReactions(id: number): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(`${this.apiFindReactions}?id=${id}`);
  }

  saveReaction(reaction: SaveReaction): Observable<void> {
    return this.http.post<void>(`${this.apiSaveReaction}`, reaction);
  }

  deleteReaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiDeleteReaction}?id=${id}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiFindUser}?id=${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apifindUsers}`);
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiSaveUser}`, user);
  }
}
