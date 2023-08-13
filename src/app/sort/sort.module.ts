import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlgorithmsPageComponent } from './pages/algorithms-page/algorithms-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { MapsRoutingModule } from './sort-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SortingPageComponent } from './pages/sorting-page/sorting-page.component';



@NgModule({
  declarations: [
    AlgorithmsPageComponent,
    HomePageComponent,
    LayoutComponent,
    SideMenuComponent,
    SortingPageComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    MaterialModule,

    ReactiveFormsModule,
  ],
})
export class SortModule { }
