import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent, // wrapper layoutu (dynamiczny wybór)
    children: [
      {
        path: 'users',
        loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ]
  }
];
