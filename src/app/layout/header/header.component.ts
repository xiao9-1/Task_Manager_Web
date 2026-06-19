import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Roles} from '../../enums/roles.enums';
import {CommonModule} from '@angular/common';
import {ModeService} from '../../services/mode.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  protected readonly Roles = Roles;

  constructor(
    private modeService: ModeService,
    private authService: AuthService,
    private router: Router
  ) {}

  setMode(mode: Roles) {
    this.router.navigate([], {
      queryParams: {
        mode: mode === Roles.ADMIN ? 'admin' : 'user'
      },
      queryParamsHandling: 'merge'
    });
  }

  get mode$() {
    return this.modeService.mode$;
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.modeService.setMode(Roles.USER);
      this.router.navigate(['/login']);
    });
  }

  get user$() {
    return this.authService.user$;
  }
}

