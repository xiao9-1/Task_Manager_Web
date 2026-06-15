import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {

    this.authService.getMe().subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: () => {
      }
    });
  }

  login() {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: () => {
          console.log('Успешный вход! email =', this.email);
          this.router.navigate(['/tasks']);
        },
        error: () => {
          alert('Ошибка входа. Неверный логин или пароль');
        }
      });
  }

  // loadTasks() {
  //   this.authService.getTasks()
  //     .subscribe({
  //       next: (res) => {
  //         console.log('TASKS:', res);
  //       },
  //       error: (err) => {
  //         console.log('TASKS ERROR:', err);
  //       }
  //     });
  // }
}
