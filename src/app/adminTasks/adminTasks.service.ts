import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminTasksService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAdminTasks() {
    return this.http.get<any[]>(
      `${this.baseUrl}/admin/tasks`,
      { withCredentials: true }
    );
  }

}
