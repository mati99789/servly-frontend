import { Routes } from '@angular/router';
import {authGuard, loggedOutGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
    data: {
      title: 'Home',
      icon: 'home',
      requiresAuth: true,
      showInMenu: true
    }
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
    // canActivate: [authGuard],
    data: {
      title: 'Admin',
      icon: 'shield',
      requiresAuth: true,
      showInMenu: true,
      adminOnly: true
    },
    children: [
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/users/users.component').then((m) => m.UsersComponent),
        canActivate: [authGuard],
        data: {
          title: 'Users',
          icon: 'person',
          requiresAuth: true,
          showInMenu: true
        }
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('././pages/login-form/login-form.component').then((m) => m.LoginFormComponent),
    canActivate: [loggedOutGuard],
    data: {
      title: 'Login',
      icon: 'log-in',
      requiresAuth: false,
      showInMenu: true
    },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('././pages/register-login/register-login.component').then((m) => m.RegisterLoginComponent),
    canActivate: [loggedOutGuard],
    data: {
      title: 'Register',
      icon: 'person-add',
      requiresAuth: false,
      showInMenu: true
    }
  }
];
