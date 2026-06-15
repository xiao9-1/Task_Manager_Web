import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {Router} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AdminTask } from '../models/adminTask.model';
import {AdminTasksService} from './adminTasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adminTasks.component.html'
})
export class AdminTasksComponent {

  user: any;
  tasks: AdminTask[] = [];

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef, private adminTaskService: AdminTasksService) {}

  ngOnInit() {
    this.authService.getMe()
      .subscribe({
        next: (data) => {
          console.log('USER:', data);
          this.user = data;
          this.loadAdminTasks();
          this.cdr.markForCheck();
        },
        error : () => {
          console.log('Нет доступа!');

          this.router.navigate(['/login']);
        }
      }
      );
  }

  loadAdminTasks() {
    this.adminTaskService.getAdminTasks().subscribe({
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
