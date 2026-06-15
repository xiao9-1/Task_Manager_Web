import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/login`,
      { email, password },
      { withCredentials: true }
    );
  }

  getTasks() {
    return this.http.get('http://localhost:8080/tasks', {
      withCredentials: true
    });
  }

  getMe() {
    return this.http.get(
      `${this.baseUrl}/me`,
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post(
      'http://localhost:8080/logout',
      {},
      { withCredentials: true }
    );
  }
}
