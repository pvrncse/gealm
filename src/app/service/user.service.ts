import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { RegisterUser, ResetUserPassword } from "../loginComponent/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // registeredUser: RegisterUser = {
  //   username: '',
  //   email: '',
  //   password: '',
  //   organization: '',
  //   mobileNo: ''
  // };

  uri = "http://192.168.10.190:8080/api/auth/";
  // uri = "http://192.168.10.24:8080/api/auth/";
  // uri = "http://192.168.10.187:8080/api/auth/";

  constructor(private http: HttpClient) { }

  // HTTP Methods

  postUser(user: RegisterUser) {
    return this.http.post(this.uri + 'signup', user);
    // console.log(user);
  }

  login(credentials) {
    return this.http.post(this.uri + 'signin', credentials); 
  }

  forgotPassword(mailId) {
    return this.http.post(this.uri + 'forgetPassword', mailId);
  }

  resetPassword(form: ResetUserPassword) {
    return this.http.post(this.uri + 'resetPassword', form);
  }

  logout() {
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    this.deleteAccessToken();
    return this.http.delete(this.uri + 'logout', { headers: header });
  }

  // Helper Methods

  setAccessToken(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
  }

  getAccessToken() {
    return localStorage.getItem('token');
  }

  getUserName() {
    return localStorage.getItem('user');
  }

  deleteAccessToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    let tokenPayload = this.getTokenPayload();
    if (tokenPayload)
      return tokenPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  getTokenPayload() {
    let userToken = this.getAccessToken();
    if (userToken) {
      let tokenPayload = atob(userToken.split('.')[1]);
      return JSON.parse(tokenPayload);
    } else
      return null;
  }

}
