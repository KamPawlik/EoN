import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './modules/core/home-view/home-view.component';


const routes: Routes = [
  { path: '', component: HomeViewComponent, pathMatch: 'full'},
  { path: 'nieruchomosci', redirectTo: '/nieruchomosci', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
