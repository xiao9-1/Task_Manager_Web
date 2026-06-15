import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserTasksComponent } from './userTasks/userTasks.component';
import { AdminTasksComponent } from './adminTasks/adminTasks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: UserTasksComponent },
  {path: 'admin/tasks', component: AdminTasksComponent}
];
