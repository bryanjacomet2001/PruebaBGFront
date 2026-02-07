import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import ('../app/modules/auth/auth.routes')
  },
  {
    path: 'home',
    loadChildren: () => import ('../app/modules/home/home.route')
  },
  {
    path: '',
    loadChildren: () => import ('../app/modules/auth/auth.routes')
  }
];
