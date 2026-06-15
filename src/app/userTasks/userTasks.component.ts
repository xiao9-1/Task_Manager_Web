import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {Router} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { UserTask } from '../models/userTask.model';
import {UserTasksService} from './userTasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userTasks.component.html'
})
export class UserTasksComponent {

  user: any;
  tasks: UserTask[] = [];

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef, private userTaskService: UserTasksService) {}

  ngOnInit() {
    this.authService.getMe()
      .subscribe({
        next: (data) => {
          console.log('USER:', data);
          this.user = data;
          this.loadTasks();
          this.cdr.markForCheck();
        },
        error : () => {
          console.log('Нет доступа!');

          this.router.navigate(['/login']);
        }
      });
  }

  loadTasks() {
    this.userTaskService.getUserTasks()
      .subscribe({
        next: (data) => {
          this.tasks = data;
          this.cdr.markForCheck();
        }
      });
  }

  logout() {
    this.user = null;
    this.tasks = [];
    this.authService.logout()
      .subscribe({
        next: () => {
          console.log('Выполнен выход из системы');
          this.router.navigate(['/login']);
        }
      });
  }
}
