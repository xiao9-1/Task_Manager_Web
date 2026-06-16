import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  errorMessage = '';

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

    if (!this.email?.trim() || !this.password?.trim()) {
      this.errorMessage = 'Заполните все поля';
      return;
    }

    this.errorMessage = '';
    this.authService.login(this.email, this.password)
      .subscribe({
        next: () => {
          console.log('Успешный вход! email =', this.email);
          this.router.navigate(['/tasks']);
        },
        error: () => {
          this.errorMessage = 'Неверный логин или пароль';
        }
      });
  }
}
