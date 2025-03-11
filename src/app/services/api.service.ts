import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private apiUrl = 'http://localhost:8080/api/authentication/login';

  constructor(private http: HttpClient) { }

  councellorLoginAuthentication(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const requestBody = {
      email: email,
      password: password
    };

    return this.http.post<any>(this.apiUrl, requestBody, { headers });
  }

  userSignup(signupData: any) {
    const body = JSON.stringify(signupData);
    return this.http.post(this.apiUrl + 'user', body, { headers: this.headers });
  }
}
