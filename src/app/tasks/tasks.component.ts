import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../tasks/tasks.component.html'
})
export class TasksComponent {

  tasks: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getTasks()
      .subscribe({
        next: (data: any) => {
          this.tasks = data;
        },
        error: (err) => {
          console.log('ERROR:', err);
        }
      });
  }
}
