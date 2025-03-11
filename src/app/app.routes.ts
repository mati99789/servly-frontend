import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login-form/login-form.component').then((m) => m.LoginFormComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register-login/register-login.component').then((m) => m.RegisterLoginComponent),
  }
];
