import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Token } from "../models/userlogin";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseUrl="http://localhost:5000/api/auth"
  constructor(private http:HttpClient) { }
  authenticateLogin(loginCredentials: Login):Observable<Token> {
    const data = this.http.post<Token>(this.baseUrl+"/login",loginCredentials)    
    return data;
  }
}