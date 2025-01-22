import { Routes } from '@angular/router';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { AboutPageComponent } from './about/about-page/about-page.component';
export const routes: Routes = [
  { path: 'todos', component: TodosPageComponent },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full',
  },
  { path: '**', component: AboutPageComponent },
];
