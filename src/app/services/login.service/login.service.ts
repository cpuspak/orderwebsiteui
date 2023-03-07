import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from 'src/app/backendUrl';
import * as moment from 'moment';
import { timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  generateToken(userName: string, password: string){

    return this.http.post(backendUrl+"/login", {"Username":userName, "Password":password})
  }

  setLoginInfos(tokenJson: any){
    this.setSession(tokenJson.token, tokenJson.expires_at)
  }

  registerUser(userName: string, password: string, name: string){
    return this.http.post(backendUrl+"/register", {"Username": userName, "Password": password, "Name": name})
  }

  setSession(token: string, expiry: string) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('expires_at', expiry)
  }        


  isLoggedIn() {
    try{
      return moment().isBefore(this.getExpiration());
    } catch(Error) {
      console.log("in catch", Error)
      return false;
    }
  }

  isAdmin() {
    try {
      var token: any = localStorage.getItem("id_token")
      let jwtData = token.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)

      return decodedJwtData.isAdmin
    } catch(Error) {
      console.log("in catch", Error)
      return false;
    }
  }

  getUserNameAndExpirationTime() {
    try {
      var token: any = localStorage.getItem("id_token")
      let jwtData = token.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)

      return {
        "userName":decodedJwtData.Username,
        "expirationTime":decodedJwtData.exp
      }
    } catch(Error) {
      console.log("in catch", Error)
      return false;
    }
  }



  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at")
  }


  isLoggedOut() {
    return !this.isLoggedIn();
  }


  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if(expiration){
      return moment(expiration);
    }
    else return moment(0)
    
  }  
}
