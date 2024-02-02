import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie} from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  //access token

  saveToken(token: string) {
    // localStorage.setItem('token', token);
    setCookie('token-trello', token,{
      expires: 1, 
      path: '/'
    });
  }

  getToken() {
    // const token = localStorage.getItem('token');
    const token = getCookie('token-trello');
    return token;
  }

  removeToken() {
    // localStorage.removeItem('token');
    removeCookie('token-trello');
  }

  isValidToken() {
    const token = this.getToken();
    if(!token){
      return false;
    }
      const decodeToken = jwtDecode<JwtPayload>(token);
      if(decodeToken && decodeToken?.exp){
        const tokenDate = new Date(0);
        tokenDate.setUTCSeconds(decodeToken.exp);
        const currentDate = new Date();
        return tokenDate.getTime() > currentDate.getTime();
      }
      return false;
    
  }

  //refresh token

  saveRefreshToken(token: string) {
    // localStorage.setItem('token', token);
    setCookie('refresh-token-trello', token,{
      expires: 1, 
      path: '/'
    });
  }

  getRefreshToken() {
    // const token = localStorage.getItem('token');
    const token = getCookie('refresh-token-trello');
    return token;
  }

  removeRefreshToken() {
    removeCookie('refresh-token-trello');
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if(!token){
      return false;
    }
      const decodeToken = jwtDecode<JwtPayload>(token);
      if(decodeToken && decodeToken?.exp){
        const tokenDate = new Date(0);
        tokenDate.setUTCSeconds(decodeToken.exp);
        const currentDate = new Date();
        return tokenDate.getTime() > currentDate.getTime();
      }
      return false;
    
  }
}
