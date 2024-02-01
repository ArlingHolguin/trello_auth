import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string){
    return this.http.post(`${this.apiURL}api/v1/auth/login`, {
      email, password
    });

    
  }

  register(name: string, email: string, password: string){
    return this.http.post(`${this.apiURL}api/v1/auth/register`, {
      name, email, password
    });

  }

  registerAndLogin(name: string, email: string, password: string){
    return this.register(name, email, password)
    .pipe(
      switchMap(() => this.login(email, password))
      );

  }

  isAvailableEmail(email: string){
    return this.http.post<{isAvailable: boolean}>(`${this.apiURL}api/v1/auth/is-available`, {email});
  }
}
