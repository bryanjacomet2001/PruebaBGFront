import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import ('../app/modules/auth/auth.routes')
  },
  {
    path: 'dashboard',
    loadComponent: () => import ('../app/modules/dashboard/page/dasboard').then(x => x.Dasboard)
  },
  {
    path: '',
    loadChildren: () => import ('../app/modules/auth/auth.routes')
  }
];
