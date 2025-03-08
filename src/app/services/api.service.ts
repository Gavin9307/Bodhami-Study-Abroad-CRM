import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  serverUrl = environment.serverUrl;

  constructor(private http: HttpClient) { }

  customerloginauthentication(email: string, password: string) {
    const data = { 'email': email, 'password': password };
    const body = JSON.stringify(data);
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'no-auth': 'True' });
    return this.http.post(this.serverUrl + 'authentication/userLogin', body, { headers: reqHeader });
  }

  userSignup(signupData: any) {
    const body = JSON.stringify(signupData);
    return this.http.post(this.serverUrl + 'user', body, { headers: this.headers });
  }
}
