import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlgorithmsPageComponent } from './pages/algorithms-page/algorithms-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { SortingPageComponent } from './pages/sorting-page/sorting-page.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path:'home', component: HomePageComponent },
      { path:'sorting', component: SortingPageComponent },
      { path:'algorithms', component: AlgorithmsPageComponent },
      { path:'**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
