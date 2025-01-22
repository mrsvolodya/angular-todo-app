import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { AboutPageComponent } from './about/about-page/about-page.component';

const routes: Routes = [
  { path: 'todos', component: TodosPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Ensure the routes are correctly initialized
  exports: [RouterModule],
})
export class AppRoutingModule {}
